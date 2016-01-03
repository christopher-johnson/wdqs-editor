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
	if (token.string.indexOf("?") == 0)
		return false;
	var cur = wdqsqe.getCursor();
	var previousToken = wdqsqe.getPreviousNonWsToken(cur.line, token);
	if (previousToken.string == "a")
		return true;
	if (previousToken.string == "rdf:type")
		return true;
	if (previousToken.string == "rdfs:domain")
		return true;
	if (previousToken.string == "rdfs:range")
		return true;
	return false;
};
module.exports.preProcessToken = function(wdqsqe, token) {
	return require('./utils.js').preprocessResourceTokenForCompletion(wdqsqe, token);
};
module.exports.postProcessToken = function(wdqsqe, token, suggestedString) {
	return require('./utils.js').postprocessResourceTokenForCompletion(wdqsqe, token, suggestedString)
};