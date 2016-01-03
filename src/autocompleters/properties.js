'use strict';
var $ = require('jquery');
module.exports = function(wdqsqe, name) {
	return {
		isValidCompletionPosition: function() {
			return module.exports.isValidCompletionPosition(wdqsqe);
		},
		get: function(token, callback) {
			return require('./utils').fetchFromLov(wdqsqe, this, token, callback);
		},
		preProcessToken: function(token) {
			return module.exports.preProcessToken(wdqsqe, token)
		},
		postProcessToken: function(token, suggestedString) {
			return module.exports.postProcessToken(wdqsqe, token, suggestedString);
		},
		async: true,
		bulk: false,
		autoShow: false,
		persistent: name,
		callbacks: {
			validPosition: wdqsqe.autocompleters.notifications.show,
			invalidPosition: wdqsqe.autocompleters.notifications.hide,
		}
	}
};

module.exports.isValidCompletionPosition = function(wdqsqe) {
	var token = wdqsqe.getCompleteToken();
	if (token.string.length == 0)
		return false; //we want -something- to autocomplete
	if (token.string.indexOf("?") == 0)
		return false; // we are typing a var
	if ($.inArray("a", token.state.possibleCurrent) >= 0)
		return true; // predicate pos
	var cur = wdqsqe.getCursor();
	var previousToken = wdqsqe.getPreviousNonWsToken(cur.line, token);
	if (previousToken.string == "rdfs:subPropertyOf")
		return true;

	// hmm, we would like -better- checks here, e.g. checking whether we are
	// in a subject, and whether next item is a rdfs:subpropertyof.
	// difficult though... the grammar we use is unreliable when the query
	// is invalid (i.e. during typing), and often the predicate is not typed
	// yet, when we are busy writing the subject...
	return false;
};
module.exports.preProcessToken = function(wdqsqe, token) {
	return require('./utils.js').preprocessResourceTokenForCompletion(wdqsqe, token);
};
module.exports.postProcessToken = function(wdqsqe, token, suggestedString) {
	return require('./utils.js').postprocessResourceTokenForCompletion(wdqsqe, token, suggestedString)
};