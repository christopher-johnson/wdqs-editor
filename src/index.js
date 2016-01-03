'use strict';

/**
 * Load libraries
 */
var $ = require("jquery"),
    CodeMirror = require("codemirror"),
    utils = require('./utils.js'),
    wdqsstorage = require('wdqs-storage'),
    imgs = require('./imgs.js');

require('./sparql.js')
require('./defaults.js');
require("../lib/deparam.js");
require('codemirror/addon/fold/foldcode.js');
require('codemirror/addon/fold/foldgutter.js');
require('codemirror/addon/fold/xml-fold.js');
require('codemirror/addon/fold/brace-fold.js');
require('codemirror/addon/hint/show-hint.js');
require('codemirror/addon/search/searchcursor.js');
require('codemirror/addon/edit/matchbrackets.js');
require('codemirror/addon/runmode/runmode.js');
require('codemirror/addon/display/fullscreen.js');
require('../lib/grammar/tokenizer.js');

var root = module.exports = function(parent, config) {
    var rootEl = $("<div>", {
        class: 'wdqsqe'
    }).appendTo($(parent));
    config = extendConfig(config);
    var wdqsqe = extendCmInstance(CodeMirror(rootEl[0], config));
    postProcessCmElement(wdqsqe);
    return wdqsqe;
};

root.fromTextArea = function(textAreaEl, config) {
    config = extendConfig(config);
    var rootEl = $("<div>", {
        class: 'wdqsqe'
    }).insertBefore($(textAreaEl)).append($(textAreaEl));
    var wdqsqe = extendCmInstance(CodeMirror.fromTextArea(textAreaEl, config));
    postProcessCmElement(wdqsqe);
    return wdqsqe;
};

var extendConfig = function(config) {
    var extendedConfig = $.extend(true, {}, root.defaults, config);
    return extendedConfig;
};

var extendCmInstance = function(wdqsqe) {

};

var postProcessCmElement = function(wdqsqe) {
    /**
     * Set doc value
     */
    var storageId = utils.getPersistencyId(wdqsqe, wdqsqe.options.persistent);
    if (storageId) {
        var valueFromStorage = yutils.storage.get(storageId);
        if (valueFromStorage)
            wdqsqe.setValue(valueFromStorage);
    }

    root.drawButtons(wdqsqe);

    /**
     * Add event handlers
     */
    wdqsqe.on('blur', function(wdqsqe, eventInfo) {
        root.storeQuery(wdqsqe);
    });
    wdqsqe.on('change', function(wdqsqe, eventInfo) {
        checkSyntax(wdqsqe);
        root.updateQueryButton(wdqsqe);
        root.positionButtons(wdqsqe);
    });
    wdqsqe.on('changes', function() {
        //e.g. on paste
        checkSyntax(wdqsqe);
        root.updateQueryButton(wdqsqe);
        root.positionButtons(wdqsqe);
    });

    wdqsqe.on('cursorActivity', function(wdqsqe, eventInfo) {
        updateButtonsTransparency(wdqsqe);
    });
    wdqsqe.prevQueryValid = false;
    checkSyntax(wdqsqe); // on first load, check as well (our stored or default query might be incorrect)
    root.positionButtons(wdqsqe);

    $(wdqsqe.getWrapperElement()).on('mouseenter', '.cm-atom', function() {
        var matchText = $(this).text();
        $(wdqsqe.getWrapperElement()).find('.cm-atom').filter(function() {
            return $(this).text() === matchText;
        }).addClass('matchingVar');
    }).on('mouseleave', '.cm-atom', function() {
        $(wdqsqe.getWrapperElement()).find('.matchingVar').removeClass('matchingVar');
    });
    /**
     * check url args and modify wdqsqe settings if needed
     */
    if (wdqsqe.options.consumeShareLink) {
        wdqsqe.options.consumeShareLink(wdqsqe, getUrlParams());
        //and: add a hash listener!
        window.addEventListener("hashchange", function() {
            wdqsqe.options.consumeShareLink(wdqsqe, getUrlParams());
        });
    }
    if (wdqsqe.options.collapsePrefixesOnLoad) wdqsqe.collapsePrefixes(true);
};
