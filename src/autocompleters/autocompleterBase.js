'use strict';
var $ = require('jquery'),
	utils = require('../utils.js'),
	yutils = require('wdqs-storage'),
	Trie = require('../../lib/trie.js'),
	WDQSQE = require('../index.js');

module.exports = function(WDQSQE, wdqsqe) {
	var completionNotifications = {};
	var completers = {};
	var tries = {};

	wdqsqe.on('cursorActivity', function(wdqsqe, eventInfo) {
		autoComplete(true);
	});
	wdqsqe.on('change', function() {
		var needPossibleAdjustment = [];
		for (var notificationName in completionNotifications) {
			if (completionNotifications[notificationName].is(':visible')) {
				needPossibleAdjustment.push(completionNotifications[notificationName]);
			}
		}
		if (needPossibleAdjustment.length > 0) {
			//position completion notifications
			var scrollBar = $(wdqsqe.getWrapperElement()).find(".CodeMirror-vscrollbar");
			var offset = 0;
			if (scrollBar.is(":visible")) {
				offset = scrollBar.outerWidth();
			}
			needPossibleAdjustment.forEach(function(notification) {
				notification.css("right", offset)
			});
		}
	});



	/**
	 * Store bulk completions in memory as trie, and store these in localstorage as well (if enabled)
	 * 
	 * @method doc.storeBulkCompletions
	 * @param completions {array}
	 */
	var storeBulkCompletions = function(completer, completions) {
		// store array as trie
		tries[completer.name] = new Trie();
		for (var i = 0; i < completions.length; i++) {
			tries[completer.name].insert(completions[i]);
		}
		// store in localstorage as well
		var storageId = utils.getPersistencyId(wdqsqe, completer.persistent);
		if (storageId) yutils.storage.set(storageId, completions, "month");
	};

	var initCompleter = function(name, completionInit) {
		var completer = completers[name] = new completionInit(wdqsqe, name);
		completer.name = name;
		if (completer.bulk) {
			var storeArrayAsBulk = function(suggestions) {
				if (suggestions && suggestions instanceof Array && suggestions.length > 0) {
					storeBulkCompletions(completer, suggestions);
				}
			}
			if (completer.get instanceof Array) {
				// we don't care whether the completions are already stored in
				// localstorage. just use this one
				storeArrayAsBulk(completer.get);
			} else {
				// if completions are defined in localstorage, use those! (calling the
				// function may come with overhead (e.g. async calls))
				var completionsFromStorage = null;
				var persistencyIdentifier = utils.getPersistencyId(wdqsqe, completer.persistent);
				if (persistencyIdentifier)
					completionsFromStorage = yutils.storage.get(persistencyIdentifier);
				if (completionsFromStorage && completionsFromStorage.length > 0) {
					storeArrayAsBulk(completionsFromStorage);
				} else {
					// nothing in storage. check whether we have a function via which we
					// can get our prefixes
					if (completer.get instanceof Function) {
						if (completer.async) {
							completer.get(null, storeArrayAsBulk);
						} else {
							storeArrayAsBulk(completer.get());
						}
					}
				}
			}
		}
	};

	var autoComplete = function(fromAutoShow) {
		if (wdqsqe.somethingSelected())
			return;
		var tryHintType = function(completer) {
			if (fromAutoShow // from autoShow, i.e. this gets called each time the editor content changes
				&& (!completer.autoShow // autoshow for  this particular type of autocompletion is -not- enabled
					|| (!completer.bulk && completer.async)) // async is enabled (don't want to re-do ajax-like request for every editor change)
			) {
				return false;
			}

			var hintConfig = {
				closeCharacters: /(?=a)b/,
				completeSingle: false
			};
			if (!completer.bulk && completer.async) {
				hintConfig.async = true;
			}
			var wrappedHintCallback = function(wdqsqe, callback) {
				return getCompletionHintsObject(completer, callback);
			};
			var result = WDQSQE.showHint(wdqsqe, wrappedHintCallback, hintConfig);
			return true;
		};
		for (var completerName in completers) {
			if ($.inArray(completerName, wdqsqe.options.autocompleters) == -1) continue; //this completer is disabled
			var completer = completers[completerName];
			if (!completer.isValidCompletionPosition) continue; //no way to check whether we are in a valid position

			if (!completer.isValidCompletionPosition()) {
				//if needed, fire callbacks for when we are -not- in valid completion position
				if (completer.callbacks && completer.callbacks.invalidPosition) {
					completer.callbacks.invalidPosition(wdqsqe, completer);
				}
				//not in a valid position, so continue to next completion candidate type
				continue;
			}
			// run valid position handler, if there is one (if it returns false, stop the autocompletion!)
			if (completer.callbacks && completer.callbacks.validPosition) {
				if (completer.callbacks.validPosition(wdqsqe, completer) === false)
					continue;
			}
			var success = tryHintType(completer);
			if (success)
				break;
		}
	};



	var getCompletionHintsObject = function(completer, callback) {
		var getSuggestionsFromToken = function(partialToken) {
			var stringToAutocomplete = partialToken.autocompletionString || partialToken.string;
			var suggestions = [];
			if (tries[completer.name]) {
				suggestions = tries[completer.name].autoComplete(stringToAutocomplete);
			} else if (typeof completer.get == "function" && completer.async == false) {
				suggestions = completer.get(stringToAutocomplete);
			} else if (typeof completer.get == "object") {
				var partialTokenLength = stringToAutocomplete.length;
				for (var i = 0; i < completer.get.length; i++) {
					var completion = completer.get[i];
					if (completion.slice(0, partialTokenLength) == stringToAutocomplete) {
						suggestions.push(completion);
					}
				}
			}
			return getSuggestionsAsHintObject(suggestions, completer, partialToken);

		};


		var token = wdqsqe.getCompleteToken();
		if (completer.preProcessToken) {
			token = completer.preProcessToken(token);
		}

		if (token) {
			// use custom completionhint function, to avoid reaching a loop when the
			// completionhint is the same as the current token
			// regular behaviour would keep changing the codemirror dom, hence
			// constantly calling this callback
			if (!completer.bulk && completer.async) {
				var wrappedCallback = function(suggestions) {
					callback(getSuggestionsAsHintObject(suggestions, completer, token));
				};
				completer.get(token, wrappedCallback);
			} else {
				return getSuggestionsFromToken(token);

			}
		}
	};


	/**
	 *  get our array of suggestions (strings) in the codemirror hint format
	 */
	var getSuggestionsAsHintObject = function(suggestions, completer, token) {
		var hintList = [];
		for (var i = 0; i < suggestions.length; i++) {
			var suggestedString = suggestions[i];
			if (completer.postProcessToken) {
				suggestedString = completer.postProcessToken(token, suggestedString);
			}
			hintList.push({
				text: suggestedString,
				displayText: suggestedString,
				hint: selectHint,
			});
		}

		var cur = wdqsqe.getCursor();
		var returnObj = {
			completionToken: token.string,
			list: hintList,
			from: {
				line: cur.line,
				ch: token.start
			},
			to: {
				line: cur.line,
				ch: token.end
			}
		};
		//if we have some autocompletion handlers specified, add these these to the object. Codemirror will take care of firing these
		if (completer.callbacks) {
			for (var callbackName in completer.callbacks) {
				if (completer.callbacks[callbackName]) {
					WDQSQE.on(returnObj, callbackName, completer.callbacks[callbackName]);
				}
			}
		}
		return returnObj;
	};

	return {
		init: initCompleter,
		completers: completers,
		notifications: {
			getEl: function(completer) {
				return $(completionNotifications[completer.name]);
			},
			show: function(wdqsqe, completer) {
				//only draw when the user needs to use a keypress to summon autocompletions
				if (!completer.autoshow) {
					if (!completionNotifications[completer.name]) completionNotifications[completer.name] = $("<div class='completionNotification'></div>");
					completionNotifications[completer.name]
						.show()
						.text("Press " + (navigator.userAgent.indexOf('Mac OS X') != -1 ? "CMD" : "CTRL") + " - <spacebar> to autocomplete")
						.appendTo($(wdqsqe.getWrapperElement()));
				}
			},
			hide: function(wdqsqe, completer) {
				if (completionNotifications[completer.name]) {
					completionNotifications[completer.name].hide();
				}
			}

		},
		autoComplete: autoComplete,
		getTrie: function(completer) {
			return (typeof completer == "string" ? tries[completer] : tries[completer.name]);
		}
	}
};









/**
 * function which fires after the user selects a completion. this function checks whether we actually need to store this one (if completion is same as current token, don't do anything)
 */
var selectHint = function(wdqsqe, data, completion) {
	if (completion.text != wdqsqe.getTokenAt(wdqsqe.getCursor()).string) {
		wdqsqe.replaceRange(completion.text, data.from, data.to);
	}
};





//
//module.exports = {
//	preprocessPrefixTokenForCompletion: preprocessPrefixTokenForCompletion,
//	postprocessResourceTokenForCompletion: postprocessResourceTokenForCompletion,
//	preprocessResourceTokenForCompletion: preprocessResourceTokenForCompletion,
//	showCompletionNotification: showCompletionNotification,
//	hideCompletionNotification: hideCompletionNotification,
//	autoComplete: autoComplete,
//	autocompleteVariables: autocompleteVariables,
//	fetchFromPrefixCc: fetchFromPrefixCc,
//	fetchFromLov: fetchFromLov,
////	storeBulkCompletions: storeBulkCompletions,
//	loadBulkCompletions: loadBulkCompletions,
//};