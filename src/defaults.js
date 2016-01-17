/**
 * The default options of WDQSQE (check the CodeMirror documentation for even
 * more options, such as disabling line numbers, or changing keyboard shortcut
 * keys). Either change the default options by setting WDQSQE.defaults, or by
 * passing your own options as second argument to the WDQSQE constructor
 */
var $ = require('jquery'),
	WDQSQE = require('./index.js');
	WDQSQE.defaults = $.extend(true, {}, WDQSQE.defaults, {
	mode: "sparql11",
	/**
	 * Query string
	 */
	value: "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nSELECT * WHERE {\n  ?sub ?pred ?obj .\n} \nLIMIT 10",
	highlightSelectionMatches: {
		showToken: /\w/
	},
	tabMode: "indent",
	lineNumbers: true,
	lineWrapping: true,
	backdrop: false,
	foldGutter: {
		rangeFinder: new WDQSQE.fold.combine(WDQSQE.fold.brace, WDQSQE.fold.prefix)
	},
	collapsePrefixesOnLoad: false,
	gutters: ["gutterErrorBar", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
	matchBrackets: true,
	fixedGutter: true,
	syntaxErrorCheck: true,
	/**
	 * Extra shortcut keys. Check the CodeMirror manual on how to add your own
	 *
	 * @property extraKeys
	 * @type object
	 */
	extraKeys: {
		//					"Ctrl-Space" : function(wdqsqe) {
		//						WDQSQE.autoComplete(wdqsqe);
		//					},
		"Ctrl-Space": WDQSQE.autoComplete,

		"Cmd-Space": WDQSQE.autoComplete,
		"Ctrl-D": WDQSQE.deleteLine,
		"Ctrl-K": WDQSQE.deleteLine,
		"Cmd-D": WDQSQE.deleteLine,
		"Cmd-K": WDQSQE.deleteLine,
		"Ctrl-/": WDQSQE.commentLines,
		"Cmd-/": WDQSQE.commentLines,
		"Ctrl-Alt-Down": WDQSQE.copyLineDown,
		"Ctrl-Alt-Up": WDQSQE.copyLineUp,
		"Cmd-Alt-Down": WDQSQE.copyLineDown,
		"Cmd-Alt-Up": WDQSQE.copyLineUp,
		"Shift-Ctrl-F": WDQSQE.doAutoFormat,
		"Shift-Cmd-F": WDQSQE.doAutoFormat,
		"Ctrl-]": WDQSQE.indentMore,
		"Cmd-]": WDQSQE.indentMore,
		"Ctrl-[": WDQSQE.indentLess,
		"Cmd-[": WDQSQE.indentLess,
		"Ctrl-S": WDQSQE.storeQuery,
		"Cmd-S": WDQSQE.storeQuery,
		"Ctrl-Enter": WDQSQE.executeQuery,
		"Cmd-Enter": WDQSQE.executeQuery,
		"F11": function(wdqsqe) {
			wdqsqe.setOption("fullScreen", !wdqsqe.getOption("fullScreen"));
		},
		"Esc": function(wdqsqe) {
			if (wdqsqe.getOption("fullScreen")) wdqsqe.setOption("fullScreen", false);
		}
	},
	cursorHeight: 0.9,


	/**
	 * Show a button with which users can create a link to this query. Set this value to null to disable this functionality.
	 * By default, this feature is enabled, and the only the query value is appended to the link.
	 * ps. This function should return an object which is parseable by jQuery.param (http://api.jquery.com/jQuery.param/)
	 */
	createShareLink: WDQSQE.createShareLink,

	createShortLink: null,

	/**
	 * Consume links shared by others, by checking the url for arguments coming from a query link. Defaults by only checking the 'query=' argument in the url
	 */
	consumeShareLink: WDQSQE.consumeShareLink,




	/**
	 * Change persistency settings for the WDQSQE query value. Setting the values
	 * to null, will disable persistancy: nothing is stored between browser
	 * sessions Setting the values to a string (or a function which returns a
	 * string), will store the query in localstorage using the specified string.
	 * By default, the ID is dynamically generated using the closest dom ID, to avoid collissions when using multiple WDQSQE items on one
	 * page
	 *
	 * @type function|string
	 */
	persistent: function(wdqsqe) {
		return "wdqsqe_" + $(wdqsqe.getWrapperElement()).closest('[id]').attr('id') + "_queryVal";
	},


	/**
	 * Settings for querying sparql endpoints
	 */
	sparql: {
		queryName: function(wdqsqe) {return wdqsqe.getQueryMode()},
		showQueryButton: false,

		/**f
		 * Endpoint to query
		 *
		 * @property sparql.endpoint
		 * @type String|function
		 */
		endpoint: "https://query.wikidata.org/sparql",
		/**
		 * Request method via which to access SPARQL endpoint
		 *
		 * @property sparql.requestMethod
		 * @type String|function
		 */
		requestMethod: "GET",

		/**
		 * @type String|function
		 */
		acceptHeaderGraph: "text/turtle,*/*;q=0.9",
		/**
		 * @type String|function
		 */
		acceptHeaderSelect: "application/sparql-results+json,*/*;q=0.9",
		/**
		 * @type String|function
		 */
		acceptHeaderUpdate: "text/plain,*/*;q=0.9",

		/**
		 * Named graphs to query.
		 */
		namedGraphs: [],
		/**
		 * Default graphs to query.
		 */
		defaultGraphs: [],

		/**
		 * Additional request arguments. Add them in the form: {name: "name", value: "value"}
		 */
		args: [],

		/**
		 * Additional request headers
		 */
		headers: {},

		getQueryForAjax: null,
		/**
		 * Set of ajax callbacks
		 */
		callbacks: {
			beforeSend: null,
			complete: null,
			error: null,
			success: null
		},
		handlers: {} //keep here for backwards compatability
	}
});
