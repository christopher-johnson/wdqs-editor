'use strict';
var $ = require('jquery'),
	utils = require('./utils.js'),
	WDQSQE = require('./index.js');

WDQSQE.getAjaxConfig = function(wdqsqe, callbackOrConfig) {
	var callback = (typeof callbackOrConfig == "function" ? callbackOrConfig : null);
	var config = (typeof callbackOrConfig == "object" ? callbackOrConfig : {});

	if (wdqsqe.options.sparql)
		config = $.extend({}, wdqsqe.options.sparql, config);

	//for backwards compatability, make sure we copy sparql handlers to sparql callbacks
	if (config.handlers)
		$.extend(true, config.callbacks, config.handlers);


	if (!config.endpoint || config.endpoint.length == 0)
		return; // nothing to query!

	/**
	 * initialize ajax config
	 */
	var ajaxConfig = {
		url: (typeof config.endpoint == "function" ? config.endpoint(wdqsqe) : config.endpoint),
		type: (typeof config.requestMethod == "function" ? config.requestMethod(wdqsqe) : config.requestMethod),
		headers: {
			Accept: getAcceptHeader(wdqsqe, config),
		}
	};
	if (config.xhrFields) ajaxConfig.xhrFields = config.xhrFields;
	/**
	 * add complete, beforesend, etc callbacks (if specified)
	 */
	var handlerDefined = false;
	if (config.callbacks) {
		for (var handler in config.callbacks) {
			if (config.callbacks[handler]) {
				handlerDefined = true;
				ajaxConfig[handler] = config.callbacks[handler];
			}
		}
	}
	ajaxConfig.data = wdqsqe.getUrlArguments(config);
	if (!handlerDefined && !callback)
		return; // ok, we can query, but have no callbacks. just stop now

	// if only callback is passed as arg, add that on as 'onComplete' callback
	if (callback)
		ajaxConfig.complete = callback;



	/**
	 * merge additional request headers
	 */
	if (config.headers && !$.isEmptyObject(config.headers))
		$.extend(ajaxConfig.headers, config.headers);


	var queryStart = new Date();
	var updateYasqe = function() {
		wdqsqe.lastQueryDuration = new Date() - queryStart;
		WDQSQE.updateQueryButton(wdqsqe);
		wdqsqe.setBackdrop(false);
	};
	//Make sure the query button is updated again on complete
	var completeCallbacks = [
		function(){require('./index.js').signal(wdqsqe, 'queryFinish', arguments)},
		updateYasqe
	];

	if (ajaxConfig.complete) {
		completeCallbacks.push(ajaxConfig.complete);
	}
	ajaxConfig.complete = completeCallbacks;
	return ajaxConfig;
};



WDQSQE.executeQuery = function(wdqsqe, callbackOrConfig) {
	WDQSQE.signal(wdqsqe, 'query', wdqsqe, callbackOrConfig);
	WDQSQE.updateQueryButton(wdqsqe, "busy");
	wdqsqe.setBackdrop(true);
	wdqsqe.xhr = $.ajax(WDQSQE.getAjaxConfig(wdqsqe, callbackOrConfig));
};


WDQSQE.getUrlArguments = function(wdqsqe, config) {
	var queryMode = wdqsqe.getQueryMode();
	var data = [{
		name: utils.getString(wdqsqe, wdqsqe.options.sparql.queryName),
		value: (config.getQueryForAjax? config.getQueryForAjax(wdqsqe): wdqsqe.getValue())
	}];

	/**
	 * add named graphs to ajax config
	 */
	if (config.namedGraphs && config.namedGraphs.length > 0) {
		var argName = (queryMode == "query" ? "named-graph-uri" : "using-named-graph-uri ");
		for (var i = 0; i < config.namedGraphs.length; i++)
			data.push({
				name: argName,
				value: config.namedGraphs[i]
			});
	}
	/**
	 * add default graphs to ajax config
	 */
	if (config.defaultGraphs && config.defaultGraphs.length > 0) {
		var argName = (queryMode == "query" ? "default-graph-uri" : "using-graph-uri ");
		for (var i = 0; i < config.defaultGraphs.length; i++)
			data.push({
				name: argName,
				value: config.defaultGraphs[i]
			});
	}

	/**
	 * add additional request args
	 */
	if (config.args && config.args.length > 0) $.merge(data, config.args);

	return data;
};

var getAcceptHeader = function(wdqsqe, config) {
	var acceptHeader = null;
	if (config.acceptHeader && !config.acceptHeaderGraph && !config.acceptHeaderSelect && !config.acceptHeaderUpdate) {
		//this is the old config. For backwards compatability, keep supporting it
		if (typeof config.acceptHeader == "function") {
			acceptHeader = config.acceptHeader(wdqsqe);
		} else {
			acceptHeader = config.acceptHeader;
		}
	} else {
		if (wdqsqe.getQueryMode() == "update") {
			acceptHeader = (typeof config.acceptHeader == "function" ? config.acceptHeaderUpdate(wdqsqe) : config.acceptHeaderUpdate);
		} else {
			var qType = wdqsqe.getQueryType();
			if (qType == "DESCRIBE" || qType == "CONSTRUCT") {
				acceptHeader = (typeof config.acceptHeaderGraph == "function" ? config.acceptHeaderGraph(wdqsqe) : config.acceptHeaderGraph);
			} else {
				acceptHeader = (typeof config.acceptHeaderSelect == "function" ? config.acceptHeaderSelect(wdqsqe) : config.acceptHeaderSelect);
			}
		}
	}
	return acceptHeader;
};

module.exports = {
	getAjaxConfig: WDQSQE.getAjaxConfig
};
