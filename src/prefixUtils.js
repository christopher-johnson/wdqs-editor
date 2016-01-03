'use strict';
/**
 * Append prefix declaration to list of prefixes in query window.
 * 
 * @param wdqsqe
 * @param prefix
 */
var addPrefixes = function(wdqsqe, prefixes) {
	var existingPrefixes = wdqsqe.getPrefixesFromQuery();
	//for backwards compatability, we stil support prefixes value as string (e.g. 'rdf: <http://fbfgfgf>'
	if (typeof prefixes == "string") {
		addPrefixAsString(wdqsqe, prefixes);
	} else {
		for (var pref in prefixes) {
			if (!(pref in existingPrefixes))
				addPrefixAsString(wdqsqe, pref + ": <" + prefixes[pref] + ">");
		}
	}
	wdqsqe.collapsePrefixes(false);
};

var addPrefixAsString = function(wdqsqe, prefixString) {
	var lastPrefix = null;
	var lastPrefixLine = 0;
	var numLines = wdqsqe.lineCount();
	for (var i = 0; i < numLines; i++) {
		var firstToken = wdqsqe.getNextNonWsToken(i);
		if (firstToken != null && (firstToken.string == "PREFIX" || firstToken.string == "BASE")) {
			lastPrefix = firstToken;
			lastPrefixLine = i;
		}
	}

	if (lastPrefix == null) {
		wdqsqe.replaceRange("PREFIX " + prefixString + "\n", {
			line: 0,
			ch: 0
		});
	} else {
		var previousIndent = getIndentFromLine(wdqsqe, lastPrefixLine);
		wdqsqe.replaceRange("\n" + previousIndent + "PREFIX " + prefixString, {
			line: lastPrefixLine
		});
	}
	wdqsqe.collapsePrefixes(false);
};
var removePrefixes = function(wdqsqe, prefixes) {
	var escapeRegex = function(string) {
		//taken from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
		return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}
	for (var pref in prefixes) {
		wdqsqe.setValue(wdqsqe.getValue().replace(new RegExp("PREFIX\\s*" + pref + ":\\s*" + escapeRegex("<" + prefixes[pref] + ">") + "\\s*", "ig"), ''));
	}
	wdqsqe.collapsePrefixes(false);

};

/**
 * Get defined prefixes from query as array, in format {"prefix:" "uri"}
 * 
 * @param cm
 * @returns {Array}
 */
var getPrefixesFromQuery = function(wdqsqe) {
	var queryPrefixes = {};
	var shouldContinue = true;
	var getPrefixesFromLine = function(lineOffset, colOffset) {
		if (!shouldContinue) return;
		if (!colOffset) colOffset = 1;
		var token = wdqsqe.getNextNonWsToken(i, colOffset);
		if (token) {
			if (token.state.possibleCurrent.indexOf("PREFIX") == -1 && token.state.possibleNext.indexOf("PREFIX") == -1) shouldContinue = false; //we are beyond the place in the query where we can enter prefixes
			if (token.string.toUpperCase() == "PREFIX") {
				var prefix = wdqsqe.getNextNonWsToken(i, token.end + 1);
				if (prefix) {
					var uri = wdqsqe.getNextNonWsToken(i, prefix.end + 1);
					if (uri) {
						var uriString = uri.string;
						if (uriString.indexOf("<") == 0)
							uriString = uriString.substring(1);
						if (uriString.slice(-1) == ">")
							uriString = uriString
							.substring(0, uriString.length - 1);
						queryPrefixes[prefix.string.slice(0, -1)] = uriString;

						getPrefixesFromLine(lineOffset, uri.end + 1);
					} else {
						getPrefixesFromLine(lineOffset, prefix.end + 1);
					}

				} else {
					getPrefixesFromLine(lineOffset, token.end + 1);
				}
			} else {
				getPrefixesFromLine(lineOffset, token.end + 1);
			}
		}
	};


	var numLines = wdqsqe.lineCount();
	for (var i = 0; i < numLines; i++) {
		if (!shouldContinue) break;
		getPrefixesFromLine(i);

	}
	return queryPrefixes;
};

/**
 * Get the used indentation for a certain line
 * 
 * @param wdqsqe
 * @param line
 * @param charNumber
 * @returns
 */
var getIndentFromLine = function(wdqsqe, line, charNumber) {
	if (charNumber == undefined)
		charNumber = 1;
	var token = wdqsqe.getTokenAt({
		line: line,
		ch: charNumber
	});
	if (token == null || token == undefined || token.type != "ws") {
		return "";
	} else {
		return token.string + getIndentFromLine(wdqsqe, line, token.end + 1);
	};
};

module.exports = {
	addPrefixes: addPrefixes,
	getPrefixesFromQuery: getPrefixesFromQuery,
	removePrefixes: removePrefixes
};