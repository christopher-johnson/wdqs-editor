'use strict';

/**
 * Load libraries
 */
var $ = require("jquery"),
    CodeMirror = require("codemirror"),
    utils = require('./utils.js'),
    Storage = require('wdqs-storage'),
    Svg = require('../lib/svg.js'),
    imgs = require('./imgs.js');

require("../lib/deparam.js");
require('./prefixFold.js');
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
    //instantiate autocompleters
    wdqsqe.autocompleters = require('./autocompleters/autocompleterBase.js')(root, wdqsqe);
    if (wdqsqe.options.autocompleters) {
        wdqsqe.options.autocompleters.forEach(function(name) {
            if (root.Autocompleters[name]) wdqsqe.autocompleters.init(name, root.Autocompleters[name]);
        })
    }
    wdqsqe.lastQueryDuration = null;
    wdqsqe.getCompleteToken = function(token, cur) {
        return require('./tokenUtils.js').getCompleteToken(wdqsqe, token, cur);
    };
    wdqsqe.getPreviousNonWsToken = function(line, token) {
        return require('./tokenUtils.js').getPreviousNonWsToken(wdqsqe, line, token);
    };
    wdqsqe.getNextNonWsToken = function(lineNumber, charNumber) {
        return require('./tokenUtils.js').getNextNonWsToken(wdqsqe, lineNumber, charNumber);
    };
    wdqsqe.collapsePrefixes = function(collapse) {
        if (collapse === undefined) collapse = true;
        wdqsqe.foldCode(require('./prefixFold.js').findFirstPrefixLine(wdqsqe), root.fold.prefix, (collapse ? "fold" : "unfold"));
    };
    var backdrop = null;
    var animateSpeed = null;
    wdqsqe.setBackdrop = function(show) {


        if (wdqsqe.options.backdrop || wdqsqe.options.backdrop === 0 || wdqsqe.options.backdrop === '0') {
            if (animateSpeed === null) {
                animateSpeed = +wdqsqe.options.backdrop;
                if (animateSpeed === 1) {
                    //ah, wdqsqe.options.backdrop was 'true'. Set this to default animate speed 400
                    animateSpeed = 400;
                }
            }

            if (!backdrop) {
                backdrop = $('<div>', {
                    class: 'backdrop'
                })
                    .click(function() {
                        $(this).hide();
                    })
                    .insertAfter($(wdqsqe.getWrapperElement()));
            }
            if (show) {
                backdrop.show(animateSpeed);
            } else {
                backdrop.hide(animateSpeed);
            }
        }
    };

    /**
     * Execute query. Pass a callback function, or a configuration object (see
     * default settings below for possible values) I.e., you can change the
     * query configuration by either changing the default settings, changing the
     * settings of this document, or by passing query settings to this function
     *
     * @method doc.query
     * @param function|object
     */
    wdqsqe.query = function(callbackOrConfig) {
        root.executeQuery(wdqsqe, callbackOrConfig);
    };

    wdqsqe.getUrlArguments = function(config) {
        return root.getUrlArguments(wdqsqe, config);
    };

    /**
     * Fetch defined prefixes from query string
     *
     * @method doc.getPrefixesFromQuery
     * @return object
     */
    wdqsqe.getPrefixesFromQuery = function() {
        return require('./prefixUtils.js').getPrefixesFromQuery(wdqsqe);
    };

    wdqsqe.addPrefixes = function(prefixes) {
        return require('./prefixUtils.js').addPrefixes(wdqsqe, prefixes);
    };
    wdqsqe.removePrefixes = function(prefixes) {
        return require('./prefixUtils.js').removePrefixes(wdqsqe, prefixes);
    };

    wdqsqe.getValueWithoutComments = function() {
        var cleanedQuery = "";
        root.runMode(wdqsqe.getValue(), "sparql11", function(stringVal, className) {
            if (className != "comment") {
                cleanedQuery += stringVal;
            }
        });
        return cleanedQuery;
    };

    /**
     * Fetch the query type (e.g., SELECT||DESCRIBE||INSERT||DELETE||ASK||CONSTRUCT)
     *
     * @method doc.getQueryType
     * @return string
     *
     */
    wdqsqe.getQueryType = function() {
        return wdqsqe.queryType;
    };
    /**
     * Fetch the query mode: 'query' or 'update'
     *
     * @method doc.getQueryMode
     * @return string
     *
     */
    wdqsqe.getQueryMode = function() {
        var type = wdqsqe.getQueryType();
        if (type == "INSERT" || type == "DELETE" || type == "LOAD" || type == "CLEAR" || type == "CREATE" || type == "DROP" || type == "COPY" || type == "MOVE" || type == "ADD") {
            return "update";
        } else {
            return "query";
        }

    };

    wdqsqe.setCheckSyntaxErrors = function(isEnabled) {
        wdqsqe.options.syntaxErrorCheck = isEnabled;
        checkSyntax(wdqsqe);
    };

    wdqsqe.enableCompleter = function(name) {
        addCompleterToSettings(wdqsqe.options, name);
        if (root.Autocompleters[name]) wdqsqe.autocompleters.init(name, root.Autocompleters[name]);
    };
    wdqsqe.disableCompleter = function(name) {
        removeCompleterFromSettings(wdqsqe.options, name);
    };
    return wdqsqe;
};

var addCompleterToSettings = function(settings, name) {
    if (!settings.autocompleters) settings.autocompleters = [];
    settings.autocompleters.push(name);
};
var removeCompleterFromSettings = function(settings, name) {
    if (typeof settings.autocompleters == "object") {
        var index = $.inArray(name, settings.autocompleters);
        if (index >= 0) {
            settings.autocompleters.splice(index, 1);
            removeCompleterFromSettings(settings, name); //just in case. suppose 1 completer is listed twice
        }
    }
};

var postProcessCmElement = function(wdqsqe) {
    /**
     * Set doc value
     */
    var storageId = utils.getPersistencyId(wdqsqe, wdqsqe.options.persistent);
    if (storageId) {
        var valueFromStorage = Storage.storage.get(storageId);
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

/**
 * get url params. first try fetching using hash. If it fails, try the regular query parameters (for backwards compatability)
 */
var getUrlParams = function() {
    //first try hash
    var urlParams = null;
    if (window.location.hash.length > 1) {
        //firefox does some decoding if we're using window.location.hash (e.g. the + sign in contentType settings)
        //Don't want this. So simply get the hash string ourselves
        urlParams = $.deparam(location.href.split("#")[1])
    }
    if ((!urlParams || !('query' in urlParams)) && window.location.search.length > 1) {
        //ok, then just try regular url params
        urlParams = $.deparam(window.location.search.substring(1));
    }
    return urlParams;
};



/**
 * Update transparency of buttons. Increase transparency when cursor is below buttons
 */

var updateButtonsTransparency = function(wdqsqe) {
    wdqsqe.cursor = $(".CodeMirror-cursor");
    if (wdqsqe.buttons && wdqsqe.buttons.is(":visible") && wdqsqe.cursor.length > 0) {
        if (utils.elementsOverlap(wdqsqe.cursor, wdqsqe.buttons)) {
            wdqsqe.buttons.find("svg").attr("opacity", "0.2");
        } else {
            wdqsqe.buttons.find("svg").attr("opacity", "1.0");
        }
    }
};

var clearError = null;
var checkSyntax = function(wdqsqe, deepcheck) {

    wdqsqe.queryValid = true;

    wdqsqe.clearGutter("gutterErrorBar");

    var state = null;
    for (var l = 0; l < wdqsqe.lineCount(); ++l) {
        var precise = false;
        if (!wdqsqe.prevQueryValid) {
            // we don't want cached information in this case, otherwise the
            // previous error sign might still show up,
            // even though the syntax error might be gone already
            precise = true;
        }

        var token = wdqsqe.getTokenAt({
            line: l,
            ch: wdqsqe.getLine(l).length
        }, precise);
        var state = token.state;
        wdqsqe.queryType = state.queryType;
        if (state.OK == false) {
            if (!wdqsqe.options.syntaxErrorCheck) {
                //the library we use already marks everything as being an error. Overwrite this class attribute.
                $(wdqsqe.getWrapperElement).find(".sp-error").css("color", "black");
                //we don't want to gutter error, so return
                return;
            }

            var warningEl = Svg.getElement(imgs.warning);
            if (state.possibleCurrent && state.possibleCurrent.length > 0) {
                //				warningEl.style.zIndex = "99999999";
                require('./tooltip')(wdqsqe, warningEl, function() {
                    var expectedEncoded = [];
                    state.possibleCurrent.forEach(function(expected) {
                        expectedEncoded.push("<strong style='text-decoration:underline'>" + $("<div/>").text(expected).html() + "</strong>");
                    });
                    return "This line is invalid. Expected: " + expectedEncoded.join(", ");
                });
            }
            warningEl.style.marginTop = "2px";
            warningEl.style.marginLeft = "2px";
            warningEl.className = 'parseErrorIcon';
            wdqsqe.setGutterMarker(l, "gutterErrorBar", warningEl);

            wdqsqe.queryValid = false;
            break;
        }
    }
    wdqsqe.prevQueryValid = wdqsqe.queryValid;
    if (deepcheck) {
        if (state != null && state.stack != undefined) {
            var stack = state.stack,
                len = state.stack.length;
            // Because incremental parser doesn't receive end-of-input
            // it can't clear stack, so we have to check that whatever
            // is left on the stack is nillable
            if (len > 1)
                wdqsqe.queryValid = false;
            else if (len == 1) {
                if (stack[0] != "solutionModifier" && stack[0] != "?limitOffsetClauses" && stack[0] != "?offsetClause")
                    wdqsqe.queryValid = false;
            }
        }
    }
};
/**
 * Static Utils
 */
// first take all CodeMirror references and store them in the YASQE object
$.extend(root, CodeMirror);


//add registrar for autocompleters
root.Autocompleters = {};
root.registerAutocompleter = function(name, constructor) {
    root.Autocompleters[name] = constructor;
    addCompleterToSettings(root.defaults, name);
}

root.autoComplete = function(wdqsqe) {
    //this function gets called when pressing the keyboard shortcut. I.e., autoShow = false
    wdqsqe.autocompleters.autoComplete(false);
};
//include the autocompleters we provide out-of-the-box
root.registerAutocompleter("prefixes", require("./autocompleters/prefixes.js"));
root.registerAutocompleter("properties", require("./autocompleters/properties.js"));
root.registerAutocompleter("classes", require("./autocompleters/classes.js"));
root.registerAutocompleter("variables", require("./autocompleters/variables.js"));


root.positionButtons = function(wdqsqe) {
    var scrollBar = $(wdqsqe.getWrapperElement()).find(".CodeMirror-vscrollbar");
    var offset = 0;
    if (scrollBar.is(":visible")) {
        offset = scrollBar.outerWidth();
    }
    if (wdqsqe.buttons.is(":visible")) wdqsqe.buttons.css("right", offset + 4);
};

/**
 * Create a share link
 *
 * @method YASQE.createShareLink
 * @param {doc} YASQE document
 * @default {query: doc.getValue()}
 * @return object
 */
root.createShareLink = function(wdqsqe) {
    //extend existing link, so first fetch current arguments
    var urlParams = {};
    if (window.location.hash.length > 1) urlParams = $.deparam(window.location.hash.substring(1));
    urlParams['query'] = wdqsqe.getValue();
    return urlParams;
};
root.getAsCurl = function(wdqsqe, ajaxConfig) {
    var curl = require('./curl.js');
    return curl.createCurlString(wdqsqe, ajaxConfig);
};
/**
 * Consume the share link, by parsing the document URL for possible wdqsqe arguments, and setting the appropriate values in the YASQE doc
 *
 * @method YASQE.consumeShareLink
 * @param {doc} YASQE document
 */
root.consumeShareLink = function(wdqsqe, urlParams) {
    if (urlParams && urlParams.query) {
        wdqsqe.setValue(urlParams.query);
    }
};
root.drawButtons = function(wdqsqe) {
    wdqsqe.buttons = $("<div class='wdqsqe_buttons'></div>").appendTo($(wdqsqe.getWrapperElement()));

    /**
     * draw share link button
     */
    if (wdqsqe.options.createShareLink) {
        var svgShare = $(Svg.getElement(imgs.share));
        svgShare.click(function(event) {
                event.stopPropagation();
                var popup = $("<div class='wdqsqe_sharePopup'></div>").appendTo(wdqsqe.buttons);
                $('html').click(function() {
                    if (popup) popup.remove();
                });

                popup.click(function(event) {
                    event.stopPropagation();
                });
                var $input = $("<input>").val(location.protocol + '//' + location.host + location.pathname + location.search + "#" + $.param(wdqsqe.options.createShareLink(wdqsqe)));

                $input.focus(function() {
                    var $this = $(this);
                    $this.select();

                    // Work around Chrome's little problem
                    $this.mouseup(function() {
                        // Prevent further mouseup intervention
                        $this.unbind("mouseup");
                        return false;
                    });
                });

                popup.empty().append($('<div>', {class:'inputWrapper'}).append($input));
                if (wdqsqe.options.createShortLink) {
                    popup.addClass('enableShort');
                    $('<button>Shorten</button>')
                        .addClass('wdqsqe_btn wdqsqe_btn-sm wdqsqe_btn-primary')
                        .click(function() {
                            $(this).parent().find('button').attr('disabled', 'disabled');
                            wdqsqe.options.createShortLink($input.val(), function(errString, shortLink) {
                                if (errString) {
                                    $input.remove();
                                    popup.find('.inputWrapper').append($('<span>', {class:"shortlinkErr"}).text(errString));
                                } else {
                                    $input.val(shortLink).focus();
                                }
                            })
                        }).appendTo(popup);
                }
                $('<button>CURL</button>')
                    .addClass('wdqsqe_btn wdqsqe_btn-sm wdqsqe_btn-primary')
                    .click(function() {

                        $(this).parent().find('button').attr('disabled', 'disabled');
                        $input.val(root.getAsCurl(wdqsqe)).focus();
                    }).appendTo(popup);
                var positions = svgShare.position();
                popup.css("top", (positions.top + svgShare.outerHeight() + parseInt(popup.css('padding-top')) ) + "px").css("left", ((positions.left + svgShare.outerWidth()) - popup.outerWidth()) + "px");
                $input.focus();
            })
            .addClass("wdqsqe_share")
            .attr("title", "Share your query")
            .appendTo(wdqsqe.buttons);

    }


    /**
     * draw fullscreen button
     */

    var toggleFullscreen = $('<div>', {
        class: 'fullscreenToggleBtns'
    })
        .append($(Svg.getElement(imgs.fullscreen))
            .addClass("wdqsqe_fullscreenBtn")
            .attr("title", "Set editor full screen")
            .click(function() {
                wdqsqe.setOption("fullScreen", true);
            }))
        .append($(Svg.getElement(imgs.smallscreen))
            .addClass("wdqsqe_smallscreenBtn")
            .attr("title", "Set editor to normale size")
            .click(function() {
                wdqsqe.setOption("fullScreen", false);
            }))
    wdqsqe.buttons.append(toggleFullscreen);


    if (wdqsqe.options.sparql.showQueryButton) {
        $("<div>", {
            class: 'wdqsqe_queryButton'
        })
            .click(function() {
                if ($(this).hasClass("query_busy")) {
                    if (wdqsqe.xhr) wdqsqe.xhr.abort();
                    root.updateQueryButton(wdqsqe);
                } else {
                    wdqsqe.query();
                }
            })
            .appendTo(wdqsqe.buttons);
        root.updateQueryButton(wdqsqe);
    }

};


var queryButtonIds = {
    "busy": "loader",
    "valid": "query",
    "error": "queryInvalid"
};

/**
 * Update the query button depending on current query status. If no query status is passed via the parameter, it auto-detects the current query status
 *
 * @param {doc} YASQE document
 * @param status {string|null, "busy"|"valid"|"error"}
 */
root.updateQueryButton = function(wdqsqe, status) {
    var queryButton = $(wdqsqe.getWrapperElement()).find(".wdqsqe_queryButton");
    if (queryButton.length == 0) return; //no query button drawn

    //detect status
    if (!status) {
        status = "valid";
        if (wdqsqe.queryValid === false) status = "error";
    }

    if (status != wdqsqe.queryStatus) {
        queryButton
            .empty()
            .removeClass(function(index, classNames) {
                return classNames.split(" ").filter(function(c) {
                    //remove classname from previous status
                    return c.indexOf("query_") == 0;
                }).join(" ");
            });

        if (status == "busy") {
            queryButton.append($('<div>', {
                class: 'loader',
            }));
            wdqsqe.queryStatus = status;
        } else if (status == "valid" || status == "error") {
            queryButton.addClass("query_" + status);
            Svg.draw(queryButton, imgs[queryButtonIds[status]]);
            wdqsqe.queryStatus = status;
        }
    }
};

root.storeQuery = function(wdqsqe) {
    var storageId = utils.getPersistencyId(wdqsqe, wdqsqe.options.persistent);
    if (storageId) {
        yutils.storage.set(storageId, wdqsqe.getValue(), "month");
    }
};
root.commentLines = function(wdqsqe) {
    var startLine = wdqsqe.getCursor(true).line;
    var endLine = wdqsqe.getCursor(false).line;
    var min = Math.min(startLine, endLine);
    var max = Math.max(startLine, endLine);

    // if all lines start with #, remove this char. Otherwise add this char
    var linesAreCommented = true;
    for (var i = min; i <= max; i++) {
        var line = wdqsqe.getLine(i);
        if (line.length == 0 || line.substring(0, 1) != "#") {
            linesAreCommented = false;
            break;
        }
    }
    for (var i = min; i <= max; i++) {
        if (linesAreCommented) {
            // lines are commented, so remove comments
            wdqsqe.replaceRange("", {
                line: i,
                ch: 0
            }, {
                line: i,
                ch: 1
            });
        } else {
            // Not all lines are commented, so add comments
            wdqsqe.replaceRange("#", {
                line: i,
                ch: 0
            });
        }

    }
};

root.copyLineUp = function(wdqsqe) {
    var cursor = wdqsqe.getCursor();
    var lineCount = wdqsqe.lineCount();
    // First create new empty line at end of text
    wdqsqe.replaceRange("\n", {
        line: lineCount - 1,
        ch: wdqsqe.getLine(lineCount - 1).length
    });
    // Copy all lines to their next line
    for (var i = lineCount; i > cursor.line; i--) {
        var line = wdqsqe.getLine(i - 1);
        wdqsqe.replaceRange(line, {
            line: i,
            ch: 0
        }, {
            line: i,
            ch: wdqsqe.getLine(i).length
        });
    }
};
root.copyLineDown = function(wdqsqe) {
    root.copyLineUp(wdqsqe);
    // Make sure cursor goes one down (we are copying downwards)
    var cursor = wdqsqe.getCursor();
    cursor.line++;
    wdqsqe.setCursor(cursor);
};
root.doAutoFormat = function(wdqsqe) {
    if (wdqsqe.somethingSelected()) {
        var to = {
            line: wdqsqe.getCursor(false).line,
            ch: wdqsqe.getSelection().length
        };
        autoFormatRange(wdqsqe, wdqsqe.getCursor(true), to);
    } else {
        var totalLines = wdqsqe.lineCount();
        var totalChars = wdqsqe.getTextArea().value.length;
        autoFormatRange(wdqsqe, {
            line: 0,
            ch: 0
        }, {
            line: totalLines,
            ch: totalChars
        });
    }

};


var autoFormatRange = function(wdqsqe, from, to) {
    var absStart = wdqsqe.indexFromPos(from);
    var absEnd = wdqsqe.indexFromPos(to);
    // Insert additional line breaks where necessary according to the
    // mode's syntax
    var res = autoFormatLineBreaks(wdqsqe.getValue(), absStart, absEnd);

    // Replace and auto-indent the range
    wdqsqe.operation(function() {
        wdqsqe.replaceRange(res, from, to);
        var startLine = wdqsqe.posFromIndex(absStart).line;
        var endLine = wdqsqe.posFromIndex(absStart + res.length).line;
        for (var i = startLine; i <= endLine; i++) {
            wdqsqe.indentLine(i, "smart");
        }
    });
};

var autoFormatLineBreaks = function(text, start, end) {
    text = text.substring(start, end);
    var breakAfterArray = [
        ["keyword", "ws", "prefixed", "ws", "uri"], // i.e. prefix declaration
        ["keyword", "ws", "uri"] // i.e. base
    ];
    var breakAfterCharacters = ["{", ".", ";"];
    var breakBeforeCharacters = ["}"];
    var getBreakType = function(stringVal, type) {
        for (var i = 0; i < breakAfterArray.length; i++) {
            if (stackTrace.valueOf().toString() == breakAfterArray[i].valueOf()
                    .toString()) {
                return 1;
            }
        }
        for (var i = 0; i < breakAfterCharacters.length; i++) {
            if (stringVal == breakAfterCharacters[i]) {
                return 1;
            }
        }
        for (var i = 0; i < breakBeforeCharacters.length; i++) {
            // don't want to issue 'breakbefore' AND 'breakafter', so check
            // current line
            if ($.trim(currentLine) != '' && stringVal == breakBeforeCharacters[i]) {
                return -1;
            }
        }
        return 0;
    };
    var formattedQuery = "";
    var currentLine = "";
    var stackTrace = [];
    CodeMirror.runMode(text, "sparql11", function(stringVal, type) {
        stackTrace.push(type);
        var breakType = getBreakType(stringVal, type);
        if (breakType != 0) {
            if (breakType == 1) {
                formattedQuery += stringVal + "\n";
                currentLine = "";
            } else { // (-1)
                formattedQuery += "\n" + stringVal;
                currentLine = stringVal;
            }
            stackTrace = [];
        } else {
            currentLine += stringVal;
            formattedQuery += stringVal;
        }
        if (stackTrace.length == 1 && stackTrace[0] == "sp-ws")
            stackTrace = [];
    });
    return $.trim(formattedQuery.replace(/\n\s*\n/g, '\n'));
};

require('./sparql.js');
require('./defaults.js');
root.$ = $;
root.version = {
    "CodeMirror": CodeMirror.version,
    "WDQSQE": require("../package.json").version,
    "jquery": $.fn.jquery,
    "wdqs-storage": Storage.version
};