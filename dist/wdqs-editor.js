!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.WDQSQE=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//this is the entry-point for browserify.
//the current browserify version does not support require-ing js files which are used as entry-point
//this way, we can still require our main.js file
module.exports = require('./index.js');
},{"./index.js":30}],2:[function(require,module,exports){
(function (global){
'use strict';
/*
  jQuery deparam is an extraction of the deparam method from Ben Alman's jQuery BBQ
  http://benalman.com/projects/jquery-bbq-plugin/
*/
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
$.deparam = function (params, coerce) {
var obj = {},
	coerce_types = { 'true': !0, 'false': !1, 'null': null };
  
// Iterate over all name=value pairs.
$.each(params.replace(/\+/g, ' ').split('&'), function (j,v) {
  var param = v.split('='),
	  key = decodeURIComponent(param[0]),
	  val,
	  cur = obj,
	  i = 0,
		
	  // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
	  // into its component parts.
	  keys = key.split(']['),
	  keys_last = keys.length - 1;
	
  // If the first keys part contains [ and the last ends with ], then []
  // are correctly balanced.
  if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
	// Remove the trailing ] from the last keys part.
	keys[keys_last] = keys[keys_last].replace(/\]$/, '');
	  
	// Split first keys part into two parts on the [ and add them back onto
	// the beginning of the keys array.
	keys = keys.shift().split('[').concat(keys);
	  
	keys_last = keys.length - 1;
  } else {
	// Basic 'foo' style key.
	keys_last = 0;
  }
	
  // Are we dealing with a name=value pair, or just a name?
  if (param.length === 2) {
	val = decodeURIComponent(param[1]);
	  
	// Coerce values.
	if (coerce) {
	  val = val && !isNaN(val)              ? +val              // number
		  : val === 'undefined'             ? undefined         // undefined
		  : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
		  : val;                                                // string
	}
	  
	if ( keys_last ) {
	  // Complex key, build deep object structure based on a few rules:
	  // * The 'cur' pointer starts at the object top-level.
	  // * [] = array push (n is set to array length), [n] = array if n is 
	  //   numeric, otherwise object.
	  // * If at the last keys part, set the value.
	  // * For each keys part, if the current level is undefined create an
	  //   object or array based on the type of the next keys part.
	  // * Move the 'cur' pointer to the next level.
	  // * Rinse & repeat.
	  for (; i <= keys_last; i++) {
		key = keys[i] === '' ? cur.length : keys[i];
		cur = cur[key] = i < keys_last
		  ? cur[key] || (keys[i+1] && isNaN(keys[i+1]) ? {} : [])
		  : val;
	  }
		
	} else {
	  // Simple key, even simpler rules, since only scalars and shallow
	  // arrays are allowed.
		
	  if ($.isArray(obj[key])) {
		// val is already an array, so push on the next value.
		obj[key].push( val );
		  
	  } else if (obj[key] !== undefined) {
		// val isn't an array, but since a second value has been specified,
		// convert val into an array.
		obj[key] = [obj[key], val];
		  
	  } else {
		// val is a scalar.
		obj[key] = val;
	  }
	}
	  
  } else if (key) {
	// No value was defined, so set something meaningful.
	obj[key] = coerce
	  ? undefined
	  : '';
  }
});
  
return obj;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kZXBhcmFtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4vKlxuICBqUXVlcnkgZGVwYXJhbSBpcyBhbiBleHRyYWN0aW9uIG9mIHRoZSBkZXBhcmFtIG1ldGhvZCBmcm9tIEJlbiBBbG1hbidzIGpRdWVyeSBCQlFcbiAgaHR0cDovL2JlbmFsbWFuLmNvbS9wcm9qZWN0cy9qcXVlcnktYmJxLXBsdWdpbi9cbiovXG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbiQuZGVwYXJhbSA9IGZ1bmN0aW9uIChwYXJhbXMsIGNvZXJjZSkge1xudmFyIG9iaiA9IHt9LFxuXHRjb2VyY2VfdHlwZXMgPSB7ICd0cnVlJzogITAsICdmYWxzZSc6ICExLCAnbnVsbCc6IG51bGwgfTtcbiAgXG4vLyBJdGVyYXRlIG92ZXIgYWxsIG5hbWU9dmFsdWUgcGFpcnMuXG4kLmVhY2gocGFyYW1zLnJlcGxhY2UoL1xcKy9nLCAnICcpLnNwbGl0KCcmJyksIGZ1bmN0aW9uIChqLHYpIHtcbiAgdmFyIHBhcmFtID0gdi5zcGxpdCgnPScpLFxuXHQgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJhbVswXSksXG5cdCAgdmFsLFxuXHQgIGN1ciA9IG9iaixcblx0ICBpID0gMCxcblx0XHRcblx0ICAvLyBJZiBrZXkgaXMgbW9yZSBjb21wbGV4IHRoYW4gJ2ZvbycsIGxpa2UgJ2FbXScgb3IgJ2FbYl1bY10nLCBzcGxpdCBpdFxuXHQgIC8vIGludG8gaXRzIGNvbXBvbmVudCBwYXJ0cy5cblx0ICBrZXlzID0ga2V5LnNwbGl0KCddWycpLFxuXHQgIGtleXNfbGFzdCA9IGtleXMubGVuZ3RoIC0gMTtcblx0XG4gIC8vIElmIHRoZSBmaXJzdCBrZXlzIHBhcnQgY29udGFpbnMgWyBhbmQgdGhlIGxhc3QgZW5kcyB3aXRoIF0sIHRoZW4gW11cbiAgLy8gYXJlIGNvcnJlY3RseSBiYWxhbmNlZC5cbiAgaWYgKC9cXFsvLnRlc3Qoa2V5c1swXSkgJiYgL1xcXSQvLnRlc3Qoa2V5c1trZXlzX2xhc3RdKSkge1xuXHQvLyBSZW1vdmUgdGhlIHRyYWlsaW5nIF0gZnJvbSB0aGUgbGFzdCBrZXlzIHBhcnQuXG5cdGtleXNba2V5c19sYXN0XSA9IGtleXNba2V5c19sYXN0XS5yZXBsYWNlKC9cXF0kLywgJycpO1xuXHQgIFxuXHQvLyBTcGxpdCBmaXJzdCBrZXlzIHBhcnQgaW50byB0d28gcGFydHMgb24gdGhlIFsgYW5kIGFkZCB0aGVtIGJhY2sgb250b1xuXHQvLyB0aGUgYmVnaW5uaW5nIG9mIHRoZSBrZXlzIGFycmF5LlxuXHRrZXlzID0ga2V5cy5zaGlmdCgpLnNwbGl0KCdbJykuY29uY2F0KGtleXMpO1xuXHQgIFxuXHRrZXlzX2xhc3QgPSBrZXlzLmxlbmd0aCAtIDE7XG4gIH0gZWxzZSB7XG5cdC8vIEJhc2ljICdmb28nIHN0eWxlIGtleS5cblx0a2V5c19sYXN0ID0gMDtcbiAgfVxuXHRcbiAgLy8gQXJlIHdlIGRlYWxpbmcgd2l0aCBhIG5hbWU9dmFsdWUgcGFpciwgb3IganVzdCBhIG5hbWU/XG4gIGlmIChwYXJhbS5sZW5ndGggPT09IDIpIHtcblx0dmFsID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtWzFdKTtcblx0ICBcblx0Ly8gQ29lcmNlIHZhbHVlcy5cblx0aWYgKGNvZXJjZSkge1xuXHQgIHZhbCA9IHZhbCAmJiAhaXNOYU4odmFsKSAgICAgICAgICAgICAgPyArdmFsICAgICAgICAgICAgICAvLyBudW1iZXJcblx0XHQgIDogdmFsID09PSAndW5kZWZpbmVkJyAgICAgICAgICAgICA/IHVuZGVmaW5lZCAgICAgICAgIC8vIHVuZGVmaW5lZFxuXHRcdCAgOiBjb2VyY2VfdHlwZXNbdmFsXSAhPT0gdW5kZWZpbmVkID8gY29lcmNlX3R5cGVzW3ZhbF0gLy8gdHJ1ZSwgZmFsc2UsIG51bGxcblx0XHQgIDogdmFsOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0cmluZ1xuXHR9XG5cdCAgXG5cdGlmICgga2V5c19sYXN0ICkge1xuXHQgIC8vIENvbXBsZXgga2V5LCBidWlsZCBkZWVwIG9iamVjdCBzdHJ1Y3R1cmUgYmFzZWQgb24gYSBmZXcgcnVsZXM6XG5cdCAgLy8gKiBUaGUgJ2N1cicgcG9pbnRlciBzdGFydHMgYXQgdGhlIG9iamVjdCB0b3AtbGV2ZWwuXG5cdCAgLy8gKiBbXSA9IGFycmF5IHB1c2ggKG4gaXMgc2V0IHRvIGFycmF5IGxlbmd0aCksIFtuXSA9IGFycmF5IGlmIG4gaXMgXG5cdCAgLy8gICBudW1lcmljLCBvdGhlcndpc2Ugb2JqZWN0LlxuXHQgIC8vICogSWYgYXQgdGhlIGxhc3Qga2V5cyBwYXJ0LCBzZXQgdGhlIHZhbHVlLlxuXHQgIC8vICogRm9yIGVhY2gga2V5cyBwYXJ0LCBpZiB0aGUgY3VycmVudCBsZXZlbCBpcyB1bmRlZmluZWQgY3JlYXRlIGFuXG5cdCAgLy8gICBvYmplY3Qgb3IgYXJyYXkgYmFzZWQgb24gdGhlIHR5cGUgb2YgdGhlIG5leHQga2V5cyBwYXJ0LlxuXHQgIC8vICogTW92ZSB0aGUgJ2N1cicgcG9pbnRlciB0byB0aGUgbmV4dCBsZXZlbC5cblx0ICAvLyAqIFJpbnNlICYgcmVwZWF0LlxuXHQgIGZvciAoOyBpIDw9IGtleXNfbGFzdDsgaSsrKSB7XG5cdFx0a2V5ID0ga2V5c1tpXSA9PT0gJycgPyBjdXIubGVuZ3RoIDoga2V5c1tpXTtcblx0XHRjdXIgPSBjdXJba2V5XSA9IGkgPCBrZXlzX2xhc3Rcblx0XHQgID8gY3VyW2tleV0gfHwgKGtleXNbaSsxXSAmJiBpc05hTihrZXlzW2krMV0pID8ge30gOiBbXSlcblx0XHQgIDogdmFsO1xuXHQgIH1cblx0XHRcblx0fSBlbHNlIHtcblx0ICAvLyBTaW1wbGUga2V5LCBldmVuIHNpbXBsZXIgcnVsZXMsIHNpbmNlIG9ubHkgc2NhbGFycyBhbmQgc2hhbGxvd1xuXHQgIC8vIGFycmF5cyBhcmUgYWxsb3dlZC5cblx0XHRcblx0ICBpZiAoJC5pc0FycmF5KG9ialtrZXldKSkge1xuXHRcdC8vIHZhbCBpcyBhbHJlYWR5IGFuIGFycmF5LCBzbyBwdXNoIG9uIHRoZSBuZXh0IHZhbHVlLlxuXHRcdG9ialtrZXldLnB1c2goIHZhbCApO1xuXHRcdCAgXG5cdCAgfSBlbHNlIGlmIChvYmpba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Ly8gdmFsIGlzbid0IGFuIGFycmF5LCBidXQgc2luY2UgYSBzZWNvbmQgdmFsdWUgaGFzIGJlZW4gc3BlY2lmaWVkLFxuXHRcdC8vIGNvbnZlcnQgdmFsIGludG8gYW4gYXJyYXkuXG5cdFx0b2JqW2tleV0gPSBbb2JqW2tleV0sIHZhbF07XG5cdFx0ICBcblx0ICB9IGVsc2Uge1xuXHRcdC8vIHZhbCBpcyBhIHNjYWxhci5cblx0XHRvYmpba2V5XSA9IHZhbDtcblx0ICB9XG5cdH1cblx0ICBcbiAgfSBlbHNlIGlmIChrZXkpIHtcblx0Ly8gTm8gdmFsdWUgd2FzIGRlZmluZWQsIHNvIHNldCBzb21ldGhpbmcgbWVhbmluZ2Z1bC5cblx0b2JqW2tleV0gPSBjb2VyY2Vcblx0ICA/IHVuZGVmaW5lZFxuXHQgIDogJyc7XG4gIH1cbn0pO1xuICBcbnJldHVybiBvYmo7XG59O1xuIl19
},{}],3:[function(require,module,exports){
module.exports = {table:
{
  "*[&&,valueLogical]" : {
     "&&": ["[&&,valueLogical]","*[&&,valueLogical]"], 
     "AS": [], 
     ")": [], 
     ",": [], 
     "||": [], 
     ";": []}, 
  "*[,,expression]" : {
     ",": ["[,,expression]","*[,,expression]"], 
     ")": []}, 
  "*[,,objectPath]" : {
     ",": ["[,,objectPath]","*[,,objectPath]"], 
     ".": [], 
     ";": [], 
     "]": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "*[,,object]" : {
     ",": ["[,,object]","*[,,object]"], 
     ".": [], 
     ";": [], 
     "]": [], 
     "}": [], 
     "GRAPH": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": []}, 
  "*[/,pathEltOrInverse]" : {
     "/": ["[/,pathEltOrInverse]","*[/,pathEltOrInverse]"], 
     "|": [], 
     ")": [], 
     "(": [], 
     "[": [], 
     "VAR1": [], 
     "VAR2": [], 
     "NIL": [], 
     "IRI_REF": [], 
     "TRUE": [], 
     "FALSE": [], 
     "BLANK_NODE_LABEL": [], 
     "ANON": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG2": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": []}, 
  "*[;,?[or([verbPath,verbSimple]),objectList]]" : {
     ";": ["[;,?[or([verbPath,verbSimple]),objectList]]","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     ".": [], 
     "]": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "*[;,?[verb,objectList]]" : {
     ";": ["[;,?[verb,objectList]]","*[;,?[verb,objectList]]"], 
     ".": [], 
     "]": [], 
     "}": [], 
     "GRAPH": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": []}, 
  "*[UNION,groupGraphPattern]" : {
     "UNION": ["[UNION,groupGraphPattern]","*[UNION,groupGraphPattern]"], 
     "VAR1": [], 
     "VAR2": [], 
     "NIL": [], 
     "(": [], 
     "[": [], 
     "IRI_REF": [], 
     "TRUE": [], 
     "FALSE": [], 
     "BLANK_NODE_LABEL": [], 
     "ANON": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG2": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     ".": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "*[graphPatternNotTriples,?.,?triplesBlock]" : {
     "{": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "OPTIONAL": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "MINUS": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "GRAPH": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "SERVICE": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "FILTER": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "BIND": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "VALUES": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "}": []}, 
  "*[quadsNotTriples,?.,?triplesTemplate]" : {
     "GRAPH": ["[quadsNotTriples,?.,?triplesTemplate]","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "}": []}, 
  "*[|,pathOneInPropertySet]" : {
     "|": ["[|,pathOneInPropertySet]","*[|,pathOneInPropertySet]"], 
     ")": []}, 
  "*[|,pathSequence]" : {
     "|": ["[|,pathSequence]","*[|,pathSequence]"], 
     ")": [], 
     "(": [], 
     "[": [], 
     "VAR1": [], 
     "VAR2": [], 
     "NIL": [], 
     "IRI_REF": [], 
     "TRUE": [], 
     "FALSE": [], 
     "BLANK_NODE_LABEL": [], 
     "ANON": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG2": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": []}, 
  "*[||,conditionalAndExpression]" : {
     "||": ["[||,conditionalAndExpression]","*[||,conditionalAndExpression]"], 
     "AS": [], 
     ")": [], 
     ",": [], 
     ";": []}, 
  "*dataBlockValue" : {
     "UNDEF": ["dataBlockValue","*dataBlockValue"], 
     "IRI_REF": ["dataBlockValue","*dataBlockValue"], 
     "TRUE": ["dataBlockValue","*dataBlockValue"], 
     "FALSE": ["dataBlockValue","*dataBlockValue"], 
     "PNAME_LN": ["dataBlockValue","*dataBlockValue"], 
     "PNAME_NS": ["dataBlockValue","*dataBlockValue"], 
     "STRING_LITERAL1": ["dataBlockValue","*dataBlockValue"], 
     "STRING_LITERAL2": ["dataBlockValue","*dataBlockValue"], 
     "STRING_LITERAL_LONG1": ["dataBlockValue","*dataBlockValue"], 
     "STRING_LITERAL_LONG2": ["dataBlockValue","*dataBlockValue"], 
     "INTEGER": ["dataBlockValue","*dataBlockValue"], 
     "DECIMAL": ["dataBlockValue","*dataBlockValue"], 
     "DOUBLE": ["dataBlockValue","*dataBlockValue"], 
     "INTEGER_POSITIVE": ["dataBlockValue","*dataBlockValue"], 
     "DECIMAL_POSITIVE": ["dataBlockValue","*dataBlockValue"], 
     "DOUBLE_POSITIVE": ["dataBlockValue","*dataBlockValue"], 
     "INTEGER_NEGATIVE": ["dataBlockValue","*dataBlockValue"], 
     "DECIMAL_NEGATIVE": ["dataBlockValue","*dataBlockValue"], 
     "DOUBLE_NEGATIVE": ["dataBlockValue","*dataBlockValue"], 
     "}": [], 
     ")": []}, 
  "*datasetClause" : {
     "FROM": ["datasetClause","*datasetClause"], 
     "WHERE": [], 
     "{": []}, 
  "*describeDatasetClause" : {
     "FROM": ["describeDatasetClause","*describeDatasetClause"], 
     "ORDER": [], 
     "HAVING": [], 
     "GROUP": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "WHERE": [], 
     "{": [], 
     "VALUES": [], 
     "$": []}, 
  "*graphNode" : {
     "(": ["graphNode","*graphNode"], 
     "[": ["graphNode","*graphNode"], 
     "VAR1": ["graphNode","*graphNode"], 
     "VAR2": ["graphNode","*graphNode"], 
     "NIL": ["graphNode","*graphNode"], 
     "IRI_REF": ["graphNode","*graphNode"], 
     "TRUE": ["graphNode","*graphNode"], 
     "FALSE": ["graphNode","*graphNode"], 
     "BLANK_NODE_LABEL": ["graphNode","*graphNode"], 
     "ANON": ["graphNode","*graphNode"], 
     "PNAME_LN": ["graphNode","*graphNode"], 
     "PNAME_NS": ["graphNode","*graphNode"], 
     "STRING_LITERAL1": ["graphNode","*graphNode"], 
     "STRING_LITERAL2": ["graphNode","*graphNode"], 
     "STRING_LITERAL_LONG1": ["graphNode","*graphNode"], 
     "STRING_LITERAL_LONG2": ["graphNode","*graphNode"], 
     "INTEGER": ["graphNode","*graphNode"], 
     "DECIMAL": ["graphNode","*graphNode"], 
     "DOUBLE": ["graphNode","*graphNode"], 
     "INTEGER_POSITIVE": ["graphNode","*graphNode"], 
     "DECIMAL_POSITIVE": ["graphNode","*graphNode"], 
     "DOUBLE_POSITIVE": ["graphNode","*graphNode"], 
     "INTEGER_NEGATIVE": ["graphNode","*graphNode"], 
     "DECIMAL_NEGATIVE": ["graphNode","*graphNode"], 
     "DOUBLE_NEGATIVE": ["graphNode","*graphNode"], 
     ")": []}, 
  "*graphNodePath" : {
     "(": ["graphNodePath","*graphNodePath"], 
     "[": ["graphNodePath","*graphNodePath"], 
     "VAR1": ["graphNodePath","*graphNodePath"], 
     "VAR2": ["graphNodePath","*graphNodePath"], 
     "NIL": ["graphNodePath","*graphNodePath"], 
     "IRI_REF": ["graphNodePath","*graphNodePath"], 
     "TRUE": ["graphNodePath","*graphNodePath"], 
     "FALSE": ["graphNodePath","*graphNodePath"], 
     "BLANK_NODE_LABEL": ["graphNodePath","*graphNodePath"], 
     "ANON": ["graphNodePath","*graphNodePath"], 
     "PNAME_LN": ["graphNodePath","*graphNodePath"], 
     "PNAME_NS": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL1": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL2": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL_LONG1": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL_LONG2": ["graphNodePath","*graphNodePath"], 
     "INTEGER": ["graphNodePath","*graphNodePath"], 
     "DECIMAL": ["graphNodePath","*graphNodePath"], 
     "DOUBLE": ["graphNodePath","*graphNodePath"], 
     "INTEGER_POSITIVE": ["graphNodePath","*graphNodePath"], 
     "DECIMAL_POSITIVE": ["graphNodePath","*graphNodePath"], 
     "DOUBLE_POSITIVE": ["graphNodePath","*graphNodePath"], 
     "INTEGER_NEGATIVE": ["graphNodePath","*graphNodePath"], 
     "DECIMAL_NEGATIVE": ["graphNodePath","*graphNodePath"], 
     "DOUBLE_NEGATIVE": ["graphNodePath","*graphNodePath"], 
     ")": []}, 
  "*groupCondition" : {
     "(": ["groupCondition","*groupCondition"], 
     "STR": ["groupCondition","*groupCondition"], 
     "LANG": ["groupCondition","*groupCondition"], 
     "LANGMATCHES": ["groupCondition","*groupCondition"], 
     "DATATYPE": ["groupCondition","*groupCondition"], 
     "BOUND": ["groupCondition","*groupCondition"], 
     "IRI": ["groupCondition","*groupCondition"], 
     "URI": ["groupCondition","*groupCondition"], 
     "BNODE": ["groupCondition","*groupCondition"], 
     "RAND": ["groupCondition","*groupCondition"], 
     "ABS": ["groupCondition","*groupCondition"], 
     "CEIL": ["groupCondition","*groupCondition"], 
     "FLOOR": ["groupCondition","*groupCondition"], 
     "ROUND": ["groupCondition","*groupCondition"], 
     "CONCAT": ["groupCondition","*groupCondition"], 
     "STRLEN": ["groupCondition","*groupCondition"], 
     "UCASE": ["groupCondition","*groupCondition"], 
     "LCASE": ["groupCondition","*groupCondition"], 
     "ENCODE_FOR_URI": ["groupCondition","*groupCondition"], 
     "CONTAINS": ["groupCondition","*groupCondition"], 
     "STRSTARTS": ["groupCondition","*groupCondition"], 
     "STRENDS": ["groupCondition","*groupCondition"], 
     "STRBEFORE": ["groupCondition","*groupCondition"], 
     "STRAFTER": ["groupCondition","*groupCondition"], 
     "YEAR": ["groupCondition","*groupCondition"], 
     "MONTH": ["groupCondition","*groupCondition"], 
     "DAY": ["groupCondition","*groupCondition"], 
     "HOURS": ["groupCondition","*groupCondition"], 
     "MINUTES": ["groupCondition","*groupCondition"], 
     "SECONDS": ["groupCondition","*groupCondition"], 
     "TIMEZONE": ["groupCondition","*groupCondition"], 
     "TZ": ["groupCondition","*groupCondition"], 
     "NOW": ["groupCondition","*groupCondition"], 
     "UUID": ["groupCondition","*groupCondition"], 
     "STRUUID": ["groupCondition","*groupCondition"], 
     "MD5": ["groupCondition","*groupCondition"], 
     "SHA1": ["groupCondition","*groupCondition"], 
     "SHA256": ["groupCondition","*groupCondition"], 
     "SHA384": ["groupCondition","*groupCondition"], 
     "SHA512": ["groupCondition","*groupCondition"], 
     "COALESCE": ["groupCondition","*groupCondition"], 
     "IF": ["groupCondition","*groupCondition"], 
     "STRLANG": ["groupCondition","*groupCondition"], 
     "STRDT": ["groupCondition","*groupCondition"], 
     "SAMETERM": ["groupCondition","*groupCondition"], 
     "ISIRI": ["groupCondition","*groupCondition"], 
     "ISURI": ["groupCondition","*groupCondition"], 
     "ISBLANK": ["groupCondition","*groupCondition"], 
     "ISLITERAL": ["groupCondition","*groupCondition"], 
     "ISNUMERIC": ["groupCondition","*groupCondition"], 
     "VAR1": ["groupCondition","*groupCondition"], 
     "VAR2": ["groupCondition","*groupCondition"], 
     "SUBSTR": ["groupCondition","*groupCondition"], 
     "REPLACE": ["groupCondition","*groupCondition"], 
     "REGEX": ["groupCondition","*groupCondition"], 
     "EXISTS": ["groupCondition","*groupCondition"], 
     "NOT": ["groupCondition","*groupCondition"], 
     "IRI_REF": ["groupCondition","*groupCondition"], 
     "PNAME_LN": ["groupCondition","*groupCondition"], 
     "PNAME_NS": ["groupCondition","*groupCondition"], 
     "VALUES": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "ORDER": [], 
     "HAVING": [], 
     "$": [], 
     "}": []}, 
  "*havingCondition" : {
     "(": ["havingCondition","*havingCondition"], 
     "STR": ["havingCondition","*havingCondition"], 
     "LANG": ["havingCondition","*havingCondition"], 
     "LANGMATCHES": ["havingCondition","*havingCondition"], 
     "DATATYPE": ["havingCondition","*havingCondition"], 
     "BOUND": ["havingCondition","*havingCondition"], 
     "IRI": ["havingCondition","*havingCondition"], 
     "URI": ["havingCondition","*havingCondition"], 
     "BNODE": ["havingCondition","*havingCondition"], 
     "RAND": ["havingCondition","*havingCondition"], 
     "ABS": ["havingCondition","*havingCondition"], 
     "CEIL": ["havingCondition","*havingCondition"], 
     "FLOOR": ["havingCondition","*havingCondition"], 
     "ROUND": ["havingCondition","*havingCondition"], 
     "CONCAT": ["havingCondition","*havingCondition"], 
     "STRLEN": ["havingCondition","*havingCondition"], 
     "UCASE": ["havingCondition","*havingCondition"], 
     "LCASE": ["havingCondition","*havingCondition"], 
     "ENCODE_FOR_URI": ["havingCondition","*havingCondition"], 
     "CONTAINS": ["havingCondition","*havingCondition"], 
     "STRSTARTS": ["havingCondition","*havingCondition"], 
     "STRENDS": ["havingCondition","*havingCondition"], 
     "STRBEFORE": ["havingCondition","*havingCondition"], 
     "STRAFTER": ["havingCondition","*havingCondition"], 
     "YEAR": ["havingCondition","*havingCondition"], 
     "MONTH": ["havingCondition","*havingCondition"], 
     "DAY": ["havingCondition","*havingCondition"], 
     "HOURS": ["havingCondition","*havingCondition"], 
     "MINUTES": ["havingCondition","*havingCondition"], 
     "SECONDS": ["havingCondition","*havingCondition"], 
     "TIMEZONE": ["havingCondition","*havingCondition"], 
     "TZ": ["havingCondition","*havingCondition"], 
     "NOW": ["havingCondition","*havingCondition"], 
     "UUID": ["havingCondition","*havingCondition"], 
     "STRUUID": ["havingCondition","*havingCondition"], 
     "MD5": ["havingCondition","*havingCondition"], 
     "SHA1": ["havingCondition","*havingCondition"], 
     "SHA256": ["havingCondition","*havingCondition"], 
     "SHA384": ["havingCondition","*havingCondition"], 
     "SHA512": ["havingCondition","*havingCondition"], 
     "COALESCE": ["havingCondition","*havingCondition"], 
     "IF": ["havingCondition","*havingCondition"], 
     "STRLANG": ["havingCondition","*havingCondition"], 
     "STRDT": ["havingCondition","*havingCondition"], 
     "SAMETERM": ["havingCondition","*havingCondition"], 
     "ISIRI": ["havingCondition","*havingCondition"], 
     "ISURI": ["havingCondition","*havingCondition"], 
     "ISBLANK": ["havingCondition","*havingCondition"], 
     "ISLITERAL": ["havingCondition","*havingCondition"], 
     "ISNUMERIC": ["havingCondition","*havingCondition"], 
     "SUBSTR": ["havingCondition","*havingCondition"], 
     "REPLACE": ["havingCondition","*havingCondition"], 
     "REGEX": ["havingCondition","*havingCondition"], 
     "EXISTS": ["havingCondition","*havingCondition"], 
     "NOT": ["havingCondition","*havingCondition"], 
     "IRI_REF": ["havingCondition","*havingCondition"], 
     "PNAME_LN": ["havingCondition","*havingCondition"], 
     "PNAME_NS": ["havingCondition","*havingCondition"], 
     "VALUES": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "ORDER": [], 
     "$": [], 
     "}": []}, 
  "*or([[ (,*dataBlockValue,)],NIL])" : {
     "(": ["or([[ (,*dataBlockValue,)],NIL])","*or([[ (,*dataBlockValue,)],NIL])"], 
     "NIL": ["or([[ (,*dataBlockValue,)],NIL])","*or([[ (,*dataBlockValue,)],NIL])"], 
     "}": []}, 
  "*or([[*,unaryExpression],[/,unaryExpression]])" : {
     "*": ["or([[*,unaryExpression],[/,unaryExpression]])","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "/": ["or([[*,unaryExpression],[/,unaryExpression]])","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "AS": [], 
     ")": [], 
     ",": [], 
     "||": [], 
     "&&": [], 
     "=": [], 
     "!=": [], 
     "<": [], 
     ">": [], 
     "<=": [], 
     ">=": [], 
     "IN": [], 
     "NOT": [], 
     "+": [], 
     "-": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     ";": []}, 
  "*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])" : {
     "+": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "-": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "INTEGER_POSITIVE": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DECIMAL_POSITIVE": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DOUBLE_POSITIVE": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "INTEGER_NEGATIVE": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DECIMAL_NEGATIVE": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DOUBLE_NEGATIVE": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "AS": [], 
     ")": [], 
     ",": [], 
     "||": [], 
     "&&": [], 
     "=": [], 
     "!=": [], 
     "<": [], 
     ">": [], 
     "<=": [], 
     ">=": [], 
     "IN": [], 
     "NOT": [], 
     ";": []}, 
  "*or([baseDecl,prefixDecl])" : {
     "BASE": ["or([baseDecl,prefixDecl])","*or([baseDecl,prefixDecl])"], 
     "PREFIX": ["or([baseDecl,prefixDecl])","*or([baseDecl,prefixDecl])"], 
     "$": [], 
     "CONSTRUCT": [], 
     "DESCRIBE": [], 
     "ASK": [], 
     "INSERT": [], 
     "DELETE": [], 
     "SELECT": [], 
     "LOAD": [], 
     "CLEAR": [], 
     "DROP": [], 
     "ADD": [], 
     "MOVE": [], 
     "COPY": [], 
     "CREATE": [], 
     "WITH": []}, 
  "*or([var,[ (,expression,AS,var,)]])" : {
     "(": ["or([var,[ (,expression,AS,var,)]])","*or([var,[ (,expression,AS,var,)]])"], 
     "VAR1": ["or([var,[ (,expression,AS,var,)]])","*or([var,[ (,expression,AS,var,)]])"], 
     "VAR2": ["or([var,[ (,expression,AS,var,)]])","*or([var,[ (,expression,AS,var,)]])"], 
     "WHERE": [], 
     "{": [], 
     "FROM": []}, 
  "*orderCondition" : {
     "ASC": ["orderCondition","*orderCondition"], 
     "DESC": ["orderCondition","*orderCondition"], 
     "VAR1": ["orderCondition","*orderCondition"], 
     "VAR2": ["orderCondition","*orderCondition"], 
     "(": ["orderCondition","*orderCondition"], 
     "STR": ["orderCondition","*orderCondition"], 
     "LANG": ["orderCondition","*orderCondition"], 
     "LANGMATCHES": ["orderCondition","*orderCondition"], 
     "DATATYPE": ["orderCondition","*orderCondition"], 
     "BOUND": ["orderCondition","*orderCondition"], 
     "IRI": ["orderCondition","*orderCondition"], 
     "URI": ["orderCondition","*orderCondition"], 
     "BNODE": ["orderCondition","*orderCondition"], 
     "RAND": ["orderCondition","*orderCondition"], 
     "ABS": ["orderCondition","*orderCondition"], 
     "CEIL": ["orderCondition","*orderCondition"], 
     "FLOOR": ["orderCondition","*orderCondition"], 
     "ROUND": ["orderCondition","*orderCondition"], 
     "CONCAT": ["orderCondition","*orderCondition"], 
     "STRLEN": ["orderCondition","*orderCondition"], 
     "UCASE": ["orderCondition","*orderCondition"], 
     "LCASE": ["orderCondition","*orderCondition"], 
     "ENCODE_FOR_URI": ["orderCondition","*orderCondition"], 
     "CONTAINS": ["orderCondition","*orderCondition"], 
     "STRSTARTS": ["orderCondition","*orderCondition"], 
     "STRENDS": ["orderCondition","*orderCondition"], 
     "STRBEFORE": ["orderCondition","*orderCondition"], 
     "STRAFTER": ["orderCondition","*orderCondition"], 
     "YEAR": ["orderCondition","*orderCondition"], 
     "MONTH": ["orderCondition","*orderCondition"], 
     "DAY": ["orderCondition","*orderCondition"], 
     "HOURS": ["orderCondition","*orderCondition"], 
     "MINUTES": ["orderCondition","*orderCondition"], 
     "SECONDS": ["orderCondition","*orderCondition"], 
     "TIMEZONE": ["orderCondition","*orderCondition"], 
     "TZ": ["orderCondition","*orderCondition"], 
     "NOW": ["orderCondition","*orderCondition"], 
     "UUID": ["orderCondition","*orderCondition"], 
     "STRUUID": ["orderCondition","*orderCondition"], 
     "MD5": ["orderCondition","*orderCondition"], 
     "SHA1": ["orderCondition","*orderCondition"], 
     "SHA256": ["orderCondition","*orderCondition"], 
     "SHA384": ["orderCondition","*orderCondition"], 
     "SHA512": ["orderCondition","*orderCondition"], 
     "COALESCE": ["orderCondition","*orderCondition"], 
     "IF": ["orderCondition","*orderCondition"], 
     "STRLANG": ["orderCondition","*orderCondition"], 
     "STRDT": ["orderCondition","*orderCondition"], 
     "SAMETERM": ["orderCondition","*orderCondition"], 
     "ISIRI": ["orderCondition","*orderCondition"], 
     "ISURI": ["orderCondition","*orderCondition"], 
     "ISBLANK": ["orderCondition","*orderCondition"], 
     "ISLITERAL": ["orderCondition","*orderCondition"], 
     "ISNUMERIC": ["orderCondition","*orderCondition"], 
     "SUBSTR": ["orderCondition","*orderCondition"], 
     "REPLACE": ["orderCondition","*orderCondition"], 
     "REGEX": ["orderCondition","*orderCondition"], 
     "EXISTS": ["orderCondition","*orderCondition"], 
     "NOT": ["orderCondition","*orderCondition"], 
     "IRI_REF": ["orderCondition","*orderCondition"], 
     "PNAME_LN": ["orderCondition","*orderCondition"], 
     "PNAME_NS": ["orderCondition","*orderCondition"], 
     "VALUES": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "$": [], 
     "}": []}, 
  "*usingClause" : {
     "USING": ["usingClause","*usingClause"], 
     "WHERE": []}, 
  "*var" : {
     "VAR1": ["var","*var"], 
     "VAR2": ["var","*var"], 
     ")": []}, 
  "*varOrIRIref" : {
     "VAR1": ["varOrIRIref","*varOrIRIref"], 
     "VAR2": ["varOrIRIref","*varOrIRIref"], 
     "IRI_REF": ["varOrIRIref","*varOrIRIref"], 
     "PNAME_LN": ["varOrIRIref","*varOrIRIref"], 
     "PNAME_NS": ["varOrIRIref","*varOrIRIref"], 
     "ORDER": [], 
     "HAVING": [], 
     "GROUP": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "WHERE": [], 
     "{": [], 
     "FROM": [], 
     "VALUES": [], 
     "$": []}, 
  "+graphNode" : {
     "(": ["graphNode","*graphNode"], 
     "[": ["graphNode","*graphNode"], 
     "VAR1": ["graphNode","*graphNode"], 
     "VAR2": ["graphNode","*graphNode"], 
     "NIL": ["graphNode","*graphNode"], 
     "IRI_REF": ["graphNode","*graphNode"], 
     "TRUE": ["graphNode","*graphNode"], 
     "FALSE": ["graphNode","*graphNode"], 
     "BLANK_NODE_LABEL": ["graphNode","*graphNode"], 
     "ANON": ["graphNode","*graphNode"], 
     "PNAME_LN": ["graphNode","*graphNode"], 
     "PNAME_NS": ["graphNode","*graphNode"], 
     "STRING_LITERAL1": ["graphNode","*graphNode"], 
     "STRING_LITERAL2": ["graphNode","*graphNode"], 
     "STRING_LITERAL_LONG1": ["graphNode","*graphNode"], 
     "STRING_LITERAL_LONG2": ["graphNode","*graphNode"], 
     "INTEGER": ["graphNode","*graphNode"], 
     "DECIMAL": ["graphNode","*graphNode"], 
     "DOUBLE": ["graphNode","*graphNode"], 
     "INTEGER_POSITIVE": ["graphNode","*graphNode"], 
     "DECIMAL_POSITIVE": ["graphNode","*graphNode"], 
     "DOUBLE_POSITIVE": ["graphNode","*graphNode"], 
     "INTEGER_NEGATIVE": ["graphNode","*graphNode"], 
     "DECIMAL_NEGATIVE": ["graphNode","*graphNode"], 
     "DOUBLE_NEGATIVE": ["graphNode","*graphNode"]}, 
  "+graphNodePath" : {
     "(": ["graphNodePath","*graphNodePath"], 
     "[": ["graphNodePath","*graphNodePath"], 
     "VAR1": ["graphNodePath","*graphNodePath"], 
     "VAR2": ["graphNodePath","*graphNodePath"], 
     "NIL": ["graphNodePath","*graphNodePath"], 
     "IRI_REF": ["graphNodePath","*graphNodePath"], 
     "TRUE": ["graphNodePath","*graphNodePath"], 
     "FALSE": ["graphNodePath","*graphNodePath"], 
     "BLANK_NODE_LABEL": ["graphNodePath","*graphNodePath"], 
     "ANON": ["graphNodePath","*graphNodePath"], 
     "PNAME_LN": ["graphNodePath","*graphNodePath"], 
     "PNAME_NS": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL1": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL2": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL_LONG1": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL_LONG2": ["graphNodePath","*graphNodePath"], 
     "INTEGER": ["graphNodePath","*graphNodePath"], 
     "DECIMAL": ["graphNodePath","*graphNodePath"], 
     "DOUBLE": ["graphNodePath","*graphNodePath"], 
     "INTEGER_POSITIVE": ["graphNodePath","*graphNodePath"], 
     "DECIMAL_POSITIVE": ["graphNodePath","*graphNodePath"], 
     "DOUBLE_POSITIVE": ["graphNodePath","*graphNodePath"], 
     "INTEGER_NEGATIVE": ["graphNodePath","*graphNodePath"], 
     "DECIMAL_NEGATIVE": ["graphNodePath","*graphNodePath"], 
     "DOUBLE_NEGATIVE": ["graphNodePath","*graphNodePath"]}, 
  "+groupCondition" : {
     "(": ["groupCondition","*groupCondition"], 
     "STR": ["groupCondition","*groupCondition"], 
     "LANG": ["groupCondition","*groupCondition"], 
     "LANGMATCHES": ["groupCondition","*groupCondition"], 
     "DATATYPE": ["groupCondition","*groupCondition"], 
     "BOUND": ["groupCondition","*groupCondition"], 
     "IRI": ["groupCondition","*groupCondition"], 
     "URI": ["groupCondition","*groupCondition"], 
     "BNODE": ["groupCondition","*groupCondition"], 
     "RAND": ["groupCondition","*groupCondition"], 
     "ABS": ["groupCondition","*groupCondition"], 
     "CEIL": ["groupCondition","*groupCondition"], 
     "FLOOR": ["groupCondition","*groupCondition"], 
     "ROUND": ["groupCondition","*groupCondition"], 
     "CONCAT": ["groupCondition","*groupCondition"], 
     "STRLEN": ["groupCondition","*groupCondition"], 
     "UCASE": ["groupCondition","*groupCondition"], 
     "LCASE": ["groupCondition","*groupCondition"], 
     "ENCODE_FOR_URI": ["groupCondition","*groupCondition"], 
     "CONTAINS": ["groupCondition","*groupCondition"], 
     "STRSTARTS": ["groupCondition","*groupCondition"], 
     "STRENDS": ["groupCondition","*groupCondition"], 
     "STRBEFORE": ["groupCondition","*groupCondition"], 
     "STRAFTER": ["groupCondition","*groupCondition"], 
     "YEAR": ["groupCondition","*groupCondition"], 
     "MONTH": ["groupCondition","*groupCondition"], 
     "DAY": ["groupCondition","*groupCondition"], 
     "HOURS": ["groupCondition","*groupCondition"], 
     "MINUTES": ["groupCondition","*groupCondition"], 
     "SECONDS": ["groupCondition","*groupCondition"], 
     "TIMEZONE": ["groupCondition","*groupCondition"], 
     "TZ": ["groupCondition","*groupCondition"], 
     "NOW": ["groupCondition","*groupCondition"], 
     "UUID": ["groupCondition","*groupCondition"], 
     "STRUUID": ["groupCondition","*groupCondition"], 
     "MD5": ["groupCondition","*groupCondition"], 
     "SHA1": ["groupCondition","*groupCondition"], 
     "SHA256": ["groupCondition","*groupCondition"], 
     "SHA384": ["groupCondition","*groupCondition"], 
     "SHA512": ["groupCondition","*groupCondition"], 
     "COALESCE": ["groupCondition","*groupCondition"], 
     "IF": ["groupCondition","*groupCondition"], 
     "STRLANG": ["groupCondition","*groupCondition"], 
     "STRDT": ["groupCondition","*groupCondition"], 
     "SAMETERM": ["groupCondition","*groupCondition"], 
     "ISIRI": ["groupCondition","*groupCondition"], 
     "ISURI": ["groupCondition","*groupCondition"], 
     "ISBLANK": ["groupCondition","*groupCondition"], 
     "ISLITERAL": ["groupCondition","*groupCondition"], 
     "ISNUMERIC": ["groupCondition","*groupCondition"], 
     "VAR1": ["groupCondition","*groupCondition"], 
     "VAR2": ["groupCondition","*groupCondition"], 
     "SUBSTR": ["groupCondition","*groupCondition"], 
     "REPLACE": ["groupCondition","*groupCondition"], 
     "REGEX": ["groupCondition","*groupCondition"], 
     "EXISTS": ["groupCondition","*groupCondition"], 
     "NOT": ["groupCondition","*groupCondition"], 
     "IRI_REF": ["groupCondition","*groupCondition"], 
     "PNAME_LN": ["groupCondition","*groupCondition"], 
     "PNAME_NS": ["groupCondition","*groupCondition"]}, 
  "+havingCondition" : {
     "(": ["havingCondition","*havingCondition"], 
     "STR": ["havingCondition","*havingCondition"], 
     "LANG": ["havingCondition","*havingCondition"], 
     "LANGMATCHES": ["havingCondition","*havingCondition"], 
     "DATATYPE": ["havingCondition","*havingCondition"], 
     "BOUND": ["havingCondition","*havingCondition"], 
     "IRI": ["havingCondition","*havingCondition"], 
     "URI": ["havingCondition","*havingCondition"], 
     "BNODE": ["havingCondition","*havingCondition"], 
     "RAND": ["havingCondition","*havingCondition"], 
     "ABS": ["havingCondition","*havingCondition"], 
     "CEIL": ["havingCondition","*havingCondition"], 
     "FLOOR": ["havingCondition","*havingCondition"], 
     "ROUND": ["havingCondition","*havingCondition"], 
     "CONCAT": ["havingCondition","*havingCondition"], 
     "STRLEN": ["havingCondition","*havingCondition"], 
     "UCASE": ["havingCondition","*havingCondition"], 
     "LCASE": ["havingCondition","*havingCondition"], 
     "ENCODE_FOR_URI": ["havingCondition","*havingCondition"], 
     "CONTAINS": ["havingCondition","*havingCondition"], 
     "STRSTARTS": ["havingCondition","*havingCondition"], 
     "STRENDS": ["havingCondition","*havingCondition"], 
     "STRBEFORE": ["havingCondition","*havingCondition"], 
     "STRAFTER": ["havingCondition","*havingCondition"], 
     "YEAR": ["havingCondition","*havingCondition"], 
     "MONTH": ["havingCondition","*havingCondition"], 
     "DAY": ["havingCondition","*havingCondition"], 
     "HOURS": ["havingCondition","*havingCondition"], 
     "MINUTES": ["havingCondition","*havingCondition"], 
     "SECONDS": ["havingCondition","*havingCondition"], 
     "TIMEZONE": ["havingCondition","*havingCondition"], 
     "TZ": ["havingCondition","*havingCondition"], 
     "NOW": ["havingCondition","*havingCondition"], 
     "UUID": ["havingCondition","*havingCondition"], 
     "STRUUID": ["havingCondition","*havingCondition"], 
     "MD5": ["havingCondition","*havingCondition"], 
     "SHA1": ["havingCondition","*havingCondition"], 
     "SHA256": ["havingCondition","*havingCondition"], 
     "SHA384": ["havingCondition","*havingCondition"], 
     "SHA512": ["havingCondition","*havingCondition"], 
     "COALESCE": ["havingCondition","*havingCondition"], 
     "IF": ["havingCondition","*havingCondition"], 
     "STRLANG": ["havingCondition","*havingCondition"], 
     "STRDT": ["havingCondition","*havingCondition"], 
     "SAMETERM": ["havingCondition","*havingCondition"], 
     "ISIRI": ["havingCondition","*havingCondition"], 
     "ISURI": ["havingCondition","*havingCondition"], 
     "ISBLANK": ["havingCondition","*havingCondition"], 
     "ISLITERAL": ["havingCondition","*havingCondition"], 
     "ISNUMERIC": ["havingCondition","*havingCondition"], 
     "SUBSTR": ["havingCondition","*havingCondition"], 
     "REPLACE": ["havingCondition","*havingCondition"], 
     "REGEX": ["havingCondition","*havingCondition"], 
     "EXISTS": ["havingCondition","*havingCondition"], 
     "NOT": ["havingCondition","*havingCondition"], 
     "IRI_REF": ["havingCondition","*havingCondition"], 
     "PNAME_LN": ["havingCondition","*havingCondition"], 
     "PNAME_NS": ["havingCondition","*havingCondition"]}, 
  "+or([var,[ (,expression,AS,var,)]])" : {
     "(": ["or([var,[ (,expression,AS,var,)]])","*or([var,[ (,expression,AS,var,)]])"], 
     "VAR1": ["or([var,[ (,expression,AS,var,)]])","*or([var,[ (,expression,AS,var,)]])"], 
     "VAR2": ["or([var,[ (,expression,AS,var,)]])","*or([var,[ (,expression,AS,var,)]])"]}, 
  "+orderCondition" : {
     "ASC": ["orderCondition","*orderCondition"], 
     "DESC": ["orderCondition","*orderCondition"], 
     "VAR1": ["orderCondition","*orderCondition"], 
     "VAR2": ["orderCondition","*orderCondition"], 
     "(": ["orderCondition","*orderCondition"], 
     "STR": ["orderCondition","*orderCondition"], 
     "LANG": ["orderCondition","*orderCondition"], 
     "LANGMATCHES": ["orderCondition","*orderCondition"], 
     "DATATYPE": ["orderCondition","*orderCondition"], 
     "BOUND": ["orderCondition","*orderCondition"], 
     "IRI": ["orderCondition","*orderCondition"], 
     "URI": ["orderCondition","*orderCondition"], 
     "BNODE": ["orderCondition","*orderCondition"], 
     "RAND": ["orderCondition","*orderCondition"], 
     "ABS": ["orderCondition","*orderCondition"], 
     "CEIL": ["orderCondition","*orderCondition"], 
     "FLOOR": ["orderCondition","*orderCondition"], 
     "ROUND": ["orderCondition","*orderCondition"], 
     "CONCAT": ["orderCondition","*orderCondition"], 
     "STRLEN": ["orderCondition","*orderCondition"], 
     "UCASE": ["orderCondition","*orderCondition"], 
     "LCASE": ["orderCondition","*orderCondition"], 
     "ENCODE_FOR_URI": ["orderCondition","*orderCondition"], 
     "CONTAINS": ["orderCondition","*orderCondition"], 
     "STRSTARTS": ["orderCondition","*orderCondition"], 
     "STRENDS": ["orderCondition","*orderCondition"], 
     "STRBEFORE": ["orderCondition","*orderCondition"], 
     "STRAFTER": ["orderCondition","*orderCondition"], 
     "YEAR": ["orderCondition","*orderCondition"], 
     "MONTH": ["orderCondition","*orderCondition"], 
     "DAY": ["orderCondition","*orderCondition"], 
     "HOURS": ["orderCondition","*orderCondition"], 
     "MINUTES": ["orderCondition","*orderCondition"], 
     "SECONDS": ["orderCondition","*orderCondition"], 
     "TIMEZONE": ["orderCondition","*orderCondition"], 
     "TZ": ["orderCondition","*orderCondition"], 
     "NOW": ["orderCondition","*orderCondition"], 
     "UUID": ["orderCondition","*orderCondition"], 
     "STRUUID": ["orderCondition","*orderCondition"], 
     "MD5": ["orderCondition","*orderCondition"], 
     "SHA1": ["orderCondition","*orderCondition"], 
     "SHA256": ["orderCondition","*orderCondition"], 
     "SHA384": ["orderCondition","*orderCondition"], 
     "SHA512": ["orderCondition","*orderCondition"], 
     "COALESCE": ["orderCondition","*orderCondition"], 
     "IF": ["orderCondition","*orderCondition"], 
     "STRLANG": ["orderCondition","*orderCondition"], 
     "STRDT": ["orderCondition","*orderCondition"], 
     "SAMETERM": ["orderCondition","*orderCondition"], 
     "ISIRI": ["orderCondition","*orderCondition"], 
     "ISURI": ["orderCondition","*orderCondition"], 
     "ISBLANK": ["orderCondition","*orderCondition"], 
     "ISLITERAL": ["orderCondition","*orderCondition"], 
     "ISNUMERIC": ["orderCondition","*orderCondition"], 
     "SUBSTR": ["orderCondition","*orderCondition"], 
     "REPLACE": ["orderCondition","*orderCondition"], 
     "REGEX": ["orderCondition","*orderCondition"], 
     "EXISTS": ["orderCondition","*orderCondition"], 
     "NOT": ["orderCondition","*orderCondition"], 
     "IRI_REF": ["orderCondition","*orderCondition"], 
     "PNAME_LN": ["orderCondition","*orderCondition"], 
     "PNAME_NS": ["orderCondition","*orderCondition"]}, 
  "+varOrIRIref" : {
     "VAR1": ["varOrIRIref","*varOrIRIref"], 
     "VAR2": ["varOrIRIref","*varOrIRIref"], 
     "IRI_REF": ["varOrIRIref","*varOrIRIref"], 
     "PNAME_LN": ["varOrIRIref","*varOrIRIref"], 
     "PNAME_NS": ["varOrIRIref","*varOrIRIref"]}, 
  "?." : {
     ".": ["."], 
     "VAR1": [], 
     "VAR2": [], 
     "NIL": [], 
     "(": [], 
     "[": [], 
     "IRI_REF": [], 
     "TRUE": [], 
     "FALSE": [], 
     "BLANK_NODE_LABEL": [], 
     "ANON": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG2": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "GRAPH": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "?DISTINCT" : {
     "DISTINCT": ["DISTINCT"], 
     "!": [], 
     "+": [], 
     "-": [], 
     "VAR1": [], 
     "VAR2": [], 
     "(": [], 
     "STR": [], 
     "LANG": [], 
     "LANGMATCHES": [], 
     "DATATYPE": [], 
     "BOUND": [], 
     "IRI": [], 
     "URI": [], 
     "BNODE": [], 
     "RAND": [], 
     "ABS": [], 
     "CEIL": [], 
     "FLOOR": [], 
     "ROUND": [], 
     "CONCAT": [], 
     "STRLEN": [], 
     "UCASE": [], 
     "LCASE": [], 
     "ENCODE_FOR_URI": [], 
     "CONTAINS": [], 
     "STRSTARTS": [], 
     "STRENDS": [], 
     "STRBEFORE": [], 
     "STRAFTER": [], 
     "YEAR": [], 
     "MONTH": [], 
     "DAY": [], 
     "HOURS": [], 
     "MINUTES": [], 
     "SECONDS": [], 
     "TIMEZONE": [], 
     "TZ": [], 
     "NOW": [], 
     "UUID": [], 
     "STRUUID": [], 
     "MD5": [], 
     "SHA1": [], 
     "SHA256": [], 
     "SHA384": [], 
     "SHA512": [], 
     "COALESCE": [], 
     "IF": [], 
     "STRLANG": [], 
     "STRDT": [], 
     "SAMETERM": [], 
     "ISIRI": [], 
     "ISURI": [], 
     "ISBLANK": [], 
     "ISLITERAL": [], 
     "ISNUMERIC": [], 
     "TRUE": [], 
     "FALSE": [], 
     "COUNT": [], 
     "SUM": [], 
     "MIN": [], 
     "MAX": [], 
     "AVG": [], 
     "SAMPLE": [], 
     "GROUP_CONCAT": [], 
     "SUBSTR": [], 
     "REPLACE": [], 
     "REGEX": [], 
     "EXISTS": [], 
     "NOT": [], 
     "IRI_REF": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG2": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "*": []}, 
  "?GRAPH" : {
     "GRAPH": ["GRAPH"], 
     "IRI_REF": [], 
     "PNAME_LN": [], 
     "PNAME_NS": []}, 
  "?SILENT" : {
     "SILENT": ["SILENT"], 
     "VAR1": [], 
     "VAR2": [], 
     "IRI_REF": [], 
     "PNAME_LN": [], 
     "PNAME_NS": []}, 
  "?SILENT_1" : {
     "SILENT": ["SILENT"], 
     "IRI_REF": [], 
     "PNAME_LN": [], 
     "PNAME_NS": []}, 
  "?SILENT_2" : {
     "SILENT": ["SILENT"], 
     "GRAPH": [], 
     "DEFAULT": [], 
     "NAMED": [], 
     "ALL": []}, 
  "?SILENT_3" : {
     "SILENT": ["SILENT"], 
     "GRAPH": []}, 
  "?SILENT_4" : {
     "SILENT": ["SILENT"], 
     "DEFAULT": [], 
     "GRAPH": [], 
     "IRI_REF": [], 
     "PNAME_LN": [], 
     "PNAME_NS": []}, 
  "?WHERE" : {
     "WHERE": ["WHERE"], 
     "{": []}, 
  "?[,,expression]" : {
     ",": ["[,,expression]"], 
     ")": []}, 
  "?[.,?constructTriples]" : {
     ".": ["[.,?constructTriples]"], 
     "}": []}, 
  "?[.,?triplesBlock]" : {
     ".": ["[.,?triplesBlock]"], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "?[.,?triplesTemplate]" : {
     ".": ["[.,?triplesTemplate]"], 
     "}": [], 
     "GRAPH": []}, 
  "?[;,SEPARATOR,=,string]" : {
     ";": ["[;,SEPARATOR,=,string]"], 
     ")": []}, 
  "?[;,update]" : {
     ";": ["[;,update]"], 
     "$": []}, 
  "?[AS,var]" : {
     "AS": ["[AS,var]"], 
     ")": []}, 
  "?[INTO,graphRef]" : {
     "INTO": ["[INTO,graphRef]"], 
     ";": [], 
     "$": []}, 
  "?[or([verbPath,verbSimple]),objectList]" : {
     "VAR1": ["[or([verbPath,verbSimple]),objectList]"], 
     "VAR2": ["[or([verbPath,verbSimple]),objectList]"], 
     "^": ["[or([verbPath,verbSimple]),objectList]"], 
     "a": ["[or([verbPath,verbSimple]),objectList]"], 
     "!": ["[or([verbPath,verbSimple]),objectList]"], 
     "(": ["[or([verbPath,verbSimple]),objectList]"], 
     "IRI_REF": ["[or([verbPath,verbSimple]),objectList]"], 
     "PNAME_LN": ["[or([verbPath,verbSimple]),objectList]"], 
     "PNAME_NS": ["[or([verbPath,verbSimple]),objectList]"], 
     ";": [], 
     ".": [], 
     "]": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "?[pathOneInPropertySet,*[|,pathOneInPropertySet]]" : {
     "a": ["[pathOneInPropertySet,*[|,pathOneInPropertySet]]"], 
     "^": ["[pathOneInPropertySet,*[|,pathOneInPropertySet]]"], 
     "IRI_REF": ["[pathOneInPropertySet,*[|,pathOneInPropertySet]]"], 
     "PNAME_LN": ["[pathOneInPropertySet,*[|,pathOneInPropertySet]]"], 
     "PNAME_NS": ["[pathOneInPropertySet,*[|,pathOneInPropertySet]]"], 
     ")": []}, 
  "?[update1,?[;,update]]" : {
     "INSERT": ["[update1,?[;,update]]"], 
     "DELETE": ["[update1,?[;,update]]"], 
     "LOAD": ["[update1,?[;,update]]"], 
     "CLEAR": ["[update1,?[;,update]]"], 
     "DROP": ["[update1,?[;,update]]"], 
     "ADD": ["[update1,?[;,update]]"], 
     "MOVE": ["[update1,?[;,update]]"], 
     "COPY": ["[update1,?[;,update]]"], 
     "CREATE": ["[update1,?[;,update]]"], 
     "WITH": ["[update1,?[;,update]]"], 
     "$": []}, 
  "?[verb,objectList]" : {
     "a": ["[verb,objectList]"], 
     "VAR1": ["[verb,objectList]"], 
     "VAR2": ["[verb,objectList]"], 
     "IRI_REF": ["[verb,objectList]"], 
     "PNAME_LN": ["[verb,objectList]"], 
     "PNAME_NS": ["[verb,objectList]"], 
     ";": [], 
     ".": [], 
     "]": [], 
     "}": [], 
     "GRAPH": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": []}, 
  "?argList" : {
     "NIL": ["argList"], 
     "(": ["argList"], 
     "AS": [], 
     ")": [], 
     ",": [], 
     "||": [], 
     "&&": [], 
     "=": [], 
     "!=": [], 
     "<": [], 
     ">": [], 
     "<=": [], 
     ">=": [], 
     "IN": [], 
     "NOT": [], 
     "+": [], 
     "-": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "*": [], 
     "/": [], 
     ";": []}, 
  "?constructTriples" : {
     "VAR1": ["constructTriples"], 
     "VAR2": ["constructTriples"], 
     "NIL": ["constructTriples"], 
     "(": ["constructTriples"], 
     "[": ["constructTriples"], 
     "IRI_REF": ["constructTriples"], 
     "TRUE": ["constructTriples"], 
     "FALSE": ["constructTriples"], 
     "BLANK_NODE_LABEL": ["constructTriples"], 
     "ANON": ["constructTriples"], 
     "PNAME_LN": ["constructTriples"], 
     "PNAME_NS": ["constructTriples"], 
     "STRING_LITERAL1": ["constructTriples"], 
     "STRING_LITERAL2": ["constructTriples"], 
     "STRING_LITERAL_LONG1": ["constructTriples"], 
     "STRING_LITERAL_LONG2": ["constructTriples"], 
     "INTEGER": ["constructTriples"], 
     "DECIMAL": ["constructTriples"], 
     "DOUBLE": ["constructTriples"], 
     "INTEGER_POSITIVE": ["constructTriples"], 
     "DECIMAL_POSITIVE": ["constructTriples"], 
     "DOUBLE_POSITIVE": ["constructTriples"], 
     "INTEGER_NEGATIVE": ["constructTriples"], 
     "DECIMAL_NEGATIVE": ["constructTriples"], 
     "DOUBLE_NEGATIVE": ["constructTriples"], 
     "}": []}, 
  "?groupClause" : {
     "GROUP": ["groupClause"], 
     "VALUES": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "ORDER": [], 
     "HAVING": [], 
     "$": [], 
     "}": []}, 
  "?havingClause" : {
     "HAVING": ["havingClause"], 
     "VALUES": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "ORDER": [], 
     "$": [], 
     "}": []}, 
  "?insertClause" : {
     "INSERT": ["insertClause"], 
     "WHERE": [], 
     "USING": []}, 
  "?limitClause" : {
     "LIMIT": ["limitClause"], 
     "VALUES": [], 
     "$": [], 
     "}": []}, 
  "?limitOffsetClauses" : {
     "LIMIT": ["limitOffsetClauses"], 
     "OFFSET": ["limitOffsetClauses"], 
     "VALUES": [], 
     "$": [], 
     "}": []}, 
  "?offsetClause" : {
     "OFFSET": ["offsetClause"], 
     "VALUES": [], 
     "$": [], 
     "}": []}, 
  "?or([DISTINCT,REDUCED])" : {
     "DISTINCT": ["or([DISTINCT,REDUCED])"], 
     "REDUCED": ["or([DISTINCT,REDUCED])"], 
     "*": [], 
     "(": [], 
     "VAR1": [], 
     "VAR2": []}, 
  "?or([LANGTAG,[^^,iriRef]])" : {
     "LANGTAG": ["or([LANGTAG,[^^,iriRef]])"], 
     "^^": ["or([LANGTAG,[^^,iriRef]])"], 
     "UNDEF": [], 
     "IRI_REF": [], 
     "TRUE": [], 
     "FALSE": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG2": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "a": [], 
     "VAR1": [], 
     "VAR2": [], 
     "^": [], 
     "!": [], 
     "(": [], 
     ".": [], 
     ";": [], 
     ",": [], 
     "AS": [], 
     ")": [], 
     "||": [], 
     "&&": [], 
     "=": [], 
     "!=": [], 
     "<": [], 
     ">": [], 
     "<=": [], 
     ">=": [], 
     "IN": [], 
     "NOT": [], 
     "+": [], 
     "-": [], 
     "*": [], 
     "/": [], 
     "}": [], 
     "[": [], 
     "NIL": [], 
     "BLANK_NODE_LABEL": [], 
     "ANON": [], 
     "]": [], 
     "GRAPH": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": []}, 
  "?or([[*,unaryExpression],[/,unaryExpression]])" : {
     "*": ["or([[*,unaryExpression],[/,unaryExpression]])"], 
     "/": ["or([[*,unaryExpression],[/,unaryExpression]])"], 
     "+": [], 
     "-": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "AS": [], 
     ")": [], 
     ",": [], 
     "||": [], 
     "&&": [], 
     "=": [], 
     "!=": [], 
     "<": [], 
     ">": [], 
     "<=": [], 
     ">=": [], 
     "IN": [], 
     "NOT": [], 
     ";": []}, 
  "?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])" : {
     "=": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "!=": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "<": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     ">": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "<=": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     ">=": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "IN": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "NOT": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "AS": [], 
     ")": [], 
     ",": [], 
     "||": [], 
     "&&": [], 
     ";": []}, 
  "?orderClause" : {
     "ORDER": ["orderClause"], 
     "VALUES": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "$": [], 
     "}": []}, 
  "?pathMod" : {
     "*": ["pathMod"], 
     "?": ["pathMod"], 
     "+": ["pathMod"], 
     "{": ["pathMod"], 
     "|": [], 
     "/": [], 
     ")": [], 
     "(": [], 
     "[": [], 
     "VAR1": [], 
     "VAR2": [], 
     "NIL": [], 
     "IRI_REF": [], 
     "TRUE": [], 
     "FALSE": [], 
     "BLANK_NODE_LABEL": [], 
     "ANON": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG2": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": []}, 
  "?triplesBlock" : {
     "VAR1": ["triplesBlock"], 
     "VAR2": ["triplesBlock"], 
     "NIL": ["triplesBlock"], 
     "(": ["triplesBlock"], 
     "[": ["triplesBlock"], 
     "IRI_REF": ["triplesBlock"], 
     "TRUE": ["triplesBlock"], 
     "FALSE": ["triplesBlock"], 
     "BLANK_NODE_LABEL": ["triplesBlock"], 
     "ANON": ["triplesBlock"], 
     "PNAME_LN": ["triplesBlock"], 
     "PNAME_NS": ["triplesBlock"], 
     "STRING_LITERAL1": ["triplesBlock"], 
     "STRING_LITERAL2": ["triplesBlock"], 
     "STRING_LITERAL_LONG1": ["triplesBlock"], 
     "STRING_LITERAL_LONG2": ["triplesBlock"], 
     "INTEGER": ["triplesBlock"], 
     "DECIMAL": ["triplesBlock"], 
     "DOUBLE": ["triplesBlock"], 
     "INTEGER_POSITIVE": ["triplesBlock"], 
     "DECIMAL_POSITIVE": ["triplesBlock"], 
     "DOUBLE_POSITIVE": ["triplesBlock"], 
     "INTEGER_NEGATIVE": ["triplesBlock"], 
     "DECIMAL_NEGATIVE": ["triplesBlock"], 
     "DOUBLE_NEGATIVE": ["triplesBlock"], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "?triplesTemplate" : {
     "VAR1": ["triplesTemplate"], 
     "VAR2": ["triplesTemplate"], 
     "NIL": ["triplesTemplate"], 
     "(": ["triplesTemplate"], 
     "[": ["triplesTemplate"], 
     "IRI_REF": ["triplesTemplate"], 
     "TRUE": ["triplesTemplate"], 
     "FALSE": ["triplesTemplate"], 
     "BLANK_NODE_LABEL": ["triplesTemplate"], 
     "ANON": ["triplesTemplate"], 
     "PNAME_LN": ["triplesTemplate"], 
     "PNAME_NS": ["triplesTemplate"], 
     "STRING_LITERAL1": ["triplesTemplate"], 
     "STRING_LITERAL2": ["triplesTemplate"], 
     "STRING_LITERAL_LONG1": ["triplesTemplate"], 
     "STRING_LITERAL_LONG2": ["triplesTemplate"], 
     "INTEGER": ["triplesTemplate"], 
     "DECIMAL": ["triplesTemplate"], 
     "DOUBLE": ["triplesTemplate"], 
     "INTEGER_POSITIVE": ["triplesTemplate"], 
     "DECIMAL_POSITIVE": ["triplesTemplate"], 
     "DOUBLE_POSITIVE": ["triplesTemplate"], 
     "INTEGER_NEGATIVE": ["triplesTemplate"], 
     "DECIMAL_NEGATIVE": ["triplesTemplate"], 
     "DOUBLE_NEGATIVE": ["triplesTemplate"], 
     "}": [], 
     "GRAPH": []}, 
  "?whereClause" : {
     "WHERE": ["whereClause"], 
     "{": ["whereClause"], 
     "ORDER": [], 
     "HAVING": [], 
     "GROUP": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "VALUES": [], 
     "$": []}, 
  "[ (,*dataBlockValue,)]" : {
     "(": ["(","*dataBlockValue",")"]}, 
  "[ (,*var,)]" : {
     "(": ["(","*var",")"]}, 
  "[ (,expression,)]" : {
     "(": ["(","expression",")"]}, 
  "[ (,expression,AS,var,)]" : {
     "(": ["(","expression","AS","var",")"]}, 
  "[!=,numericExpression]" : {
     "!=": ["!=","numericExpression"]}, 
  "[&&,valueLogical]" : {
     "&&": ["&&","valueLogical"]}, 
  "[*,unaryExpression]" : {
     "*": ["*","unaryExpression"]}, 
  "[*datasetClause,WHERE,{,?triplesTemplate,},solutionModifier]" : {
     "WHERE": ["*datasetClause","WHERE","{","?triplesTemplate","}","solutionModifier"], 
     "FROM": ["*datasetClause","WHERE","{","?triplesTemplate","}","solutionModifier"]}, 
  "[+,multiplicativeExpression]" : {
     "+": ["+","multiplicativeExpression"]}, 
  "[,,expression]" : {
     ",": [",","expression"]}, 
  "[,,integer,}]" : {
     ",": [",","integer","}"]}, 
  "[,,objectPath]" : {
     ",": [",","objectPath"]}, 
  "[,,object]" : {
     ",": [",","object"]}, 
  "[,,or([},[integer,}]])]" : {
     ",": [",","or([},[integer,}]])"]}, 
  "[-,multiplicativeExpression]" : {
     "-": ["-","multiplicativeExpression"]}, 
  "[.,?constructTriples]" : {
     ".": [".","?constructTriples"]}, 
  "[.,?triplesBlock]" : {
     ".": [".","?triplesBlock"]}, 
  "[.,?triplesTemplate]" : {
     ".": [".","?triplesTemplate"]}, 
  "[/,pathEltOrInverse]" : {
     "/": ["/","pathEltOrInverse"]}, 
  "[/,unaryExpression]" : {
     "/": ["/","unaryExpression"]}, 
  "[;,?[or([verbPath,verbSimple]),objectList]]" : {
     ";": [";","?[or([verbPath,verbSimple]),objectList]"]}, 
  "[;,?[verb,objectList]]" : {
     ";": [";","?[verb,objectList]"]}, 
  "[;,SEPARATOR,=,string]" : {
     ";": [";","SEPARATOR","=","string"]}, 
  "[;,update]" : {
     ";": [";","update"]}, 
  "[<,numericExpression]" : {
     "<": ["<","numericExpression"]}, 
  "[<=,numericExpression]" : {
     "<=": ["<=","numericExpression"]}, 
  "[=,numericExpression]" : {
     "=": ["=","numericExpression"]}, 
  "[>,numericExpression]" : {
     ">": [">","numericExpression"]}, 
  "[>=,numericExpression]" : {
     ">=": [">=","numericExpression"]}, 
  "[AS,var]" : {
     "AS": ["AS","var"]}, 
  "[IN,expressionList]" : {
     "IN": ["IN","expressionList"]}, 
  "[INTO,graphRef]" : {
     "INTO": ["INTO","graphRef"]}, 
  "[NAMED,iriRef]" : {
     "NAMED": ["NAMED","iriRef"]}, 
  "[NOT,IN,expressionList]" : {
     "NOT": ["NOT","IN","expressionList"]}, 
  "[UNION,groupGraphPattern]" : {
     "UNION": ["UNION","groupGraphPattern"]}, 
  "[^^,iriRef]" : {
     "^^": ["^^","iriRef"]}, 
  "[constructTemplate,*datasetClause,whereClause,solutionModifier]" : {
     "{": ["constructTemplate","*datasetClause","whereClause","solutionModifier"]}, 
  "[deleteClause,?insertClause]" : {
     "DELETE": ["deleteClause","?insertClause"]}, 
  "[graphPatternNotTriples,?.,?triplesBlock]" : {
     "{": ["graphPatternNotTriples","?.","?triplesBlock"], 
     "OPTIONAL": ["graphPatternNotTriples","?.","?triplesBlock"], 
     "MINUS": ["graphPatternNotTriples","?.","?triplesBlock"], 
     "GRAPH": ["graphPatternNotTriples","?.","?triplesBlock"], 
     "SERVICE": ["graphPatternNotTriples","?.","?triplesBlock"], 
     "FILTER": ["graphPatternNotTriples","?.","?triplesBlock"], 
     "BIND": ["graphPatternNotTriples","?.","?triplesBlock"], 
     "VALUES": ["graphPatternNotTriples","?.","?triplesBlock"]}, 
  "[integer,or([[,,or([},[integer,}]])],}])]" : {
     "INTEGER": ["integer","or([[,,or([},[integer,}]])],}])"]}, 
  "[integer,}]" : {
     "INTEGER": ["integer","}"]}, 
  "[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]" : {
     "INTEGER_POSITIVE": ["or([numericLiteralPositive,numericLiteralNegative])","?or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DECIMAL_POSITIVE": ["or([numericLiteralPositive,numericLiteralNegative])","?or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DOUBLE_POSITIVE": ["or([numericLiteralPositive,numericLiteralNegative])","?or([[*,unaryExpression],[/,unaryExpression]])"], 
     "INTEGER_NEGATIVE": ["or([numericLiteralPositive,numericLiteralNegative])","?or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DECIMAL_NEGATIVE": ["or([numericLiteralPositive,numericLiteralNegative])","?or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DOUBLE_NEGATIVE": ["or([numericLiteralPositive,numericLiteralNegative])","?or([[*,unaryExpression],[/,unaryExpression]])"]}, 
  "[or([verbPath,verbSimple]),objectList]" : {
     "VAR1": ["or([verbPath,verbSimple])","objectList"], 
     "VAR2": ["or([verbPath,verbSimple])","objectList"], 
     "^": ["or([verbPath,verbSimple])","objectList"], 
     "a": ["or([verbPath,verbSimple])","objectList"], 
     "!": ["or([verbPath,verbSimple])","objectList"], 
     "(": ["or([verbPath,verbSimple])","objectList"], 
     "IRI_REF": ["or([verbPath,verbSimple])","objectList"], 
     "PNAME_LN": ["or([verbPath,verbSimple])","objectList"], 
     "PNAME_NS": ["or([verbPath,verbSimple])","objectList"]}, 
  "[pathOneInPropertySet,*[|,pathOneInPropertySet]]" : {
     "a": ["pathOneInPropertySet","*[|,pathOneInPropertySet]"], 
     "^": ["pathOneInPropertySet","*[|,pathOneInPropertySet]"], 
     "IRI_REF": ["pathOneInPropertySet","*[|,pathOneInPropertySet]"], 
     "PNAME_LN": ["pathOneInPropertySet","*[|,pathOneInPropertySet]"], 
     "PNAME_NS": ["pathOneInPropertySet","*[|,pathOneInPropertySet]"]}, 
  "[quadsNotTriples,?.,?triplesTemplate]" : {
     "GRAPH": ["quadsNotTriples","?.","?triplesTemplate"]}, 
  "[update1,?[;,update]]" : {
     "INSERT": ["update1","?[;,update]"], 
     "DELETE": ["update1","?[;,update]"], 
     "LOAD": ["update1","?[;,update]"], 
     "CLEAR": ["update1","?[;,update]"], 
     "DROP": ["update1","?[;,update]"], 
     "ADD": ["update1","?[;,update]"], 
     "MOVE": ["update1","?[;,update]"], 
     "COPY": ["update1","?[;,update]"], 
     "CREATE": ["update1","?[;,update]"], 
     "WITH": ["update1","?[;,update]"]}, 
  "[verb,objectList]" : {
     "a": ["verb","objectList"], 
     "VAR1": ["verb","objectList"], 
     "VAR2": ["verb","objectList"], 
     "IRI_REF": ["verb","objectList"], 
     "PNAME_LN": ["verb","objectList"], 
     "PNAME_NS": ["verb","objectList"]}, 
  "[|,pathOneInPropertySet]" : {
     "|": ["|","pathOneInPropertySet"]}, 
  "[|,pathSequence]" : {
     "|": ["|","pathSequence"]}, 
  "[||,conditionalAndExpression]" : {
     "||": ["||","conditionalAndExpression"]}, 
  "add" : {
     "ADD": ["ADD","?SILENT_4","graphOrDefault","TO","graphOrDefault"]}, 
  "additiveExpression" : {
     "!": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "+": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "-": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "VAR1": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "VAR2": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "(": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STR": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "LANG": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "LANGMATCHES": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DATATYPE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "BOUND": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "IRI": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "URI": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "BNODE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "RAND": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ABS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "CEIL": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "FLOOR": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ROUND": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "CONCAT": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRLEN": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "UCASE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "LCASE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ENCODE_FOR_URI": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "CONTAINS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRSTARTS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRENDS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRBEFORE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRAFTER": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "YEAR": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "MONTH": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DAY": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "HOURS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "MINUTES": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SECONDS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "TIMEZONE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "TZ": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "NOW": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "UUID": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRUUID": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "MD5": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SHA1": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SHA256": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SHA384": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SHA512": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "COALESCE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "IF": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRLANG": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRDT": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SAMETERM": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ISIRI": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ISURI": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ISBLANK": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ISLITERAL": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ISNUMERIC": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "TRUE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "FALSE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "COUNT": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SUM": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "MIN": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "MAX": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "AVG": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SAMPLE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "GROUP_CONCAT": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SUBSTR": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "REPLACE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "REGEX": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "EXISTS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "NOT": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "IRI_REF": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRING_LITERAL1": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRING_LITERAL2": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRING_LITERAL_LONG1": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRING_LITERAL_LONG2": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "INTEGER": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DECIMAL": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DOUBLE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "INTEGER_POSITIVE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DECIMAL_POSITIVE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DOUBLE_POSITIVE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "INTEGER_NEGATIVE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DECIMAL_NEGATIVE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DOUBLE_NEGATIVE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "PNAME_LN": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "PNAME_NS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"]}, 
  "aggregate" : {
     "COUNT": ["COUNT","(","?DISTINCT","or([*,expression])",")"], 
     "SUM": ["SUM","(","?DISTINCT","expression",")"], 
     "MIN": ["MIN","(","?DISTINCT","expression",")"], 
     "MAX": ["MAX","(","?DISTINCT","expression",")"], 
     "AVG": ["AVG","(","?DISTINCT","expression",")"], 
     "SAMPLE": ["SAMPLE","(","?DISTINCT","expression",")"], 
     "GROUP_CONCAT": ["GROUP_CONCAT","(","?DISTINCT","expression","?[;,SEPARATOR,=,string]",")"]}, 
  "allowBnodes" : {
     "}": []}, 
  "allowVars" : {
     "}": []}, 
  "argList" : {
     "NIL": ["NIL"], 
     "(": ["(","?DISTINCT","expression","*[,,expression]",")"]}, 
  "askQuery" : {
     "ASK": ["ASK","*datasetClause","whereClause","solutionModifier"]}, 
  "baseDecl" : {
     "BASE": ["BASE","IRI_REF"]}, 
  "bind" : {
     "BIND": ["BIND","(","expression","AS","var",")"]}, 
  "blankNode" : {
     "BLANK_NODE_LABEL": ["BLANK_NODE_LABEL"], 
     "ANON": ["ANON"]}, 
  "blankNodePropertyList" : {
     "[": ["[","propertyListNotEmpty","]"]}, 
  "blankNodePropertyListPath" : {
     "[": ["[","propertyListPathNotEmpty","]"]}, 
  "booleanLiteral" : {
     "TRUE": ["TRUE"], 
     "FALSE": ["FALSE"]}, 
  "brackettedExpression" : {
     "(": ["(","expression",")"]}, 
  "builtInCall" : {
     "STR": ["STR","(","expression",")"], 
     "LANG": ["LANG","(","expression",")"], 
     "LANGMATCHES": ["LANGMATCHES","(","expression",",","expression",")"], 
     "DATATYPE": ["DATATYPE","(","expression",")"], 
     "BOUND": ["BOUND","(","var",")"], 
     "IRI": ["IRI","(","expression",")"], 
     "URI": ["URI","(","expression",")"], 
     "BNODE": ["BNODE","or([[ (,expression,)],NIL])"], 
     "RAND": ["RAND","NIL"], 
     "ABS": ["ABS","(","expression",")"], 
     "CEIL": ["CEIL","(","expression",")"], 
     "FLOOR": ["FLOOR","(","expression",")"], 
     "ROUND": ["ROUND","(","expression",")"], 
     "CONCAT": ["CONCAT","expressionList"], 
     "SUBSTR": ["substringExpression"], 
     "STRLEN": ["STRLEN","(","expression",")"], 
     "REPLACE": ["strReplaceExpression"], 
     "UCASE": ["UCASE","(","expression",")"], 
     "LCASE": ["LCASE","(","expression",")"], 
     "ENCODE_FOR_URI": ["ENCODE_FOR_URI","(","expression",")"], 
     "CONTAINS": ["CONTAINS","(","expression",",","expression",")"], 
     "STRSTARTS": ["STRSTARTS","(","expression",",","expression",")"], 
     "STRENDS": ["STRENDS","(","expression",",","expression",")"], 
     "STRBEFORE": ["STRBEFORE","(","expression",",","expression",")"], 
     "STRAFTER": ["STRAFTER","(","expression",",","expression",")"], 
     "YEAR": ["YEAR","(","expression",")"], 
     "MONTH": ["MONTH","(","expression",")"], 
     "DAY": ["DAY","(","expression",")"], 
     "HOURS": ["HOURS","(","expression",")"], 
     "MINUTES": ["MINUTES","(","expression",")"], 
     "SECONDS": ["SECONDS","(","expression",")"], 
     "TIMEZONE": ["TIMEZONE","(","expression",")"], 
     "TZ": ["TZ","(","expression",")"], 
     "NOW": ["NOW","NIL"], 
     "UUID": ["UUID","NIL"], 
     "STRUUID": ["STRUUID","NIL"], 
     "MD5": ["MD5","(","expression",")"], 
     "SHA1": ["SHA1","(","expression",")"], 
     "SHA256": ["SHA256","(","expression",")"], 
     "SHA384": ["SHA384","(","expression",")"], 
     "SHA512": ["SHA512","(","expression",")"], 
     "COALESCE": ["COALESCE","expressionList"], 
     "IF": ["IF","(","expression",",","expression",",","expression",")"], 
     "STRLANG": ["STRLANG","(","expression",",","expression",")"], 
     "STRDT": ["STRDT","(","expression",",","expression",")"], 
     "SAMETERM": ["SAMETERM","(","expression",",","expression",")"], 
     "ISIRI": ["ISIRI","(","expression",")"], 
     "ISURI": ["ISURI","(","expression",")"], 
     "ISBLANK": ["ISBLANK","(","expression",")"], 
     "ISLITERAL": ["ISLITERAL","(","expression",")"], 
     "ISNUMERIC": ["ISNUMERIC","(","expression",")"], 
     "REGEX": ["regexExpression"], 
     "EXISTS": ["existsFunc"], 
     "NOT": ["notExistsFunc"]}, 
  "clear" : {
     "CLEAR": ["CLEAR","?SILENT_2","graphRefAll"]}, 
  "collection" : {
     "(": ["(","+graphNode",")"]}, 
  "collectionPath" : {
     "(": ["(","+graphNodePath",")"]}, 
  "conditionalAndExpression" : {
     "!": ["valueLogical","*[&&,valueLogical]"], 
     "+": ["valueLogical","*[&&,valueLogical]"], 
     "-": ["valueLogical","*[&&,valueLogical]"], 
     "VAR1": ["valueLogical","*[&&,valueLogical]"], 
     "VAR2": ["valueLogical","*[&&,valueLogical]"], 
     "(": ["valueLogical","*[&&,valueLogical]"], 
     "STR": ["valueLogical","*[&&,valueLogical]"], 
     "LANG": ["valueLogical","*[&&,valueLogical]"], 
     "LANGMATCHES": ["valueLogical","*[&&,valueLogical]"], 
     "DATATYPE": ["valueLogical","*[&&,valueLogical]"], 
     "BOUND": ["valueLogical","*[&&,valueLogical]"], 
     "IRI": ["valueLogical","*[&&,valueLogical]"], 
     "URI": ["valueLogical","*[&&,valueLogical]"], 
     "BNODE": ["valueLogical","*[&&,valueLogical]"], 
     "RAND": ["valueLogical","*[&&,valueLogical]"], 
     "ABS": ["valueLogical","*[&&,valueLogical]"], 
     "CEIL": ["valueLogical","*[&&,valueLogical]"], 
     "FLOOR": ["valueLogical","*[&&,valueLogical]"], 
     "ROUND": ["valueLogical","*[&&,valueLogical]"], 
     "CONCAT": ["valueLogical","*[&&,valueLogical]"], 
     "STRLEN": ["valueLogical","*[&&,valueLogical]"], 
     "UCASE": ["valueLogical","*[&&,valueLogical]"], 
     "LCASE": ["valueLogical","*[&&,valueLogical]"], 
     "ENCODE_FOR_URI": ["valueLogical","*[&&,valueLogical]"], 
     "CONTAINS": ["valueLogical","*[&&,valueLogical]"], 
     "STRSTARTS": ["valueLogical","*[&&,valueLogical]"], 
     "STRENDS": ["valueLogical","*[&&,valueLogical]"], 
     "STRBEFORE": ["valueLogical","*[&&,valueLogical]"], 
     "STRAFTER": ["valueLogical","*[&&,valueLogical]"], 
     "YEAR": ["valueLogical","*[&&,valueLogical]"], 
     "MONTH": ["valueLogical","*[&&,valueLogical]"], 
     "DAY": ["valueLogical","*[&&,valueLogical]"], 
     "HOURS": ["valueLogical","*[&&,valueLogical]"], 
     "MINUTES": ["valueLogical","*[&&,valueLogical]"], 
     "SECONDS": ["valueLogical","*[&&,valueLogical]"], 
     "TIMEZONE": ["valueLogical","*[&&,valueLogical]"], 
     "TZ": ["valueLogical","*[&&,valueLogical]"], 
     "NOW": ["valueLogical","*[&&,valueLogical]"], 
     "UUID": ["valueLogical","*[&&,valueLogical]"], 
     "STRUUID": ["valueLogical","*[&&,valueLogical]"], 
     "MD5": ["valueLogical","*[&&,valueLogical]"], 
     "SHA1": ["valueLogical","*[&&,valueLogical]"], 
     "SHA256": ["valueLogical","*[&&,valueLogical]"], 
     "SHA384": ["valueLogical","*[&&,valueLogical]"], 
     "SHA512": ["valueLogical","*[&&,valueLogical]"], 
     "COALESCE": ["valueLogical","*[&&,valueLogical]"], 
     "IF": ["valueLogical","*[&&,valueLogical]"], 
     "STRLANG": ["valueLogical","*[&&,valueLogical]"], 
     "STRDT": ["valueLogical","*[&&,valueLogical]"], 
     "SAMETERM": ["valueLogical","*[&&,valueLogical]"], 
     "ISIRI": ["valueLogical","*[&&,valueLogical]"], 
     "ISURI": ["valueLogical","*[&&,valueLogical]"], 
     "ISBLANK": ["valueLogical","*[&&,valueLogical]"], 
     "ISLITERAL": ["valueLogical","*[&&,valueLogical]"], 
     "ISNUMERIC": ["valueLogical","*[&&,valueLogical]"], 
     "TRUE": ["valueLogical","*[&&,valueLogical]"], 
     "FALSE": ["valueLogical","*[&&,valueLogical]"], 
     "COUNT": ["valueLogical","*[&&,valueLogical]"], 
     "SUM": ["valueLogical","*[&&,valueLogical]"], 
     "MIN": ["valueLogical","*[&&,valueLogical]"], 
     "MAX": ["valueLogical","*[&&,valueLogical]"], 
     "AVG": ["valueLogical","*[&&,valueLogical]"], 
     "SAMPLE": ["valueLogical","*[&&,valueLogical]"], 
     "GROUP_CONCAT": ["valueLogical","*[&&,valueLogical]"], 
     "SUBSTR": ["valueLogical","*[&&,valueLogical]"], 
     "REPLACE": ["valueLogical","*[&&,valueLogical]"], 
     "REGEX": ["valueLogical","*[&&,valueLogical]"], 
     "EXISTS": ["valueLogical","*[&&,valueLogical]"], 
     "NOT": ["valueLogical","*[&&,valueLogical]"], 
     "IRI_REF": ["valueLogical","*[&&,valueLogical]"], 
     "STRING_LITERAL1": ["valueLogical","*[&&,valueLogical]"], 
     "STRING_LITERAL2": ["valueLogical","*[&&,valueLogical]"], 
     "STRING_LITERAL_LONG1": ["valueLogical","*[&&,valueLogical]"], 
     "STRING_LITERAL_LONG2": ["valueLogical","*[&&,valueLogical]"], 
     "INTEGER": ["valueLogical","*[&&,valueLogical]"], 
     "DECIMAL": ["valueLogical","*[&&,valueLogical]"], 
     "DOUBLE": ["valueLogical","*[&&,valueLogical]"], 
     "INTEGER_POSITIVE": ["valueLogical","*[&&,valueLogical]"], 
     "DECIMAL_POSITIVE": ["valueLogical","*[&&,valueLogical]"], 
     "DOUBLE_POSITIVE": ["valueLogical","*[&&,valueLogical]"], 
     "INTEGER_NEGATIVE": ["valueLogical","*[&&,valueLogical]"], 
     "DECIMAL_NEGATIVE": ["valueLogical","*[&&,valueLogical]"], 
     "DOUBLE_NEGATIVE": ["valueLogical","*[&&,valueLogical]"], 
     "PNAME_LN": ["valueLogical","*[&&,valueLogical]"], 
     "PNAME_NS": ["valueLogical","*[&&,valueLogical]"]}, 
  "conditionalOrExpression" : {
     "!": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "+": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "-": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "VAR1": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "VAR2": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "(": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STR": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "LANG": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "LANGMATCHES": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DATATYPE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "BOUND": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "IRI": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "URI": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "BNODE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "RAND": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ABS": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "CEIL": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "FLOOR": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ROUND": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "CONCAT": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRLEN": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "UCASE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "LCASE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ENCODE_FOR_URI": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "CONTAINS": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRSTARTS": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRENDS": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRBEFORE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRAFTER": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "YEAR": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "MONTH": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DAY": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "HOURS": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "MINUTES": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SECONDS": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "TIMEZONE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "TZ": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "NOW": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "UUID": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRUUID": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "MD5": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SHA1": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SHA256": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SHA384": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SHA512": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "COALESCE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "IF": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRLANG": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRDT": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SAMETERM": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ISIRI": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ISURI": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ISBLANK": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ISLITERAL": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ISNUMERIC": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "TRUE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "FALSE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "COUNT": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SUM": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "MIN": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "MAX": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "AVG": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SAMPLE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "GROUP_CONCAT": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SUBSTR": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "REPLACE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "REGEX": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "EXISTS": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "NOT": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "IRI_REF": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRING_LITERAL1": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRING_LITERAL2": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRING_LITERAL_LONG1": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRING_LITERAL_LONG2": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "INTEGER": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DECIMAL": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DOUBLE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "INTEGER_POSITIVE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DECIMAL_POSITIVE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DOUBLE_POSITIVE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "INTEGER_NEGATIVE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DECIMAL_NEGATIVE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DOUBLE_NEGATIVE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "PNAME_LN": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "PNAME_NS": ["conditionalAndExpression","*[||,conditionalAndExpression]"]}, 
  "constraint" : {
     "(": ["brackettedExpression"], 
     "STR": ["builtInCall"], 
     "LANG": ["builtInCall"], 
     "LANGMATCHES": ["builtInCall"], 
     "DATATYPE": ["builtInCall"], 
     "BOUND": ["builtInCall"], 
     "IRI": ["builtInCall"], 
     "URI": ["builtInCall"], 
     "BNODE": ["builtInCall"], 
     "RAND": ["builtInCall"], 
     "ABS": ["builtInCall"], 
     "CEIL": ["builtInCall"], 
     "FLOOR": ["builtInCall"], 
     "ROUND": ["builtInCall"], 
     "CONCAT": ["builtInCall"], 
     "STRLEN": ["builtInCall"], 
     "UCASE": ["builtInCall"], 
     "LCASE": ["builtInCall"], 
     "ENCODE_FOR_URI": ["builtInCall"], 
     "CONTAINS": ["builtInCall"], 
     "STRSTARTS": ["builtInCall"], 
     "STRENDS": ["builtInCall"], 
     "STRBEFORE": ["builtInCall"], 
     "STRAFTER": ["builtInCall"], 
     "YEAR": ["builtInCall"], 
     "MONTH": ["builtInCall"], 
     "DAY": ["builtInCall"], 
     "HOURS": ["builtInCall"], 
     "MINUTES": ["builtInCall"], 
     "SECONDS": ["builtInCall"], 
     "TIMEZONE": ["builtInCall"], 
     "TZ": ["builtInCall"], 
     "NOW": ["builtInCall"], 
     "UUID": ["builtInCall"], 
     "STRUUID": ["builtInCall"], 
     "MD5": ["builtInCall"], 
     "SHA1": ["builtInCall"], 
     "SHA256": ["builtInCall"], 
     "SHA384": ["builtInCall"], 
     "SHA512": ["builtInCall"], 
     "COALESCE": ["builtInCall"], 
     "IF": ["builtInCall"], 
     "STRLANG": ["builtInCall"], 
     "STRDT": ["builtInCall"], 
     "SAMETERM": ["builtInCall"], 
     "ISIRI": ["builtInCall"], 
     "ISURI": ["builtInCall"], 
     "ISBLANK": ["builtInCall"], 
     "ISLITERAL": ["builtInCall"], 
     "ISNUMERIC": ["builtInCall"], 
     "SUBSTR": ["builtInCall"], 
     "REPLACE": ["builtInCall"], 
     "REGEX": ["builtInCall"], 
     "EXISTS": ["builtInCall"], 
     "NOT": ["builtInCall"], 
     "IRI_REF": ["functionCall"], 
     "PNAME_LN": ["functionCall"], 
     "PNAME_NS": ["functionCall"]}, 
  "constructQuery" : {
     "CONSTRUCT": ["CONSTRUCT","or([[constructTemplate,*datasetClause,whereClause,solutionModifier],[*datasetClause,WHERE,{,?triplesTemplate,},solutionModifier]])"]}, 
  "constructTemplate" : {
     "{": ["{","?constructTriples","}"]}, 
  "constructTriples" : {
     "VAR1": ["triplesSameSubject","?[.,?constructTriples]"], 
     "VAR2": ["triplesSameSubject","?[.,?constructTriples]"], 
     "NIL": ["triplesSameSubject","?[.,?constructTriples]"], 
     "(": ["triplesSameSubject","?[.,?constructTriples]"], 
     "[": ["triplesSameSubject","?[.,?constructTriples]"], 
     "IRI_REF": ["triplesSameSubject","?[.,?constructTriples]"], 
     "TRUE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "FALSE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "BLANK_NODE_LABEL": ["triplesSameSubject","?[.,?constructTriples]"], 
     "ANON": ["triplesSameSubject","?[.,?constructTriples]"], 
     "PNAME_LN": ["triplesSameSubject","?[.,?constructTriples]"], 
     "PNAME_NS": ["triplesSameSubject","?[.,?constructTriples]"], 
     "STRING_LITERAL1": ["triplesSameSubject","?[.,?constructTriples]"], 
     "STRING_LITERAL2": ["triplesSameSubject","?[.,?constructTriples]"], 
     "STRING_LITERAL_LONG1": ["triplesSameSubject","?[.,?constructTriples]"], 
     "STRING_LITERAL_LONG2": ["triplesSameSubject","?[.,?constructTriples]"], 
     "INTEGER": ["triplesSameSubject","?[.,?constructTriples]"], 
     "DECIMAL": ["triplesSameSubject","?[.,?constructTriples]"], 
     "DOUBLE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "INTEGER_POSITIVE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "DECIMAL_POSITIVE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "DOUBLE_POSITIVE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "INTEGER_NEGATIVE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "DECIMAL_NEGATIVE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "DOUBLE_NEGATIVE": ["triplesSameSubject","?[.,?constructTriples]"]}, 
  "copy" : {
     "COPY": ["COPY","?SILENT_4","graphOrDefault","TO","graphOrDefault"]}, 
  "create" : {
     "CREATE": ["CREATE","?SILENT_3","graphRef"]}, 
  "dataBlock" : {
     "NIL": ["or([inlineDataOneVar,inlineDataFull])"], 
     "(": ["or([inlineDataOneVar,inlineDataFull])"], 
     "VAR1": ["or([inlineDataOneVar,inlineDataFull])"], 
     "VAR2": ["or([inlineDataOneVar,inlineDataFull])"]}, 
  "dataBlockValue" : {
     "IRI_REF": ["iriRef"], 
     "PNAME_LN": ["iriRef"], 
     "PNAME_NS": ["iriRef"], 
     "STRING_LITERAL1": ["rdfLiteral"], 
     "STRING_LITERAL2": ["rdfLiteral"], 
     "STRING_LITERAL_LONG1": ["rdfLiteral"], 
     "STRING_LITERAL_LONG2": ["rdfLiteral"], 
     "INTEGER": ["numericLiteral"], 
     "DECIMAL": ["numericLiteral"], 
     "DOUBLE": ["numericLiteral"], 
     "INTEGER_POSITIVE": ["numericLiteral"], 
     "DECIMAL_POSITIVE": ["numericLiteral"], 
     "DOUBLE_POSITIVE": ["numericLiteral"], 
     "INTEGER_NEGATIVE": ["numericLiteral"], 
     "DECIMAL_NEGATIVE": ["numericLiteral"], 
     "DOUBLE_NEGATIVE": ["numericLiteral"], 
     "TRUE": ["booleanLiteral"], 
     "FALSE": ["booleanLiteral"], 
     "UNDEF": ["UNDEF"]}, 
  "datasetClause" : {
     "FROM": ["FROM","or([defaultGraphClause,namedGraphClause])"]}, 
  "defaultGraphClause" : {
     "IRI_REF": ["sourceSelector"], 
     "PNAME_LN": ["sourceSelector"], 
     "PNAME_NS": ["sourceSelector"]}, 
  "delete1" : {
     "DATA": ["DATA","quadDataNoBnodes"], 
     "WHERE": ["WHERE","quadPatternNoBnodes"], 
     "{": ["quadPatternNoBnodes","?insertClause","*usingClause","WHERE","groupGraphPattern"]}, 
  "deleteClause" : {
     "DELETE": ["DELETE","quadPattern"]}, 
  "describeDatasetClause" : {
     "FROM": ["FROM","or([defaultGraphClause,namedGraphClause])"]}, 
  "describeQuery" : {
     "DESCRIBE": ["DESCRIBE","or([+varOrIRIref,*])","*describeDatasetClause","?whereClause","solutionModifier"]}, 
  "disallowBnodes" : {
     "}": [], 
     "GRAPH": [], 
     "VAR1": [], 
     "VAR2": [], 
     "NIL": [], 
     "(": [], 
     "[": [], 
     "IRI_REF": [], 
     "TRUE": [], 
     "FALSE": [], 
     "BLANK_NODE_LABEL": [], 
     "ANON": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG2": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": []}, 
  "disallowVars" : {
     "}": [], 
     "GRAPH": [], 
     "VAR1": [], 
     "VAR2": [], 
     "NIL": [], 
     "(": [], 
     "[": [], 
     "IRI_REF": [], 
     "TRUE": [], 
     "FALSE": [], 
     "BLANK_NODE_LABEL": [], 
     "ANON": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG2": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": []}, 
  "drop" : {
     "DROP": ["DROP","?SILENT_2","graphRefAll"]}, 
  "existsFunc" : {
     "EXISTS": ["EXISTS","groupGraphPattern"]}, 
  "expression" : {
     "!": ["conditionalOrExpression"], 
     "+": ["conditionalOrExpression"], 
     "-": ["conditionalOrExpression"], 
     "VAR1": ["conditionalOrExpression"], 
     "VAR2": ["conditionalOrExpression"], 
     "(": ["conditionalOrExpression"], 
     "STR": ["conditionalOrExpression"], 
     "LANG": ["conditionalOrExpression"], 
     "LANGMATCHES": ["conditionalOrExpression"], 
     "DATATYPE": ["conditionalOrExpression"], 
     "BOUND": ["conditionalOrExpression"], 
     "IRI": ["conditionalOrExpression"], 
     "URI": ["conditionalOrExpression"], 
     "BNODE": ["conditionalOrExpression"], 
     "RAND": ["conditionalOrExpression"], 
     "ABS": ["conditionalOrExpression"], 
     "CEIL": ["conditionalOrExpression"], 
     "FLOOR": ["conditionalOrExpression"], 
     "ROUND": ["conditionalOrExpression"], 
     "CONCAT": ["conditionalOrExpression"], 
     "STRLEN": ["conditionalOrExpression"], 
     "UCASE": ["conditionalOrExpression"], 
     "LCASE": ["conditionalOrExpression"], 
     "ENCODE_FOR_URI": ["conditionalOrExpression"], 
     "CONTAINS": ["conditionalOrExpression"], 
     "STRSTARTS": ["conditionalOrExpression"], 
     "STRENDS": ["conditionalOrExpression"], 
     "STRBEFORE": ["conditionalOrExpression"], 
     "STRAFTER": ["conditionalOrExpression"], 
     "YEAR": ["conditionalOrExpression"], 
     "MONTH": ["conditionalOrExpression"], 
     "DAY": ["conditionalOrExpression"], 
     "HOURS": ["conditionalOrExpression"], 
     "MINUTES": ["conditionalOrExpression"], 
     "SECONDS": ["conditionalOrExpression"], 
     "TIMEZONE": ["conditionalOrExpression"], 
     "TZ": ["conditionalOrExpression"], 
     "NOW": ["conditionalOrExpression"], 
     "UUID": ["conditionalOrExpression"], 
     "STRUUID": ["conditionalOrExpression"], 
     "MD5": ["conditionalOrExpression"], 
     "SHA1": ["conditionalOrExpression"], 
     "SHA256": ["conditionalOrExpression"], 
     "SHA384": ["conditionalOrExpression"], 
     "SHA512": ["conditionalOrExpression"], 
     "COALESCE": ["conditionalOrExpression"], 
     "IF": ["conditionalOrExpression"], 
     "STRLANG": ["conditionalOrExpression"], 
     "STRDT": ["conditionalOrExpression"], 
     "SAMETERM": ["conditionalOrExpression"], 
     "ISIRI": ["conditionalOrExpression"], 
     "ISURI": ["conditionalOrExpression"], 
     "ISBLANK": ["conditionalOrExpression"], 
     "ISLITERAL": ["conditionalOrExpression"], 
     "ISNUMERIC": ["conditionalOrExpression"], 
     "TRUE": ["conditionalOrExpression"], 
     "FALSE": ["conditionalOrExpression"], 
     "COUNT": ["conditionalOrExpression"], 
     "SUM": ["conditionalOrExpression"], 
     "MIN": ["conditionalOrExpression"], 
     "MAX": ["conditionalOrExpression"], 
     "AVG": ["conditionalOrExpression"], 
     "SAMPLE": ["conditionalOrExpression"], 
     "GROUP_CONCAT": ["conditionalOrExpression"], 
     "SUBSTR": ["conditionalOrExpression"], 
     "REPLACE": ["conditionalOrExpression"], 
     "REGEX": ["conditionalOrExpression"], 
     "EXISTS": ["conditionalOrExpression"], 
     "NOT": ["conditionalOrExpression"], 
     "IRI_REF": ["conditionalOrExpression"], 
     "STRING_LITERAL1": ["conditionalOrExpression"], 
     "STRING_LITERAL2": ["conditionalOrExpression"], 
     "STRING_LITERAL_LONG1": ["conditionalOrExpression"], 
     "STRING_LITERAL_LONG2": ["conditionalOrExpression"], 
     "INTEGER": ["conditionalOrExpression"], 
     "DECIMAL": ["conditionalOrExpression"], 
     "DOUBLE": ["conditionalOrExpression"], 
     "INTEGER_POSITIVE": ["conditionalOrExpression"], 
     "DECIMAL_POSITIVE": ["conditionalOrExpression"], 
     "DOUBLE_POSITIVE": ["conditionalOrExpression"], 
     "INTEGER_NEGATIVE": ["conditionalOrExpression"], 
     "DECIMAL_NEGATIVE": ["conditionalOrExpression"], 
     "DOUBLE_NEGATIVE": ["conditionalOrExpression"], 
     "PNAME_LN": ["conditionalOrExpression"], 
     "PNAME_NS": ["conditionalOrExpression"]}, 
  "expressionList" : {
     "NIL": ["NIL"], 
     "(": ["(","expression","*[,,expression]",")"]}, 
  "filter" : {
     "FILTER": ["FILTER","constraint"]}, 
  "functionCall" : {
     "IRI_REF": ["iriRef","argList"], 
     "PNAME_LN": ["iriRef","argList"], 
     "PNAME_NS": ["iriRef","argList"]}, 
  "graphGraphPattern" : {
     "GRAPH": ["GRAPH","varOrIRIref","groupGraphPattern"]}, 
  "graphNode" : {
     "VAR1": ["varOrTerm"], 
     "VAR2": ["varOrTerm"], 
     "NIL": ["varOrTerm"], 
     "IRI_REF": ["varOrTerm"], 
     "TRUE": ["varOrTerm"], 
     "FALSE": ["varOrTerm"], 
     "BLANK_NODE_LABEL": ["varOrTerm"], 
     "ANON": ["varOrTerm"], 
     "PNAME_LN": ["varOrTerm"], 
     "PNAME_NS": ["varOrTerm"], 
     "STRING_LITERAL1": ["varOrTerm"], 
     "STRING_LITERAL2": ["varOrTerm"], 
     "STRING_LITERAL_LONG1": ["varOrTerm"], 
     "STRING_LITERAL_LONG2": ["varOrTerm"], 
     "INTEGER": ["varOrTerm"], 
     "DECIMAL": ["varOrTerm"], 
     "DOUBLE": ["varOrTerm"], 
     "INTEGER_POSITIVE": ["varOrTerm"], 
     "DECIMAL_POSITIVE": ["varOrTerm"], 
     "DOUBLE_POSITIVE": ["varOrTerm"], 
     "INTEGER_NEGATIVE": ["varOrTerm"], 
     "DECIMAL_NEGATIVE": ["varOrTerm"], 
     "DOUBLE_NEGATIVE": ["varOrTerm"], 
     "(": ["triplesNode"], 
     "[": ["triplesNode"]}, 
  "graphNodePath" : {
     "VAR1": ["varOrTerm"], 
     "VAR2": ["varOrTerm"], 
     "NIL": ["varOrTerm"], 
     "IRI_REF": ["varOrTerm"], 
     "TRUE": ["varOrTerm"], 
     "FALSE": ["varOrTerm"], 
     "BLANK_NODE_LABEL": ["varOrTerm"], 
     "ANON": ["varOrTerm"], 
     "PNAME_LN": ["varOrTerm"], 
     "PNAME_NS": ["varOrTerm"], 
     "STRING_LITERAL1": ["varOrTerm"], 
     "STRING_LITERAL2": ["varOrTerm"], 
     "STRING_LITERAL_LONG1": ["varOrTerm"], 
     "STRING_LITERAL_LONG2": ["varOrTerm"], 
     "INTEGER": ["varOrTerm"], 
     "DECIMAL": ["varOrTerm"], 
     "DOUBLE": ["varOrTerm"], 
     "INTEGER_POSITIVE": ["varOrTerm"], 
     "DECIMAL_POSITIVE": ["varOrTerm"], 
     "DOUBLE_POSITIVE": ["varOrTerm"], 
     "INTEGER_NEGATIVE": ["varOrTerm"], 
     "DECIMAL_NEGATIVE": ["varOrTerm"], 
     "DOUBLE_NEGATIVE": ["varOrTerm"], 
     "(": ["triplesNodePath"], 
     "[": ["triplesNodePath"]}, 
  "graphOrDefault" : {
     "DEFAULT": ["DEFAULT"], 
     "IRI_REF": ["?GRAPH","iriRef"], 
     "PNAME_LN": ["?GRAPH","iriRef"], 
     "PNAME_NS": ["?GRAPH","iriRef"], 
     "GRAPH": ["?GRAPH","iriRef"]}, 
  "graphPatternNotTriples" : {
     "{": ["groupOrUnionGraphPattern"], 
     "OPTIONAL": ["optionalGraphPattern"], 
     "MINUS": ["minusGraphPattern"], 
     "GRAPH": ["graphGraphPattern"], 
     "SERVICE": ["serviceGraphPattern"], 
     "FILTER": ["filter"], 
     "BIND": ["bind"], 
     "VALUES": ["inlineData"]}, 
  "graphRef" : {
     "GRAPH": ["GRAPH","iriRef"]}, 
  "graphRefAll" : {
     "GRAPH": ["graphRef"], 
     "DEFAULT": ["DEFAULT"], 
     "NAMED": ["NAMED"], 
     "ALL": ["ALL"]}, 
  "graphTerm" : {
     "IRI_REF": ["iriRef"], 
     "PNAME_LN": ["iriRef"], 
     "PNAME_NS": ["iriRef"], 
     "STRING_LITERAL1": ["rdfLiteral"], 
     "STRING_LITERAL2": ["rdfLiteral"], 
     "STRING_LITERAL_LONG1": ["rdfLiteral"], 
     "STRING_LITERAL_LONG2": ["rdfLiteral"], 
     "INTEGER": ["numericLiteral"], 
     "DECIMAL": ["numericLiteral"], 
     "DOUBLE": ["numericLiteral"], 
     "INTEGER_POSITIVE": ["numericLiteral"], 
     "DECIMAL_POSITIVE": ["numericLiteral"], 
     "DOUBLE_POSITIVE": ["numericLiteral"], 
     "INTEGER_NEGATIVE": ["numericLiteral"], 
     "DECIMAL_NEGATIVE": ["numericLiteral"], 
     "DOUBLE_NEGATIVE": ["numericLiteral"], 
     "TRUE": ["booleanLiteral"], 
     "FALSE": ["booleanLiteral"], 
     "BLANK_NODE_LABEL": ["blankNode"], 
     "ANON": ["blankNode"], 
     "NIL": ["NIL"]}, 
  "groupClause" : {
     "GROUP": ["GROUP","BY","+groupCondition"]}, 
  "groupCondition" : {
     "STR": ["builtInCall"], 
     "LANG": ["builtInCall"], 
     "LANGMATCHES": ["builtInCall"], 
     "DATATYPE": ["builtInCall"], 
     "BOUND": ["builtInCall"], 
     "IRI": ["builtInCall"], 
     "URI": ["builtInCall"], 
     "BNODE": ["builtInCall"], 
     "RAND": ["builtInCall"], 
     "ABS": ["builtInCall"], 
     "CEIL": ["builtInCall"], 
     "FLOOR": ["builtInCall"], 
     "ROUND": ["builtInCall"], 
     "CONCAT": ["builtInCall"], 
     "STRLEN": ["builtInCall"], 
     "UCASE": ["builtInCall"], 
     "LCASE": ["builtInCall"], 
     "ENCODE_FOR_URI": ["builtInCall"], 
     "CONTAINS": ["builtInCall"], 
     "STRSTARTS": ["builtInCall"], 
     "STRENDS": ["builtInCall"], 
     "STRBEFORE": ["builtInCall"], 
     "STRAFTER": ["builtInCall"], 
     "YEAR": ["builtInCall"], 
     "MONTH": ["builtInCall"], 
     "DAY": ["builtInCall"], 
     "HOURS": ["builtInCall"], 
     "MINUTES": ["builtInCall"], 
     "SECONDS": ["builtInCall"], 
     "TIMEZONE": ["builtInCall"], 
     "TZ": ["builtInCall"], 
     "NOW": ["builtInCall"], 
     "UUID": ["builtInCall"], 
     "STRUUID": ["builtInCall"], 
     "MD5": ["builtInCall"], 
     "SHA1": ["builtInCall"], 
     "SHA256": ["builtInCall"], 
     "SHA384": ["builtInCall"], 
     "SHA512": ["builtInCall"], 
     "COALESCE": ["builtInCall"], 
     "IF": ["builtInCall"], 
     "STRLANG": ["builtInCall"], 
     "STRDT": ["builtInCall"], 
     "SAMETERM": ["builtInCall"], 
     "ISIRI": ["builtInCall"], 
     "ISURI": ["builtInCall"], 
     "ISBLANK": ["builtInCall"], 
     "ISLITERAL": ["builtInCall"], 
     "ISNUMERIC": ["builtInCall"], 
     "SUBSTR": ["builtInCall"], 
     "REPLACE": ["builtInCall"], 
     "REGEX": ["builtInCall"], 
     "EXISTS": ["builtInCall"], 
     "NOT": ["builtInCall"], 
     "IRI_REF": ["functionCall"], 
     "PNAME_LN": ["functionCall"], 
     "PNAME_NS": ["functionCall"], 
     "(": ["(","expression","?[AS,var]",")"], 
     "VAR1": ["var"], 
     "VAR2": ["var"]}, 
  "groupGraphPattern" : {
     "{": ["{","or([subSelect,groupGraphPatternSub])","}"]}, 
  "groupGraphPatternSub" : {
     "{": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "OPTIONAL": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "MINUS": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "GRAPH": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "SERVICE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "FILTER": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "BIND": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "VALUES": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "VAR1": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "VAR2": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "NIL": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "(": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "[": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "IRI_REF": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "TRUE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "FALSE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "BLANK_NODE_LABEL": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "ANON": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "PNAME_LN": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "PNAME_NS": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "STRING_LITERAL1": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "STRING_LITERAL2": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "STRING_LITERAL_LONG1": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "STRING_LITERAL_LONG2": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "INTEGER": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "DECIMAL": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "DOUBLE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "INTEGER_POSITIVE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "DECIMAL_POSITIVE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "DOUBLE_POSITIVE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "INTEGER_NEGATIVE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "DECIMAL_NEGATIVE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "DOUBLE_NEGATIVE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "}": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"]}, 
  "groupOrUnionGraphPattern" : {
     "{": ["groupGraphPattern","*[UNION,groupGraphPattern]"]}, 
  "havingClause" : {
     "HAVING": ["HAVING","+havingCondition"]}, 
  "havingCondition" : {
     "(": ["constraint"], 
     "STR": ["constraint"], 
     "LANG": ["constraint"], 
     "LANGMATCHES": ["constraint"], 
     "DATATYPE": ["constraint"], 
     "BOUND": ["constraint"], 
     "IRI": ["constraint"], 
     "URI": ["constraint"], 
     "BNODE": ["constraint"], 
     "RAND": ["constraint"], 
     "ABS": ["constraint"], 
     "CEIL": ["constraint"], 
     "FLOOR": ["constraint"], 
     "ROUND": ["constraint"], 
     "CONCAT": ["constraint"], 
     "STRLEN": ["constraint"], 
     "UCASE": ["constraint"], 
     "LCASE": ["constraint"], 
     "ENCODE_FOR_URI": ["constraint"], 
     "CONTAINS": ["constraint"], 
     "STRSTARTS": ["constraint"], 
     "STRENDS": ["constraint"], 
     "STRBEFORE": ["constraint"], 
     "STRAFTER": ["constraint"], 
     "YEAR": ["constraint"], 
     "MONTH": ["constraint"], 
     "DAY": ["constraint"], 
     "HOURS": ["constraint"], 
     "MINUTES": ["constraint"], 
     "SECONDS": ["constraint"], 
     "TIMEZONE": ["constraint"], 
     "TZ": ["constraint"], 
     "NOW": ["constraint"], 
     "UUID": ["constraint"], 
     "STRUUID": ["constraint"], 
     "MD5": ["constraint"], 
     "SHA1": ["constraint"], 
     "SHA256": ["constraint"], 
     "SHA384": ["constraint"], 
     "SHA512": ["constraint"], 
     "COALESCE": ["constraint"], 
     "IF": ["constraint"], 
     "STRLANG": ["constraint"], 
     "STRDT": ["constraint"], 
     "SAMETERM": ["constraint"], 
     "ISIRI": ["constraint"], 
     "ISURI": ["constraint"], 
     "ISBLANK": ["constraint"], 
     "ISLITERAL": ["constraint"], 
     "ISNUMERIC": ["constraint"], 
     "SUBSTR": ["constraint"], 
     "REPLACE": ["constraint"], 
     "REGEX": ["constraint"], 
     "EXISTS": ["constraint"], 
     "NOT": ["constraint"], 
     "IRI_REF": ["constraint"], 
     "PNAME_LN": ["constraint"], 
     "PNAME_NS": ["constraint"]}, 
  "inlineData" : {
     "VALUES": ["VALUES","dataBlock"]}, 
  "inlineDataFull" : {
     "NIL": ["or([NIL,[ (,*var,)]])","{","*or([[ (,*dataBlockValue,)],NIL])","}"], 
     "(": ["or([NIL,[ (,*var,)]])","{","*or([[ (,*dataBlockValue,)],NIL])","}"]}, 
  "inlineDataOneVar" : {
     "VAR1": ["var","{","*dataBlockValue","}"], 
     "VAR2": ["var","{","*dataBlockValue","}"]}, 
  "insert1" : {
     "DATA": ["DATA","quadData"], 
     "{": ["quadPattern","*usingClause","WHERE","groupGraphPattern"]}, 
  "insertClause" : {
     "INSERT": ["INSERT","quadPattern"]}, 
  "integer" : {
     "INTEGER": ["INTEGER"]}, 
  "iriRef" : {
     "IRI_REF": ["IRI_REF"], 
     "PNAME_LN": ["prefixedName"], 
     "PNAME_NS": ["prefixedName"]}, 
  "iriRefOrFunction" : {
     "IRI_REF": ["iriRef","?argList"], 
     "PNAME_LN": ["iriRef","?argList"], 
     "PNAME_NS": ["iriRef","?argList"]}, 
  "limitClause" : {
     "LIMIT": ["LIMIT","INTEGER"]}, 
  "limitOffsetClauses" : {
     "LIMIT": ["limitClause","?offsetClause"], 
     "OFFSET": ["offsetClause","?limitClause"]}, 
  "load" : {
     "LOAD": ["LOAD","?SILENT_1","iriRef","?[INTO,graphRef]"]}, 
  "minusGraphPattern" : {
     "MINUS": ["MINUS","groupGraphPattern"]}, 
  "modify" : {
     "WITH": ["WITH","iriRef","or([[deleteClause,?insertClause],insertClause])","*usingClause","WHERE","groupGraphPattern"]}, 
  "move" : {
     "MOVE": ["MOVE","?SILENT_4","graphOrDefault","TO","graphOrDefault"]}, 
  "multiplicativeExpression" : {
     "!": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "+": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "-": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "VAR1": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "VAR2": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "(": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STR": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "LANG": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "LANGMATCHES": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DATATYPE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "BOUND": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "IRI": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "URI": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "BNODE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "RAND": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ABS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "CEIL": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "FLOOR": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ROUND": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "CONCAT": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRLEN": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "UCASE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "LCASE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ENCODE_FOR_URI": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "CONTAINS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRSTARTS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRENDS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRBEFORE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRAFTER": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "YEAR": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "MONTH": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DAY": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "HOURS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "MINUTES": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SECONDS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "TIMEZONE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "TZ": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "NOW": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "UUID": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRUUID": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "MD5": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SHA1": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SHA256": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SHA384": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SHA512": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "COALESCE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "IF": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRLANG": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRDT": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SAMETERM": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ISIRI": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ISURI": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ISBLANK": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ISLITERAL": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ISNUMERIC": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "TRUE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "FALSE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "COUNT": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SUM": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "MIN": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "MAX": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "AVG": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SAMPLE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "GROUP_CONCAT": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SUBSTR": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "REPLACE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "REGEX": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "EXISTS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "NOT": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "IRI_REF": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRING_LITERAL1": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRING_LITERAL2": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRING_LITERAL_LONG1": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRING_LITERAL_LONG2": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "INTEGER": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DECIMAL": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DOUBLE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "INTEGER_POSITIVE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DECIMAL_POSITIVE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DOUBLE_POSITIVE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "INTEGER_NEGATIVE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DECIMAL_NEGATIVE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DOUBLE_NEGATIVE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "PNAME_LN": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "PNAME_NS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"]}, 
  "namedGraphClause" : {
     "NAMED": ["NAMED","sourceSelector"]}, 
  "notExistsFunc" : {
     "NOT": ["NOT","EXISTS","groupGraphPattern"]}, 
  "numericExpression" : {
     "!": ["additiveExpression"], 
     "+": ["additiveExpression"], 
     "-": ["additiveExpression"], 
     "VAR1": ["additiveExpression"], 
     "VAR2": ["additiveExpression"], 
     "(": ["additiveExpression"], 
     "STR": ["additiveExpression"], 
     "LANG": ["additiveExpression"], 
     "LANGMATCHES": ["additiveExpression"], 
     "DATATYPE": ["additiveExpression"], 
     "BOUND": ["additiveExpression"], 
     "IRI": ["additiveExpression"], 
     "URI": ["additiveExpression"], 
     "BNODE": ["additiveExpression"], 
     "RAND": ["additiveExpression"], 
     "ABS": ["additiveExpression"], 
     "CEIL": ["additiveExpression"], 
     "FLOOR": ["additiveExpression"], 
     "ROUND": ["additiveExpression"], 
     "CONCAT": ["additiveExpression"], 
     "STRLEN": ["additiveExpression"], 
     "UCASE": ["additiveExpression"], 
     "LCASE": ["additiveExpression"], 
     "ENCODE_FOR_URI": ["additiveExpression"], 
     "CONTAINS": ["additiveExpression"], 
     "STRSTARTS": ["additiveExpression"], 
     "STRENDS": ["additiveExpression"], 
     "STRBEFORE": ["additiveExpression"], 
     "STRAFTER": ["additiveExpression"], 
     "YEAR": ["additiveExpression"], 
     "MONTH": ["additiveExpression"], 
     "DAY": ["additiveExpression"], 
     "HOURS": ["additiveExpression"], 
     "MINUTES": ["additiveExpression"], 
     "SECONDS": ["additiveExpression"], 
     "TIMEZONE": ["additiveExpression"], 
     "TZ": ["additiveExpression"], 
     "NOW": ["additiveExpression"], 
     "UUID": ["additiveExpression"], 
     "STRUUID": ["additiveExpression"], 
     "MD5": ["additiveExpression"], 
     "SHA1": ["additiveExpression"], 
     "SHA256": ["additiveExpression"], 
     "SHA384": ["additiveExpression"], 
     "SHA512": ["additiveExpression"], 
     "COALESCE": ["additiveExpression"], 
     "IF": ["additiveExpression"], 
     "STRLANG": ["additiveExpression"], 
     "STRDT": ["additiveExpression"], 
     "SAMETERM": ["additiveExpression"], 
     "ISIRI": ["additiveExpression"], 
     "ISURI": ["additiveExpression"], 
     "ISBLANK": ["additiveExpression"], 
     "ISLITERAL": ["additiveExpression"], 
     "ISNUMERIC": ["additiveExpression"], 
     "TRUE": ["additiveExpression"], 
     "FALSE": ["additiveExpression"], 
     "COUNT": ["additiveExpression"], 
     "SUM": ["additiveExpression"], 
     "MIN": ["additiveExpression"], 
     "MAX": ["additiveExpression"], 
     "AVG": ["additiveExpression"], 
     "SAMPLE": ["additiveExpression"], 
     "GROUP_CONCAT": ["additiveExpression"], 
     "SUBSTR": ["additiveExpression"], 
     "REPLACE": ["additiveExpression"], 
     "REGEX": ["additiveExpression"], 
     "EXISTS": ["additiveExpression"], 
     "NOT": ["additiveExpression"], 
     "IRI_REF": ["additiveExpression"], 
     "STRING_LITERAL1": ["additiveExpression"], 
     "STRING_LITERAL2": ["additiveExpression"], 
     "STRING_LITERAL_LONG1": ["additiveExpression"], 
     "STRING_LITERAL_LONG2": ["additiveExpression"], 
     "INTEGER": ["additiveExpression"], 
     "DECIMAL": ["additiveExpression"], 
     "DOUBLE": ["additiveExpression"], 
     "INTEGER_POSITIVE": ["additiveExpression"], 
     "DECIMAL_POSITIVE": ["additiveExpression"], 
     "DOUBLE_POSITIVE": ["additiveExpression"], 
     "INTEGER_NEGATIVE": ["additiveExpression"], 
     "DECIMAL_NEGATIVE": ["additiveExpression"], 
     "DOUBLE_NEGATIVE": ["additiveExpression"], 
     "PNAME_LN": ["additiveExpression"], 
     "PNAME_NS": ["additiveExpression"]}, 
  "numericLiteral" : {
     "INTEGER": ["numericLiteralUnsigned"], 
     "DECIMAL": ["numericLiteralUnsigned"], 
     "DOUBLE": ["numericLiteralUnsigned"], 
     "INTEGER_POSITIVE": ["numericLiteralPositive"], 
     "DECIMAL_POSITIVE": ["numericLiteralPositive"], 
     "DOUBLE_POSITIVE": ["numericLiteralPositive"], 
     "INTEGER_NEGATIVE": ["numericLiteralNegative"], 
     "DECIMAL_NEGATIVE": ["numericLiteralNegative"], 
     "DOUBLE_NEGATIVE": ["numericLiteralNegative"]}, 
  "numericLiteralNegative" : {
     "INTEGER_NEGATIVE": ["INTEGER_NEGATIVE"], 
     "DECIMAL_NEGATIVE": ["DECIMAL_NEGATIVE"], 
     "DOUBLE_NEGATIVE": ["DOUBLE_NEGATIVE"]}, 
  "numericLiteralPositive" : {
     "INTEGER_POSITIVE": ["INTEGER_POSITIVE"], 
     "DECIMAL_POSITIVE": ["DECIMAL_POSITIVE"], 
     "DOUBLE_POSITIVE": ["DOUBLE_POSITIVE"]}, 
  "numericLiteralUnsigned" : {
     "INTEGER": ["INTEGER"], 
     "DECIMAL": ["DECIMAL"], 
     "DOUBLE": ["DOUBLE"]}, 
  "object" : {
     "(": ["graphNode"], 
     "[": ["graphNode"], 
     "VAR1": ["graphNode"], 
     "VAR2": ["graphNode"], 
     "NIL": ["graphNode"], 
     "IRI_REF": ["graphNode"], 
     "TRUE": ["graphNode"], 
     "FALSE": ["graphNode"], 
     "BLANK_NODE_LABEL": ["graphNode"], 
     "ANON": ["graphNode"], 
     "PNAME_LN": ["graphNode"], 
     "PNAME_NS": ["graphNode"], 
     "STRING_LITERAL1": ["graphNode"], 
     "STRING_LITERAL2": ["graphNode"], 
     "STRING_LITERAL_LONG1": ["graphNode"], 
     "STRING_LITERAL_LONG2": ["graphNode"], 
     "INTEGER": ["graphNode"], 
     "DECIMAL": ["graphNode"], 
     "DOUBLE": ["graphNode"], 
     "INTEGER_POSITIVE": ["graphNode"], 
     "DECIMAL_POSITIVE": ["graphNode"], 
     "DOUBLE_POSITIVE": ["graphNode"], 
     "INTEGER_NEGATIVE": ["graphNode"], 
     "DECIMAL_NEGATIVE": ["graphNode"], 
     "DOUBLE_NEGATIVE": ["graphNode"]}, 
  "objectList" : {
     "(": ["object","*[,,object]"], 
     "[": ["object","*[,,object]"], 
     "VAR1": ["object","*[,,object]"], 
     "VAR2": ["object","*[,,object]"], 
     "NIL": ["object","*[,,object]"], 
     "IRI_REF": ["object","*[,,object]"], 
     "TRUE": ["object","*[,,object]"], 
     "FALSE": ["object","*[,,object]"], 
     "BLANK_NODE_LABEL": ["object","*[,,object]"], 
     "ANON": ["object","*[,,object]"], 
     "PNAME_LN": ["object","*[,,object]"], 
     "PNAME_NS": ["object","*[,,object]"], 
     "STRING_LITERAL1": ["object","*[,,object]"], 
     "STRING_LITERAL2": ["object","*[,,object]"], 
     "STRING_LITERAL_LONG1": ["object","*[,,object]"], 
     "STRING_LITERAL_LONG2": ["object","*[,,object]"], 
     "INTEGER": ["object","*[,,object]"], 
     "DECIMAL": ["object","*[,,object]"], 
     "DOUBLE": ["object","*[,,object]"], 
     "INTEGER_POSITIVE": ["object","*[,,object]"], 
     "DECIMAL_POSITIVE": ["object","*[,,object]"], 
     "DOUBLE_POSITIVE": ["object","*[,,object]"], 
     "INTEGER_NEGATIVE": ["object","*[,,object]"], 
     "DECIMAL_NEGATIVE": ["object","*[,,object]"], 
     "DOUBLE_NEGATIVE": ["object","*[,,object]"]}, 
  "objectListPath" : {
     "(": ["objectPath","*[,,objectPath]"], 
     "[": ["objectPath","*[,,objectPath]"], 
     "VAR1": ["objectPath","*[,,objectPath]"], 
     "VAR2": ["objectPath","*[,,objectPath]"], 
     "NIL": ["objectPath","*[,,objectPath]"], 
     "IRI_REF": ["objectPath","*[,,objectPath]"], 
     "TRUE": ["objectPath","*[,,objectPath]"], 
     "FALSE": ["objectPath","*[,,objectPath]"], 
     "BLANK_NODE_LABEL": ["objectPath","*[,,objectPath]"], 
     "ANON": ["objectPath","*[,,objectPath]"], 
     "PNAME_LN": ["objectPath","*[,,objectPath]"], 
     "PNAME_NS": ["objectPath","*[,,objectPath]"], 
     "STRING_LITERAL1": ["objectPath","*[,,objectPath]"], 
     "STRING_LITERAL2": ["objectPath","*[,,objectPath]"], 
     "STRING_LITERAL_LONG1": ["objectPath","*[,,objectPath]"], 
     "STRING_LITERAL_LONG2": ["objectPath","*[,,objectPath]"], 
     "INTEGER": ["objectPath","*[,,objectPath]"], 
     "DECIMAL": ["objectPath","*[,,objectPath]"], 
     "DOUBLE": ["objectPath","*[,,objectPath]"], 
     "INTEGER_POSITIVE": ["objectPath","*[,,objectPath]"], 
     "DECIMAL_POSITIVE": ["objectPath","*[,,objectPath]"], 
     "DOUBLE_POSITIVE": ["objectPath","*[,,objectPath]"], 
     "INTEGER_NEGATIVE": ["objectPath","*[,,objectPath]"], 
     "DECIMAL_NEGATIVE": ["objectPath","*[,,objectPath]"], 
     "DOUBLE_NEGATIVE": ["objectPath","*[,,objectPath]"]}, 
  "objectPath" : {
     "(": ["graphNodePath"], 
     "[": ["graphNodePath"], 
     "VAR1": ["graphNodePath"], 
     "VAR2": ["graphNodePath"], 
     "NIL": ["graphNodePath"], 
     "IRI_REF": ["graphNodePath"], 
     "TRUE": ["graphNodePath"], 
     "FALSE": ["graphNodePath"], 
     "BLANK_NODE_LABEL": ["graphNodePath"], 
     "ANON": ["graphNodePath"], 
     "PNAME_LN": ["graphNodePath"], 
     "PNAME_NS": ["graphNodePath"], 
     "STRING_LITERAL1": ["graphNodePath"], 
     "STRING_LITERAL2": ["graphNodePath"], 
     "STRING_LITERAL_LONG1": ["graphNodePath"], 
     "STRING_LITERAL_LONG2": ["graphNodePath"], 
     "INTEGER": ["graphNodePath"], 
     "DECIMAL": ["graphNodePath"], 
     "DOUBLE": ["graphNodePath"], 
     "INTEGER_POSITIVE": ["graphNodePath"], 
     "DECIMAL_POSITIVE": ["graphNodePath"], 
     "DOUBLE_POSITIVE": ["graphNodePath"], 
     "INTEGER_NEGATIVE": ["graphNodePath"], 
     "DECIMAL_NEGATIVE": ["graphNodePath"], 
     "DOUBLE_NEGATIVE": ["graphNodePath"]}, 
  "offsetClause" : {
     "OFFSET": ["OFFSET","INTEGER"]}, 
  "optionalGraphPattern" : {
     "OPTIONAL": ["OPTIONAL","groupGraphPattern"]}, 
  "or([*,expression])" : {
     "*": ["*"], 
     "!": ["expression"], 
     "+": ["expression"], 
     "-": ["expression"], 
     "VAR1": ["expression"], 
     "VAR2": ["expression"], 
     "(": ["expression"], 
     "STR": ["expression"], 
     "LANG": ["expression"], 
     "LANGMATCHES": ["expression"], 
     "DATATYPE": ["expression"], 
     "BOUND": ["expression"], 
     "IRI": ["expression"], 
     "URI": ["expression"], 
     "BNODE": ["expression"], 
     "RAND": ["expression"], 
     "ABS": ["expression"], 
     "CEIL": ["expression"], 
     "FLOOR": ["expression"], 
     "ROUND": ["expression"], 
     "CONCAT": ["expression"], 
     "STRLEN": ["expression"], 
     "UCASE": ["expression"], 
     "LCASE": ["expression"], 
     "ENCODE_FOR_URI": ["expression"], 
     "CONTAINS": ["expression"], 
     "STRSTARTS": ["expression"], 
     "STRENDS": ["expression"], 
     "STRBEFORE": ["expression"], 
     "STRAFTER": ["expression"], 
     "YEAR": ["expression"], 
     "MONTH": ["expression"], 
     "DAY": ["expression"], 
     "HOURS": ["expression"], 
     "MINUTES": ["expression"], 
     "SECONDS": ["expression"], 
     "TIMEZONE": ["expression"], 
     "TZ": ["expression"], 
     "NOW": ["expression"], 
     "UUID": ["expression"], 
     "STRUUID": ["expression"], 
     "MD5": ["expression"], 
     "SHA1": ["expression"], 
     "SHA256": ["expression"], 
     "SHA384": ["expression"], 
     "SHA512": ["expression"], 
     "COALESCE": ["expression"], 
     "IF": ["expression"], 
     "STRLANG": ["expression"], 
     "STRDT": ["expression"], 
     "SAMETERM": ["expression"], 
     "ISIRI": ["expression"], 
     "ISURI": ["expression"], 
     "ISBLANK": ["expression"], 
     "ISLITERAL": ["expression"], 
     "ISNUMERIC": ["expression"], 
     "TRUE": ["expression"], 
     "FALSE": ["expression"], 
     "COUNT": ["expression"], 
     "SUM": ["expression"], 
     "MIN": ["expression"], 
     "MAX": ["expression"], 
     "AVG": ["expression"], 
     "SAMPLE": ["expression"], 
     "GROUP_CONCAT": ["expression"], 
     "SUBSTR": ["expression"], 
     "REPLACE": ["expression"], 
     "REGEX": ["expression"], 
     "EXISTS": ["expression"], 
     "NOT": ["expression"], 
     "IRI_REF": ["expression"], 
     "STRING_LITERAL1": ["expression"], 
     "STRING_LITERAL2": ["expression"], 
     "STRING_LITERAL_LONG1": ["expression"], 
     "STRING_LITERAL_LONG2": ["expression"], 
     "INTEGER": ["expression"], 
     "DECIMAL": ["expression"], 
     "DOUBLE": ["expression"], 
     "INTEGER_POSITIVE": ["expression"], 
     "DECIMAL_POSITIVE": ["expression"], 
     "DOUBLE_POSITIVE": ["expression"], 
     "INTEGER_NEGATIVE": ["expression"], 
     "DECIMAL_NEGATIVE": ["expression"], 
     "DOUBLE_NEGATIVE": ["expression"], 
     "PNAME_LN": ["expression"], 
     "PNAME_NS": ["expression"]}, 
  "or([+or([var,[ (,expression,AS,var,)]]),*])" : {
     "(": ["+or([var,[ (,expression,AS,var,)]])"], 
     "VAR1": ["+or([var,[ (,expression,AS,var,)]])"], 
     "VAR2": ["+or([var,[ (,expression,AS,var,)]])"], 
     "*": ["*"]}, 
  "or([+varOrIRIref,*])" : {
     "VAR1": ["+varOrIRIref"], 
     "VAR2": ["+varOrIRIref"], 
     "IRI_REF": ["+varOrIRIref"], 
     "PNAME_LN": ["+varOrIRIref"], 
     "PNAME_NS": ["+varOrIRIref"], 
     "*": ["*"]}, 
  "or([ASC,DESC])" : {
     "ASC": ["ASC"], 
     "DESC": ["DESC"]}, 
  "or([DISTINCT,REDUCED])" : {
     "DISTINCT": ["DISTINCT"], 
     "REDUCED": ["REDUCED"]}, 
  "or([LANGTAG,[^^,iriRef]])" : {
     "LANGTAG": ["LANGTAG"], 
     "^^": ["[^^,iriRef]"]}, 
  "or([NIL,[ (,*var,)]])" : {
     "NIL": ["NIL"], 
     "(": ["[ (,*var,)]"]}, 
  "or([[ (,*dataBlockValue,)],NIL])" : {
     "(": ["[ (,*dataBlockValue,)]"], 
     "NIL": ["NIL"]}, 
  "or([[ (,expression,)],NIL])" : {
     "(": ["[ (,expression,)]"], 
     "NIL": ["NIL"]}, 
  "or([[*,unaryExpression],[/,unaryExpression]])" : {
     "*": ["[*,unaryExpression]"], 
     "/": ["[/,unaryExpression]"]}, 
  "or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])" : {
     "+": ["[+,multiplicativeExpression]"], 
     "-": ["[-,multiplicativeExpression]"], 
     "INTEGER_POSITIVE": ["[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]"], 
     "DECIMAL_POSITIVE": ["[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]"], 
     "DOUBLE_POSITIVE": ["[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]"], 
     "INTEGER_NEGATIVE": ["[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]"], 
     "DECIMAL_NEGATIVE": ["[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]"], 
     "DOUBLE_NEGATIVE": ["[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]"]}, 
  "or([[,,or([},[integer,}]])],}])" : {
     ",": ["[,,or([},[integer,}]])]"], 
     "}": ["}"]}, 
  "or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])" : {
     "=": ["[=,numericExpression]"], 
     "!=": ["[!=,numericExpression]"], 
     "<": ["[<,numericExpression]"], 
     ">": ["[>,numericExpression]"], 
     "<=": ["[<=,numericExpression]"], 
     ">=": ["[>=,numericExpression]"], 
     "IN": ["[IN,expressionList]"], 
     "NOT": ["[NOT,IN,expressionList]"]}, 
  "or([[constructTemplate,*datasetClause,whereClause,solutionModifier],[*datasetClause,WHERE,{,?triplesTemplate,},solutionModifier]])" : {
     "{": ["[constructTemplate,*datasetClause,whereClause,solutionModifier]"], 
     "WHERE": ["[*datasetClause,WHERE,{,?triplesTemplate,},solutionModifier]"], 
     "FROM": ["[*datasetClause,WHERE,{,?triplesTemplate,},solutionModifier]"]}, 
  "or([[deleteClause,?insertClause],insertClause])" : {
     "DELETE": ["[deleteClause,?insertClause]"], 
     "INSERT": ["insertClause"]}, 
  "or([[integer,or([[,,or([},[integer,}]])],}])],[,,integer,}]])" : {
     "INTEGER": ["[integer,or([[,,or([},[integer,}]])],}])]"], 
     ",": ["[,,integer,}]"]}, 
  "or([baseDecl,prefixDecl])" : {
     "BASE": ["baseDecl"], 
     "PREFIX": ["prefixDecl"]}, 
  "or([defaultGraphClause,namedGraphClause])" : {
     "IRI_REF": ["defaultGraphClause"], 
     "PNAME_LN": ["defaultGraphClause"], 
     "PNAME_NS": ["defaultGraphClause"], 
     "NAMED": ["namedGraphClause"]}, 
  "or([inlineDataOneVar,inlineDataFull])" : {
     "VAR1": ["inlineDataOneVar"], 
     "VAR2": ["inlineDataOneVar"], 
     "NIL": ["inlineDataFull"], 
     "(": ["inlineDataFull"]}, 
  "or([iriRef,[NAMED,iriRef]])" : {
     "IRI_REF": ["iriRef"], 
     "PNAME_LN": ["iriRef"], 
     "PNAME_NS": ["iriRef"], 
     "NAMED": ["[NAMED,iriRef]"]}, 
  "or([iriRef,a])" : {
     "IRI_REF": ["iriRef"], 
     "PNAME_LN": ["iriRef"], 
     "PNAME_NS": ["iriRef"], 
     "a": ["a"]}, 
  "or([numericLiteralPositive,numericLiteralNegative])" : {
     "INTEGER_POSITIVE": ["numericLiteralPositive"], 
     "DECIMAL_POSITIVE": ["numericLiteralPositive"], 
     "DOUBLE_POSITIVE": ["numericLiteralPositive"], 
     "INTEGER_NEGATIVE": ["numericLiteralNegative"], 
     "DECIMAL_NEGATIVE": ["numericLiteralNegative"], 
     "DOUBLE_NEGATIVE": ["numericLiteralNegative"]}, 
  "or([queryAll,updateAll])" : {
     "CONSTRUCT": ["queryAll"], 
     "DESCRIBE": ["queryAll"], 
     "ASK": ["queryAll"], 
     "SELECT": ["queryAll"], 
     "INSERT": ["updateAll"], 
     "DELETE": ["updateAll"], 
     "LOAD": ["updateAll"], 
     "CLEAR": ["updateAll"], 
     "DROP": ["updateAll"], 
     "ADD": ["updateAll"], 
     "MOVE": ["updateAll"], 
     "COPY": ["updateAll"], 
     "CREATE": ["updateAll"], 
     "WITH": ["updateAll"], 
     "$": ["updateAll"]}, 
  "or([selectQuery,constructQuery,describeQuery,askQuery])" : {
     "SELECT": ["selectQuery"], 
     "CONSTRUCT": ["constructQuery"], 
     "DESCRIBE": ["describeQuery"], 
     "ASK": ["askQuery"]}, 
  "or([subSelect,groupGraphPatternSub])" : {
     "SELECT": ["subSelect"], 
     "{": ["groupGraphPatternSub"], 
     "OPTIONAL": ["groupGraphPatternSub"], 
     "MINUS": ["groupGraphPatternSub"], 
     "GRAPH": ["groupGraphPatternSub"], 
     "SERVICE": ["groupGraphPatternSub"], 
     "FILTER": ["groupGraphPatternSub"], 
     "BIND": ["groupGraphPatternSub"], 
     "VALUES": ["groupGraphPatternSub"], 
     "VAR1": ["groupGraphPatternSub"], 
     "VAR2": ["groupGraphPatternSub"], 
     "NIL": ["groupGraphPatternSub"], 
     "(": ["groupGraphPatternSub"], 
     "[": ["groupGraphPatternSub"], 
     "IRI_REF": ["groupGraphPatternSub"], 
     "TRUE": ["groupGraphPatternSub"], 
     "FALSE": ["groupGraphPatternSub"], 
     "BLANK_NODE_LABEL": ["groupGraphPatternSub"], 
     "ANON": ["groupGraphPatternSub"], 
     "PNAME_LN": ["groupGraphPatternSub"], 
     "PNAME_NS": ["groupGraphPatternSub"], 
     "STRING_LITERAL1": ["groupGraphPatternSub"], 
     "STRING_LITERAL2": ["groupGraphPatternSub"], 
     "STRING_LITERAL_LONG1": ["groupGraphPatternSub"], 
     "STRING_LITERAL_LONG2": ["groupGraphPatternSub"], 
     "INTEGER": ["groupGraphPatternSub"], 
     "DECIMAL": ["groupGraphPatternSub"], 
     "DOUBLE": ["groupGraphPatternSub"], 
     "INTEGER_POSITIVE": ["groupGraphPatternSub"], 
     "DECIMAL_POSITIVE": ["groupGraphPatternSub"], 
     "DOUBLE_POSITIVE": ["groupGraphPatternSub"], 
     "INTEGER_NEGATIVE": ["groupGraphPatternSub"], 
     "DECIMAL_NEGATIVE": ["groupGraphPatternSub"], 
     "DOUBLE_NEGATIVE": ["groupGraphPatternSub"], 
     "}": ["groupGraphPatternSub"]}, 
  "or([var,[ (,expression,AS,var,)]])" : {
     "VAR1": ["var"], 
     "VAR2": ["var"], 
     "(": ["[ (,expression,AS,var,)]"]}, 
  "or([verbPath,verbSimple])" : {
     "^": ["verbPath"], 
     "a": ["verbPath"], 
     "!": ["verbPath"], 
     "(": ["verbPath"], 
     "IRI_REF": ["verbPath"], 
     "PNAME_LN": ["verbPath"], 
     "PNAME_NS": ["verbPath"], 
     "VAR1": ["verbSimple"], 
     "VAR2": ["verbSimple"]}, 
  "or([},[integer,}]])" : {
     "}": ["}"], 
     "INTEGER": ["[integer,}]"]}, 
  "orderClause" : {
     "ORDER": ["ORDER","BY","+orderCondition"]}, 
  "orderCondition" : {
     "ASC": ["or([ASC,DESC])","brackettedExpression"], 
     "DESC": ["or([ASC,DESC])","brackettedExpression"], 
     "(": ["constraint"], 
     "STR": ["constraint"], 
     "LANG": ["constraint"], 
     "LANGMATCHES": ["constraint"], 
     "DATATYPE": ["constraint"], 
     "BOUND": ["constraint"], 
     "IRI": ["constraint"], 
     "URI": ["constraint"], 
     "BNODE": ["constraint"], 
     "RAND": ["constraint"], 
     "ABS": ["constraint"], 
     "CEIL": ["constraint"], 
     "FLOOR": ["constraint"], 
     "ROUND": ["constraint"], 
     "CONCAT": ["constraint"], 
     "STRLEN": ["constraint"], 
     "UCASE": ["constraint"], 
     "LCASE": ["constraint"], 
     "ENCODE_FOR_URI": ["constraint"], 
     "CONTAINS": ["constraint"], 
     "STRSTARTS": ["constraint"], 
     "STRENDS": ["constraint"], 
     "STRBEFORE": ["constraint"], 
     "STRAFTER": ["constraint"], 
     "YEAR": ["constraint"], 
     "MONTH": ["constraint"], 
     "DAY": ["constraint"], 
     "HOURS": ["constraint"], 
     "MINUTES": ["constraint"], 
     "SECONDS": ["constraint"], 
     "TIMEZONE": ["constraint"], 
     "TZ": ["constraint"], 
     "NOW": ["constraint"], 
     "UUID": ["constraint"], 
     "STRUUID": ["constraint"], 
     "MD5": ["constraint"], 
     "SHA1": ["constraint"], 
     "SHA256": ["constraint"], 
     "SHA384": ["constraint"], 
     "SHA512": ["constraint"], 
     "COALESCE": ["constraint"], 
     "IF": ["constraint"], 
     "STRLANG": ["constraint"], 
     "STRDT": ["constraint"], 
     "SAMETERM": ["constraint"], 
     "ISIRI": ["constraint"], 
     "ISURI": ["constraint"], 
     "ISBLANK": ["constraint"], 
     "ISLITERAL": ["constraint"], 
     "ISNUMERIC": ["constraint"], 
     "SUBSTR": ["constraint"], 
     "REPLACE": ["constraint"], 
     "REGEX": ["constraint"], 
     "EXISTS": ["constraint"], 
     "NOT": ["constraint"], 
     "IRI_REF": ["constraint"], 
     "PNAME_LN": ["constraint"], 
     "PNAME_NS": ["constraint"], 
     "VAR1": ["var"], 
     "VAR2": ["var"]}, 
  "path" : {
     "^": ["pathAlternative"], 
     "a": ["pathAlternative"], 
     "!": ["pathAlternative"], 
     "(": ["pathAlternative"], 
     "IRI_REF": ["pathAlternative"], 
     "PNAME_LN": ["pathAlternative"], 
     "PNAME_NS": ["pathAlternative"]}, 
  "pathAlternative" : {
     "^": ["pathSequence","*[|,pathSequence]"], 
     "a": ["pathSequence","*[|,pathSequence]"], 
     "!": ["pathSequence","*[|,pathSequence]"], 
     "(": ["pathSequence","*[|,pathSequence]"], 
     "IRI_REF": ["pathSequence","*[|,pathSequence]"], 
     "PNAME_LN": ["pathSequence","*[|,pathSequence]"], 
     "PNAME_NS": ["pathSequence","*[|,pathSequence]"]}, 
  "pathElt" : {
     "a": ["pathPrimary","?pathMod"], 
     "!": ["pathPrimary","?pathMod"], 
     "(": ["pathPrimary","?pathMod"], 
     "IRI_REF": ["pathPrimary","?pathMod"], 
     "PNAME_LN": ["pathPrimary","?pathMod"], 
     "PNAME_NS": ["pathPrimary","?pathMod"]}, 
  "pathEltOrInverse" : {
     "a": ["pathElt"], 
     "!": ["pathElt"], 
     "(": ["pathElt"], 
     "IRI_REF": ["pathElt"], 
     "PNAME_LN": ["pathElt"], 
     "PNAME_NS": ["pathElt"], 
     "^": ["^","pathElt"]}, 
  "pathMod" : {
     "*": ["*"], 
     "?": ["?"], 
     "+": ["+"], 
     "{": ["{","or([[integer,or([[,,or([},[integer,}]])],}])],[,,integer,}]])"]}, 
  "pathNegatedPropertySet" : {
     "a": ["pathOneInPropertySet"], 
     "^": ["pathOneInPropertySet"], 
     "IRI_REF": ["pathOneInPropertySet"], 
     "PNAME_LN": ["pathOneInPropertySet"], 
     "PNAME_NS": ["pathOneInPropertySet"], 
     "(": ["(","?[pathOneInPropertySet,*[|,pathOneInPropertySet]]",")"]}, 
  "pathOneInPropertySet" : {
     "IRI_REF": ["iriRef"], 
     "PNAME_LN": ["iriRef"], 
     "PNAME_NS": ["iriRef"], 
     "a": ["a"], 
     "^": ["^","or([iriRef,a])"]}, 
  "pathPrimary" : {
     "IRI_REF": ["storeProperty","iriRef"], 
     "PNAME_LN": ["storeProperty","iriRef"], 
     "PNAME_NS": ["storeProperty","iriRef"], 
     "a": ["storeProperty","a"], 
     "!": ["!","pathNegatedPropertySet"], 
     "(": ["(","path",")"]}, 
  "pathSequence" : {
     "^": ["pathEltOrInverse","*[/,pathEltOrInverse]"], 
     "a": ["pathEltOrInverse","*[/,pathEltOrInverse]"], 
     "!": ["pathEltOrInverse","*[/,pathEltOrInverse]"], 
     "(": ["pathEltOrInverse","*[/,pathEltOrInverse]"], 
     "IRI_REF": ["pathEltOrInverse","*[/,pathEltOrInverse]"], 
     "PNAME_LN": ["pathEltOrInverse","*[/,pathEltOrInverse]"], 
     "PNAME_NS": ["pathEltOrInverse","*[/,pathEltOrInverse]"]}, 
  "prefixDecl" : {
     "PREFIX": ["PREFIX","PNAME_NS","IRI_REF"]}, 
  "prefixedName" : {
     "PNAME_LN": ["PNAME_LN"], 
     "PNAME_NS": ["PNAME_NS"]}, 
  "primaryExpression" : {
     "(": ["brackettedExpression"], 
     "STR": ["builtInCall"], 
     "LANG": ["builtInCall"], 
     "LANGMATCHES": ["builtInCall"], 
     "DATATYPE": ["builtInCall"], 
     "BOUND": ["builtInCall"], 
     "IRI": ["builtInCall"], 
     "URI": ["builtInCall"], 
     "BNODE": ["builtInCall"], 
     "RAND": ["builtInCall"], 
     "ABS": ["builtInCall"], 
     "CEIL": ["builtInCall"], 
     "FLOOR": ["builtInCall"], 
     "ROUND": ["builtInCall"], 
     "CONCAT": ["builtInCall"], 
     "STRLEN": ["builtInCall"], 
     "UCASE": ["builtInCall"], 
     "LCASE": ["builtInCall"], 
     "ENCODE_FOR_URI": ["builtInCall"], 
     "CONTAINS": ["builtInCall"], 
     "STRSTARTS": ["builtInCall"], 
     "STRENDS": ["builtInCall"], 
     "STRBEFORE": ["builtInCall"], 
     "STRAFTER": ["builtInCall"], 
     "YEAR": ["builtInCall"], 
     "MONTH": ["builtInCall"], 
     "DAY": ["builtInCall"], 
     "HOURS": ["builtInCall"], 
     "MINUTES": ["builtInCall"], 
     "SECONDS": ["builtInCall"], 
     "TIMEZONE": ["builtInCall"], 
     "TZ": ["builtInCall"], 
     "NOW": ["builtInCall"], 
     "UUID": ["builtInCall"], 
     "STRUUID": ["builtInCall"], 
     "MD5": ["builtInCall"], 
     "SHA1": ["builtInCall"], 
     "SHA256": ["builtInCall"], 
     "SHA384": ["builtInCall"], 
     "SHA512": ["builtInCall"], 
     "COALESCE": ["builtInCall"], 
     "IF": ["builtInCall"], 
     "STRLANG": ["builtInCall"], 
     "STRDT": ["builtInCall"], 
     "SAMETERM": ["builtInCall"], 
     "ISIRI": ["builtInCall"], 
     "ISURI": ["builtInCall"], 
     "ISBLANK": ["builtInCall"], 
     "ISLITERAL": ["builtInCall"], 
     "ISNUMERIC": ["builtInCall"], 
     "SUBSTR": ["builtInCall"], 
     "REPLACE": ["builtInCall"], 
     "REGEX": ["builtInCall"], 
     "EXISTS": ["builtInCall"], 
     "NOT": ["builtInCall"], 
     "IRI_REF": ["iriRefOrFunction"], 
     "PNAME_LN": ["iriRefOrFunction"], 
     "PNAME_NS": ["iriRefOrFunction"], 
     "STRING_LITERAL1": ["rdfLiteral"], 
     "STRING_LITERAL2": ["rdfLiteral"], 
     "STRING_LITERAL_LONG1": ["rdfLiteral"], 
     "STRING_LITERAL_LONG2": ["rdfLiteral"], 
     "INTEGER": ["numericLiteral"], 
     "DECIMAL": ["numericLiteral"], 
     "DOUBLE": ["numericLiteral"], 
     "INTEGER_POSITIVE": ["numericLiteral"], 
     "DECIMAL_POSITIVE": ["numericLiteral"], 
     "DOUBLE_POSITIVE": ["numericLiteral"], 
     "INTEGER_NEGATIVE": ["numericLiteral"], 
     "DECIMAL_NEGATIVE": ["numericLiteral"], 
     "DOUBLE_NEGATIVE": ["numericLiteral"], 
     "TRUE": ["booleanLiteral"], 
     "FALSE": ["booleanLiteral"], 
     "VAR1": ["var"], 
     "VAR2": ["var"], 
     "COUNT": ["aggregate"], 
     "SUM": ["aggregate"], 
     "MIN": ["aggregate"], 
     "MAX": ["aggregate"], 
     "AVG": ["aggregate"], 
     "SAMPLE": ["aggregate"], 
     "GROUP_CONCAT": ["aggregate"]}, 
  "prologue" : {
     "BASE": ["*or([baseDecl,prefixDecl])"], 
     "PREFIX": ["*or([baseDecl,prefixDecl])"], 
     "$": ["*or([baseDecl,prefixDecl])"], 
     "CONSTRUCT": ["*or([baseDecl,prefixDecl])"], 
     "DESCRIBE": ["*or([baseDecl,prefixDecl])"], 
     "ASK": ["*or([baseDecl,prefixDecl])"], 
     "INSERT": ["*or([baseDecl,prefixDecl])"], 
     "DELETE": ["*or([baseDecl,prefixDecl])"], 
     "SELECT": ["*or([baseDecl,prefixDecl])"], 
     "LOAD": ["*or([baseDecl,prefixDecl])"], 
     "CLEAR": ["*or([baseDecl,prefixDecl])"], 
     "DROP": ["*or([baseDecl,prefixDecl])"], 
     "ADD": ["*or([baseDecl,prefixDecl])"], 
     "MOVE": ["*or([baseDecl,prefixDecl])"], 
     "COPY": ["*or([baseDecl,prefixDecl])"], 
     "CREATE": ["*or([baseDecl,prefixDecl])"], 
     "WITH": ["*or([baseDecl,prefixDecl])"]}, 
  "propertyList" : {
     "a": ["propertyListNotEmpty"], 
     "VAR1": ["propertyListNotEmpty"], 
     "VAR2": ["propertyListNotEmpty"], 
     "IRI_REF": ["propertyListNotEmpty"], 
     "PNAME_LN": ["propertyListNotEmpty"], 
     "PNAME_NS": ["propertyListNotEmpty"], 
     ".": [], 
     "}": [], 
     "GRAPH": []}, 
  "propertyListNotEmpty" : {
     "a": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "VAR1": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "VAR2": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "IRI_REF": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "PNAME_LN": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "PNAME_NS": ["verb","objectList","*[;,?[verb,objectList]]"]}, 
  "propertyListPath" : {
     "a": ["propertyListNotEmpty"], 
     "VAR1": ["propertyListNotEmpty"], 
     "VAR2": ["propertyListNotEmpty"], 
     "IRI_REF": ["propertyListNotEmpty"], 
     "PNAME_LN": ["propertyListNotEmpty"], 
     "PNAME_NS": ["propertyListNotEmpty"], 
     ".": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "propertyListPathNotEmpty" : {
     "VAR1": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "VAR2": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "^": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "a": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "!": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "(": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "IRI_REF": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "PNAME_LN": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "PNAME_NS": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"]}, 
  "quadData" : {
     "{": ["{","disallowVars","quads","allowVars","}"]}, 
  "quadDataNoBnodes" : {
     "{": ["{","disallowBnodes","disallowVars","quads","allowVars","allowBnodes","}"]}, 
  "quadPattern" : {
     "{": ["{","quads","}"]}, 
  "quadPatternNoBnodes" : {
     "{": ["{","disallowBnodes","quads","allowBnodes","}"]}, 
  "quads" : {
     "GRAPH": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "VAR1": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "VAR2": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "NIL": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "(": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "[": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "IRI_REF": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "TRUE": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "FALSE": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "BLANK_NODE_LABEL": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "ANON": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "PNAME_LN": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "PNAME_NS": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "STRING_LITERAL1": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "STRING_LITERAL2": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "STRING_LITERAL_LONG1": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "STRING_LITERAL_LONG2": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "INTEGER": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "DECIMAL": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "DOUBLE": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "INTEGER_POSITIVE": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "DECIMAL_POSITIVE": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "DOUBLE_POSITIVE": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "INTEGER_NEGATIVE": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "DECIMAL_NEGATIVE": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "DOUBLE_NEGATIVE": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"], 
     "}": ["?triplesTemplate","*[quadsNotTriples,?.,?triplesTemplate]"]}, 
  "quadsNotTriples" : {
     "GRAPH": ["GRAPH","varOrIRIref","{","?triplesTemplate","}"]}, 
  "queryAll" : {
     "CONSTRUCT": ["or([selectQuery,constructQuery,describeQuery,askQuery])","valuesClause"], 
     "DESCRIBE": ["or([selectQuery,constructQuery,describeQuery,askQuery])","valuesClause"], 
     "ASK": ["or([selectQuery,constructQuery,describeQuery,askQuery])","valuesClause"], 
     "SELECT": ["or([selectQuery,constructQuery,describeQuery,askQuery])","valuesClause"]}, 
  "rdfLiteral" : {
     "STRING_LITERAL1": ["string","?or([LANGTAG,[^^,iriRef]])"], 
     "STRING_LITERAL2": ["string","?or([LANGTAG,[^^,iriRef]])"], 
     "STRING_LITERAL_LONG1": ["string","?or([LANGTAG,[^^,iriRef]])"], 
     "STRING_LITERAL_LONG2": ["string","?or([LANGTAG,[^^,iriRef]])"]}, 
  "regexExpression" : {
     "REGEX": ["REGEX","(","expression",",","expression","?[,,expression]",")"]}, 
  "relationalExpression" : {
     "!": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "+": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "-": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "VAR1": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "VAR2": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "(": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STR": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "LANG": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "LANGMATCHES": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DATATYPE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "BOUND": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "IRI": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "URI": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "BNODE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "RAND": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ABS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "CEIL": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "FLOOR": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ROUND": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "CONCAT": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRLEN": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "UCASE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "LCASE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ENCODE_FOR_URI": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "CONTAINS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRSTARTS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRENDS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRBEFORE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRAFTER": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "YEAR": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "MONTH": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DAY": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "HOURS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "MINUTES": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SECONDS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "TIMEZONE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "TZ": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "NOW": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "UUID": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRUUID": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "MD5": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SHA1": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SHA256": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SHA384": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SHA512": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "COALESCE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "IF": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRLANG": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRDT": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SAMETERM": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ISIRI": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ISURI": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ISBLANK": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ISLITERAL": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ISNUMERIC": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "TRUE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "FALSE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "COUNT": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SUM": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "MIN": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "MAX": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "AVG": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SAMPLE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "GROUP_CONCAT": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SUBSTR": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "REPLACE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "REGEX": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "EXISTS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "NOT": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "IRI_REF": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRING_LITERAL1": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRING_LITERAL2": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRING_LITERAL_LONG1": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRING_LITERAL_LONG2": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "INTEGER": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DECIMAL": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DOUBLE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "INTEGER_POSITIVE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DECIMAL_POSITIVE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DOUBLE_POSITIVE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "INTEGER_NEGATIVE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DECIMAL_NEGATIVE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DOUBLE_NEGATIVE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "PNAME_LN": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "PNAME_NS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"]}, 
  "selectClause" : {
     "SELECT": ["SELECT","?or([DISTINCT,REDUCED])","or([+or([var,[ (,expression,AS,var,)]]),*])"]}, 
  "selectQuery" : {
     "SELECT": ["selectClause","*datasetClause","whereClause","solutionModifier"]}, 
  "serviceGraphPattern" : {
     "SERVICE": ["SERVICE","?SILENT","varOrIRIref","groupGraphPattern"]}, 
  "solutionModifier" : {
     "LIMIT": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     "OFFSET": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     "ORDER": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     "HAVING": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     "GROUP": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     "VALUES": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     "$": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     "}": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"]}, 
  "sourceSelector" : {
     "IRI_REF": ["iriRef"], 
     "PNAME_LN": ["iriRef"], 
     "PNAME_NS": ["iriRef"]}, 
  "sparql11" : {
     "$": ["prologue","or([queryAll,updateAll])","$"], 
     "CONSTRUCT": ["prologue","or([queryAll,updateAll])","$"], 
     "DESCRIBE": ["prologue","or([queryAll,updateAll])","$"], 
     "ASK": ["prologue","or([queryAll,updateAll])","$"], 
     "INSERT": ["prologue","or([queryAll,updateAll])","$"], 
     "DELETE": ["prologue","or([queryAll,updateAll])","$"], 
     "SELECT": ["prologue","or([queryAll,updateAll])","$"], 
     "LOAD": ["prologue","or([queryAll,updateAll])","$"], 
     "CLEAR": ["prologue","or([queryAll,updateAll])","$"], 
     "DROP": ["prologue","or([queryAll,updateAll])","$"], 
     "ADD": ["prologue","or([queryAll,updateAll])","$"], 
     "MOVE": ["prologue","or([queryAll,updateAll])","$"], 
     "COPY": ["prologue","or([queryAll,updateAll])","$"], 
     "CREATE": ["prologue","or([queryAll,updateAll])","$"], 
     "WITH": ["prologue","or([queryAll,updateAll])","$"], 
     "BASE": ["prologue","or([queryAll,updateAll])","$"], 
     "PREFIX": ["prologue","or([queryAll,updateAll])","$"]}, 
  "storeProperty" : {
     "VAR1": [], 
     "VAR2": [], 
     "IRI_REF": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "a": []}, 
  "strReplaceExpression" : {
     "REPLACE": ["REPLACE","(","expression",",","expression",",","expression","?[,,expression]",")"]}, 
  "string" : {
     "STRING_LITERAL1": ["STRING_LITERAL1"], 
     "STRING_LITERAL2": ["STRING_LITERAL2"], 
     "STRING_LITERAL_LONG1": ["STRING_LITERAL_LONG1"], 
     "STRING_LITERAL_LONG2": ["STRING_LITERAL_LONG2"]}, 
  "subSelect" : {
     "SELECT": ["selectClause","whereClause","solutionModifier","valuesClause"]}, 
  "substringExpression" : {
     "SUBSTR": ["SUBSTR","(","expression",",","expression","?[,,expression]",")"]}, 
  "triplesBlock" : {
     "VAR1": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "VAR2": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "NIL": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "(": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "[": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "IRI_REF": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "TRUE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "FALSE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "BLANK_NODE_LABEL": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "ANON": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "PNAME_LN": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "PNAME_NS": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "STRING_LITERAL1": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "STRING_LITERAL2": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "STRING_LITERAL_LONG1": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "STRING_LITERAL_LONG2": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "INTEGER": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "DECIMAL": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "DOUBLE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "INTEGER_POSITIVE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "DECIMAL_POSITIVE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "DOUBLE_POSITIVE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "INTEGER_NEGATIVE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "DECIMAL_NEGATIVE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "DOUBLE_NEGATIVE": ["triplesSameSubjectPath","?[.,?triplesBlock]"]}, 
  "triplesNode" : {
     "(": ["collection"], 
     "[": ["blankNodePropertyList"]}, 
  "triplesNodePath" : {
     "(": ["collectionPath"], 
     "[": ["blankNodePropertyListPath"]}, 
  "triplesSameSubject" : {
     "VAR1": ["varOrTerm","propertyListNotEmpty"], 
     "VAR2": ["varOrTerm","propertyListNotEmpty"], 
     "NIL": ["varOrTerm","propertyListNotEmpty"], 
     "IRI_REF": ["varOrTerm","propertyListNotEmpty"], 
     "TRUE": ["varOrTerm","propertyListNotEmpty"], 
     "FALSE": ["varOrTerm","propertyListNotEmpty"], 
     "BLANK_NODE_LABEL": ["varOrTerm","propertyListNotEmpty"], 
     "ANON": ["varOrTerm","propertyListNotEmpty"], 
     "PNAME_LN": ["varOrTerm","propertyListNotEmpty"], 
     "PNAME_NS": ["varOrTerm","propertyListNotEmpty"], 
     "STRING_LITERAL1": ["varOrTerm","propertyListNotEmpty"], 
     "STRING_LITERAL2": ["varOrTerm","propertyListNotEmpty"], 
     "STRING_LITERAL_LONG1": ["varOrTerm","propertyListNotEmpty"], 
     "STRING_LITERAL_LONG2": ["varOrTerm","propertyListNotEmpty"], 
     "INTEGER": ["varOrTerm","propertyListNotEmpty"], 
     "DECIMAL": ["varOrTerm","propertyListNotEmpty"], 
     "DOUBLE": ["varOrTerm","propertyListNotEmpty"], 
     "INTEGER_POSITIVE": ["varOrTerm","propertyListNotEmpty"], 
     "DECIMAL_POSITIVE": ["varOrTerm","propertyListNotEmpty"], 
     "DOUBLE_POSITIVE": ["varOrTerm","propertyListNotEmpty"], 
     "INTEGER_NEGATIVE": ["varOrTerm","propertyListNotEmpty"], 
     "DECIMAL_NEGATIVE": ["varOrTerm","propertyListNotEmpty"], 
     "DOUBLE_NEGATIVE": ["varOrTerm","propertyListNotEmpty"], 
     "(": ["triplesNode","propertyList"], 
     "[": ["triplesNode","propertyList"]}, 
  "triplesSameSubjectPath" : {
     "VAR1": ["varOrTerm","propertyListPathNotEmpty"], 
     "VAR2": ["varOrTerm","propertyListPathNotEmpty"], 
     "NIL": ["varOrTerm","propertyListPathNotEmpty"], 
     "IRI_REF": ["varOrTerm","propertyListPathNotEmpty"], 
     "TRUE": ["varOrTerm","propertyListPathNotEmpty"], 
     "FALSE": ["varOrTerm","propertyListPathNotEmpty"], 
     "BLANK_NODE_LABEL": ["varOrTerm","propertyListPathNotEmpty"], 
     "ANON": ["varOrTerm","propertyListPathNotEmpty"], 
     "PNAME_LN": ["varOrTerm","propertyListPathNotEmpty"], 
     "PNAME_NS": ["varOrTerm","propertyListPathNotEmpty"], 
     "STRING_LITERAL1": ["varOrTerm","propertyListPathNotEmpty"], 
     "STRING_LITERAL2": ["varOrTerm","propertyListPathNotEmpty"], 
     "STRING_LITERAL_LONG1": ["varOrTerm","propertyListPathNotEmpty"], 
     "STRING_LITERAL_LONG2": ["varOrTerm","propertyListPathNotEmpty"], 
     "INTEGER": ["varOrTerm","propertyListPathNotEmpty"], 
     "DECIMAL": ["varOrTerm","propertyListPathNotEmpty"], 
     "DOUBLE": ["varOrTerm","propertyListPathNotEmpty"], 
     "INTEGER_POSITIVE": ["varOrTerm","propertyListPathNotEmpty"], 
     "DECIMAL_POSITIVE": ["varOrTerm","propertyListPathNotEmpty"], 
     "DOUBLE_POSITIVE": ["varOrTerm","propertyListPathNotEmpty"], 
     "INTEGER_NEGATIVE": ["varOrTerm","propertyListPathNotEmpty"], 
     "DECIMAL_NEGATIVE": ["varOrTerm","propertyListPathNotEmpty"], 
     "DOUBLE_NEGATIVE": ["varOrTerm","propertyListPathNotEmpty"], 
     "(": ["triplesNodePath","propertyListPath"], 
     "[": ["triplesNodePath","propertyListPath"]}, 
  "triplesTemplate" : {
     "VAR1": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "VAR2": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "NIL": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "(": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "[": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "IRI_REF": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "TRUE": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "FALSE": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "BLANK_NODE_LABEL": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "ANON": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "PNAME_LN": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "PNAME_NS": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "STRING_LITERAL1": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "STRING_LITERAL2": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "STRING_LITERAL_LONG1": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "STRING_LITERAL_LONG2": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "INTEGER": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "DECIMAL": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "DOUBLE": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "INTEGER_POSITIVE": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "DECIMAL_POSITIVE": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "DOUBLE_POSITIVE": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "INTEGER_NEGATIVE": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "DECIMAL_NEGATIVE": ["triplesSameSubject","?[.,?triplesTemplate]"], 
     "DOUBLE_NEGATIVE": ["triplesSameSubject","?[.,?triplesTemplate]"]}, 
  "unaryExpression" : {
     "!": ["!","primaryExpression"], 
     "+": ["+","primaryExpression"], 
     "-": ["-","primaryExpression"], 
     "VAR1": ["primaryExpression"], 
     "VAR2": ["primaryExpression"], 
     "(": ["primaryExpression"], 
     "STR": ["primaryExpression"], 
     "LANG": ["primaryExpression"], 
     "LANGMATCHES": ["primaryExpression"], 
     "DATATYPE": ["primaryExpression"], 
     "BOUND": ["primaryExpression"], 
     "IRI": ["primaryExpression"], 
     "URI": ["primaryExpression"], 
     "BNODE": ["primaryExpression"], 
     "RAND": ["primaryExpression"], 
     "ABS": ["primaryExpression"], 
     "CEIL": ["primaryExpression"], 
     "FLOOR": ["primaryExpression"], 
     "ROUND": ["primaryExpression"], 
     "CONCAT": ["primaryExpression"], 
     "STRLEN": ["primaryExpression"], 
     "UCASE": ["primaryExpression"], 
     "LCASE": ["primaryExpression"], 
     "ENCODE_FOR_URI": ["primaryExpression"], 
     "CONTAINS": ["primaryExpression"], 
     "STRSTARTS": ["primaryExpression"], 
     "STRENDS": ["primaryExpression"], 
     "STRBEFORE": ["primaryExpression"], 
     "STRAFTER": ["primaryExpression"], 
     "YEAR": ["primaryExpression"], 
     "MONTH": ["primaryExpression"], 
     "DAY": ["primaryExpression"], 
     "HOURS": ["primaryExpression"], 
     "MINUTES": ["primaryExpression"], 
     "SECONDS": ["primaryExpression"], 
     "TIMEZONE": ["primaryExpression"], 
     "TZ": ["primaryExpression"], 
     "NOW": ["primaryExpression"], 
     "UUID": ["primaryExpression"], 
     "STRUUID": ["primaryExpression"], 
     "MD5": ["primaryExpression"], 
     "SHA1": ["primaryExpression"], 
     "SHA256": ["primaryExpression"], 
     "SHA384": ["primaryExpression"], 
     "SHA512": ["primaryExpression"], 
     "COALESCE": ["primaryExpression"], 
     "IF": ["primaryExpression"], 
     "STRLANG": ["primaryExpression"], 
     "STRDT": ["primaryExpression"], 
     "SAMETERM": ["primaryExpression"], 
     "ISIRI": ["primaryExpression"], 
     "ISURI": ["primaryExpression"], 
     "ISBLANK": ["primaryExpression"], 
     "ISLITERAL": ["primaryExpression"], 
     "ISNUMERIC": ["primaryExpression"], 
     "TRUE": ["primaryExpression"], 
     "FALSE": ["primaryExpression"], 
     "COUNT": ["primaryExpression"], 
     "SUM": ["primaryExpression"], 
     "MIN": ["primaryExpression"], 
     "MAX": ["primaryExpression"], 
     "AVG": ["primaryExpression"], 
     "SAMPLE": ["primaryExpression"], 
     "GROUP_CONCAT": ["primaryExpression"], 
     "SUBSTR": ["primaryExpression"], 
     "REPLACE": ["primaryExpression"], 
     "REGEX": ["primaryExpression"], 
     "EXISTS": ["primaryExpression"], 
     "NOT": ["primaryExpression"], 
     "IRI_REF": ["primaryExpression"], 
     "STRING_LITERAL1": ["primaryExpression"], 
     "STRING_LITERAL2": ["primaryExpression"], 
     "STRING_LITERAL_LONG1": ["primaryExpression"], 
     "STRING_LITERAL_LONG2": ["primaryExpression"], 
     "INTEGER": ["primaryExpression"], 
     "DECIMAL": ["primaryExpression"], 
     "DOUBLE": ["primaryExpression"], 
     "INTEGER_POSITIVE": ["primaryExpression"], 
     "DECIMAL_POSITIVE": ["primaryExpression"], 
     "DOUBLE_POSITIVE": ["primaryExpression"], 
     "INTEGER_NEGATIVE": ["primaryExpression"], 
     "DECIMAL_NEGATIVE": ["primaryExpression"], 
     "DOUBLE_NEGATIVE": ["primaryExpression"], 
     "PNAME_LN": ["primaryExpression"], 
     "PNAME_NS": ["primaryExpression"]}, 
  "update" : {
     "INSERT": ["prologue","?[update1,?[;,update]]"], 
     "DELETE": ["prologue","?[update1,?[;,update]]"], 
     "LOAD": ["prologue","?[update1,?[;,update]]"], 
     "CLEAR": ["prologue","?[update1,?[;,update]]"], 
     "DROP": ["prologue","?[update1,?[;,update]]"], 
     "ADD": ["prologue","?[update1,?[;,update]]"], 
     "MOVE": ["prologue","?[update1,?[;,update]]"], 
     "COPY": ["prologue","?[update1,?[;,update]]"], 
     "CREATE": ["prologue","?[update1,?[;,update]]"], 
     "WITH": ["prologue","?[update1,?[;,update]]"], 
     "BASE": ["prologue","?[update1,?[;,update]]"], 
     "PREFIX": ["prologue","?[update1,?[;,update]]"], 
     "$": ["prologue","?[update1,?[;,update]]"]}, 
  "update1" : {
     "LOAD": ["load"], 
     "CLEAR": ["clear"], 
     "DROP": ["drop"], 
     "ADD": ["add"], 
     "MOVE": ["move"], 
     "COPY": ["copy"], 
     "CREATE": ["create"], 
     "INSERT": ["INSERT","insert1"], 
     "DELETE": ["DELETE","delete1"], 
     "WITH": ["modify"]}, 
  "updateAll" : {
     "INSERT": ["?[update1,?[;,update]]"], 
     "DELETE": ["?[update1,?[;,update]]"], 
     "LOAD": ["?[update1,?[;,update]]"], 
     "CLEAR": ["?[update1,?[;,update]]"], 
     "DROP": ["?[update1,?[;,update]]"], 
     "ADD": ["?[update1,?[;,update]]"], 
     "MOVE": ["?[update1,?[;,update]]"], 
     "COPY": ["?[update1,?[;,update]]"], 
     "CREATE": ["?[update1,?[;,update]]"], 
     "WITH": ["?[update1,?[;,update]]"], 
     "$": ["?[update1,?[;,update]]"]}, 
  "usingClause" : {
     "USING": ["USING","or([iriRef,[NAMED,iriRef]])"]}, 
  "valueLogical" : {
     "!": ["relationalExpression"], 
     "+": ["relationalExpression"], 
     "-": ["relationalExpression"], 
     "VAR1": ["relationalExpression"], 
     "VAR2": ["relationalExpression"], 
     "(": ["relationalExpression"], 
     "STR": ["relationalExpression"], 
     "LANG": ["relationalExpression"], 
     "LANGMATCHES": ["relationalExpression"], 
     "DATATYPE": ["relationalExpression"], 
     "BOUND": ["relationalExpression"], 
     "IRI": ["relationalExpression"], 
     "URI": ["relationalExpression"], 
     "BNODE": ["relationalExpression"], 
     "RAND": ["relationalExpression"], 
     "ABS": ["relationalExpression"], 
     "CEIL": ["relationalExpression"], 
     "FLOOR": ["relationalExpression"], 
     "ROUND": ["relationalExpression"], 
     "CONCAT": ["relationalExpression"], 
     "STRLEN": ["relationalExpression"], 
     "UCASE": ["relationalExpression"], 
     "LCASE": ["relationalExpression"], 
     "ENCODE_FOR_URI": ["relationalExpression"], 
     "CONTAINS": ["relationalExpression"], 
     "STRSTARTS": ["relationalExpression"], 
     "STRENDS": ["relationalExpression"], 
     "STRBEFORE": ["relationalExpression"], 
     "STRAFTER": ["relationalExpression"], 
     "YEAR": ["relationalExpression"], 
     "MONTH": ["relationalExpression"], 
     "DAY": ["relationalExpression"], 
     "HOURS": ["relationalExpression"], 
     "MINUTES": ["relationalExpression"], 
     "SECONDS": ["relationalExpression"], 
     "TIMEZONE": ["relationalExpression"], 
     "TZ": ["relationalExpression"], 
     "NOW": ["relationalExpression"], 
     "UUID": ["relationalExpression"], 
     "STRUUID": ["relationalExpression"], 
     "MD5": ["relationalExpression"], 
     "SHA1": ["relationalExpression"], 
     "SHA256": ["relationalExpression"], 
     "SHA384": ["relationalExpression"], 
     "SHA512": ["relationalExpression"], 
     "COALESCE": ["relationalExpression"], 
     "IF": ["relationalExpression"], 
     "STRLANG": ["relationalExpression"], 
     "STRDT": ["relationalExpression"], 
     "SAMETERM": ["relationalExpression"], 
     "ISIRI": ["relationalExpression"], 
     "ISURI": ["relationalExpression"], 
     "ISBLANK": ["relationalExpression"], 
     "ISLITERAL": ["relationalExpression"], 
     "ISNUMERIC": ["relationalExpression"], 
     "TRUE": ["relationalExpression"], 
     "FALSE": ["relationalExpression"], 
     "COUNT": ["relationalExpression"], 
     "SUM": ["relationalExpression"], 
     "MIN": ["relationalExpression"], 
     "MAX": ["relationalExpression"], 
     "AVG": ["relationalExpression"], 
     "SAMPLE": ["relationalExpression"], 
     "GROUP_CONCAT": ["relationalExpression"], 
     "SUBSTR": ["relationalExpression"], 
     "REPLACE": ["relationalExpression"], 
     "REGEX": ["relationalExpression"], 
     "EXISTS": ["relationalExpression"], 
     "NOT": ["relationalExpression"], 
     "IRI_REF": ["relationalExpression"], 
     "STRING_LITERAL1": ["relationalExpression"], 
     "STRING_LITERAL2": ["relationalExpression"], 
     "STRING_LITERAL_LONG1": ["relationalExpression"], 
     "STRING_LITERAL_LONG2": ["relationalExpression"], 
     "INTEGER": ["relationalExpression"], 
     "DECIMAL": ["relationalExpression"], 
     "DOUBLE": ["relationalExpression"], 
     "INTEGER_POSITIVE": ["relationalExpression"], 
     "DECIMAL_POSITIVE": ["relationalExpression"], 
     "DOUBLE_POSITIVE": ["relationalExpression"], 
     "INTEGER_NEGATIVE": ["relationalExpression"], 
     "DECIMAL_NEGATIVE": ["relationalExpression"], 
     "DOUBLE_NEGATIVE": ["relationalExpression"], 
     "PNAME_LN": ["relationalExpression"], 
     "PNAME_NS": ["relationalExpression"]}, 
  "valuesClause" : {
     "VALUES": ["VALUES","dataBlock"], 
     "$": [], 
     "}": []}, 
  "var" : {
     "VAR1": ["VAR1"], 
     "VAR2": ["VAR2"]}, 
  "varOrIRIref" : {
     "VAR1": ["var"], 
     "VAR2": ["var"], 
     "IRI_REF": ["iriRef"], 
     "PNAME_LN": ["iriRef"], 
     "PNAME_NS": ["iriRef"]}, 
  "varOrTerm" : {
     "VAR1": ["var"], 
     "VAR2": ["var"], 
     "NIL": ["graphTerm"], 
     "IRI_REF": ["graphTerm"], 
     "TRUE": ["graphTerm"], 
     "FALSE": ["graphTerm"], 
     "BLANK_NODE_LABEL": ["graphTerm"], 
     "ANON": ["graphTerm"], 
     "PNAME_LN": ["graphTerm"], 
     "PNAME_NS": ["graphTerm"], 
     "STRING_LITERAL1": ["graphTerm"], 
     "STRING_LITERAL2": ["graphTerm"], 
     "STRING_LITERAL_LONG1": ["graphTerm"], 
     "STRING_LITERAL_LONG2": ["graphTerm"], 
     "INTEGER": ["graphTerm"], 
     "DECIMAL": ["graphTerm"], 
     "DOUBLE": ["graphTerm"], 
     "INTEGER_POSITIVE": ["graphTerm"], 
     "DECIMAL_POSITIVE": ["graphTerm"], 
     "DOUBLE_POSITIVE": ["graphTerm"], 
     "INTEGER_NEGATIVE": ["graphTerm"], 
     "DECIMAL_NEGATIVE": ["graphTerm"], 
     "DOUBLE_NEGATIVE": ["graphTerm"]}, 
  "verb" : {
     "VAR1": ["storeProperty","varOrIRIref"], 
     "VAR2": ["storeProperty","varOrIRIref"], 
     "IRI_REF": ["storeProperty","varOrIRIref"], 
     "PNAME_LN": ["storeProperty","varOrIRIref"], 
     "PNAME_NS": ["storeProperty","varOrIRIref"], 
     "a": ["storeProperty","a"]}, 
  "verbPath" : {
     "^": ["path"], 
     "a": ["path"], 
     "!": ["path"], 
     "(": ["path"], 
     "IRI_REF": ["path"], 
     "PNAME_LN": ["path"], 
     "PNAME_NS": ["path"]}, 
  "verbSimple" : {
     "VAR1": ["var"], 
     "VAR2": ["var"]}, 
  "whereClause" : {
     "{": ["?WHERE","groupGraphPattern"], 
     "WHERE": ["?WHERE","groupGraphPattern"]}
},

keywords:/^(GROUP_CONCAT|DATATYPE|BASE|PREFIX|SELECT|CONSTRUCT|DESCRIBE|ASK|FROM|NAMED|ORDER|BY|LIMIT|ASC|DESC|OFFSET|DISTINCT|REDUCED|WHERE|GRAPH|OPTIONAL|UNION|FILTER|GROUP|HAVING|AS|VALUES|LOAD|CLEAR|DROP|CREATE|MOVE|COPY|SILENT|INSERT|DELETE|DATA|WITH|TO|USING|NAMED|MINUS|BIND|LANGMATCHES|LANG|BOUND|SAMETERM|ISIRI|ISURI|ISBLANK|ISLITERAL|REGEX|TRUE|FALSE|UNDEF|ADD|DEFAULT|ALL|SERVICE|INTO|IN|NOT|IRI|URI|BNODE|RAND|ABS|CEIL|FLOOR|ROUND|CONCAT|STRLEN|UCASE|LCASE|ENCODE_FOR_URI|CONTAINS|STRSTARTS|STRENDS|STRBEFORE|STRAFTER|YEAR|MONTH|DAY|HOURS|MINUTES|SECONDS|TIMEZONE|TZ|NOW|UUID|STRUUID|MD5|SHA1|SHA256|SHA384|SHA512|COALESCE|IF|STRLANG|STRDT|ISNUMERIC|SUBSTR|REPLACE|EXISTS|COUNT|SUM|MIN|MAX|AVG|SAMPLE|SEPARATOR|STR)/i ,

punct:/^(\*|a|\.|\{|\}|,|\(|\)|;|\[|\]|\|\||&&|=|!=|!|<=|>=|<|>|\+|-|\/|\^\^|\?|\||\^)/ ,

startSymbol:"sparql11",
acceptEmpty:true,
}
},{}],4:[function(require,module,exports){
"use strict";
var CodeMirror = require('codemirror');
CodeMirror.defineMode("sparql11", function(config, parserConfig) {

        var indentUnit = config.indentUnit;

        var grammar = require('./_tokenizer-table.js');
        var ll1_table = grammar.table;

        var IRI_REF = '<[^<>\"\'\|\{\}\^\\\x00-\x20]*>';
        /*
         * PN_CHARS_BASE =
         * '[A-Z]|[a-z]|[\\u00C0-\\u00D6]|[\\u00D8-\\u00F6]|[\\u00F8-\\u02FF]|[\\u0370-\\u037D]|[\\u037F-\\u1FFF]|[\\u200C-\\u200D]|[\\u2070-\\u218F]|[\\u2C00-\\u2FEF]|[\\u3001-\\uD7FF]|[\\uF900-\\uFDCF]|[\\uFDF0-\\uFFFD]|[\\u10000-\\uEFFFF]';
         */

        var PN_CHARS_BASE =
            '[A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD]';
        var PN_CHARS_U = PN_CHARS_BASE+'|_';

        var PN_CHARS= '('+PN_CHARS_U+'|-|[0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040])';
        var VARNAME = '('+PN_CHARS_U+'|[0-9])'+
            '('+PN_CHARS_U+'|[0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040])*';
        var VAR1 = '\\?'+VARNAME;
        var VAR2 = '\\$'+VARNAME;

        var PN_PREFIX= '('+PN_CHARS_BASE+')((('+PN_CHARS+')|\\.)*('+PN_CHARS+'))?';

        var HEX= '[0-9A-Fa-f]';
        var PERCENT='(%'+HEX+HEX+')';
        var PN_LOCAL_ESC='(\\\\[_~\\.\\-!\\$&\'\\(\\)\\*\\+,;=/\\?#@%])';
        var PLX= '('+PERCENT+'|'+PN_LOCAL_ESC+')';
        var PN_LOCAL= '('+PN_CHARS_U+'|:|[0-9]|'+PLX+')(('+PN_CHARS+'|\\.|:|'+PLX+')*('+PN_CHARS+'|:|'+PLX+'))?';
        var BLANK_NODE_LABEL = '_:('+PN_CHARS_U+'|[0-9])(('+PN_CHARS+'|\\.)*'+PN_CHARS+')?';
        var PNAME_NS = '('+PN_PREFIX+')?:';
        var PNAME_LN = PNAME_NS+PN_LOCAL;
        var LANGTAG = '@[a-zA-Z]+(-[a-zA-Z0-9]+)*';

        var EXPONENT = '[eE][\\+-]?[0-9]+';
        var INTEGER = '[0-9]+';
        var DECIMAL = '(([0-9]+\\.[0-9]*)|(\\.[0-9]+))';
        var DOUBLE =
            '(([0-9]+\\.[0-9]*'+EXPONENT+')|'+
            '(\\.[0-9]+'+EXPONENT+')|'+
            '([0-9]+'+EXPONENT+'))';

        var INTEGER_POSITIVE = '\\+' + INTEGER;
        var DECIMAL_POSITIVE = '\\+' + DECIMAL;
        var DOUBLE_POSITIVE  = '\\+' + DOUBLE;
        var INTEGER_NEGATIVE = '-' + INTEGER;
        var DECIMAL_NEGATIVE = '-' + DECIMAL;
        var DOUBLE_NEGATIVE  = '-' + DOUBLE;

        var ECHAR = '\\\\[tbnrf\\\\"\']';


        //IMPORTANT: this unicode rule is not in the official grammar.
        //Reason: https://github.com/YASGUI/YASQE/issues/49
        //unicode escape sequences (which the sparql spec considers part of the pre-processing of sparql queries)
        //are marked as invalid. We have little choice (other than adding a layer of complixity) than to modify the grammar accordingly
        //however, for now only allow these escape sequences in literals (where actually, this should be allows in e.g. prefixes as well)
        var hex4 = HEX + '{4}'
        var unicode = '(\\\\u' + hex4 +'|\\\\U00(10|0' + HEX + ')'+ hex4 + ')';
        var LINE_BREAK = "\n";
        var STRING_LITERAL1 = "'(([^\\x27\\x5C\\x0A\\x0D])|"+ECHAR+"|" + unicode + ")*'";
        var STRING_LITERAL2 = '"(([^\\x22\\x5C\\x0A\\x0D])|'+ECHAR+'|' + unicode + ')*"';

        var STRING_LITERAL_LONG = {
            SINGLE: {
                CAT: "STRING_LITERAL_LONG1",
                QUOTES: "'''",
                CONTENTS: "(('|'')?([^'\\\\]|"+ECHAR+"|"+unicode+"))*",

            },
            DOUBLE: {
                CAT: "STRING_LITERAL_LONG2",
                QUOTES: '"""',
                CONTENTS: '(("|"")?([^"\\\\]|'+ECHAR+'|'+unicode+'))*',
            }
        };
        for (var key in STRING_LITERAL_LONG) {
            STRING_LITERAL_LONG[key].COMPLETE = STRING_LITERAL_LONG[key].QUOTES + STRING_LITERAL_LONG[key].CONTENTS + STRING_LITERAL_LONG[key].QUOTES;
        }
//	var STRING_LITERAL_LONG_QUOTES = {
//		"STRING_LITERAL_LONG_QUOTES1": "'''",
//		"STRING_LITERAL_LONG_QUOTES2": '"""',
//	}
//	var STRING_LITERAL_LONG_CONTENTS = {
//		"STRING_LITERAL_LONG_QUOTES1": "(('|'')?([^'\\\\]|"+ECHAR+"|"+unicode+"))*",
//		"STRING_LITERAL_LONG_QUOTES2": '(("|"")?([^"\\\\]|'+ECHAR+'|'+unicode+'))*'
//	};
//	var STRING_LITERAL_LONG1 = STRING_LITERAL_LONG['SINGLE'].QUOTES + STRING_LITERAL_LONG['SINGLE'].CONTENTS + STRING_LITERAL_LONG['SINGLE'].QUOTES;
//	var STRING_LITERAL_LONG2 = STRING_LITERAL_LONG['DOUBLE'].QUOTES + STRING_LITERAL_LONG['DOUBLE'].CONTENTS + STRING_LITERAL_LONG['DOUBLE'].QUOTES;

//	var stringLiteralLongContentTerminals = {};
//	for (var key in STRING_LITERAL_LONG) {
//		stringLiteralLongContentTerminals[key] = {
//			name: key,
//			regex:new RegExp("^"+STRING_LITERAL_LONG_CONTENTS[key]),
//			style:"string"
//		};
//	}
        //some regular expressions not used in regular terminals, because this is used accross lines
        var stringLiteralLongRegex = {};
        for (var key in STRING_LITERAL_LONG) {
            stringLiteralLongRegex[key] = {
                complete: {
                    name: "STRING_LITERAL_LONG_" + key,
                    regex:new RegExp("^"+STRING_LITERAL_LONG[key].COMPLETE),
                    style:"string"
                },
                contents: {
                    name: "STRING_LITERAL_LONG_" + key,
                    regex:new RegExp("^"+STRING_LITERAL_LONG[key].CONTENTS),
                    style:"string"
                },
                closing: {
                    name: "STRING_LITERAL_LONG_" + key,
                    regex:new RegExp("^"+STRING_LITERAL_LONG[key].CONTENTS + STRING_LITERAL_LONG[key].QUOTES),
                    style:"string"
                },
                quotes: {
                    name: "STRING_LITERAL_LONG_QUOTES_" + key,
                    regex:new RegExp("^"+STRING_LITERAL_LONG[key].QUOTES),
                    style:"string"
                },

            }
        }

        var WS    =        '[\\x20\\x09\\x0D\\x0A]';
        // Careful! Code mirror feeds one line at a time with no \n
        // ... but otherwise comment is terminated by \n
        var COMMENT = '#([^\\n\\r]*[\\n\\r]|[^\\n\\r]*$)';
        var WS_OR_COMMENT_STAR = '('+WS+'|('+COMMENT+'))*';
        var NIL   = '\\('+WS_OR_COMMENT_STAR+'\\)';
        var ANON  = '\\['+WS_OR_COMMENT_STAR+'\\]';
        var terminals= [
            { name: "WS",
                regex:new RegExp("^"+WS+"+"),
                style:"ws" },

            { name: "COMMENT",
                regex:new RegExp("^"+COMMENT),
                style:"comment" },

            { name: "IRI_REF",
                regex:new RegExp("^"+IRI_REF),
                style:"variable-3" },

            { name: "VAR1",
                regex:new RegExp("^"+VAR1),
                style:"atom"},

            { name: "VAR2",
                regex:new RegExp("^"+VAR2),
                style:"atom"},

            { name: "LANGTAG",
                regex:new RegExp("^"+LANGTAG),
                style:"meta"},

            { name: "DOUBLE",
                regex:new RegExp("^"+DOUBLE),
                style:"number" },

            { name: "DECIMAL",
                regex:new RegExp("^"+DECIMAL),
                style:"number" },

            { name: "INTEGER",
                regex:new RegExp("^"+INTEGER),
                style:"number" },

            { name: "DOUBLE_POSITIVE",
                regex:new RegExp("^"+DOUBLE_POSITIVE),
                style:"number" },

            { name: "DECIMAL_POSITIVE",
                regex:new RegExp("^"+DECIMAL_POSITIVE),
                style:"number" },

            { name: "INTEGER_POSITIVE",
                regex:new RegExp("^"+INTEGER_POSITIVE),
                style:"number" },

            { name: "DOUBLE_NEGATIVE",
                regex:new RegExp("^"+DOUBLE_NEGATIVE),
                style:"number" },

            { name: "DECIMAL_NEGATIVE",
                regex:new RegExp("^"+DECIMAL_NEGATIVE),
                style:"number" },

            { name: "INTEGER_NEGATIVE",
                regex:new RegExp("^"+INTEGER_NEGATIVE),
                style:"number" },
//		stringLiteralLongRegex.SINGLE.complete,
//		stringLiteralLongRegex.DOUBLE.complete,
//		stringLiteralLongRegex.SINGLE.quotes,
//		stringLiteralLongRegex.DOUBLE.quotes,

            { name: "STRING_LITERAL1",
                regex:new RegExp("^"+STRING_LITERAL1),
                style:"string" },

            { name: "STRING_LITERAL2",
                regex:new RegExp("^"+STRING_LITERAL2),
                style:"string" },

            // Enclosed comments won't be highlighted
            { name: "NIL",
                regex:new RegExp("^"+NIL),
                style:"punc" },

            // Enclosed comments won't be highlighted
            { name: "ANON",
                regex:new RegExp("^"+ANON),
                style:"punc" },

            { name: "PNAME_LN",
                regex:new RegExp("^"+PNAME_LN),
                style:"string-2" },

            { name: "PNAME_NS",
                regex:new RegExp("^"+PNAME_NS),
                style:"string-2" },

            { name: "BLANK_NODE_LABEL",
                regex:new RegExp("^"+BLANK_NODE_LABEL),
                style:"string-2" }
        ];

        function getPossibles(symbol) {
            var possibles=[], possiblesOb=ll1_table[symbol];
            if (possiblesOb!=undefined) {
                for (var property in possiblesOb) {
                    possibles.push(property.toString());
                }
            } else {
                possibles.push(symbol);
            }
            return possibles;
        }


        function tokenBase(stream, state) {

            function nextToken() {
                var consumed=null;
                if (state.inLiteral) {

                    var closingQuotes = false;
                    //multi-line literal. try to parse contents.
                    consumed = stream.match(stringLiteralLongRegex[state.inLiteral].contents.regex, true, false);
                    if (consumed && consumed[0].length == 0) {
                        //try seeing whether we can consume closing quotes, to avoid stopping
                        consumed = stream.match(stringLiteralLongRegex[state.inLiteral].closing.regex, true, false);
                        closingQuotes = true;
                    }

                    if (consumed && consumed[0].length > 0) {
                        //some string content here.
                        var returnObj = {
                            quotePos: (closingQuotes? 'end': 'content'),
                            cat: STRING_LITERAL_LONG[state.inLiteral].CAT,
                            style: stringLiteralLongRegex[state.inLiteral].complete.style,
                            text: consumed[0],
                            start: stream.start
                        };
                        if (closingQuotes) state.inLiteral = false;
                        return returnObj;
                    }
                }

                //Multiline literals
                for (var quoteType in stringLiteralLongRegex) {
                    consumed= stream.match(stringLiteralLongRegex[quoteType].quotes.regex,true,false);
                    if (consumed) {
                        var quotePos;
                        if (state.inLiteral) {
                            //end of literal. everything is fine
                            state.inLiteral = false;
                            quotePos = 'end';
                        } else {
                            state.inLiteral = quoteType;
                            quotePos = 'start';
                        }
                        return {
                            cat: STRING_LITERAL_LONG[quoteType].CAT,
                            style: stringLiteralLongRegex[quoteType].quotes.style,
                            text: consumed[0],
                            quotePos: quotePos,
                            start: stream.start
                        };
                    }
                }



                // Tokens defined by individual regular expressions
                for (var i=0; i<terminals.length; ++i) {
                    consumed= stream.match(terminals[i].regex,true,false);
                    if (consumed) {
                        return {
                            cat: terminals[i].name,
                            style: terminals[i].style,
                            text: consumed[0],
                            start: stream.start
                        };
                    }
                }

                // Keywords
                consumed= stream.match(grammar.keywords,true,false);
                if (consumed)
                    return { cat: stream.current().toUpperCase(),
                        style: "keyword",
                        text: consumed[0],
                        start: stream.start
                    };

                // Punctuation
                consumed= stream.match(grammar.punct,true,false);
                if (consumed)
                    return { cat: stream.current(),
                        style: "punc",
                        text: consumed[0],
                        start: stream.start
                    };

                // Token is invalid
                // better consume something anyway, or else we're stuck
                consumed= stream.match(/^.[A-Za-z0-9]*/,true,false);
                return { cat:"<invalid_token>",
                    style: "error",
                    text: consumed[0],
                    start: stream.start
                };
            }

            function recordFailurePos() {
                // tokenOb.style= "sp-invalid";
                var col= stream.column();
                state.errorStartPos= col;
                state.errorEndPos= col+tokenOb.text.length;
            };

            function setQueryType(s) {
                if (state.queryType==null) {
                    if (s =="SELECT" || s=="CONSTRUCT" || s=="ASK" || s=="DESCRIBE" || s=="INSERT" || s=="DELETE" || s=="LOAD" || s=="CLEAR" || s=="CREATE" || s=="DROP" || s=="COPY" || s=="MOVE" || s=="ADD")
                        state.queryType=s;
                }
            }

            // Some fake non-terminals are just there to have side-effect on state
            // - i.e. allow or disallow variables and bnodes in certain non-nesting
            // contexts
            function setSideConditions(topSymbol) {
                if (topSymbol=="disallowVars") state.allowVars=false;
                else if (topSymbol=="allowVars") state.allowVars=true;
                else if (topSymbol=="disallowBnodes") state.allowBnodes=false;
                else if (topSymbol=="allowBnodes") state.allowBnodes=true;
                else if (topSymbol=="storeProperty") state.storeProperty=true;
            }

            function checkSideConditions(topSymbol) {
                return(
                (state.allowVars || topSymbol!="var") &&
                (state.allowBnodes ||
                (topSymbol!="blankNode" &&
                topSymbol!="blankNodePropertyList" &&
                topSymbol!="blankNodePropertyListPath")));
            }

            // CodeMirror works with one line at a time,
            // but newline should behave like whitespace
            // - i.e. a definite break between tokens (for autocompleter)
            if (stream.pos==0)
                state.possibleCurrent= state.possibleNext;

            var tokenOb= nextToken();


            if (tokenOb.cat=="<invalid_token>") {
                // set error state, and
                if (state.OK==true) {
                    state.OK=false;
                    recordFailurePos();
                }
                state.complete=false;
                // alert("Invalid:"+tokenOb.text);
                return tokenOb.style;
            }

            if (tokenOb.cat == "WS" || tokenOb.cat == "COMMENT" || (tokenOb.quotePos && tokenOb.quotePos != 'end')) {
                state.possibleCurrent = state.possibleNext;
                return(tokenOb.style);
            }
            // Otherwise, run the parser until the token is digested
            // or failure
            var finished= false;
            var topSymbol;
            var token= tokenOb.cat;

            if (!tokenOb.quotePos || tokenOb.quotePos == 'end') {
                // Incremental LL1 parse
                while(state.stack.length>0 && token && state.OK && !finished ) {
                    topSymbol= state.stack.pop();

                    if (!ll1_table[topSymbol]) {
                        // Top symbol is a terminal
                        if (topSymbol == token) {
                            // Matching terminals
                            // - consume token from input stream
                            finished=true;
                            setQueryType(topSymbol);
                            // Check whether $ (end of input token) is poss next
                            // for everything on stack
                            var allNillable=true;
                            for(var sp=state.stack.length;sp>0;--sp) {
                                var item=ll1_table[state.stack[sp-1]];
                                if (!item || !item["$"])
                                    allNillable=false;
                            }
                            state.complete= allNillable;
                            if (state.storeProperty && token.cat != "punc") {
                                state.lastProperty = tokenOb.text;
                                state.storeProperty = false;
                            }
                        } else {
                            state.OK=false;
                            state.complete=false;
                            recordFailurePos();
                        }
                    } else {
                        // topSymbol is nonterminal
                        // - see if there is an entry for topSymbol
                        // and nextToken in table
                        var nextSymbols= ll1_table[topSymbol][token];
                        if (nextSymbols!=undefined && checkSideConditions(topSymbol)) {
                            // Match - copy RHS of rule to stack
                            for (var i=nextSymbols.length-1; i>=0; --i) {
                                state.stack.push(nextSymbols[i]);
                            }
                            // Peform any non-grammatical side-effects
                            setSideConditions(topSymbol);
                        } else {
                            // No match in table - fail
                            state.OK=false;
                            state.complete=false;
                            recordFailurePos();
                            state.stack.push(topSymbol);  // Shove topSymbol back on stack
                        }
                    }
                }
            }
            if (!finished && state.OK) {
                state.OK=false; state.complete=false; recordFailurePos();
            }

            if (state.possibleCurrent.indexOf('a') >= 0){
                state.lastPredicateOffset = tokenOb.start;
            }
            state.possibleCurrent = state.possibleNext;

            state.possibleNext = getPossibles(state.stack[state.stack.length-1]);

            return tokenOb.style;
        }

        var indentTop={
            "*[,, object]": 3,
            "*[(,),object]": 3,
            "*[(,),objectPath]": 3,
            "*[/,pathEltOrInverse]": 2,
            "object": 2,
            "objectPath": 2,
            "objectList": 2,
            "objectListPath": 2,
            "storeProperty": 2,
            "pathMod": 2,
            "?pathMod": 2,
            "propertyListNotEmpty": 1,
            "propertyList": 1,
            "propertyListPath": 1,
            "propertyListPathNotEmpty": 1,
            "?[verb,objectList]": 1,
//		"?[or([verbPath, verbSimple]),objectList]": 1,
        };

        var indentTable={
            "}":1,
            "]":0,
            ")":1,
            "{":-1,
            "(":-1,
//		"*[;,?[or([verbPath,verbSimple]),objectList]]": 1,
        };


        function indent(state, textAfter) {
            //just avoid we don't indent multi-line  literals
            if (state.inLiteral) return 0;
            if (state.stack.length && state.stack[state.stack.length-1] == "?[or([verbPath,verbSimple]),objectList]") {
                //we are after a semi-colon. I.e., nicely align this line with predicate position of previous line
                return state.lastPredicateOffset;
            } else {
                var n = 0; // indent level
                var i = state.stack.length-1;
                if (/^[\}\]\)]/.test(textAfter)) {
                    // Skip stack items until after matching bracket
                    var closeBracket=textAfter.substr(0,1);
                    for( ;i>=0;--i)	{
                        if (state.stack[i]==closeBracket) {
                            --i;
                            break;
                        };
                    }
                } else {
                    // Consider nullable non-terminals if at top of stack
                    var dn = indentTop[state.stack[i]];
                    if (dn) {
                        n += dn;
                        --i;
                    }
                }
                for( ;i>=0;--i)	{
                    var dn = indentTable[state.stack[i]];
                    if (dn) {
                        n+=dn;
                    }
                }
                return n * config.indentUnit;
            }
        };

        return {
            token: tokenBase,
            startState: function(base) {
                return {
                    tokenize: tokenBase,
                    OK: true,
                    complete: grammar.acceptEmpty,
                    errorStartPos: null,
                    errorEndPos: null,
                    queryType: null,
                    possibleCurrent: getPossibles(grammar.startSymbol),
                    possibleNext: getPossibles(grammar.startSymbol),
                    allowVars : true,
                    allowBnodes : true,
                    storeProperty : false,
                    lastProperty : "",
                    inLiteral: false,
                    stack: [grammar.startSymbol],
                    lastPredicateOffset: config.indentUnit,
                };
            },
            indent: indent,
            electricChars: "}])"
        };
    }
);
CodeMirror.defineMIME("application/x-sparql-query", "sparql11");
},{"./_tokenizer-table.js":3,"codemirror":undefined}],5:[function(require,module,exports){
module.exports = {
	draw: function(parent, svgString) {
		if (!parent) return;
		var el = module.exports.getElement(svgString);
		if (el) {
			if (parent.append) {
				parent.append(el);
			} else {
				//regular dom doc
				parent.appendChild(el);
			}
		}
	},
	getElement: function(svgString) {
		if (svgString && svgString.indexOf("<svg") == 0) {
			//no style passed via config. guess own styles
			var parser = new DOMParser();
			var dom = parser.parseFromString(svgString, "text/xml");
			var svg = dom.documentElement;
			
			var svgContainer = document.createElement("div");
			svgContainer.className = 'svgImg';
			svgContainer.appendChild(svg);
			return svgContainer;
		}
		return false;
	}
};
},{}],6:[function(require,module,exports){
/*
* TRIE implementation in Javascript
* Copyright (c) 2010 Saurabh Odhyan | http://odhyan.com
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*
* Date: Nov 7, 2010
*/

/*
* A trie, or prefix tree, is a multi-way tree structure useful for storing strings over an alphabet. 
* It has been used to store large dictionaries of English (say) words in spell-checking programs 
* and in natural-language "understanding" programs.    
* @see http://en.wikipedia.org/wiki/Trie
* @see http://www.csse.monash.edu.au/~lloyd/tildeAlgDS/Tree/Trie/
/*

* @class Trie
* @constructor
*/  
var Trie = module.exports = function() {
    this.words = 0;
    this.prefixes = 0;
    this.children = [];
};

Trie.prototype = {
    
    /*
    * Insert a word into the dictionary. 
    * Recursively traverse through the trie nodes, and create new node if does not already exist.
    *
    * @method insert
    * @param {String} str Word to insert in the dictionary
    * @param {Integer} pos Current index of the string to be inserted
    * @return {Void}
    */
    insert: function(str, pos) {
        if(str.length == 0) { //blank string cannot be inserted
            return;
        }
        
        var T = this,
            k,
            child;
            
        if(pos === undefined) {
            pos = 0;
        }
        if(pos === str.length) {
            T.words ++;
            return;
        }
        T.prefixes ++;
        k = str[pos];
        if(T.children[k] === undefined) { //if node for this char doesn't exist, create one
            T.children[k] = new Trie();
        }
        child = T.children[k];
        child.insert(str, pos + 1);
    },
    
    /*
    * Remove a word from the dictionary.
    *
    * @method remove
    * @param {String} str Word to be removed
    * @param {Integer} pos Current index of the string to be removed
    * @return {Void}
    */
    remove: function(str, pos) {
        if(str.length == 0) {
            return;
        }
        
        var T = this,
            k,
            child;
        
        if(pos === undefined) {
            pos = 0;
        }   
        if(T === undefined) {
            return;
        }
        if(pos === str.length) {
            T.words --;
            return;
        }
        T.prefixes --;
        k = str[pos];
        child = T.children[k];
        child.remove(str, pos + 1);
    },
    
    /*
    * Update an existing word in the dictionary. 
    * This method removes the old word from the dictionary and inserts the new word.
    *
    * @method update
    * @param {String} strOld The old word to be replaced
    * @param {String} strNew The new word to be inserted
    * @return {Void}
    */
    update: function(strOld, strNew) {
        if(strOld.length == 0 || strNew.length == 0) {
            return;
        }
        this.remove(strOld);
        this.insert(strNew);
    },
    
    /*
    * Count the number of times a given word has been inserted into the dictionary
    *
    * @method countWord
    * @param {String} str Word to get count of
    * @param {Integer} pos Current index of the given word
    * @return {Integer} The number of times a given word exists in the dictionary
    */
    countWord: function(str, pos) {
        if(str.length == 0) {
            return 0;
        }
        
        var T = this,
            k,
            child,
            ret = 0;
        
        if(pos === undefined) {
            pos = 0;
        }   
        if(pos === str.length) {
            return T.words;
        }
        k = str[pos];
        child = T.children[k];
        if(child !== undefined) { //node exists
            ret = child.countWord(str, pos + 1);
        }
        return ret;
    },
    
    /*
    * Count the number of times a given prefix exists in the dictionary
    *
    * @method countPrefix
    * @param {String} str Prefix to get count of
    * @param {Integer} pos Current index of the given prefix
    * @return {Integer} The number of times a given prefix exists in the dictionary
    */
    countPrefix: function(str, pos) {
        if(str.length == 0) {
            return 0;
        }
        
        var T = this,
            k,
            child,
            ret = 0;

        if(pos === undefined) {
            pos = 0;
        }
        if(pos === str.length) {
            return T.prefixes;
        }
        var k = str[pos];
        child = T.children[k];
        if(child !== undefined) { //node exists
            ret = child.countPrefix(str, pos + 1); 
        }
        return ret; 
    },
    
    /*
    * Find a word in the dictionary
    *
    * @method find
    * @param {String} str The word to find in the dictionary
    * @return {Boolean} True if the word exists in the dictionary, else false
    */
    find: function(str) {
        if(str.length == 0) {
            return false;
        }
        
        if(this.countWord(str) > 0) {
            return true;
        } else {
            return false;
        }
    },
    
    /*
    * Get all words in the dictionary
    *
    * @method getAllWords
    * @param {String} str Prefix of current word
    * @return {Array} Array of words in the dictionary
    */
    getAllWords: function(str) {
        var T = this,
            k,
            child,
            ret = [];
        if(str === undefined) {
            str = "";
        }
        if(T === undefined) {
            return [];
        }
        if(T.words > 0) {
            ret.push(str);
        }
        for(k in T.children) {
            child = T.children[k];
            ret = ret.concat(child.getAllWords(str + k));
        }
        return ret;
    },
    
    /*
    * Autocomplete a given prefix
    *
    * @method autoComplete
    * @param {String} str Prefix to be completed based on dictionary entries
    * @param {Integer} pos Current index of the prefix
    * @return {Array} Array of possible suggestions
    */
    autoComplete: function(str, pos) {
        
        
        var T = this,
            k,
            child;
        if(str.length == 0) {
			if (pos === undefined) {
				return T.getAllWords(str);
			} else {
				return [];
			}
        }
        if(pos === undefined) {
            pos = 0;
        }   
        k = str[pos];
        child = T.children[k];
        if(child === undefined) { //node doesn't exist
            return [];
        }
        if(pos === str.length - 1) {
            return child.getAllWords(str);
        }
        return child.autoComplete(str, pos + 1);
    }
};

},{}],7:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  CodeMirror.defineOption("fullScreen", false, function(cm, val, old) {
    if (old == CodeMirror.Init) old = false;
    if (!old == !val) return;
    if (val) setFullscreen(cm);
    else setNormal(cm);
  });

  function setFullscreen(cm) {
    var wrap = cm.getWrapperElement();
    cm.state.fullScreenRestore = {scrollTop: window.pageYOffset, scrollLeft: window.pageXOffset,
                                  width: wrap.style.width, height: wrap.style.height};
    wrap.style.width = "";
    wrap.style.height = "auto";
    wrap.className += " CodeMirror-fullscreen";
    document.documentElement.style.overflow = "hidden";
    cm.refresh();
  }

  function setNormal(cm) {
    var wrap = cm.getWrapperElement();
    wrap.className = wrap.className.replace(/\s*CodeMirror-fullscreen\b/, "");
    document.documentElement.style.overflow = "";
    var info = cm.state.fullScreenRestore;
    wrap.style.width = info.width; wrap.style.height = info.height;
    window.scrollTo(info.scrollLeft, info.scrollTop);
    cm.refresh();
  }
});

},{"../../lib/codemirror":undefined}],8:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  var ie_lt8 = /MSIE \d/.test(navigator.userAgent) &&
    (document.documentMode == null || document.documentMode < 8);

  var Pos = CodeMirror.Pos;

  var matching = {"(": ")>", ")": "(<", "[": "]>", "]": "[<", "{": "}>", "}": "{<"};

  function findMatchingBracket(cm, where, strict, config) {
    var line = cm.getLineHandle(where.line), pos = where.ch - 1;
    var match = (pos >= 0 && matching[line.text.charAt(pos)]) || matching[line.text.charAt(++pos)];
    if (!match) return null;
    var dir = match.charAt(1) == ">" ? 1 : -1;
    if (strict && (dir > 0) != (pos == where.ch)) return null;
    var style = cm.getTokenTypeAt(Pos(where.line, pos + 1));

    var found = scanForBracket(cm, Pos(where.line, pos + (dir > 0 ? 1 : 0)), dir, style || null, config);
    if (found == null) return null;
    return {from: Pos(where.line, pos), to: found && found.pos,
            match: found && found.ch == match.charAt(0), forward: dir > 0};
  }

  // bracketRegex is used to specify which type of bracket to scan
  // should be a regexp, e.g. /[[\]]/
  //
  // Note: If "where" is on an open bracket, then this bracket is ignored.
  //
  // Returns false when no bracket was found, null when it reached
  // maxScanLines and gave up
  function scanForBracket(cm, where, dir, style, config) {
    var maxScanLen = (config && config.maxScanLineLength) || 10000;
    var maxScanLines = (config && config.maxScanLines) || 1000;

    var stack = [];
    var re = config && config.bracketRegex ? config.bracketRegex : /[(){}[\]]/;
    var lineEnd = dir > 0 ? Math.min(where.line + maxScanLines, cm.lastLine() + 1)
                          : Math.max(cm.firstLine() - 1, where.line - maxScanLines);
    for (var lineNo = where.line; lineNo != lineEnd; lineNo += dir) {
      var line = cm.getLine(lineNo);
      if (!line) continue;
      var pos = dir > 0 ? 0 : line.length - 1, end = dir > 0 ? line.length : -1;
      if (line.length > maxScanLen) continue;
      if (lineNo == where.line) pos = where.ch - (dir < 0 ? 1 : 0);
      for (; pos != end; pos += dir) {
        var ch = line.charAt(pos);
        if (re.test(ch) && (style === undefined || cm.getTokenTypeAt(Pos(lineNo, pos + 1)) == style)) {
          var match = matching[ch];
          if ((match.charAt(1) == ">") == (dir > 0)) stack.push(ch);
          else if (!stack.length) return {pos: Pos(lineNo, pos), ch: ch};
          else stack.pop();
        }
      }
    }
    return lineNo - dir == (dir > 0 ? cm.lastLine() : cm.firstLine()) ? false : null;
  }

  function matchBrackets(cm, autoclear, config) {
    // Disable brace matching in long lines, since it'll cause hugely slow updates
    var maxHighlightLen = cm.state.matchBrackets.maxHighlightLineLength || 1000;
    var marks = [], ranges = cm.listSelections();
    for (var i = 0; i < ranges.length; i++) {
      var match = ranges[i].empty() && findMatchingBracket(cm, ranges[i].head, false, config);
      if (match && cm.getLine(match.from.line).length <= maxHighlightLen) {
        var style = match.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
        marks.push(cm.markText(match.from, Pos(match.from.line, match.from.ch + 1), {className: style}));
        if (match.to && cm.getLine(match.to.line).length <= maxHighlightLen)
          marks.push(cm.markText(match.to, Pos(match.to.line, match.to.ch + 1), {className: style}));
      }
    }

    if (marks.length) {
      // Kludge to work around the IE bug from issue #1193, where text
      // input stops going to the textare whever this fires.
      if (ie_lt8 && cm.state.focused) cm.display.input.focus();

      var clear = function() {
        cm.operation(function() {
          for (var i = 0; i < marks.length; i++) marks[i].clear();
        });
      };
      if (autoclear) setTimeout(clear, 800);
      else return clear;
    }
  }

  var currentlyHighlighted = null;
  function doMatchBrackets(cm) {
    cm.operation(function() {
      if (currentlyHighlighted) {currentlyHighlighted(); currentlyHighlighted = null;}
      currentlyHighlighted = matchBrackets(cm, false, cm.state.matchBrackets);
    });
  }

  CodeMirror.defineOption("matchBrackets", false, function(cm, val, old) {
    if (old && old != CodeMirror.Init)
      cm.off("cursorActivity", doMatchBrackets);
    if (val) {
      cm.state.matchBrackets = typeof val == "object" ? val : {};
      cm.on("cursorActivity", doMatchBrackets);
    }
  });

  CodeMirror.defineExtension("matchBrackets", function() {matchBrackets(this, true);});
  CodeMirror.defineExtension("findMatchingBracket", function(pos, strict, config){
    return findMatchingBracket(this, pos, strict, config);
  });
  CodeMirror.defineExtension("scanForBracket", function(pos, dir, style, config){
    return scanForBracket(this, pos, dir, style, config);
  });
});

},{"../../lib/codemirror":undefined}],9:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.registerHelper("fold", "brace", function(cm, start) {
  var line = start.line, lineText = cm.getLine(line);
  var startCh, tokenType;

  function findOpening(openCh) {
    for (var at = start.ch, pass = 0;;) {
      var found = at <= 0 ? -1 : lineText.lastIndexOf(openCh, at - 1);
      if (found == -1) {
        if (pass == 1) break;
        pass = 1;
        at = lineText.length;
        continue;
      }
      if (pass == 1 && found < start.ch) break;
      tokenType = cm.getTokenTypeAt(CodeMirror.Pos(line, found + 1));
      if (!/^(comment|string)/.test(tokenType)) return found + 1;
      at = found - 1;
    }
  }

  var startToken = "{", endToken = "}", startCh = findOpening("{");
  if (startCh == null) {
    startToken = "[", endToken = "]";
    startCh = findOpening("[");
  }

  if (startCh == null) return;
  var count = 1, lastLine = cm.lastLine(), end, endCh;
  outer: for (var i = line; i <= lastLine; ++i) {
    var text = cm.getLine(i), pos = i == line ? startCh : 0;
    for (;;) {
      var nextOpen = text.indexOf(startToken, pos), nextClose = text.indexOf(endToken, pos);
      if (nextOpen < 0) nextOpen = text.length;
      if (nextClose < 0) nextClose = text.length;
      pos = Math.min(nextOpen, nextClose);
      if (pos == text.length) break;
      if (cm.getTokenTypeAt(CodeMirror.Pos(i, pos + 1)) == tokenType) {
        if (pos == nextOpen) ++count;
        else if (!--count) { end = i; endCh = pos; break outer; }
      }
      ++pos;
    }
  }
  if (end == null || line == end && endCh == startCh) return;
  return {from: CodeMirror.Pos(line, startCh),
          to: CodeMirror.Pos(end, endCh)};
});

CodeMirror.registerHelper("fold", "import", function(cm, start) {
  function hasImport(line) {
    if (line < cm.firstLine() || line > cm.lastLine()) return null;
    var start = cm.getTokenAt(CodeMirror.Pos(line, 1));
    if (!/\S/.test(start.string)) start = cm.getTokenAt(CodeMirror.Pos(line, start.end + 1));
    if (start.type != "keyword" || start.string != "import") return null;
    // Now find closing semicolon, return its position
    for (var i = line, e = Math.min(cm.lastLine(), line + 10); i <= e; ++i) {
      var text = cm.getLine(i), semi = text.indexOf(";");
      if (semi != -1) return {startCh: start.end, end: CodeMirror.Pos(i, semi)};
    }
  }

  var start = start.line, has = hasImport(start), prev;
  if (!has || hasImport(start - 1) || ((prev = hasImport(start - 2)) && prev.end.line == start - 1))
    return null;
  for (var end = has.end;;) {
    var next = hasImport(end.line + 1);
    if (next == null) break;
    end = next.end;
  }
  return {from: cm.clipPos(CodeMirror.Pos(start, has.startCh + 1)), to: end};
});

CodeMirror.registerHelper("fold", "include", function(cm, start) {
  function hasInclude(line) {
    if (line < cm.firstLine() || line > cm.lastLine()) return null;
    var start = cm.getTokenAt(CodeMirror.Pos(line, 1));
    if (!/\S/.test(start.string)) start = cm.getTokenAt(CodeMirror.Pos(line, start.end + 1));
    if (start.type == "meta" && start.string.slice(0, 8) == "#include") return start.start + 8;
  }

  var start = start.line, has = hasInclude(start);
  if (has == null || hasInclude(start - 1) != null) return null;
  for (var end = start;;) {
    var next = hasInclude(end + 1);
    if (next == null) break;
    ++end;
  }
  return {from: CodeMirror.Pos(start, has + 1),
          to: cm.clipPos(CodeMirror.Pos(end))};
});

});

},{"../../lib/codemirror":undefined}],10:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  function doFold(cm, pos, options, force) {
    if (options && options.call) {
      var finder = options;
      options = null;
    } else {
      var finder = getOption(cm, options, "rangeFinder");
    }
    if (typeof pos == "number") pos = CodeMirror.Pos(pos, 0);
    var minSize = getOption(cm, options, "minFoldSize");

    function getRange(allowFolded) {
      var range = finder(cm, pos);
      if (!range || range.to.line - range.from.line < minSize) return null;
      var marks = cm.findMarksAt(range.from);
      for (var i = 0; i < marks.length; ++i) {
        if (marks[i].__isFold && force !== "fold") {
          if (!allowFolded) return null;
          range.cleared = true;
          marks[i].clear();
        }
      }
      return range;
    }

    var range = getRange(true);
    if (getOption(cm, options, "scanUp")) while (!range && pos.line > cm.firstLine()) {
      pos = CodeMirror.Pos(pos.line - 1, 0);
      range = getRange(false);
    }
    if (!range || range.cleared || force === "unfold") return;

    var myWidget = makeWidget(cm, options);
    CodeMirror.on(myWidget, "mousedown", function(e) {
      myRange.clear();
      CodeMirror.e_preventDefault(e);
    });
    var myRange = cm.markText(range.from, range.to, {
      replacedWith: myWidget,
      clearOnEnter: true,
      __isFold: true
    });
    myRange.on("clear", function(from, to) {
      CodeMirror.signal(cm, "unfold", cm, from, to);
    });
    CodeMirror.signal(cm, "fold", cm, range.from, range.to);
  }

  function makeWidget(cm, options) {
    var widget = getOption(cm, options, "widget");
    if (typeof widget == "string") {
      var text = document.createTextNode(widget);
      widget = document.createElement("span");
      widget.appendChild(text);
      widget.className = "CodeMirror-foldmarker";
    }
    return widget;
  }

  // Clumsy backwards-compatible interface
  CodeMirror.newFoldFunction = function(rangeFinder, widget) {
    return function(cm, pos) { doFold(cm, pos, {rangeFinder: rangeFinder, widget: widget}); };
  };

  // New-style interface
  CodeMirror.defineExtension("foldCode", function(pos, options, force) {
    doFold(this, pos, options, force);
  });

  CodeMirror.defineExtension("isFolded", function(pos) {
    var marks = this.findMarksAt(pos);
    for (var i = 0; i < marks.length; ++i)
      if (marks[i].__isFold) return true;
  });

  CodeMirror.commands.toggleFold = function(cm) {
    cm.foldCode(cm.getCursor());
  };
  CodeMirror.commands.fold = function(cm) {
    cm.foldCode(cm.getCursor(), null, "fold");
  };
  CodeMirror.commands.unfold = function(cm) {
    cm.foldCode(cm.getCursor(), null, "unfold");
  };
  CodeMirror.commands.foldAll = function(cm) {
    cm.operation(function() {
      for (var i = cm.firstLine(), e = cm.lastLine(); i <= e; i++)
        cm.foldCode(CodeMirror.Pos(i, 0), null, "fold");
    });
  };
  CodeMirror.commands.unfoldAll = function(cm) {
    cm.operation(function() {
      for (var i = cm.firstLine(), e = cm.lastLine(); i <= e; i++)
        cm.foldCode(CodeMirror.Pos(i, 0), null, "unfold");
    });
  };

  CodeMirror.registerHelper("fold", "combine", function() {
    var funcs = Array.prototype.slice.call(arguments, 0);
    return function(cm, start) {
      for (var i = 0; i < funcs.length; ++i) {
        var found = funcs[i](cm, start);
        if (found) return found;
      }
    };
  });

  CodeMirror.registerHelper("fold", "auto", function(cm, start) {
    var helpers = cm.getHelpers(start, "fold");
    for (var i = 0; i < helpers.length; i++) {
      var cur = helpers[i](cm, start);
      if (cur) return cur;
    }
  });

  var defaultOptions = {
    rangeFinder: CodeMirror.fold.auto,
    widget: "\u2194",
    minFoldSize: 0,
    scanUp: false
  };

  CodeMirror.defineOption("foldOptions", null);

  function getOption(cm, options, name) {
    if (options && options[name] !== undefined)
      return options[name];
    var editorOptions = cm.options.foldOptions;
    if (editorOptions && editorOptions[name] !== undefined)
      return editorOptions[name];
    return defaultOptions[name];
  }

  CodeMirror.defineExtension("foldOption", function(options, name) {
    return getOption(this, options, name);
  });
});

},{"../../lib/codemirror":undefined}],11:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("./foldcode"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "./foldcode"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  CodeMirror.defineOption("foldGutter", false, function(cm, val, old) {
    if (old && old != CodeMirror.Init) {
      cm.clearGutter(cm.state.foldGutter.options.gutter);
      cm.state.foldGutter = null;
      cm.off("gutterClick", onGutterClick);
      cm.off("change", onChange);
      cm.off("viewportChange", onViewportChange);
      cm.off("fold", onFold);
      cm.off("unfold", onFold);
      cm.off("swapDoc", updateInViewport);
    }
    if (val) {
      cm.state.foldGutter = new State(parseOptions(val));
      updateInViewport(cm);
      cm.on("gutterClick", onGutterClick);
      cm.on("change", onChange);
      cm.on("viewportChange", onViewportChange);
      cm.on("fold", onFold);
      cm.on("unfold", onFold);
      cm.on("swapDoc", updateInViewport);
    }
  });

  var Pos = CodeMirror.Pos;

  function State(options) {
    this.options = options;
    this.from = this.to = 0;
  }

  function parseOptions(opts) {
    if (opts === true) opts = {};
    if (opts.gutter == null) opts.gutter = "CodeMirror-foldgutter";
    if (opts.indicatorOpen == null) opts.indicatorOpen = "CodeMirror-foldgutter-open";
    if (opts.indicatorFolded == null) opts.indicatorFolded = "CodeMirror-foldgutter-folded";
    return opts;
  }

  function isFolded(cm, line) {
    var marks = cm.findMarksAt(Pos(line));
    for (var i = 0; i < marks.length; ++i)
      if (marks[i].__isFold && marks[i].find().from.line == line) return true;
  }

  function marker(spec) {
    if (typeof spec == "string") {
      var elt = document.createElement("div");
      elt.className = spec + " CodeMirror-guttermarker-subtle";
      return elt;
    } else {
      return spec.cloneNode(true);
    }
  }

  function updateFoldInfo(cm, from, to) {
    var opts = cm.state.foldGutter.options, cur = from;
    var minSize = cm.foldOption(opts, "minFoldSize");
    var func = cm.foldOption(opts, "rangeFinder");
    cm.eachLine(from, to, function(line) {
      var mark = null;
      if (isFolded(cm, cur)) {
        mark = marker(opts.indicatorFolded);
      } else {
        var pos = Pos(cur, 0);
        var range = func && func(cm, pos);
        if (range && range.to.line - range.from.line >= minSize)
          mark = marker(opts.indicatorOpen);
      }
      cm.setGutterMarker(line, opts.gutter, mark);
      ++cur;
    });
  }

  function updateInViewport(cm) {
    var vp = cm.getViewport(), state = cm.state.foldGutter;
    if (!state) return;
    cm.operation(function() {
      updateFoldInfo(cm, vp.from, vp.to);
    });
    state.from = vp.from; state.to = vp.to;
  }

  function onGutterClick(cm, line, gutter) {
    var state = cm.state.foldGutter;
    if (!state) return;
    var opts = state.options;
    if (gutter != opts.gutter) return;
    cm.foldCode(Pos(line, 0), opts.rangeFinder);
  }

  function onChange(cm) {
    var state = cm.state.foldGutter;
    if (!state) return;
    var opts = state.options;
    state.from = state.to = 0;
    clearTimeout(state.changeUpdate);
    state.changeUpdate = setTimeout(function() { updateInViewport(cm); }, opts.foldOnChangeTimeSpan || 600);
  }

  function onViewportChange(cm) {
    var state = cm.state.foldGutter;
    if (!state) return;
    var opts = state.options;
    clearTimeout(state.changeUpdate);
    state.changeUpdate = setTimeout(function() {
      var vp = cm.getViewport();
      if (state.from == state.to || vp.from - state.to > 20 || state.from - vp.to > 20) {
        updateInViewport(cm);
      } else {
        cm.operation(function() {
          if (vp.from < state.from) {
            updateFoldInfo(cm, vp.from, state.from);
            state.from = vp.from;
          }
          if (vp.to > state.to) {
            updateFoldInfo(cm, state.to, vp.to);
            state.to = vp.to;
          }
        });
      }
    }, opts.updateViewportTimeSpan || 400);
  }

  function onFold(cm, from) {
    var state = cm.state.foldGutter;
    if (!state) return;
    var line = from.line;
    if (line >= state.from && line < state.to)
      updateFoldInfo(cm, line, line + 1);
  }
});

},{"../../lib/codemirror":undefined,"./foldcode":10}],12:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var Pos = CodeMirror.Pos;
  function cmp(a, b) { return a.line - b.line || a.ch - b.ch; }

  var nameStartChar = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
  var nameChar = nameStartChar + "\-\:\.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
  var xmlTagStart = new RegExp("<(/?)([" + nameStartChar + "][" + nameChar + "]*)", "g");

  function Iter(cm, line, ch, range) {
    this.line = line; this.ch = ch;
    this.cm = cm; this.text = cm.getLine(line);
    this.min = range ? range.from : cm.firstLine();
    this.max = range ? range.to - 1 : cm.lastLine();
  }

  function tagAt(iter, ch) {
    var type = iter.cm.getTokenTypeAt(Pos(iter.line, ch));
    return type && /\btag\b/.test(type);
  }

  function nextLine(iter) {
    if (iter.line >= iter.max) return;
    iter.ch = 0;
    iter.text = iter.cm.getLine(++iter.line);
    return true;
  }
  function prevLine(iter) {
    if (iter.line <= iter.min) return;
    iter.text = iter.cm.getLine(--iter.line);
    iter.ch = iter.text.length;
    return true;
  }

  function toTagEnd(iter) {
    for (;;) {
      var gt = iter.text.indexOf(">", iter.ch);
      if (gt == -1) { if (nextLine(iter)) continue; else return; }
      if (!tagAt(iter, gt + 1)) { iter.ch = gt + 1; continue; }
      var lastSlash = iter.text.lastIndexOf("/", gt);
      var selfClose = lastSlash > -1 && !/\S/.test(iter.text.slice(lastSlash + 1, gt));
      iter.ch = gt + 1;
      return selfClose ? "selfClose" : "regular";
    }
  }
  function toTagStart(iter) {
    for (;;) {
      var lt = iter.ch ? iter.text.lastIndexOf("<", iter.ch - 1) : -1;
      if (lt == -1) { if (prevLine(iter)) continue; else return; }
      if (!tagAt(iter, lt + 1)) { iter.ch = lt; continue; }
      xmlTagStart.lastIndex = lt;
      iter.ch = lt;
      var match = xmlTagStart.exec(iter.text);
      if (match && match.index == lt) return match;
    }
  }

  function toNextTag(iter) {
    for (;;) {
      xmlTagStart.lastIndex = iter.ch;
      var found = xmlTagStart.exec(iter.text);
      if (!found) { if (nextLine(iter)) continue; else return; }
      if (!tagAt(iter, found.index + 1)) { iter.ch = found.index + 1; continue; }
      iter.ch = found.index + found[0].length;
      return found;
    }
  }
  function toPrevTag(iter) {
    for (;;) {
      var gt = iter.ch ? iter.text.lastIndexOf(">", iter.ch - 1) : -1;
      if (gt == -1) { if (prevLine(iter)) continue; else return; }
      if (!tagAt(iter, gt + 1)) { iter.ch = gt; continue; }
      var lastSlash = iter.text.lastIndexOf("/", gt);
      var selfClose = lastSlash > -1 && !/\S/.test(iter.text.slice(lastSlash + 1, gt));
      iter.ch = gt + 1;
      return selfClose ? "selfClose" : "regular";
    }
  }

  function findMatchingClose(iter, tag) {
    var stack = [];
    for (;;) {
      var next = toNextTag(iter), end, startLine = iter.line, startCh = iter.ch - (next ? next[0].length : 0);
      if (!next || !(end = toTagEnd(iter))) return;
      if (end == "selfClose") continue;
      if (next[1]) { // closing tag
        for (var i = stack.length - 1; i >= 0; --i) if (stack[i] == next[2]) {
          stack.length = i;
          break;
        }
        if (i < 0 && (!tag || tag == next[2])) return {
          tag: next[2],
          from: Pos(startLine, startCh),
          to: Pos(iter.line, iter.ch)
        };
      } else { // opening tag
        stack.push(next[2]);
      }
    }
  }
  function findMatchingOpen(iter, tag) {
    var stack = [];
    for (;;) {
      var prev = toPrevTag(iter);
      if (!prev) return;
      if (prev == "selfClose") { toTagStart(iter); continue; }
      var endLine = iter.line, endCh = iter.ch;
      var start = toTagStart(iter);
      if (!start) return;
      if (start[1]) { // closing tag
        stack.push(start[2]);
      } else { // opening tag
        for (var i = stack.length - 1; i >= 0; --i) if (stack[i] == start[2]) {
          stack.length = i;
          break;
        }
        if (i < 0 && (!tag || tag == start[2])) return {
          tag: start[2],
          from: Pos(iter.line, iter.ch),
          to: Pos(endLine, endCh)
        };
      }
    }
  }

  CodeMirror.registerHelper("fold", "xml", function(cm, start) {
    var iter = new Iter(cm, start.line, 0);
    for (;;) {
      var openTag = toNextTag(iter), end;
      if (!openTag || iter.line != start.line || !(end = toTagEnd(iter))) return;
      if (!openTag[1] && end != "selfClose") {
        var start = Pos(iter.line, iter.ch);
        var close = findMatchingClose(iter, openTag[2]);
        return close && {from: start, to: close.from};
      }
    }
  });
  CodeMirror.findMatchingTag = function(cm, pos, range) {
    var iter = new Iter(cm, pos.line, pos.ch, range);
    if (iter.text.indexOf(">") == -1 && iter.text.indexOf("<") == -1) return;
    var end = toTagEnd(iter), to = end && Pos(iter.line, iter.ch);
    var start = end && toTagStart(iter);
    if (!end || !start || cmp(iter, pos) > 0) return;
    var here = {from: Pos(iter.line, iter.ch), to: to, tag: start[2]};
    if (end == "selfClose") return {open: here, close: null, at: "open"};

    if (start[1]) { // closing tag
      return {open: findMatchingOpen(iter, start[2]), close: here, at: "close"};
    } else { // opening tag
      iter = new Iter(cm, to.line, to.ch, range);
      return {open: here, close: findMatchingClose(iter, start[2]), at: "open"};
    }
  };

  CodeMirror.findEnclosingTag = function(cm, pos, range) {
    var iter = new Iter(cm, pos.line, pos.ch, range);
    for (;;) {
      var open = findMatchingOpen(iter);
      if (!open) break;
      var forward = new Iter(cm, pos.line, pos.ch, range);
      var close = findMatchingClose(forward, open.tag);
      if (close) return {open: open, close: close};
    }
  };

  // Used by addon/edit/closetag.js
  CodeMirror.scanForClosingTag = function(cm, pos, name, end) {
    var iter = new Iter(cm, pos.line, pos.ch, end ? {from: 0, to: end} : null);
    return findMatchingClose(iter, name);
  };
});

},{"../../lib/codemirror":undefined}],13:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var HINT_ELEMENT_CLASS        = "CodeMirror-hint";
  var ACTIVE_HINT_ELEMENT_CLASS = "CodeMirror-hint-active";

  // This is the old interface, kept around for now to stay
  // backwards-compatible.
  CodeMirror.showHint = function(cm, getHints, options) {
    if (!getHints) return cm.showHint(options);
    if (options && options.async) getHints.async = true;
    var newOpts = {hint: getHints};
    if (options) for (var prop in options) newOpts[prop] = options[prop];
    return cm.showHint(newOpts);
  };

  var asyncRunID = 0;
  function retrieveHints(getter, cm, options, then) {
    if (getter.async) {
      var id = ++asyncRunID;
      getter(cm, function(hints) {
        if (asyncRunID == id) then(hints);
      }, options);
    } else {
      then(getter(cm, options));
    }
  }

  CodeMirror.defineExtension("showHint", function(options) {
    // We want a single cursor position.
    if (this.listSelections().length > 1 || this.somethingSelected()) return;

    if (this.state.completionActive) this.state.completionActive.close();
    var completion = this.state.completionActive = new Completion(this, options);
    var getHints = completion.options.hint;
    if (!getHints) return;

    CodeMirror.signal(this, "startCompletion", this);
    return retrieveHints(getHints, this, completion.options, function(hints) { completion.showHints(hints); });
  });

  function Completion(cm, options) {
    this.cm = cm;
    this.options = this.buildOptions(options);
    this.widget = this.onClose = null;
  }

  Completion.prototype = {
    close: function() {
      if (!this.active()) return;
      this.cm.state.completionActive = null;

      if (this.widget) this.widget.close();
      if (this.onClose) this.onClose();
      CodeMirror.signal(this.cm, "endCompletion", this.cm);
    },

    active: function() {
      return this.cm.state.completionActive == this;
    },

    pick: function(data, i) {
      var completion = data.list[i];
      if (completion.hint) completion.hint(this.cm, data, completion);
      else this.cm.replaceRange(getText(completion), completion.from || data.from,
                                completion.to || data.to, "complete");
      CodeMirror.signal(data, "pick", completion);
      this.close();
    },

    showHints: function(data) {
      if (!data || !data.list.length || !this.active()) return this.close();

      if (this.options.completeSingle && data.list.length == 1)
        this.pick(data, 0);
      else
        this.showWidget(data);
    },

    showWidget: function(data) {
      this.widget = new Widget(this, data);
      CodeMirror.signal(data, "shown");

      var debounce = 0, completion = this, finished;
      var closeOn = this.options.closeCharacters;
      var startPos = this.cm.getCursor(), startLen = this.cm.getLine(startPos.line).length;

      var requestAnimationFrame = window.requestAnimationFrame || function(fn) {
        return setTimeout(fn, 1000/60);
      };
      var cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

      function done() {
        if (finished) return;
        finished = true;
        completion.close();
        completion.cm.off("cursorActivity", activity);
        if (data) CodeMirror.signal(data, "close");
      }

      function update() {
        if (finished) return;
        CodeMirror.signal(data, "update");
        retrieveHints(completion.options.hint, completion.cm, completion.options, finishUpdate);
      }
      function finishUpdate(data_) {
        data = data_;
        if (finished) return;
        if (!data || !data.list.length) return done();
        if (completion.widget) completion.widget.close();
        completion.widget = new Widget(completion, data);
      }

      function clearDebounce() {
        if (debounce) {
          cancelAnimationFrame(debounce);
          debounce = 0;
        }
      }

      function activity() {
        clearDebounce();
        var pos = completion.cm.getCursor(), line = completion.cm.getLine(pos.line);
        if (pos.line != startPos.line || line.length - pos.ch != startLen - startPos.ch ||
            pos.ch < startPos.ch || completion.cm.somethingSelected() ||
            (pos.ch && closeOn.test(line.charAt(pos.ch - 1)))) {
          completion.close();
        } else {
          debounce = requestAnimationFrame(update);
          if (completion.widget) completion.widget.close();
        }
      }
      this.cm.on("cursorActivity", activity);
      this.onClose = done;
    },

    buildOptions: function(options) {
      var editor = this.cm.options.hintOptions;
      var out = {};
      for (var prop in defaultOptions) out[prop] = defaultOptions[prop];
      if (editor) for (var prop in editor)
        if (editor[prop] !== undefined) out[prop] = editor[prop];
      if (options) for (var prop in options)
        if (options[prop] !== undefined) out[prop] = options[prop];
      return out;
    }
  };

  function getText(completion) {
    if (typeof completion == "string") return completion;
    else return completion.text;
  }

  function buildKeyMap(completion, handle) {
    var baseMap = {
      Up: function() {handle.moveFocus(-1);},
      Down: function() {handle.moveFocus(1);},
      PageUp: function() {handle.moveFocus(-handle.menuSize() + 1, true);},
      PageDown: function() {handle.moveFocus(handle.menuSize() - 1, true);},
      Home: function() {handle.setFocus(0);},
      End: function() {handle.setFocus(handle.length - 1);},
      Enter: handle.pick,
      Tab: handle.pick,
      Esc: handle.close
    };
    var custom = completion.options.customKeys;
    var ourMap = custom ? {} : baseMap;
    function addBinding(key, val) {
      var bound;
      if (typeof val != "string")
        bound = function(cm) { return val(cm, handle); };
      // This mechanism is deprecated
      else if (baseMap.hasOwnProperty(val))
        bound = baseMap[val];
      else
        bound = val;
      ourMap[key] = bound;
    }
    if (custom)
      for (var key in custom) if (custom.hasOwnProperty(key))
        addBinding(key, custom[key]);
    var extra = completion.options.extraKeys;
    if (extra)
      for (var key in extra) if (extra.hasOwnProperty(key))
        addBinding(key, extra[key]);
    return ourMap;
  }

  function getHintElement(hintsElement, el) {
    while (el && el != hintsElement) {
      if (el.nodeName.toUpperCase() === "LI" && el.parentNode == hintsElement) return el;
      el = el.parentNode;
    }
  }

  function Widget(completion, data) {
    this.completion = completion;
    this.data = data;
    var widget = this, cm = completion.cm;

    var hints = this.hints = document.createElement("ul");
    hints.className = "CodeMirror-hints";
    this.selectedHint = data.selectedHint || 0;

    var completions = data.list;
    for (var i = 0; i < completions.length; ++i) {
      var elt = hints.appendChild(document.createElement("li")), cur = completions[i];
      var className = HINT_ELEMENT_CLASS + (i != this.selectedHint ? "" : " " + ACTIVE_HINT_ELEMENT_CLASS);
      if (cur.className != null) className = cur.className + " " + className;
      elt.className = className;
      if (cur.render) cur.render(elt, data, cur);
      else elt.appendChild(document.createTextNode(cur.displayText || getText(cur)));
      elt.hintId = i;
    }

    var pos = cm.cursorCoords(completion.options.alignWithWord ? data.from : null);
    var left = pos.left, top = pos.bottom, below = true;
    hints.style.left = left + "px";
    hints.style.top = top + "px";
    // If we're at the edge of the screen, then we want the menu to appear on the left of the cursor.
    var winW = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
    var winH = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
    (completion.options.container || document.body).appendChild(hints);
    var box = hints.getBoundingClientRect(), overlapY = box.bottom - winH;
    if (overlapY > 0) {
      var height = box.bottom - box.top, curTop = pos.top - (pos.bottom - box.top);
      if (curTop - height > 0) { // Fits above cursor
        hints.style.top = (top = pos.top - height) + "px";
        below = false;
      } else if (height > winH) {
        hints.style.height = (winH - 5) + "px";
        hints.style.top = (top = pos.bottom - box.top) + "px";
        var cursor = cm.getCursor();
        if (data.from.ch != cursor.ch) {
          pos = cm.cursorCoords(cursor);
          hints.style.left = (left = pos.left) + "px";
          box = hints.getBoundingClientRect();
        }
      }
    }
    var overlapX = box.right - winW;
    if (overlapX > 0) {
      if (box.right - box.left > winW) {
        hints.style.width = (winW - 5) + "px";
        overlapX -= (box.right - box.left) - winW;
      }
      hints.style.left = (left = pos.left - overlapX) + "px";
    }

    cm.addKeyMap(this.keyMap = buildKeyMap(completion, {
      moveFocus: function(n, avoidWrap) { widget.changeActive(widget.selectedHint + n, avoidWrap); },
      setFocus: function(n) { widget.changeActive(n); },
      menuSize: function() { return widget.screenAmount(); },
      length: completions.length,
      close: function() { completion.close(); },
      pick: function() { widget.pick(); },
      data: data
    }));

    if (completion.options.closeOnUnfocus) {
      var closingOnBlur;
      cm.on("blur", this.onBlur = function() { closingOnBlur = setTimeout(function() { completion.close(); }, 100); });
      cm.on("focus", this.onFocus = function() { clearTimeout(closingOnBlur); });
    }

    var startScroll = cm.getScrollInfo();
    cm.on("scroll", this.onScroll = function() {
      var curScroll = cm.getScrollInfo(), editor = cm.getWrapperElement().getBoundingClientRect();
      var newTop = top + startScroll.top - curScroll.top;
      var point = newTop - (window.pageYOffset || (document.documentElement || document.body).scrollTop);
      if (!below) point += hints.offsetHeight;
      if (point <= editor.top || point >= editor.bottom) return completion.close();
      hints.style.top = newTop + "px";
      hints.style.left = (left + startScroll.left - curScroll.left) + "px";
    });

    CodeMirror.on(hints, "dblclick", function(e) {
      var t = getHintElement(hints, e.target || e.srcElement);
      if (t && t.hintId != null) {widget.changeActive(t.hintId); widget.pick();}
    });

    CodeMirror.on(hints, "click", function(e) {
      var t = getHintElement(hints, e.target || e.srcElement);
      if (t && t.hintId != null) {
        widget.changeActive(t.hintId);
        if (completion.options.completeOnSingleClick) widget.pick();
      }
    });

    CodeMirror.on(hints, "mousedown", function() {
      setTimeout(function(){cm.focus();}, 20);
    });

    CodeMirror.signal(data, "select", completions[0], hints.firstChild);
    return true;
  }

  Widget.prototype = {
    close: function() {
      if (this.completion.widget != this) return;
      this.completion.widget = null;
      this.hints.parentNode.removeChild(this.hints);
      this.completion.cm.removeKeyMap(this.keyMap);

      var cm = this.completion.cm;
      if (this.completion.options.closeOnUnfocus) {
        cm.off("blur", this.onBlur);
        cm.off("focus", this.onFocus);
      }
      cm.off("scroll", this.onScroll);
    },

    pick: function() {
      this.completion.pick(this.data, this.selectedHint);
    },

    changeActive: function(i, avoidWrap) {
      if (i >= this.data.list.length)
        i = avoidWrap ? this.data.list.length - 1 : 0;
      else if (i < 0)
        i = avoidWrap ? 0  : this.data.list.length - 1;
      if (this.selectedHint == i) return;
      var node = this.hints.childNodes[this.selectedHint];
      node.className = node.className.replace(" " + ACTIVE_HINT_ELEMENT_CLASS, "");
      node = this.hints.childNodes[this.selectedHint = i];
      node.className += " " + ACTIVE_HINT_ELEMENT_CLASS;
      if (node.offsetTop < this.hints.scrollTop)
        this.hints.scrollTop = node.offsetTop - 3;
      else if (node.offsetTop + node.offsetHeight > this.hints.scrollTop + this.hints.clientHeight)
        this.hints.scrollTop = node.offsetTop + node.offsetHeight - this.hints.clientHeight + 3;
      CodeMirror.signal(this.data, "select", this.data.list[this.selectedHint], node);
    },

    screenAmount: function() {
      return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1;
    }
  };

  CodeMirror.registerHelper("hint", "auto", function(cm, options) {
    var helpers = cm.getHelpers(cm.getCursor(), "hint"), words;
    if (helpers.length) {
      for (var i = 0; i < helpers.length; i++) {
        var cur = helpers[i](cm, options);
        if (cur && cur.list.length) return cur;
      }
    } else if (words = cm.getHelper(cm.getCursor(), "hintWords")) {
      if (words) return CodeMirror.hint.fromList(cm, {words: words});
    } else if (CodeMirror.hint.anyword) {
      return CodeMirror.hint.anyword(cm, options);
    }
  });

  CodeMirror.registerHelper("hint", "fromList", function(cm, options) {
    var cur = cm.getCursor(), token = cm.getTokenAt(cur);
    var found = [];
    for (var i = 0; i < options.words.length; i++) {
      var word = options.words[i];
      if (word.slice(0, token.string.length) == token.string)
        found.push(word);
    }

    if (found.length) return {
      list: found,
      from: CodeMirror.Pos(cur.line, token.start),
            to: CodeMirror.Pos(cur.line, token.end)
    };
  });

  CodeMirror.commands.autocomplete = CodeMirror.showHint;

  var defaultOptions = {
    hint: CodeMirror.hint.auto,
    completeSingle: true,
    alignWithWord: true,
    closeCharacters: /[\s()\[\]{};:>,]/,
    closeOnUnfocus: true,
    completeOnSingleClick: false,
    container: null,
    customKeys: null,
    extraKeys: null
  };

  CodeMirror.defineOption("hintOptions", null);
});

},{"../../lib/codemirror":undefined}],14:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.runMode = function(string, modespec, callback, options) {
  var mode = CodeMirror.getMode(CodeMirror.defaults, modespec);
  var ie = /MSIE \d/.test(navigator.userAgent);
  var ie_lt9 = ie && (document.documentMode == null || document.documentMode < 9);

  if (callback.nodeType == 1) {
    var tabSize = (options && options.tabSize) || CodeMirror.defaults.tabSize;
    var node = callback, col = 0;
    node.innerHTML = "";
    callback = function(text, style) {
      if (text == "\n") {
        // Emitting LF or CRLF on IE8 or earlier results in an incorrect display.
        // Emitting a carriage return makes everything ok.
        node.appendChild(document.createTextNode(ie_lt9 ? '\r' : text));
        col = 0;
        return;
      }
      var content = "";
      // replace tabs
      for (var pos = 0;;) {
        var idx = text.indexOf("\t", pos);
        if (idx == -1) {
          content += text.slice(pos);
          col += text.length - pos;
          break;
        } else {
          col += idx - pos;
          content += text.slice(pos, idx);
          var size = tabSize - col % tabSize;
          col += size;
          for (var i = 0; i < size; ++i) content += " ";
          pos = idx + 1;
        }
      }

      if (style) {
        var sp = node.appendChild(document.createElement("span"));
        sp.className = "cm-" + style.replace(/ +/g, " cm-");
        sp.appendChild(document.createTextNode(content));
      } else {
        node.appendChild(document.createTextNode(content));
      }
    };
  }

  var lines = CodeMirror.splitLines(string), state = (options && options.state) || CodeMirror.startState(mode);
  for (var i = 0, e = lines.length; i < e; ++i) {
    if (i) callback("\n");
    var stream = new CodeMirror.StringStream(lines[i]);
    if (!stream.string && mode.blankLine) mode.blankLine(state);
    while (!stream.eol()) {
      var style = mode.token(stream, state);
      callback(stream.current(), style, i, stream.start, state);
      stream.start = stream.pos;
    }
  }
};

});

},{"../../lib/codemirror":undefined}],15:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  var Pos = CodeMirror.Pos;

  function SearchCursor(doc, query, pos, caseFold) {
    this.atOccurrence = false; this.doc = doc;
    if (caseFold == null && typeof query == "string") caseFold = false;

    pos = pos ? doc.clipPos(pos) : Pos(0, 0);
    this.pos = {from: pos, to: pos};

    // The matches method is filled in based on the type of query.
    // It takes a position and a direction, and returns an object
    // describing the next occurrence of the query, or null if no
    // more matches were found.
    if (typeof query != "string") { // Regexp match
      if (!query.global) query = new RegExp(query.source, query.ignoreCase ? "ig" : "g");
      this.matches = function(reverse, pos) {
        if (reverse) {
          query.lastIndex = 0;
          var line = doc.getLine(pos.line).slice(0, pos.ch), cutOff = 0, match, start;
          for (;;) {
            query.lastIndex = cutOff;
            var newMatch = query.exec(line);
            if (!newMatch) break;
            match = newMatch;
            start = match.index;
            cutOff = match.index + (match[0].length || 1);
            if (cutOff == line.length) break;
          }
          var matchLen = (match && match[0].length) || 0;
          if (!matchLen) {
            if (start == 0 && line.length == 0) {match = undefined;}
            else if (start != doc.getLine(pos.line).length) {
              matchLen++;
            }
          }
        } else {
          query.lastIndex = pos.ch;
          var line = doc.getLine(pos.line), match = query.exec(line);
          var matchLen = (match && match[0].length) || 0;
          var start = match && match.index;
          if (start + matchLen != line.length && !matchLen) matchLen = 1;
        }
        if (match && matchLen)
          return {from: Pos(pos.line, start),
                  to: Pos(pos.line, start + matchLen),
                  match: match};
      };
    } else { // String query
      var origQuery = query;
      if (caseFold) query = query.toLowerCase();
      var fold = caseFold ? function(str){return str.toLowerCase();} : function(str){return str;};
      var target = query.split("\n");
      // Different methods for single-line and multi-line queries
      if (target.length == 1) {
        if (!query.length) {
          // Empty string would match anything and never progress, so
          // we define it to match nothing instead.
          this.matches = function() {};
        } else {
          this.matches = function(reverse, pos) {
            if (reverse) {
              var orig = doc.getLine(pos.line).slice(0, pos.ch), line = fold(orig);
              var match = line.lastIndexOf(query);
              if (match > -1) {
                match = adjustPos(orig, line, match);
                return {from: Pos(pos.line, match), to: Pos(pos.line, match + origQuery.length)};
              }
             } else {
               var orig = doc.getLine(pos.line).slice(pos.ch), line = fold(orig);
               var match = line.indexOf(query);
               if (match > -1) {
                 match = adjustPos(orig, line, match) + pos.ch;
                 return {from: Pos(pos.line, match), to: Pos(pos.line, match + origQuery.length)};
               }
            }
          };
        }
      } else {
        var origTarget = origQuery.split("\n");
        this.matches = function(reverse, pos) {
          var last = target.length - 1;
          if (reverse) {
            if (pos.line - (target.length - 1) < doc.firstLine()) return;
            if (fold(doc.getLine(pos.line).slice(0, origTarget[last].length)) != target[target.length - 1]) return;
            var to = Pos(pos.line, origTarget[last].length);
            for (var ln = pos.line - 1, i = last - 1; i >= 1; --i, --ln)
              if (target[i] != fold(doc.getLine(ln))) return;
            var line = doc.getLine(ln), cut = line.length - origTarget[0].length;
            if (fold(line.slice(cut)) != target[0]) return;
            return {from: Pos(ln, cut), to: to};
          } else {
            if (pos.line + (target.length - 1) > doc.lastLine()) return;
            var line = doc.getLine(pos.line), cut = line.length - origTarget[0].length;
            if (fold(line.slice(cut)) != target[0]) return;
            var from = Pos(pos.line, cut);
            for (var ln = pos.line + 1, i = 1; i < last; ++i, ++ln)
              if (target[i] != fold(doc.getLine(ln))) return;
            if (fold(doc.getLine(ln).slice(0, origTarget[last].length)) != target[last]) return;
            return {from: from, to: Pos(ln, origTarget[last].length)};
          }
        };
      }
    }
  }

  SearchCursor.prototype = {
    findNext: function() {return this.find(false);},
    findPrevious: function() {return this.find(true);},

    find: function(reverse) {
      var self = this, pos = this.doc.clipPos(reverse ? this.pos.from : this.pos.to);
      function savePosAndFail(line) {
        var pos = Pos(line, 0);
        self.pos = {from: pos, to: pos};
        self.atOccurrence = false;
        return false;
      }

      for (;;) {
        if (this.pos = this.matches(reverse, pos)) {
          this.atOccurrence = true;
          return this.pos.match || true;
        }
        if (reverse) {
          if (!pos.line) return savePosAndFail(0);
          pos = Pos(pos.line-1, this.doc.getLine(pos.line-1).length);
        }
        else {
          var maxLine = this.doc.lineCount();
          if (pos.line == maxLine - 1) return savePosAndFail(maxLine);
          pos = Pos(pos.line + 1, 0);
        }
      }
    },

    from: function() {if (this.atOccurrence) return this.pos.from;},
    to: function() {if (this.atOccurrence) return this.pos.to;},

    replace: function(newText) {
      if (!this.atOccurrence) return;
      var lines = CodeMirror.splitLines(newText);
      this.doc.replaceRange(lines, this.pos.from, this.pos.to);
      this.pos.to = Pos(this.pos.from.line + lines.length - 1,
                        lines[lines.length - 1].length + (lines.length == 1 ? this.pos.from.ch : 0));
    }
  };

  // Maps a position in a case-folded line back to a position in the original line
  // (compensating for codepoints increasing in number during folding)
  function adjustPos(orig, folded, pos) {
    if (orig.length == folded.length) return pos;
    for (var pos1 = Math.min(pos, orig.length);;) {
      var len1 = orig.slice(0, pos1).toLowerCase().length;
      if (len1 < pos) ++pos1;
      else if (len1 > pos) --pos1;
      else return pos1;
    }
  }

  CodeMirror.defineExtension("getSearchCursor", function(query, pos, caseFold) {
    return new SearchCursor(this.doc, query, pos, caseFold);
  });
  CodeMirror.defineDocExtension("getSearchCursor", function(query, pos, caseFold) {
    return new SearchCursor(this, query, pos, caseFold);
  });

  CodeMirror.defineExtension("selectMatches", function(query, caseFold) {
    var ranges = [], next;
    var cur = this.getSearchCursor(query, this.getCursor("from"), caseFold);
    while (next = cur.findNext()) {
      if (CodeMirror.cmpPos(cur.to(), this.getCursor("to")) > 0) break;
      ranges.push({anchor: cur.from(), head: cur.to()});
    }
    if (ranges.length)
      this.setSelections(ranges, 0);
  });
});

},{"../../lib/codemirror":undefined}],16:[function(require,module,exports){
(function (global){
"use strict"
// Module export pattern from
// https://github.com/umdjs/umd/blob/master/returnExports.js
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.store = factory();
  }
}(this, function () {
	
	// Store.js
	var store = {},
		win = (typeof window != 'undefined' ? window : global),
		doc = win.document,
		localStorageName = 'localStorage',
		scriptTag = 'script',
		storage

	store.disabled = false
	store.version = '1.3.20'
	store.set = function(key, value) {}
	store.get = function(key, defaultVal) {}
	store.has = function(key) { return store.get(key) !== undefined }
	store.remove = function(key) {}
	store.clear = function() {}
	store.transact = function(key, defaultVal, transactionFn) {
		if (transactionFn == null) {
			transactionFn = defaultVal
			defaultVal = null
		}
		if (defaultVal == null) {
			defaultVal = {}
		}
		var val = store.get(key, defaultVal)
		transactionFn(val)
		store.set(key, val)
	}
	store.getAll = function() {}
	store.forEach = function() {}

	store.serialize = function(value) {
		return JSON.stringify(value)
	}
	store.deserialize = function(value) {
		if (typeof value != 'string') { return undefined }
		try { return JSON.parse(value) }
		catch(e) { return value || undefined }
	}

	// Functions to encapsulate questionable FireFox 3.6.13 behavior
	// when about.config::dom.storage.enabled === false
	// See https://github.com/marcuswestin/store.js/issues#issue/13
	function isLocalStorageNameSupported() {
		try { return (localStorageName in win && win[localStorageName]) }
		catch(err) { return false }
	}

	if (isLocalStorageNameSupported()) {
		storage = win[localStorageName]
		store.set = function(key, val) {
			if (val === undefined) { return store.remove(key) }
			storage.setItem(key, store.serialize(val))
			return val
		}
		store.get = function(key, defaultVal) {
			var val = store.deserialize(storage.getItem(key))
			return (val === undefined ? defaultVal : val)
		}
		store.remove = function(key) { storage.removeItem(key) }
		store.clear = function() { storage.clear() }
		store.getAll = function() {
			var ret = {}
			store.forEach(function(key, val) {
				ret[key] = val
			})
			return ret
		}
		store.forEach = function(callback) {
			for (var i=0; i<storage.length; i++) {
				var key = storage.key(i)
				callback(key, store.get(key))
			}
		}
	} else if (doc && doc.documentElement.addBehavior) {
		var storageOwner,
			storageContainer
		// Since #userData storage applies only to specific paths, we need to
		// somehow link our data to a specific path.  We choose /favicon.ico
		// as a pretty safe option, since all browsers already make a request to
		// this URL anyway and being a 404 will not hurt us here.  We wrap an
		// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
		// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
		// since the iframe access rules appear to allow direct access and
		// manipulation of the document element, even for a 404 page.  This
		// document can be used instead of the current document (which would
		// have been limited to the current path) to perform #userData storage.
		try {
			storageContainer = new ActiveXObject('htmlfile')
			storageContainer.open()
			storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
			storageContainer.close()
			storageOwner = storageContainer.w.frames[0].document
			storage = storageOwner.createElement('div')
		} catch(e) {
			// somehow ActiveXObject instantiation failed (perhaps some special
			// security settings or otherwse), fall back to per-path storage
			storage = doc.createElement('div')
			storageOwner = doc.body
		}
		var withIEStorage = function(storeFunction) {
			return function() {
				var args = Array.prototype.slice.call(arguments, 0)
				args.unshift(storage)
				// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
				// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
				storageOwner.appendChild(storage)
				storage.addBehavior('#default#userData')
				storage.load(localStorageName)
				var result = storeFunction.apply(store, args)
				storageOwner.removeChild(storage)
				return result
			}
		}

		// In IE7, keys cannot start with a digit or contain certain chars.
		// See https://github.com/marcuswestin/store.js/issues/40
		// See https://github.com/marcuswestin/store.js/issues/83
		var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
		var ieKeyFix = function(key) {
			return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
		}
		store.set = withIEStorage(function(storage, key, val) {
			key = ieKeyFix(key)
			if (val === undefined) { return store.remove(key) }
			storage.setAttribute(key, store.serialize(val))
			storage.save(localStorageName)
			return val
		})
		store.get = withIEStorage(function(storage, key, defaultVal) {
			key = ieKeyFix(key)
			var val = store.deserialize(storage.getAttribute(key))
			return (val === undefined ? defaultVal : val)
		})
		store.remove = withIEStorage(function(storage, key) {
			key = ieKeyFix(key)
			storage.removeAttribute(key)
			storage.save(localStorageName)
		})
		store.clear = withIEStorage(function(storage) {
			var attributes = storage.XMLDocument.documentElement.attributes
			storage.load(localStorageName)
			for (var i=attributes.length-1; i>=0; i--) {
				storage.removeAttribute(attributes[i].name)
			}
			storage.save(localStorageName)
		})
		store.getAll = function(storage) {
			var ret = {}
			store.forEach(function(key, val) {
				ret[key] = val
			})
			return ret
		}
		store.forEach = withIEStorage(function(storage, callback) {
			var attributes = storage.XMLDocument.documentElement.attributes
			for (var i=0, attr; attr=attributes[i]; ++i) {
				callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
			}
		})
	}

	try {
		var testKey = '__storejs__'
		store.set(testKey, testKey)
		if (store.get(testKey) != testKey) { store.disabled = true }
		store.remove(testKey)
	} catch(e) {
		store.disabled = true
	}
	store.enabled = !store.disabled
	
	return store
}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zdG9yZS9zdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIlxuLy8gTW9kdWxlIGV4cG9ydCBwYXR0ZXJuIGZyb21cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS91bWRqcy91bWQvYmxvYi9tYXN0ZXIvcmV0dXJuRXhwb3J0cy5qc1xuOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgICAgICAvLyBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAgICAgLy8gbGlrZSBOb2RlLlxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgICAgICByb290LnN0b3JlID0gZmFjdG9yeSgpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0XG5cdC8vIFN0b3JlLmpzXG5cdHZhciBzdG9yZSA9IHt9LFxuXHRcdHdpbiA9ICh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKSxcblx0XHRkb2MgPSB3aW4uZG9jdW1lbnQsXG5cdFx0bG9jYWxTdG9yYWdlTmFtZSA9ICdsb2NhbFN0b3JhZ2UnLFxuXHRcdHNjcmlwdFRhZyA9ICdzY3JpcHQnLFxuXHRcdHN0b3JhZ2VcblxuXHRzdG9yZS5kaXNhYmxlZCA9IGZhbHNlXG5cdHN0b3JlLnZlcnNpb24gPSAnMS4zLjIwJ1xuXHRzdG9yZS5zZXQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7fVxuXHRzdG9yZS5nZXQgPSBmdW5jdGlvbihrZXksIGRlZmF1bHRWYWwpIHt9XG5cdHN0b3JlLmhhcyA9IGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gc3RvcmUuZ2V0KGtleSkgIT09IHVuZGVmaW5lZCB9XG5cdHN0b3JlLnJlbW92ZSA9IGZ1bmN0aW9uKGtleSkge31cblx0c3RvcmUuY2xlYXIgPSBmdW5jdGlvbigpIHt9XG5cdHN0b3JlLnRyYW5zYWN0ID0gZnVuY3Rpb24oa2V5LCBkZWZhdWx0VmFsLCB0cmFuc2FjdGlvbkZuKSB7XG5cdFx0aWYgKHRyYW5zYWN0aW9uRm4gPT0gbnVsbCkge1xuXHRcdFx0dHJhbnNhY3Rpb25GbiA9IGRlZmF1bHRWYWxcblx0XHRcdGRlZmF1bHRWYWwgPSBudWxsXG5cdFx0fVxuXHRcdGlmIChkZWZhdWx0VmFsID09IG51bGwpIHtcblx0XHRcdGRlZmF1bHRWYWwgPSB7fVxuXHRcdH1cblx0XHR2YXIgdmFsID0gc3RvcmUuZ2V0KGtleSwgZGVmYXVsdFZhbClcblx0XHR0cmFuc2FjdGlvbkZuKHZhbClcblx0XHRzdG9yZS5zZXQoa2V5LCB2YWwpXG5cdH1cblx0c3RvcmUuZ2V0QWxsID0gZnVuY3Rpb24oKSB7fVxuXHRzdG9yZS5mb3JFYWNoID0gZnVuY3Rpb24oKSB7fVxuXG5cdHN0b3JlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKVxuXHR9XG5cdHN0b3JlLmRlc2VyaWFsaXplID0gZnVuY3Rpb24odmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7IHJldHVybiB1bmRlZmluZWQgfVxuXHRcdHRyeSB7IHJldHVybiBKU09OLnBhcnNlKHZhbHVlKSB9XG5cdFx0Y2F0Y2goZSkgeyByZXR1cm4gdmFsdWUgfHwgdW5kZWZpbmVkIH1cblx0fVxuXG5cdC8vIEZ1bmN0aW9ucyB0byBlbmNhcHN1bGF0ZSBxdWVzdGlvbmFibGUgRmlyZUZveCAzLjYuMTMgYmVoYXZpb3Jcblx0Ly8gd2hlbiBhYm91dC5jb25maWc6OmRvbS5zdG9yYWdlLmVuYWJsZWQgPT09IGZhbHNlXG5cdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWFyY3Vzd2VzdGluL3N0b3JlLmpzL2lzc3VlcyNpc3N1ZS8xM1xuXHRmdW5jdGlvbiBpc0xvY2FsU3RvcmFnZU5hbWVTdXBwb3J0ZWQoKSB7XG5cdFx0dHJ5IHsgcmV0dXJuIChsb2NhbFN0b3JhZ2VOYW1lIGluIHdpbiAmJiB3aW5bbG9jYWxTdG9yYWdlTmFtZV0pIH1cblx0XHRjYXRjaChlcnIpIHsgcmV0dXJuIGZhbHNlIH1cblx0fVxuXG5cdGlmIChpc0xvY2FsU3RvcmFnZU5hbWVTdXBwb3J0ZWQoKSkge1xuXHRcdHN0b3JhZ2UgPSB3aW5bbG9jYWxTdG9yYWdlTmFtZV1cblx0XHRzdG9yZS5zZXQgPSBmdW5jdGlvbihrZXksIHZhbCkge1xuXHRcdFx0aWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBzdG9yZS5yZW1vdmUoa2V5KSB9XG5cdFx0XHRzdG9yYWdlLnNldEl0ZW0oa2V5LCBzdG9yZS5zZXJpYWxpemUodmFsKSlcblx0XHRcdHJldHVybiB2YWxcblx0XHR9XG5cdFx0c3RvcmUuZ2V0ID0gZnVuY3Rpb24oa2V5LCBkZWZhdWx0VmFsKSB7XG5cdFx0XHR2YXIgdmFsID0gc3RvcmUuZGVzZXJpYWxpemUoc3RvcmFnZS5nZXRJdGVtKGtleSkpXG5cdFx0XHRyZXR1cm4gKHZhbCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbCA6IHZhbClcblx0XHR9XG5cdFx0c3RvcmUucmVtb3ZlID0gZnVuY3Rpb24oa2V5KSB7IHN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpIH1cblx0XHRzdG9yZS5jbGVhciA9IGZ1bmN0aW9uKCkgeyBzdG9yYWdlLmNsZWFyKCkgfVxuXHRcdHN0b3JlLmdldEFsbCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHJldCA9IHt9XG5cdFx0XHRzdG9yZS5mb3JFYWNoKGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0XHRcdHJldFtrZXldID0gdmFsXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIHJldFxuXHRcdH1cblx0XHRzdG9yZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0XHRcdGZvciAodmFyIGk9MDsgaTxzdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBrZXkgPSBzdG9yYWdlLmtleShpKVxuXHRcdFx0XHRjYWxsYmFjayhrZXksIHN0b3JlLmdldChrZXkpKVxuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIGlmIChkb2MgJiYgZG9jLmRvY3VtZW50RWxlbWVudC5hZGRCZWhhdmlvcikge1xuXHRcdHZhciBzdG9yYWdlT3duZXIsXG5cdFx0XHRzdG9yYWdlQ29udGFpbmVyXG5cdFx0Ly8gU2luY2UgI3VzZXJEYXRhIHN0b3JhZ2UgYXBwbGllcyBvbmx5IHRvIHNwZWNpZmljIHBhdGhzLCB3ZSBuZWVkIHRvXG5cdFx0Ly8gc29tZWhvdyBsaW5rIG91ciBkYXRhIHRvIGEgc3BlY2lmaWMgcGF0aC4gIFdlIGNob29zZSAvZmF2aWNvbi5pY29cblx0XHQvLyBhcyBhIHByZXR0eSBzYWZlIG9wdGlvbiwgc2luY2UgYWxsIGJyb3dzZXJzIGFscmVhZHkgbWFrZSBhIHJlcXVlc3QgdG9cblx0XHQvLyB0aGlzIFVSTCBhbnl3YXkgYW5kIGJlaW5nIGEgNDA0IHdpbGwgbm90IGh1cnQgdXMgaGVyZS4gIFdlIHdyYXAgYW5cblx0XHQvLyBpZnJhbWUgcG9pbnRpbmcgdG8gdGhlIGZhdmljb24gaW4gYW4gQWN0aXZlWE9iamVjdChodG1sZmlsZSkgb2JqZWN0XG5cdFx0Ly8gKHNlZTogaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2FhNzUyNTc0KHY9VlMuODUpLmFzcHgpXG5cdFx0Ly8gc2luY2UgdGhlIGlmcmFtZSBhY2Nlc3MgcnVsZXMgYXBwZWFyIHRvIGFsbG93IGRpcmVjdCBhY2Nlc3MgYW5kXG5cdFx0Ly8gbWFuaXB1bGF0aW9uIG9mIHRoZSBkb2N1bWVudCBlbGVtZW50LCBldmVuIGZvciBhIDQwNCBwYWdlLiAgVGhpc1xuXHRcdC8vIGRvY3VtZW50IGNhbiBiZSB1c2VkIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgZG9jdW1lbnQgKHdoaWNoIHdvdWxkXG5cdFx0Ly8gaGF2ZSBiZWVuIGxpbWl0ZWQgdG8gdGhlIGN1cnJlbnQgcGF0aCkgdG8gcGVyZm9ybSAjdXNlckRhdGEgc3RvcmFnZS5cblx0XHR0cnkge1xuXHRcdFx0c3RvcmFnZUNvbnRhaW5lciA9IG5ldyBBY3RpdmVYT2JqZWN0KCdodG1sZmlsZScpXG5cdFx0XHRzdG9yYWdlQ29udGFpbmVyLm9wZW4oKVxuXHRcdFx0c3RvcmFnZUNvbnRhaW5lci53cml0ZSgnPCcrc2NyaXB0VGFnKyc+ZG9jdW1lbnQudz13aW5kb3c8Lycrc2NyaXB0VGFnKyc+PGlmcmFtZSBzcmM9XCIvZmF2aWNvbi5pY29cIj48L2lmcmFtZT4nKVxuXHRcdFx0c3RvcmFnZUNvbnRhaW5lci5jbG9zZSgpXG5cdFx0XHRzdG9yYWdlT3duZXIgPSBzdG9yYWdlQ29udGFpbmVyLncuZnJhbWVzWzBdLmRvY3VtZW50XG5cdFx0XHRzdG9yYWdlID0gc3RvcmFnZU93bmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0fSBjYXRjaChlKSB7XG5cdFx0XHQvLyBzb21laG93IEFjdGl2ZVhPYmplY3QgaW5zdGFudGlhdGlvbiBmYWlsZWQgKHBlcmhhcHMgc29tZSBzcGVjaWFsXG5cdFx0XHQvLyBzZWN1cml0eSBzZXR0aW5ncyBvciBvdGhlcndzZSksIGZhbGwgYmFjayB0byBwZXItcGF0aCBzdG9yYWdlXG5cdFx0XHRzdG9yYWdlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0XHRzdG9yYWdlT3duZXIgPSBkb2MuYm9keVxuXHRcdH1cblx0XHR2YXIgd2l0aElFU3RvcmFnZSA9IGZ1bmN0aW9uKHN0b3JlRnVuY3Rpb24pIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApXG5cdFx0XHRcdGFyZ3MudW5zaGlmdChzdG9yYWdlKVxuXHRcdFx0XHQvLyBTZWUgaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTMxMDgxKHY9VlMuODUpLmFzcHhcblx0XHRcdFx0Ly8gYW5kIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzMTQyNCh2PVZTLjg1KS5hc3B4XG5cdFx0XHRcdHN0b3JhZ2VPd25lci5hcHBlbmRDaGlsZChzdG9yYWdlKVxuXHRcdFx0XHRzdG9yYWdlLmFkZEJlaGF2aW9yKCcjZGVmYXVsdCN1c2VyRGF0YScpXG5cdFx0XHRcdHN0b3JhZ2UubG9hZChsb2NhbFN0b3JhZ2VOYW1lKVxuXHRcdFx0XHR2YXIgcmVzdWx0ID0gc3RvcmVGdW5jdGlvbi5hcHBseShzdG9yZSwgYXJncylcblx0XHRcdFx0c3RvcmFnZU93bmVyLnJlbW92ZUNoaWxkKHN0b3JhZ2UpXG5cdFx0XHRcdHJldHVybiByZXN1bHRcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJbiBJRTcsIGtleXMgY2Fubm90IHN0YXJ0IHdpdGggYSBkaWdpdCBvciBjb250YWluIGNlcnRhaW4gY2hhcnMuXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJjdXN3ZXN0aW4vc3RvcmUuanMvaXNzdWVzLzQwXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJjdXN3ZXN0aW4vc3RvcmUuanMvaXNzdWVzLzgzXG5cdFx0dmFyIGZvcmJpZGRlbkNoYXJzUmVnZXggPSBuZXcgUmVnRXhwKFwiWyFcXFwiIyQlJicoKSorLC9cXFxcXFxcXDo7PD0+P0BbXFxcXF1eYHt8fX5dXCIsIFwiZ1wiKVxuXHRcdHZhciBpZUtleUZpeCA9IGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0cmV0dXJuIGtleS5yZXBsYWNlKC9eZC8sICdfX18kJicpLnJlcGxhY2UoZm9yYmlkZGVuQ2hhcnNSZWdleCwgJ19fXycpXG5cdFx0fVxuXHRcdHN0b3JlLnNldCA9IHdpdGhJRVN0b3JhZ2UoZnVuY3Rpb24oc3RvcmFnZSwga2V5LCB2YWwpIHtcblx0XHRcdGtleSA9IGllS2V5Rml4KGtleSlcblx0XHRcdGlmICh2YWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gc3RvcmUucmVtb3ZlKGtleSkgfVxuXHRcdFx0c3RvcmFnZS5zZXRBdHRyaWJ1dGUoa2V5LCBzdG9yZS5zZXJpYWxpemUodmFsKSlcblx0XHRcdHN0b3JhZ2Uuc2F2ZShsb2NhbFN0b3JhZ2VOYW1lKVxuXHRcdFx0cmV0dXJuIHZhbFxuXHRcdH0pXG5cdFx0c3RvcmUuZ2V0ID0gd2l0aElFU3RvcmFnZShmdW5jdGlvbihzdG9yYWdlLCBrZXksIGRlZmF1bHRWYWwpIHtcblx0XHRcdGtleSA9IGllS2V5Rml4KGtleSlcblx0XHRcdHZhciB2YWwgPSBzdG9yZS5kZXNlcmlhbGl6ZShzdG9yYWdlLmdldEF0dHJpYnV0ZShrZXkpKVxuXHRcdFx0cmV0dXJuICh2YWwgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWwgOiB2YWwpXG5cdFx0fSlcblx0XHRzdG9yZS5yZW1vdmUgPSB3aXRoSUVTdG9yYWdlKGZ1bmN0aW9uKHN0b3JhZ2UsIGtleSkge1xuXHRcdFx0a2V5ID0gaWVLZXlGaXgoa2V5KVxuXHRcdFx0c3RvcmFnZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KVxuXHRcdFx0c3RvcmFnZS5zYXZlKGxvY2FsU3RvcmFnZU5hbWUpXG5cdFx0fSlcblx0XHRzdG9yZS5jbGVhciA9IHdpdGhJRVN0b3JhZ2UoZnVuY3Rpb24oc3RvcmFnZSkge1xuXHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSBzdG9yYWdlLlhNTERvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hdHRyaWJ1dGVzXG5cdFx0XHRzdG9yYWdlLmxvYWQobG9jYWxTdG9yYWdlTmFtZSlcblx0XHRcdGZvciAodmFyIGk9YXR0cmlidXRlcy5sZW5ndGgtMTsgaT49MDsgaS0tKSB7XG5cdFx0XHRcdHN0b3JhZ2UucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZXNbaV0ubmFtZSlcblx0XHRcdH1cblx0XHRcdHN0b3JhZ2Uuc2F2ZShsb2NhbFN0b3JhZ2VOYW1lKVxuXHRcdH0pXG5cdFx0c3RvcmUuZ2V0QWxsID0gZnVuY3Rpb24oc3RvcmFnZSkge1xuXHRcdFx0dmFyIHJldCA9IHt9XG5cdFx0XHRzdG9yZS5mb3JFYWNoKGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0XHRcdHJldFtrZXldID0gdmFsXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIHJldFxuXHRcdH1cblx0XHRzdG9yZS5mb3JFYWNoID0gd2l0aElFU3RvcmFnZShmdW5jdGlvbihzdG9yYWdlLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSBzdG9yYWdlLlhNTERvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hdHRyaWJ1dGVzXG5cdFx0XHRmb3IgKHZhciBpPTAsIGF0dHI7IGF0dHI9YXR0cmlidXRlc1tpXTsgKytpKSB7XG5cdFx0XHRcdGNhbGxiYWNrKGF0dHIubmFtZSwgc3RvcmUuZGVzZXJpYWxpemUoc3RvcmFnZS5nZXRBdHRyaWJ1dGUoYXR0ci5uYW1lKSkpXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdHRyeSB7XG5cdFx0dmFyIHRlc3RLZXkgPSAnX19zdG9yZWpzX18nXG5cdFx0c3RvcmUuc2V0KHRlc3RLZXksIHRlc3RLZXkpXG5cdFx0aWYgKHN0b3JlLmdldCh0ZXN0S2V5KSAhPSB0ZXN0S2V5KSB7IHN0b3JlLmRpc2FibGVkID0gdHJ1ZSB9XG5cdFx0c3RvcmUucmVtb3ZlKHRlc3RLZXkpXG5cdH0gY2F0Y2goZSkge1xuXHRcdHN0b3JlLmRpc2FibGVkID0gdHJ1ZVxuXHR9XG5cdHN0b3JlLmVuYWJsZWQgPSAhc3RvcmUuZGlzYWJsZWRcblx0XG5cdHJldHVybiBzdG9yZVxufSkpO1xuIl19
},{}],17:[function(require,module,exports){
module.exports={
  "_args": [
    [
      "wdqs-storage@latest",
      "/srv/wdqs/wdqs-editor"
    ]
  ],
  "_from": "wdqs-storage@latest",
  "_id": "wdqs-storage@0.1.1",
  "_inCache": true,
  "_installable": true,
  "_location": "/wdqs-storage",
  "_nodeVersion": "5.3.0",
  "_npmUser": {
    "email": "christopher.johnson@wikimedia.de",
    "name": "christopher-johnson"
  },
  "_npmVersion": "3.3.12",
  "_phantomChildren": {},
  "_requested": {
    "name": "wdqs-storage",
    "raw": "wdqs-storage@latest",
    "rawSpec": "latest",
    "scope": null,
    "spec": "latest",
    "type": "tag"
  },
  "_requiredBy": [
    "/"
  ],
  "_shasum": "00f4cbbf0d5ebc7170be2e83ef2e4a2db74a134d",
  "_shrinkwrap": null,
  "_spec": "wdqs-storage@latest",
  "_where": "/srv/wdqs/wdqs-editor",
  "author": "",
  "bugs": {
    "url": "https://phabricator.wikimedia.org"
  },
  "dependencies": {
    "store": "^1.3.14"
  },
  "description": "Local Storage Module",
  "devDependencies": {},
  "directories": {},
  "dist": {
    "shasum": "00f4cbbf0d5ebc7170be2e83ef2e4a2db74a134d",
    "tarball": "http://registry.npmjs.org/wdqs-storage/-/wdqs-storage-0.1.1.tgz"
  },
  "homepage": "https://github.com/christopher-johnson/wdqs-storage",
  "license": "MIT",
  "main": "src/main.js",
  "maintainers": [
    {
      "name": "Christopher Johnson",
      "email": "christopher.johnson@wikimedia.org"
    }
  ],
  "name": "wdqs-storage",
  "optionalDependencies": {},
  "readme": "ERROR: No README data found!",
  "repository": {
    "type": "git",
    "url": "git://github.com/christopher-johnson/wdqs-storage.git"
  },
  "scripts": {},
  "version": "0.1.1"
}

},{}],18:[function(require,module,exports){
window.console = window.console || {"log":function(){}};
module.exports = {
	storage: require("./storage.js"),
	version: {
		"wdqs-storage" : require("../package.json").version
	},
	nestedExists : function(obj) {
		var args = Array.prototype.slice.call(arguments, 1);

		for (var i = 0; i < args.length; i++) {
			if (!obj || !obj.hasOwnProperty(args[i])) {
				return false;
			}
			obj = obj[args[i]];
		}
		return true;
	}
};

},{"../package.json":17,"./storage.js":19}],19:[function(require,module,exports){
var store = require("store");
var times = {
	day: function() {
		return 1000 * 3600 * 24;//millis to day
	},
	month: function() {
		times.day() * 30;
	},
	year: function() {
		times.month() * 12;
	}
};

var root = module.exports = {
	set : function(key, val, exp) {
    if (!store.enabled) return;//this is probably in private mode. Don't run, as we might get Js errors
		if (key && val !== undefined) {
			if (typeof exp == "string") {
				exp = times[exp]();
			}
			//try to store string for dom objects (e.g. XML result). Otherwise, we might get a circular reference error when stringifying this
			if (val.documentElement) val = new XMLSerializer().serializeToString(val.documentElement);
			store.set(key, {
				val : val,
				exp : exp,
				time : new Date().getTime()
			});
		}
	},
	remove: function(key) {
		if (!store.enabled) return;//this is probably in private mode. Don't run, as we might get Js errors
		if (key) store.remove(key)
	},
	removeAll: function(filter) {
		if (!store.enabled) return;//this is probably in private mode. Don't run, as we might get Js errors
		if (typeof filter === 'function') {
			for (var key in store.getAll()) {
				if (filter(key, root.get(key))) root.remove(key);
			}
		}
	},
	get : function(key) {
    if (!store.enabled) return null;//this is probably in private mode. Don't run, as we might get Js errors
		if (key) {
			var info = store.get(key);
			if (!info) {
				return null;
			}
			if (info.exp && new Date().getTime() - info.time > info.exp) {
				return null;
			}
			return info.val;
		} else {
			return null;
		}
	}

};

},{"store":16}],20:[function(require,module,exports){
module.exports={
  "name": "wdqs-editor",
  "description": "Wikidata Query Service Editor",
  "version": "0.1.1",
  "main": "src/index.js",
  "license": "MIT",
  "author": "",
  "homepage": "https://query.wikidata.org",
  "scripts": {},
  "devDependencies": {
    "bootstrap-sass": "^3.3.1",
    "browserify": "^6.1.0",
    "browserify-shim": "^3.8.1",
    "browserify-transform-tools": "^1.2.1",
    "exorcist": "^0.1.6",
    "gulp": "~3.6.0",
    "gulp-autoprefixer": "^3.0.2",
    "gulp-bump": "^0.1.11",
    "gulp-concat": "^2.4.1",
    "gulp-connect": "^2.0.5",
    "gulp-cssimport": "^1.3.1",
    "gulp-embedlr": "^0.5.2",
    "gulp-filter": "^1.0.2",
    "gulp-git": "^0.5.2",
    "gulp-jsvalidate": "^0.2.0",
    "gulp-livereload": "^1.3.1",
    "gulp-minify-css": "0.3.11",
    "gulp-notify": "^2.0.1",
    "gulp-rename": "^1.2.0",
    "gulp-sass": "^2.1.0",
    "gulp-sourcemaps": "^1.2.8",
    "gulp-streamify": "0.0.5",
    "gulp-tag-version": "^1.1.0",
    "gulp-uglify": "^1.0.1",
    "node-sass": "^3.4.2",
    "require-dir": "^0.1.0",
    "run-sequence": "^1.0.1",
    "vinyl-buffer": "^1.0.0",
    "vinyl-source-stream": "~0.1.1",
    "vinyl-transform": "0.0.1",
    "watchify": "^0.6.4"
  },
  "bugs": "https://phabricator.wikimedia.org",
  "keywords": [
    "JavaScript",
    "Wikidata",
    "SPARQL",
    "Editor",
    "Semantic Web",
    "Linked Data"
  ],
  "maintainers": [
    {
      "name": "Christopher Johnson",
      "email": "christopher.johnson@wikimedia.de",
      "web": ""
    }
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/christopher-johnson/wdqs-editor.git"
  },
  "dependencies": {
    "codemirror": "^4.7.0",
    "jquery": "~ 1.11.0",
    "wdqs-storage": "latest"
  },
  "browser": {
  },
  "browserify": {
    "transform": [
      "browserify-shim"
    ]
  },
  "browserify-shim": {
    "jquery": "global:$"
  },
  "optionalShim": {
  }
}
},{}],21:[function(require,module,exports){
(function (global){
'use strict';
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hdXRvY29tcGxldGVycy9hdXRvY29tcGxldGVyQmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCksXG5cdHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMuanMnKSxcblx0eXV0aWxzID0gcmVxdWlyZSgnd2Rxcy1zdG9yYWdlJyksXG5cdFRyaWUgPSByZXF1aXJlKCcuLi8uLi9saWIvdHJpZS5qcycpLFxuXHRXRFFTUUUgPSByZXF1aXJlKCcuLi9pbmRleC5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFdEUVNRRSwgd2Rxc3FlKSB7XG5cdHZhciBjb21wbGV0aW9uTm90aWZpY2F0aW9ucyA9IHt9O1xuXHR2YXIgY29tcGxldGVycyA9IHt9O1xuXHR2YXIgdHJpZXMgPSB7fTtcblxuXHR3ZHFzcWUub24oJ2N1cnNvckFjdGl2aXR5JywgZnVuY3Rpb24od2Rxc3FlLCBldmVudEluZm8pIHtcblx0XHRhdXRvQ29tcGxldGUodHJ1ZSk7XG5cdH0pO1xuXHR3ZHFzcWUub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZWVkUG9zc2libGVBZGp1c3RtZW50ID0gW107XG5cdFx0Zm9yICh2YXIgbm90aWZpY2F0aW9uTmFtZSBpbiBjb21wbGV0aW9uTm90aWZpY2F0aW9ucykge1xuXHRcdFx0aWYgKGNvbXBsZXRpb25Ob3RpZmljYXRpb25zW25vdGlmaWNhdGlvbk5hbWVdLmlzKCc6dmlzaWJsZScpKSB7XG5cdFx0XHRcdG5lZWRQb3NzaWJsZUFkanVzdG1lbnQucHVzaChjb21wbGV0aW9uTm90aWZpY2F0aW9uc1tub3RpZmljYXRpb25OYW1lXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChuZWVkUG9zc2libGVBZGp1c3RtZW50Lmxlbmd0aCA+IDApIHtcblx0XHRcdC8vcG9zaXRpb24gY29tcGxldGlvbiBub3RpZmljYXRpb25zXG5cdFx0XHR2YXIgc2Nyb2xsQmFyID0gJCh3ZHFzcWUuZ2V0V3JhcHBlckVsZW1lbnQoKSkuZmluZChcIi5Db2RlTWlycm9yLXZzY3JvbGxiYXJcIik7XG5cdFx0XHR2YXIgb2Zmc2V0ID0gMDtcblx0XHRcdGlmIChzY3JvbGxCYXIuaXMoXCI6dmlzaWJsZVwiKSkge1xuXHRcdFx0XHRvZmZzZXQgPSBzY3JvbGxCYXIub3V0ZXJXaWR0aCgpO1xuXHRcdFx0fVxuXHRcdFx0bmVlZFBvc3NpYmxlQWRqdXN0bWVudC5mb3JFYWNoKGZ1bmN0aW9uKG5vdGlmaWNhdGlvbikge1xuXHRcdFx0XHRub3RpZmljYXRpb24uY3NzKFwicmlnaHRcIiwgb2Zmc2V0KVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblxuXG5cblx0LyoqXG5cdCAqIFN0b3JlIGJ1bGsgY29tcGxldGlvbnMgaW4gbWVtb3J5IGFzIHRyaWUsIGFuZCBzdG9yZSB0aGVzZSBpbiBsb2NhbHN0b3JhZ2UgYXMgd2VsbCAoaWYgZW5hYmxlZClcblx0ICogXG5cdCAqIEBtZXRob2QgZG9jLnN0b3JlQnVsa0NvbXBsZXRpb25zXG5cdCAqIEBwYXJhbSBjb21wbGV0aW9ucyB7YXJyYXl9XG5cdCAqL1xuXHR2YXIgc3RvcmVCdWxrQ29tcGxldGlvbnMgPSBmdW5jdGlvbihjb21wbGV0ZXIsIGNvbXBsZXRpb25zKSB7XG5cdFx0Ly8gc3RvcmUgYXJyYXkgYXMgdHJpZVxuXHRcdHRyaWVzW2NvbXBsZXRlci5uYW1lXSA9IG5ldyBUcmllKCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb21wbGV0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dHJpZXNbY29tcGxldGVyLm5hbWVdLmluc2VydChjb21wbGV0aW9uc1tpXSk7XG5cdFx0fVxuXHRcdC8vIHN0b3JlIGluIGxvY2Fsc3RvcmFnZSBhcyB3ZWxsXG5cdFx0dmFyIHN0b3JhZ2VJZCA9IHV0aWxzLmdldFBlcnNpc3RlbmN5SWQod2Rxc3FlLCBjb21wbGV0ZXIucGVyc2lzdGVudCk7XG5cdFx0aWYgKHN0b3JhZ2VJZCkgeXV0aWxzLnN0b3JhZ2Uuc2V0KHN0b3JhZ2VJZCwgY29tcGxldGlvbnMsIFwibW9udGhcIik7XG5cdH07XG5cblx0dmFyIGluaXRDb21wbGV0ZXIgPSBmdW5jdGlvbihuYW1lLCBjb21wbGV0aW9uSW5pdCkge1xuXHRcdHZhciBjb21wbGV0ZXIgPSBjb21wbGV0ZXJzW25hbWVdID0gbmV3IGNvbXBsZXRpb25Jbml0KHdkcXNxZSwgbmFtZSk7XG5cdFx0Y29tcGxldGVyLm5hbWUgPSBuYW1lO1xuXHRcdGlmIChjb21wbGV0ZXIuYnVsaykge1xuXHRcdFx0dmFyIHN0b3JlQXJyYXlBc0J1bGsgPSBmdW5jdGlvbihzdWdnZXN0aW9ucykge1xuXHRcdFx0XHRpZiAoc3VnZ2VzdGlvbnMgJiYgc3VnZ2VzdGlvbnMgaW5zdGFuY2VvZiBBcnJheSAmJiBzdWdnZXN0aW9ucy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0c3RvcmVCdWxrQ29tcGxldGlvbnMoY29tcGxldGVyLCBzdWdnZXN0aW9ucyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChjb21wbGV0ZXIuZ2V0IGluc3RhbmNlb2YgQXJyYXkpIHtcblx0XHRcdFx0Ly8gd2UgZG9uJ3QgY2FyZSB3aGV0aGVyIHRoZSBjb21wbGV0aW9ucyBhcmUgYWxyZWFkeSBzdG9yZWQgaW5cblx0XHRcdFx0Ly8gbG9jYWxzdG9yYWdlLiBqdXN0IHVzZSB0aGlzIG9uZVxuXHRcdFx0XHRzdG9yZUFycmF5QXNCdWxrKGNvbXBsZXRlci5nZXQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gaWYgY29tcGxldGlvbnMgYXJlIGRlZmluZWQgaW4gbG9jYWxzdG9yYWdlLCB1c2UgdGhvc2UhIChjYWxsaW5nIHRoZVxuXHRcdFx0XHQvLyBmdW5jdGlvbiBtYXkgY29tZSB3aXRoIG92ZXJoZWFkIChlLmcuIGFzeW5jIGNhbGxzKSlcblx0XHRcdFx0dmFyIGNvbXBsZXRpb25zRnJvbVN0b3JhZ2UgPSBudWxsO1xuXHRcdFx0XHR2YXIgcGVyc2lzdGVuY3lJZGVudGlmaWVyID0gdXRpbHMuZ2V0UGVyc2lzdGVuY3lJZCh3ZHFzcWUsIGNvbXBsZXRlci5wZXJzaXN0ZW50KTtcblx0XHRcdFx0aWYgKHBlcnNpc3RlbmN5SWRlbnRpZmllcilcblx0XHRcdFx0XHRjb21wbGV0aW9uc0Zyb21TdG9yYWdlID0geXV0aWxzLnN0b3JhZ2UuZ2V0KHBlcnNpc3RlbmN5SWRlbnRpZmllcik7XG5cdFx0XHRcdGlmIChjb21wbGV0aW9uc0Zyb21TdG9yYWdlICYmIGNvbXBsZXRpb25zRnJvbVN0b3JhZ2UubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHN0b3JlQXJyYXlBc0J1bGsoY29tcGxldGlvbnNGcm9tU3RvcmFnZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gbm90aGluZyBpbiBzdG9yYWdlLiBjaGVjayB3aGV0aGVyIHdlIGhhdmUgYSBmdW5jdGlvbiB2aWEgd2hpY2ggd2Vcblx0XHRcdFx0XHQvLyBjYW4gZ2V0IG91ciBwcmVmaXhlc1xuXHRcdFx0XHRcdGlmIChjb21wbGV0ZXIuZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcblx0XHRcdFx0XHRcdGlmIChjb21wbGV0ZXIuYXN5bmMpIHtcblx0XHRcdFx0XHRcdFx0Y29tcGxldGVyLmdldChudWxsLCBzdG9yZUFycmF5QXNCdWxrKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHN0b3JlQXJyYXlBc0J1bGsoY29tcGxldGVyLmdldCgpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0dmFyIGF1dG9Db21wbGV0ZSA9IGZ1bmN0aW9uKGZyb21BdXRvU2hvdykge1xuXHRcdGlmICh3ZHFzcWUuc29tZXRoaW5nU2VsZWN0ZWQoKSlcblx0XHRcdHJldHVybjtcblx0XHR2YXIgdHJ5SGludFR5cGUgPSBmdW5jdGlvbihjb21wbGV0ZXIpIHtcblx0XHRcdGlmIChmcm9tQXV0b1Nob3cgLy8gZnJvbSBhdXRvU2hvdywgaS5lLiB0aGlzIGdldHMgY2FsbGVkIGVhY2ggdGltZSB0aGUgZWRpdG9yIGNvbnRlbnQgY2hhbmdlc1xuXHRcdFx0XHQmJiAoIWNvbXBsZXRlci5hdXRvU2hvdyAvLyBhdXRvc2hvdyBmb3IgIHRoaXMgcGFydGljdWxhciB0eXBlIG9mIGF1dG9jb21wbGV0aW9uIGlzIC1ub3QtIGVuYWJsZWRcblx0XHRcdFx0XHR8fCAoIWNvbXBsZXRlci5idWxrICYmIGNvbXBsZXRlci5hc3luYykpIC8vIGFzeW5jIGlzIGVuYWJsZWQgKGRvbid0IHdhbnQgdG8gcmUtZG8gYWpheC1saWtlIHJlcXVlc3QgZm9yIGV2ZXJ5IGVkaXRvciBjaGFuZ2UpXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaGludENvbmZpZyA9IHtcblx0XHRcdFx0Y2xvc2VDaGFyYWN0ZXJzOiAvKD89YSliLyxcblx0XHRcdFx0Y29tcGxldGVTaW5nbGU6IGZhbHNlXG5cdFx0XHR9O1xuXHRcdFx0aWYgKCFjb21wbGV0ZXIuYnVsayAmJiBjb21wbGV0ZXIuYXN5bmMpIHtcblx0XHRcdFx0aGludENvbmZpZy5hc3luYyA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHR2YXIgd3JhcHBlZEhpbnRDYWxsYmFjayA9IGZ1bmN0aW9uKHdkcXNxZSwgY2FsbGJhY2spIHtcblx0XHRcdFx0cmV0dXJuIGdldENvbXBsZXRpb25IaW50c09iamVjdChjb21wbGV0ZXIsIGNhbGxiYWNrKTtcblx0XHRcdH07XG5cdFx0XHR2YXIgcmVzdWx0ID0gV0RRU1FFLnNob3dIaW50KHdkcXNxZSwgd3JhcHBlZEhpbnRDYWxsYmFjaywgaGludENvbmZpZyk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9O1xuXHRcdGZvciAodmFyIGNvbXBsZXRlck5hbWUgaW4gY29tcGxldGVycykge1xuXHRcdFx0aWYgKCQuaW5BcnJheShjb21wbGV0ZXJOYW1lLCB3ZHFzcWUub3B0aW9ucy5hdXRvY29tcGxldGVycykgPT0gLTEpIGNvbnRpbnVlOyAvL3RoaXMgY29tcGxldGVyIGlzIGRpc2FibGVkXG5cdFx0XHR2YXIgY29tcGxldGVyID0gY29tcGxldGVyc1tjb21wbGV0ZXJOYW1lXTtcblx0XHRcdGlmICghY29tcGxldGVyLmlzVmFsaWRDb21wbGV0aW9uUG9zaXRpb24pIGNvbnRpbnVlOyAvL25vIHdheSB0byBjaGVjayB3aGV0aGVyIHdlIGFyZSBpbiBhIHZhbGlkIHBvc2l0aW9uXG5cblx0XHRcdGlmICghY29tcGxldGVyLmlzVmFsaWRDb21wbGV0aW9uUG9zaXRpb24oKSkge1xuXHRcdFx0XHQvL2lmIG5lZWRlZCwgZmlyZSBjYWxsYmFja3MgZm9yIHdoZW4gd2UgYXJlIC1ub3QtIGluIHZhbGlkIGNvbXBsZXRpb24gcG9zaXRpb25cblx0XHRcdFx0aWYgKGNvbXBsZXRlci5jYWxsYmFja3MgJiYgY29tcGxldGVyLmNhbGxiYWNrcy5pbnZhbGlkUG9zaXRpb24pIHtcblx0XHRcdFx0XHRjb21wbGV0ZXIuY2FsbGJhY2tzLmludmFsaWRQb3NpdGlvbih3ZHFzcWUsIGNvbXBsZXRlcik7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly9ub3QgaW4gYSB2YWxpZCBwb3NpdGlvbiwgc28gY29udGludWUgdG8gbmV4dCBjb21wbGV0aW9uIGNhbmRpZGF0ZSB0eXBlXG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXHRcdFx0Ly8gcnVuIHZhbGlkIHBvc2l0aW9uIGhhbmRsZXIsIGlmIHRoZXJlIGlzIG9uZSAoaWYgaXQgcmV0dXJucyBmYWxzZSwgc3RvcCB0aGUgYXV0b2NvbXBsZXRpb24hKVxuXHRcdFx0aWYgKGNvbXBsZXRlci5jYWxsYmFja3MgJiYgY29tcGxldGVyLmNhbGxiYWNrcy52YWxpZFBvc2l0aW9uKSB7XG5cdFx0XHRcdGlmIChjb21wbGV0ZXIuY2FsbGJhY2tzLnZhbGlkUG9zaXRpb24od2Rxc3FlLCBjb21wbGV0ZXIpID09PSBmYWxzZSlcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblx0XHRcdHZhciBzdWNjZXNzID0gdHJ5SGludFR5cGUoY29tcGxldGVyKTtcblx0XHRcdGlmIChzdWNjZXNzKVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH07XG5cblxuXG5cdHZhciBnZXRDb21wbGV0aW9uSGludHNPYmplY3QgPSBmdW5jdGlvbihjb21wbGV0ZXIsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIGdldFN1Z2dlc3Rpb25zRnJvbVRva2VuID0gZnVuY3Rpb24ocGFydGlhbFRva2VuKSB7XG5cdFx0XHR2YXIgc3RyaW5nVG9BdXRvY29tcGxldGUgPSBwYXJ0aWFsVG9rZW4uYXV0b2NvbXBsZXRpb25TdHJpbmcgfHwgcGFydGlhbFRva2VuLnN0cmluZztcblx0XHRcdHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuXHRcdFx0aWYgKHRyaWVzW2NvbXBsZXRlci5uYW1lXSkge1xuXHRcdFx0XHRzdWdnZXN0aW9ucyA9IHRyaWVzW2NvbXBsZXRlci5uYW1lXS5hdXRvQ29tcGxldGUoc3RyaW5nVG9BdXRvY29tcGxldGUpO1xuXHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgY29tcGxldGVyLmdldCA9PSBcImZ1bmN0aW9uXCIgJiYgY29tcGxldGVyLmFzeW5jID09IGZhbHNlKSB7XG5cdFx0XHRcdHN1Z2dlc3Rpb25zID0gY29tcGxldGVyLmdldChzdHJpbmdUb0F1dG9jb21wbGV0ZSk7XG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjb21wbGV0ZXIuZ2V0ID09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0dmFyIHBhcnRpYWxUb2tlbkxlbmd0aCA9IHN0cmluZ1RvQXV0b2NvbXBsZXRlLmxlbmd0aDtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb21wbGV0ZXIuZ2V0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0dmFyIGNvbXBsZXRpb24gPSBjb21wbGV0ZXIuZ2V0W2ldO1xuXHRcdFx0XHRcdGlmIChjb21wbGV0aW9uLnNsaWNlKDAsIHBhcnRpYWxUb2tlbkxlbmd0aCkgPT0gc3RyaW5nVG9BdXRvY29tcGxldGUpIHtcblx0XHRcdFx0XHRcdHN1Z2dlc3Rpb25zLnB1c2goY29tcGxldGlvbik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZ2V0U3VnZ2VzdGlvbnNBc0hpbnRPYmplY3Qoc3VnZ2VzdGlvbnMsIGNvbXBsZXRlciwgcGFydGlhbFRva2VuKTtcblxuXHRcdH07XG5cblxuXHRcdHZhciB0b2tlbiA9IHdkcXNxZS5nZXRDb21wbGV0ZVRva2VuKCk7XG5cdFx0aWYgKGNvbXBsZXRlci5wcmVQcm9jZXNzVG9rZW4pIHtcblx0XHRcdHRva2VuID0gY29tcGxldGVyLnByZVByb2Nlc3NUb2tlbih0b2tlbik7XG5cdFx0fVxuXG5cdFx0aWYgKHRva2VuKSB7XG5cdFx0XHQvLyB1c2UgY3VzdG9tIGNvbXBsZXRpb25oaW50IGZ1bmN0aW9uLCB0byBhdm9pZCByZWFjaGluZyBhIGxvb3Agd2hlbiB0aGVcblx0XHRcdC8vIGNvbXBsZXRpb25oaW50IGlzIHRoZSBzYW1lIGFzIHRoZSBjdXJyZW50IHRva2VuXG5cdFx0XHQvLyByZWd1bGFyIGJlaGF2aW91ciB3b3VsZCBrZWVwIGNoYW5naW5nIHRoZSBjb2RlbWlycm9yIGRvbSwgaGVuY2Vcblx0XHRcdC8vIGNvbnN0YW50bHkgY2FsbGluZyB0aGlzIGNhbGxiYWNrXG5cdFx0XHRpZiAoIWNvbXBsZXRlci5idWxrICYmIGNvbXBsZXRlci5hc3luYykge1xuXHRcdFx0XHR2YXIgd3JhcHBlZENhbGxiYWNrID0gZnVuY3Rpb24oc3VnZ2VzdGlvbnMpIHtcblx0XHRcdFx0XHRjYWxsYmFjayhnZXRTdWdnZXN0aW9uc0FzSGludE9iamVjdChzdWdnZXN0aW9ucywgY29tcGxldGVyLCB0b2tlbikpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjb21wbGV0ZXIuZ2V0KHRva2VuLCB3cmFwcGVkQ2FsbGJhY2spO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGdldFN1Z2dlc3Rpb25zRnJvbVRva2VuKHRva2VuKTtcblxuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXG5cdC8qKlxuXHQgKiAgZ2V0IG91ciBhcnJheSBvZiBzdWdnZXN0aW9ucyAoc3RyaW5ncykgaW4gdGhlIGNvZGVtaXJyb3IgaGludCBmb3JtYXRcblx0ICovXG5cdHZhciBnZXRTdWdnZXN0aW9uc0FzSGludE9iamVjdCA9IGZ1bmN0aW9uKHN1Z2dlc3Rpb25zLCBjb21wbGV0ZXIsIHRva2VuKSB7XG5cdFx0dmFyIGhpbnRMaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdWdnZXN0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHN1Z2dlc3RlZFN0cmluZyA9IHN1Z2dlc3Rpb25zW2ldO1xuXHRcdFx0aWYgKGNvbXBsZXRlci5wb3N0UHJvY2Vzc1Rva2VuKSB7XG5cdFx0XHRcdHN1Z2dlc3RlZFN0cmluZyA9IGNvbXBsZXRlci5wb3N0UHJvY2Vzc1Rva2VuKHRva2VuLCBzdWdnZXN0ZWRTdHJpbmcpO1xuXHRcdFx0fVxuXHRcdFx0aGludExpc3QucHVzaCh7XG5cdFx0XHRcdHRleHQ6IHN1Z2dlc3RlZFN0cmluZyxcblx0XHRcdFx0ZGlzcGxheVRleHQ6IHN1Z2dlc3RlZFN0cmluZyxcblx0XHRcdFx0aGludDogc2VsZWN0SGludCxcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHZhciBjdXIgPSB3ZHFzcWUuZ2V0Q3Vyc29yKCk7XG5cdFx0dmFyIHJldHVybk9iaiA9IHtcblx0XHRcdGNvbXBsZXRpb25Ub2tlbjogdG9rZW4uc3RyaW5nLFxuXHRcdFx0bGlzdDogaGludExpc3QsXG5cdFx0XHRmcm9tOiB7XG5cdFx0XHRcdGxpbmU6IGN1ci5saW5lLFxuXHRcdFx0XHRjaDogdG9rZW4uc3RhcnRcblx0XHRcdH0sXG5cdFx0XHR0bzoge1xuXHRcdFx0XHRsaW5lOiBjdXIubGluZSxcblx0XHRcdFx0Y2g6IHRva2VuLmVuZFxuXHRcdFx0fVxuXHRcdH07XG5cdFx0Ly9pZiB3ZSBoYXZlIHNvbWUgYXV0b2NvbXBsZXRpb24gaGFuZGxlcnMgc3BlY2lmaWVkLCBhZGQgdGhlc2UgdGhlc2UgdG8gdGhlIG9iamVjdC4gQ29kZW1pcnJvciB3aWxsIHRha2UgY2FyZSBvZiBmaXJpbmcgdGhlc2Vcblx0XHRpZiAoY29tcGxldGVyLmNhbGxiYWNrcykge1xuXHRcdFx0Zm9yICh2YXIgY2FsbGJhY2tOYW1lIGluIGNvbXBsZXRlci5jYWxsYmFja3MpIHtcblx0XHRcdFx0aWYgKGNvbXBsZXRlci5jYWxsYmFja3NbY2FsbGJhY2tOYW1lXSkge1xuXHRcdFx0XHRcdFdEUVNRRS5vbihyZXR1cm5PYmosIGNhbGxiYWNrTmFtZSwgY29tcGxldGVyLmNhbGxiYWNrc1tjYWxsYmFja05hbWVdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmV0dXJuT2JqO1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdENvbXBsZXRlcixcblx0XHRjb21wbGV0ZXJzOiBjb21wbGV0ZXJzLFxuXHRcdG5vdGlmaWNhdGlvbnM6IHtcblx0XHRcdGdldEVsOiBmdW5jdGlvbihjb21wbGV0ZXIpIHtcblx0XHRcdFx0cmV0dXJuICQoY29tcGxldGlvbk5vdGlmaWNhdGlvbnNbY29tcGxldGVyLm5hbWVdKTtcblx0XHRcdH0sXG5cdFx0XHRzaG93OiBmdW5jdGlvbih3ZHFzcWUsIGNvbXBsZXRlcikge1xuXHRcdFx0XHQvL29ubHkgZHJhdyB3aGVuIHRoZSB1c2VyIG5lZWRzIHRvIHVzZSBhIGtleXByZXNzIHRvIHN1bW1vbiBhdXRvY29tcGxldGlvbnNcblx0XHRcdFx0aWYgKCFjb21wbGV0ZXIuYXV0b3Nob3cpIHtcblx0XHRcdFx0XHRpZiAoIWNvbXBsZXRpb25Ob3RpZmljYXRpb25zW2NvbXBsZXRlci5uYW1lXSkgY29tcGxldGlvbk5vdGlmaWNhdGlvbnNbY29tcGxldGVyLm5hbWVdID0gJChcIjxkaXYgY2xhc3M9J2NvbXBsZXRpb25Ob3RpZmljYXRpb24nPjwvZGl2PlwiKTtcblx0XHRcdFx0XHRjb21wbGV0aW9uTm90aWZpY2F0aW9uc1tjb21wbGV0ZXIubmFtZV1cblx0XHRcdFx0XHRcdC5zaG93KClcblx0XHRcdFx0XHRcdC50ZXh0KFwiUHJlc3MgXCIgKyAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdNYWMgT1MgWCcpICE9IC0xID8gXCJDTURcIiA6IFwiQ1RSTFwiKSArIFwiIC0gPHNwYWNlYmFyPiB0byBhdXRvY29tcGxldGVcIilcblx0XHRcdFx0XHRcdC5hcHBlbmRUbygkKHdkcXNxZS5nZXRXcmFwcGVyRWxlbWVudCgpKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRoaWRlOiBmdW5jdGlvbih3ZHFzcWUsIGNvbXBsZXRlcikge1xuXHRcdFx0XHRpZiAoY29tcGxldGlvbk5vdGlmaWNhdGlvbnNbY29tcGxldGVyLm5hbWVdKSB7XG5cdFx0XHRcdFx0Y29tcGxldGlvbk5vdGlmaWNhdGlvbnNbY29tcGxldGVyLm5hbWVdLmhpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fSxcblx0XHRhdXRvQ29tcGxldGU6IGF1dG9Db21wbGV0ZSxcblx0XHRnZXRUcmllOiBmdW5jdGlvbihjb21wbGV0ZXIpIHtcblx0XHRcdHJldHVybiAodHlwZW9mIGNvbXBsZXRlciA9PSBcInN0cmluZ1wiID8gdHJpZXNbY29tcGxldGVyXSA6IHRyaWVzW2NvbXBsZXRlci5uYW1lXSk7XG5cdFx0fVxuXHR9XG59O1xuXG5cblxuXG5cblxuXG5cblxuLyoqXG4gKiBmdW5jdGlvbiB3aGljaCBmaXJlcyBhZnRlciB0aGUgdXNlciBzZWxlY3RzIGEgY29tcGxldGlvbi4gdGhpcyBmdW5jdGlvbiBjaGVja3Mgd2hldGhlciB3ZSBhY3R1YWxseSBuZWVkIHRvIHN0b3JlIHRoaXMgb25lIChpZiBjb21wbGV0aW9uIGlzIHNhbWUgYXMgY3VycmVudCB0b2tlbiwgZG9uJ3QgZG8gYW55dGhpbmcpXG4gKi9cbnZhciBzZWxlY3RIaW50ID0gZnVuY3Rpb24od2Rxc3FlLCBkYXRhLCBjb21wbGV0aW9uKSB7XG5cdGlmIChjb21wbGV0aW9uLnRleHQgIT0gd2Rxc3FlLmdldFRva2VuQXQod2Rxc3FlLmdldEN1cnNvcigpKS5zdHJpbmcpIHtcblx0XHR3ZHFzcWUucmVwbGFjZVJhbmdlKGNvbXBsZXRpb24udGV4dCwgZGF0YS5mcm9tLCBkYXRhLnRvKTtcblx0fVxufTtcblxuXG5cblxuXG4vL1xuLy9tb2R1bGUuZXhwb3J0cyA9IHtcbi8vXHRwcmVwcm9jZXNzUHJlZml4VG9rZW5Gb3JDb21wbGV0aW9uOiBwcmVwcm9jZXNzUHJlZml4VG9rZW5Gb3JDb21wbGV0aW9uLFxuLy9cdHBvc3Rwcm9jZXNzUmVzb3VyY2VUb2tlbkZvckNvbXBsZXRpb246IHBvc3Rwcm9jZXNzUmVzb3VyY2VUb2tlbkZvckNvbXBsZXRpb24sXG4vL1x0cHJlcHJvY2Vzc1Jlc291cmNlVG9rZW5Gb3JDb21wbGV0aW9uOiBwcmVwcm9jZXNzUmVzb3VyY2VUb2tlbkZvckNvbXBsZXRpb24sXG4vL1x0c2hvd0NvbXBsZXRpb25Ob3RpZmljYXRpb246IHNob3dDb21wbGV0aW9uTm90aWZpY2F0aW9uLFxuLy9cdGhpZGVDb21wbGV0aW9uTm90aWZpY2F0aW9uOiBoaWRlQ29tcGxldGlvbk5vdGlmaWNhdGlvbixcbi8vXHRhdXRvQ29tcGxldGU6IGF1dG9Db21wbGV0ZSxcbi8vXHRhdXRvY29tcGxldGVWYXJpYWJsZXM6IGF1dG9jb21wbGV0ZVZhcmlhYmxlcyxcbi8vXHRmZXRjaEZyb21QcmVmaXhDYzogZmV0Y2hGcm9tUHJlZml4Q2MsXG4vL1x0ZmV0Y2hGcm9tTG92OiBmZXRjaEZyb21Mb3YsXG4vLy8vXHRzdG9yZUJ1bGtDb21wbGV0aW9uczogc3RvcmVCdWxrQ29tcGxldGlvbnMsXG4vL1x0bG9hZEJ1bGtDb21wbGV0aW9uczogbG9hZEJ1bGtDb21wbGV0aW9ucyxcbi8vfTsiXX0=
},{"../../lib/trie.js":6,"../index.js":30,"../utils.js":36,"wdqs-storage":18}],22:[function(require,module,exports){
(function (global){
'use strict';
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hdXRvY29tcGxldGVycy9jbGFzc2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdkcXNxZSwgbmFtZSkge1xuXHRyZXR1cm4ge1xuXHRcdGlzVmFsaWRDb21wbGV0aW9uUG9zaXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzLmlzVmFsaWRDb21wbGV0aW9uUG9zaXRpb24od2Rxc3FlKTtcblx0XHR9LFxuXHRcdGdldDogZnVuY3Rpb24odG9rZW4sIGNhbGxiYWNrKSB7XG5cdFx0XHRyZXR1cm4gcmVxdWlyZSgnLi91dGlscycpLmZldGNoRnJvbUxvdih3ZHFzcWUsIHRoaXMsIHRva2VuLCBjYWxsYmFjayk7XG5cdFx0fSxcblx0XHRwcmVQcm9jZXNzVG9rZW46IGZ1bmN0aW9uKHRva2VuKSB7XG5cdFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHMucHJlUHJvY2Vzc1Rva2VuKHdkcXNxZSwgdG9rZW4pXG5cdFx0fSxcblx0XHRwb3N0UHJvY2Vzc1Rva2VuOiBmdW5jdGlvbih0b2tlbiwgc3VnZ2VzdGVkU3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHMucG9zdFByb2Nlc3NUb2tlbih3ZHFzcWUsIHRva2VuLCBzdWdnZXN0ZWRTdHJpbmcpO1xuXHRcdH0sXG5cdFx0YXN5bmM6IHRydWUsXG5cdFx0YnVsazogZmFsc2UsXG5cdFx0YXV0b1Nob3c6IGZhbHNlLFxuXHRcdHBlcnNpc3RlbnQ6IG5hbWUsXG5cdFx0Y2FsbGJhY2tzOiB7XG5cdFx0XHR2YWxpZFBvc2l0aW9uOiB3ZHFzcWUuYXV0b2NvbXBsZXRlcnMubm90aWZpY2F0aW9ucy5zaG93LFxuXHRcdFx0aW52YWxpZFBvc2l0aW9uOiB3ZHFzcWUuYXV0b2NvbXBsZXRlcnMubm90aWZpY2F0aW9ucy5oaWRlLFxuXHRcdH1cblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMuaXNWYWxpZENvbXBsZXRpb25Qb3NpdGlvbiA9IGZ1bmN0aW9uKHdkcXNxZSkge1xuXHR2YXIgdG9rZW4gPSB3ZHFzcWUuZ2V0Q29tcGxldGVUb2tlbigpO1xuXHRpZiAodG9rZW4uc3RyaW5nLmluZGV4T2YoXCI/XCIpID09IDApXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR2YXIgY3VyID0gd2Rxc3FlLmdldEN1cnNvcigpO1xuXHR2YXIgcHJldmlvdXNUb2tlbiA9IHdkcXNxZS5nZXRQcmV2aW91c05vbldzVG9rZW4oY3VyLmxpbmUsIHRva2VuKTtcblx0aWYgKHByZXZpb3VzVG9rZW4uc3RyaW5nID09IFwiYVwiKVxuXHRcdHJldHVybiB0cnVlO1xuXHRpZiAocHJldmlvdXNUb2tlbi5zdHJpbmcgPT0gXCJyZGY6dHlwZVwiKVxuXHRcdHJldHVybiB0cnVlO1xuXHRpZiAocHJldmlvdXNUb2tlbi5zdHJpbmcgPT0gXCJyZGZzOmRvbWFpblwiKVxuXHRcdHJldHVybiB0cnVlO1xuXHRpZiAocHJldmlvdXNUb2tlbi5zdHJpbmcgPT0gXCJyZGZzOnJhbmdlXCIpXG5cdFx0cmV0dXJuIHRydWU7XG5cdHJldHVybiBmYWxzZTtcbn07XG5tb2R1bGUuZXhwb3J0cy5wcmVQcm9jZXNzVG9rZW4gPSBmdW5jdGlvbih3ZHFzcWUsIHRva2VuKSB7XG5cdHJldHVybiByZXF1aXJlKCcuL3V0aWxzLmpzJykucHJlcHJvY2Vzc1Jlc291cmNlVG9rZW5Gb3JDb21wbGV0aW9uKHdkcXNxZSwgdG9rZW4pO1xufTtcbm1vZHVsZS5leHBvcnRzLnBvc3RQcm9jZXNzVG9rZW4gPSBmdW5jdGlvbih3ZHFzcWUsIHRva2VuLCBzdWdnZXN0ZWRTdHJpbmcpIHtcblx0cmV0dXJuIHJlcXVpcmUoJy4vdXRpbHMuanMnKS5wb3N0cHJvY2Vzc1Jlc291cmNlVG9rZW5Gb3JDb21wbGV0aW9uKHdkcXNxZSwgdG9rZW4sIHN1Z2dlc3RlZFN0cmluZylcbn07Il19
},{"./utils":25,"./utils.js":25}],23:[function(require,module,exports){
(function (global){
'use strict';
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
//this is a mapping from the class names (generic ones, for compatability with codemirror themes), to what they -actually- represent
var tokenTypes = {
	"string-2": "prefixed",
	"atom": "var"
};

module.exports = function(wdqsqe, completerName) {
	//this autocompleter also fires on-change!
	wdqsqe.on("change", function() {
		module.exports.appendPrefixIfNeeded(wdqsqe, completerName);
	});


	return {
		isValidCompletionPosition: function() {
			return module.exports.isValidCompletionPosition(wdqsqe);
		},
		get: function(token, callback) {
			$.get("http://prefix.cc/popular/all.file.json", function(data) {
				var prefixArray = [];
				for (var prefix in data) {
					if (prefix == "bif")
						continue; // skip this one! see #231
					var completeString = prefix + ": <" + data[prefix] + ">";
					prefixArray.push(completeString); // the array we want to store in localstorage
				}

				prefixArray.sort();
				callback(prefixArray);
			});
		},
		preProcessToken: function(token) {
			return module.exports.preprocessPrefixTokenForCompletion(wdqsqe, token)
		},
		async: true,
		bulk: true,
		autoShow: true,
		persistent: completerName,
		callbacks: {
			pick: function() {
				wdqsqe.collapsePrefixes(false);
			}
		}
	};
};
module.exports.isValidCompletionPosition = function(wdqsqe) {
	var cur = wdqsqe.getCursor(),
		token = wdqsqe.getTokenAt(cur);

	// not at end of line
	if (wdqsqe.getLine(cur.line).length > cur.ch)
		return false;

	if (token.type != "ws") {
		// we want to complete token, e.g. when the prefix starts with an a
		// (treated as a token in itself..)
		// but we to avoid including the PREFIX tag. So when we have just
		// typed a space after the prefix tag, don't get the complete token
		token = wdqsqe.getCompleteToken();
	}

	// we shouldnt be at the uri part the prefix declaration
	// also check whether current token isnt 'a' (that makes codemirror
	// thing a namespace is a possiblecurrent
	if (!token.string.indexOf("a") == 0 && $.inArray("PNAME_NS", token.state.possibleCurrent) == -1)
		return false;

	// First token of line needs to be PREFIX,
	// there should be no trailing text (otherwise, text is wrongly inserted
	// in between)
	var previousToken = wdqsqe.getPreviousNonWsToken(cur.line, token);
	if (!previousToken || previousToken.string.toUpperCase() != "PREFIX") return false;
	return true;
};
module.exports.preprocessPrefixTokenForCompletion = function(wdqsqe, token) {
	var previousToken = wdqsqe.getPreviousNonWsToken(wdqsqe.getCursor().line, token);
	if (previousToken && previousToken.string && previousToken.string.slice(-1) == ":") {
		//combine both tokens! In this case we have the cursor at the end of line "PREFIX bla: <".
		//we want the token to be "bla: <", en not "<"
		token = {
			start: previousToken.start,
			end: token.end,
			string: previousToken.string + " " + token.string,
			state: token.state
		};
	}
	return token;
};
/**
 * Check whether typed prefix is declared. If not, automatically add declaration
 * using list from prefix.cc
 * 
 * @param wdqsqe
 */
module.exports.appendPrefixIfNeeded = function(wdqsqe, completerName) {
	if (!wdqsqe.autocompleters.getTrie(completerName))
		return; // no prefixed defined. just stop
	if (!wdqsqe.options.autocompleters || wdqsqe.options.autocompleters.indexOf(completerName) == -1) return; //this autocompleter is disabled
	var cur = wdqsqe.getCursor();

	var token = wdqsqe.getTokenAt(cur);
	if (tokenTypes[token.type] == "prefixed") {
		var colonIndex = token.string.indexOf(":");
		if (colonIndex !== -1) {
			// check previous token isnt PREFIX, or a '<'(which would mean we are in a uri)
			//			var firstTokenString = wdqsqe.getNextNonWsToken(cur.line).string.toUpperCase();
			var lastNonWsTokenString = wdqsqe.getPreviousNonWsToken(cur.line, token).string.toUpperCase();
			var previousToken = wdqsqe.getTokenAt({
				line: cur.line,
				ch: token.start
			}); // needs to be null (beginning of line), or whitespace
			if (lastNonWsTokenString != "PREFIX" && (previousToken.type == "ws" || previousToken.type == null)) {
				// check whether it isnt defined already (saves us from looping
				// through the array)
				var currentPrefix = token.string.substring(0, colonIndex + 1);
				var queryPrefixes = wdqsqe.getPrefixesFromQuery();
				if (queryPrefixes[currentPrefix.slice(0, -1)] == null) {
					// ok, so it isnt added yet!
					var completions = wdqsqe.autocompleters.getTrie(completerName).autoComplete(currentPrefix);
					if (completions.length > 0) {
						wdqsqe.addPrefixes(completions[0]);
					}
				}
			}
		}
	}
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hdXRvY29tcGxldGVycy9wcmVmaXhlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbi8vdGhpcyBpcyBhIG1hcHBpbmcgZnJvbSB0aGUgY2xhc3MgbmFtZXMgKGdlbmVyaWMgb25lcywgZm9yIGNvbXBhdGFiaWxpdHkgd2l0aCBjb2RlbWlycm9yIHRoZW1lcyksIHRvIHdoYXQgdGhleSAtYWN0dWFsbHktIHJlcHJlc2VudFxudmFyIHRva2VuVHlwZXMgPSB7XG5cdFwic3RyaW5nLTJcIjogXCJwcmVmaXhlZFwiLFxuXHRcImF0b21cIjogXCJ2YXJcIlxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3ZHFzcWUsIGNvbXBsZXRlck5hbWUpIHtcblx0Ly90aGlzIGF1dG9jb21wbGV0ZXIgYWxzbyBmaXJlcyBvbi1jaGFuZ2UhXG5cdHdkcXNxZS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbigpIHtcblx0XHRtb2R1bGUuZXhwb3J0cy5hcHBlbmRQcmVmaXhJZk5lZWRlZCh3ZHFzcWUsIGNvbXBsZXRlck5hbWUpO1xuXHR9KTtcblxuXG5cdHJldHVybiB7XG5cdFx0aXNWYWxpZENvbXBsZXRpb25Qb3NpdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHMuaXNWYWxpZENvbXBsZXRpb25Qb3NpdGlvbih3ZHFzcWUpO1xuXHRcdH0sXG5cdFx0Z2V0OiBmdW5jdGlvbih0b2tlbiwgY2FsbGJhY2spIHtcblx0XHRcdCQuZ2V0KFwiaHR0cDovL3ByZWZpeC5jYy9wb3B1bGFyL2FsbC5maWxlLmpzb25cIiwgZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHR2YXIgcHJlZml4QXJyYXkgPSBbXTtcblx0XHRcdFx0Zm9yICh2YXIgcHJlZml4IGluIGRhdGEpIHtcblx0XHRcdFx0XHRpZiAocHJlZml4ID09IFwiYmlmXCIpXG5cdFx0XHRcdFx0XHRjb250aW51ZTsgLy8gc2tpcCB0aGlzIG9uZSEgc2VlICMyMzFcblx0XHRcdFx0XHR2YXIgY29tcGxldGVTdHJpbmcgPSBwcmVmaXggKyBcIjogPFwiICsgZGF0YVtwcmVmaXhdICsgXCI+XCI7XG5cdFx0XHRcdFx0cHJlZml4QXJyYXkucHVzaChjb21wbGV0ZVN0cmluZyk7IC8vIHRoZSBhcnJheSB3ZSB3YW50IHRvIHN0b3JlIGluIGxvY2Fsc3RvcmFnZVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cHJlZml4QXJyYXkuc29ydCgpO1xuXHRcdFx0XHRjYWxsYmFjayhwcmVmaXhBcnJheSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHByZVByb2Nlc3NUb2tlbjogZnVuY3Rpb24odG9rZW4pIHtcblx0XHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cy5wcmVwcm9jZXNzUHJlZml4VG9rZW5Gb3JDb21wbGV0aW9uKHdkcXNxZSwgdG9rZW4pXG5cdFx0fSxcblx0XHRhc3luYzogdHJ1ZSxcblx0XHRidWxrOiB0cnVlLFxuXHRcdGF1dG9TaG93OiB0cnVlLFxuXHRcdHBlcnNpc3RlbnQ6IGNvbXBsZXRlck5hbWUsXG5cdFx0Y2FsbGJhY2tzOiB7XG5cdFx0XHRwaWNrOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0d2Rxc3FlLmNvbGxhcHNlUHJlZml4ZXMoZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5tb2R1bGUuZXhwb3J0cy5pc1ZhbGlkQ29tcGxldGlvblBvc2l0aW9uID0gZnVuY3Rpb24od2Rxc3FlKSB7XG5cdHZhciBjdXIgPSB3ZHFzcWUuZ2V0Q3Vyc29yKCksXG5cdFx0dG9rZW4gPSB3ZHFzcWUuZ2V0VG9rZW5BdChjdXIpO1xuXG5cdC8vIG5vdCBhdCBlbmQgb2YgbGluZVxuXHRpZiAod2Rxc3FlLmdldExpbmUoY3VyLmxpbmUpLmxlbmd0aCA+IGN1ci5jaClcblx0XHRyZXR1cm4gZmFsc2U7XG5cblx0aWYgKHRva2VuLnR5cGUgIT0gXCJ3c1wiKSB7XG5cdFx0Ly8gd2Ugd2FudCB0byBjb21wbGV0ZSB0b2tlbiwgZS5nLiB3aGVuIHRoZSBwcmVmaXggc3RhcnRzIHdpdGggYW4gYVxuXHRcdC8vICh0cmVhdGVkIGFzIGEgdG9rZW4gaW4gaXRzZWxmLi4pXG5cdFx0Ly8gYnV0IHdlIHRvIGF2b2lkIGluY2x1ZGluZyB0aGUgUFJFRklYIHRhZy4gU28gd2hlbiB3ZSBoYXZlIGp1c3Rcblx0XHQvLyB0eXBlZCBhIHNwYWNlIGFmdGVyIHRoZSBwcmVmaXggdGFnLCBkb24ndCBnZXQgdGhlIGNvbXBsZXRlIHRva2VuXG5cdFx0dG9rZW4gPSB3ZHFzcWUuZ2V0Q29tcGxldGVUb2tlbigpO1xuXHR9XG5cblx0Ly8gd2Ugc2hvdWxkbnQgYmUgYXQgdGhlIHVyaSBwYXJ0IHRoZSBwcmVmaXggZGVjbGFyYXRpb25cblx0Ly8gYWxzbyBjaGVjayB3aGV0aGVyIGN1cnJlbnQgdG9rZW4gaXNudCAnYScgKHRoYXQgbWFrZXMgY29kZW1pcnJvclxuXHQvLyB0aGluZyBhIG5hbWVzcGFjZSBpcyBhIHBvc3NpYmxlY3VycmVudFxuXHRpZiAoIXRva2VuLnN0cmluZy5pbmRleE9mKFwiYVwiKSA9PSAwICYmICQuaW5BcnJheShcIlBOQU1FX05TXCIsIHRva2VuLnN0YXRlLnBvc3NpYmxlQ3VycmVudCkgPT0gLTEpXG5cdFx0cmV0dXJuIGZhbHNlO1xuXG5cdC8vIEZpcnN0IHRva2VuIG9mIGxpbmUgbmVlZHMgdG8gYmUgUFJFRklYLFxuXHQvLyB0aGVyZSBzaG91bGQgYmUgbm8gdHJhaWxpbmcgdGV4dCAob3RoZXJ3aXNlLCB0ZXh0IGlzIHdyb25nbHkgaW5zZXJ0ZWRcblx0Ly8gaW4gYmV0d2Vlbilcblx0dmFyIHByZXZpb3VzVG9rZW4gPSB3ZHFzcWUuZ2V0UHJldmlvdXNOb25Xc1Rva2VuKGN1ci5saW5lLCB0b2tlbik7XG5cdGlmICghcHJldmlvdXNUb2tlbiB8fCBwcmV2aW91c1Rva2VuLnN0cmluZy50b1VwcGVyQ2FzZSgpICE9IFwiUFJFRklYXCIpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuIHRydWU7XG59O1xubW9kdWxlLmV4cG9ydHMucHJlcHJvY2Vzc1ByZWZpeFRva2VuRm9yQ29tcGxldGlvbiA9IGZ1bmN0aW9uKHdkcXNxZSwgdG9rZW4pIHtcblx0dmFyIHByZXZpb3VzVG9rZW4gPSB3ZHFzcWUuZ2V0UHJldmlvdXNOb25Xc1Rva2VuKHdkcXNxZS5nZXRDdXJzb3IoKS5saW5lLCB0b2tlbik7XG5cdGlmIChwcmV2aW91c1Rva2VuICYmIHByZXZpb3VzVG9rZW4uc3RyaW5nICYmIHByZXZpb3VzVG9rZW4uc3RyaW5nLnNsaWNlKC0xKSA9PSBcIjpcIikge1xuXHRcdC8vY29tYmluZSBib3RoIHRva2VucyEgSW4gdGhpcyBjYXNlIHdlIGhhdmUgdGhlIGN1cnNvciBhdCB0aGUgZW5kIG9mIGxpbmUgXCJQUkVGSVggYmxhOiA8XCIuXG5cdFx0Ly93ZSB3YW50IHRoZSB0b2tlbiB0byBiZSBcImJsYTogPFwiLCBlbiBub3QgXCI8XCJcblx0XHR0b2tlbiA9IHtcblx0XHRcdHN0YXJ0OiBwcmV2aW91c1Rva2VuLnN0YXJ0LFxuXHRcdFx0ZW5kOiB0b2tlbi5lbmQsXG5cdFx0XHRzdHJpbmc6IHByZXZpb3VzVG9rZW4uc3RyaW5nICsgXCIgXCIgKyB0b2tlbi5zdHJpbmcsXG5cdFx0XHRzdGF0ZTogdG9rZW4uc3RhdGVcblx0XHR9O1xuXHR9XG5cdHJldHVybiB0b2tlbjtcbn07XG4vKipcbiAqIENoZWNrIHdoZXRoZXIgdHlwZWQgcHJlZml4IGlzIGRlY2xhcmVkLiBJZiBub3QsIGF1dG9tYXRpY2FsbHkgYWRkIGRlY2xhcmF0aW9uXG4gKiB1c2luZyBsaXN0IGZyb20gcHJlZml4LmNjXG4gKiBcbiAqIEBwYXJhbSB3ZHFzcWVcbiAqL1xubW9kdWxlLmV4cG9ydHMuYXBwZW5kUHJlZml4SWZOZWVkZWQgPSBmdW5jdGlvbih3ZHFzcWUsIGNvbXBsZXRlck5hbWUpIHtcblx0aWYgKCF3ZHFzcWUuYXV0b2NvbXBsZXRlcnMuZ2V0VHJpZShjb21wbGV0ZXJOYW1lKSlcblx0XHRyZXR1cm47IC8vIG5vIHByZWZpeGVkIGRlZmluZWQuIGp1c3Qgc3RvcFxuXHRpZiAoIXdkcXNxZS5vcHRpb25zLmF1dG9jb21wbGV0ZXJzIHx8IHdkcXNxZS5vcHRpb25zLmF1dG9jb21wbGV0ZXJzLmluZGV4T2YoY29tcGxldGVyTmFtZSkgPT0gLTEpIHJldHVybjsgLy90aGlzIGF1dG9jb21wbGV0ZXIgaXMgZGlzYWJsZWRcblx0dmFyIGN1ciA9IHdkcXNxZS5nZXRDdXJzb3IoKTtcblxuXHR2YXIgdG9rZW4gPSB3ZHFzcWUuZ2V0VG9rZW5BdChjdXIpO1xuXHRpZiAodG9rZW5UeXBlc1t0b2tlbi50eXBlXSA9PSBcInByZWZpeGVkXCIpIHtcblx0XHR2YXIgY29sb25JbmRleCA9IHRva2VuLnN0cmluZy5pbmRleE9mKFwiOlwiKTtcblx0XHRpZiAoY29sb25JbmRleCAhPT0gLTEpIHtcblx0XHRcdC8vIGNoZWNrIHByZXZpb3VzIHRva2VuIGlzbnQgUFJFRklYLCBvciBhICc8Jyh3aGljaCB3b3VsZCBtZWFuIHdlIGFyZSBpbiBhIHVyaSlcblx0XHRcdC8vXHRcdFx0dmFyIGZpcnN0VG9rZW5TdHJpbmcgPSB3ZHFzcWUuZ2V0TmV4dE5vbldzVG9rZW4oY3VyLmxpbmUpLnN0cmluZy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0dmFyIGxhc3ROb25Xc1Rva2VuU3RyaW5nID0gd2Rxc3FlLmdldFByZXZpb3VzTm9uV3NUb2tlbihjdXIubGluZSwgdG9rZW4pLnN0cmluZy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0dmFyIHByZXZpb3VzVG9rZW4gPSB3ZHFzcWUuZ2V0VG9rZW5BdCh7XG5cdFx0XHRcdGxpbmU6IGN1ci5saW5lLFxuXHRcdFx0XHRjaDogdG9rZW4uc3RhcnRcblx0XHRcdH0pOyAvLyBuZWVkcyB0byBiZSBudWxsIChiZWdpbm5pbmcgb2YgbGluZSksIG9yIHdoaXRlc3BhY2Vcblx0XHRcdGlmIChsYXN0Tm9uV3NUb2tlblN0cmluZyAhPSBcIlBSRUZJWFwiICYmIChwcmV2aW91c1Rva2VuLnR5cGUgPT0gXCJ3c1wiIHx8IHByZXZpb3VzVG9rZW4udHlwZSA9PSBudWxsKSkge1xuXHRcdFx0XHQvLyBjaGVjayB3aGV0aGVyIGl0IGlzbnQgZGVmaW5lZCBhbHJlYWR5IChzYXZlcyB1cyBmcm9tIGxvb3Bpbmdcblx0XHRcdFx0Ly8gdGhyb3VnaCB0aGUgYXJyYXkpXG5cdFx0XHRcdHZhciBjdXJyZW50UHJlZml4ID0gdG9rZW4uc3RyaW5nLnN1YnN0cmluZygwLCBjb2xvbkluZGV4ICsgMSk7XG5cdFx0XHRcdHZhciBxdWVyeVByZWZpeGVzID0gd2Rxc3FlLmdldFByZWZpeGVzRnJvbVF1ZXJ5KCk7XG5cdFx0XHRcdGlmIChxdWVyeVByZWZpeGVzW2N1cnJlbnRQcmVmaXguc2xpY2UoMCwgLTEpXSA9PSBudWxsKSB7XG5cdFx0XHRcdFx0Ly8gb2ssIHNvIGl0IGlzbnQgYWRkZWQgeWV0IVxuXHRcdFx0XHRcdHZhciBjb21wbGV0aW9ucyA9IHdkcXNxZS5hdXRvY29tcGxldGVycy5nZXRUcmllKGNvbXBsZXRlck5hbWUpLmF1dG9Db21wbGV0ZShjdXJyZW50UHJlZml4KTtcblx0XHRcdFx0XHRpZiAoY29tcGxldGlvbnMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0d2Rxc3FlLmFkZFByZWZpeGVzKGNvbXBsZXRpb25zWzBdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn07Il19
},{}],24:[function(require,module,exports){
(function (global){
'use strict';
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hdXRvY29tcGxldGVycy9wcm9wZXJ0aWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2Rxc3FlLCBuYW1lKSB7XG5cdHJldHVybiB7XG5cdFx0aXNWYWxpZENvbXBsZXRpb25Qb3NpdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHMuaXNWYWxpZENvbXBsZXRpb25Qb3NpdGlvbih3ZHFzcWUpO1xuXHRcdH0sXG5cdFx0Z2V0OiBmdW5jdGlvbih0b2tlbiwgY2FsbGJhY2spIHtcblx0XHRcdHJldHVybiByZXF1aXJlKCcuL3V0aWxzJykuZmV0Y2hGcm9tTG92KHdkcXNxZSwgdGhpcywgdG9rZW4sIGNhbGxiYWNrKTtcblx0XHR9LFxuXHRcdHByZVByb2Nlc3NUb2tlbjogZnVuY3Rpb24odG9rZW4pIHtcblx0XHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cy5wcmVQcm9jZXNzVG9rZW4od2Rxc3FlLCB0b2tlbilcblx0XHR9LFxuXHRcdHBvc3RQcm9jZXNzVG9rZW46IGZ1bmN0aW9uKHRva2VuLCBzdWdnZXN0ZWRTdHJpbmcpIHtcblx0XHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cy5wb3N0UHJvY2Vzc1Rva2VuKHdkcXNxZSwgdG9rZW4sIHN1Z2dlc3RlZFN0cmluZyk7XG5cdFx0fSxcblx0XHRhc3luYzogdHJ1ZSxcblx0XHRidWxrOiBmYWxzZSxcblx0XHRhdXRvU2hvdzogZmFsc2UsXG5cdFx0cGVyc2lzdGVudDogbmFtZSxcblx0XHRjYWxsYmFja3M6IHtcblx0XHRcdHZhbGlkUG9zaXRpb246IHdkcXNxZS5hdXRvY29tcGxldGVycy5ub3RpZmljYXRpb25zLnNob3csXG5cdFx0XHRpbnZhbGlkUG9zaXRpb246IHdkcXNxZS5hdXRvY29tcGxldGVycy5ub3RpZmljYXRpb25zLmhpZGUsXG5cdFx0fVxuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5pc1ZhbGlkQ29tcGxldGlvblBvc2l0aW9uID0gZnVuY3Rpb24od2Rxc3FlKSB7XG5cdHZhciB0b2tlbiA9IHdkcXNxZS5nZXRDb21wbGV0ZVRva2VuKCk7XG5cdGlmICh0b2tlbi5zdHJpbmcubGVuZ3RoID09IDApXG5cdFx0cmV0dXJuIGZhbHNlOyAvL3dlIHdhbnQgLXNvbWV0aGluZy0gdG8gYXV0b2NvbXBsZXRlXG5cdGlmICh0b2tlbi5zdHJpbmcuaW5kZXhPZihcIj9cIikgPT0gMClcblx0XHRyZXR1cm4gZmFsc2U7IC8vIHdlIGFyZSB0eXBpbmcgYSB2YXJcblx0aWYgKCQuaW5BcnJheShcImFcIiwgdG9rZW4uc3RhdGUucG9zc2libGVDdXJyZW50KSA+PSAwKVxuXHRcdHJldHVybiB0cnVlOyAvLyBwcmVkaWNhdGUgcG9zXG5cdHZhciBjdXIgPSB3ZHFzcWUuZ2V0Q3Vyc29yKCk7XG5cdHZhciBwcmV2aW91c1Rva2VuID0gd2Rxc3FlLmdldFByZXZpb3VzTm9uV3NUb2tlbihjdXIubGluZSwgdG9rZW4pO1xuXHRpZiAocHJldmlvdXNUb2tlbi5zdHJpbmcgPT0gXCJyZGZzOnN1YlByb3BlcnR5T2ZcIilcblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHQvLyBobW0sIHdlIHdvdWxkIGxpa2UgLWJldHRlci0gY2hlY2tzIGhlcmUsIGUuZy4gY2hlY2tpbmcgd2hldGhlciB3ZSBhcmVcblx0Ly8gaW4gYSBzdWJqZWN0LCBhbmQgd2hldGhlciBuZXh0IGl0ZW0gaXMgYSByZGZzOnN1YnByb3BlcnR5b2YuXG5cdC8vIGRpZmZpY3VsdCB0aG91Z2guLi4gdGhlIGdyYW1tYXIgd2UgdXNlIGlzIHVucmVsaWFibGUgd2hlbiB0aGUgcXVlcnlcblx0Ly8gaXMgaW52YWxpZCAoaS5lLiBkdXJpbmcgdHlwaW5nKSwgYW5kIG9mdGVuIHRoZSBwcmVkaWNhdGUgaXMgbm90IHR5cGVkXG5cdC8vIHlldCwgd2hlbiB3ZSBhcmUgYnVzeSB3cml0aW5nIHRoZSBzdWJqZWN0Li4uXG5cdHJldHVybiBmYWxzZTtcbn07XG5tb2R1bGUuZXhwb3J0cy5wcmVQcm9jZXNzVG9rZW4gPSBmdW5jdGlvbih3ZHFzcWUsIHRva2VuKSB7XG5cdHJldHVybiByZXF1aXJlKCcuL3V0aWxzLmpzJykucHJlcHJvY2Vzc1Jlc291cmNlVG9rZW5Gb3JDb21wbGV0aW9uKHdkcXNxZSwgdG9rZW4pO1xufTtcbm1vZHVsZS5leHBvcnRzLnBvc3RQcm9jZXNzVG9rZW4gPSBmdW5jdGlvbih3ZHFzcWUsIHRva2VuLCBzdWdnZXN0ZWRTdHJpbmcpIHtcblx0cmV0dXJuIHJlcXVpcmUoJy4vdXRpbHMuanMnKS5wb3N0cHJvY2Vzc1Jlc291cmNlVG9rZW5Gb3JDb21wbGV0aW9uKHdkcXNxZSwgdG9rZW4sIHN1Z2dlc3RlZFN0cmluZylcbn07Il19
},{"./utils":25,"./utils.js":25}],25:[function(require,module,exports){
(function (global){
'use strict';
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
	utils = require('./utils.js'),
	yutils = require('wdqs-storage');
/**
 * Where the base class only contains functionality related to -all- completions, this class contains some utils used here and there in our autocompletions
 */



/**
 * Converts rdf:type to http://.../type and converts <http://...> to http://...
 * Stores additional info such as the used namespace and prefix in the token object
 */
var preprocessResourceTokenForCompletion = function(wdqsqe, token) {
	var queryPrefixes = wdqsqe.getPrefixesFromQuery();
	if (!token.string.indexOf("<") == 0) {
		token.tokenPrefix = token.string.substring(0, token.string.indexOf(":") + 1);

		if (queryPrefixes[token.tokenPrefix.slice(0, -1)] != null) {
			token.tokenPrefixUri = queryPrefixes[token.tokenPrefix.slice(0, -1)];
		}
	}

	token.autocompletionString = token.string.trim();
	if (!token.string.indexOf("<") == 0 && token.string.indexOf(":") > -1) {
		// hmm, the token is prefixed. We still need the complete uri for autocompletions. generate this!
		for (var prefix in queryPrefixes) {
			if (token.string.indexOf(prefix) == 0) {
				token.autocompletionString = queryPrefixes[prefix];
				token.autocompletionString += token.string.substring(prefix.length + 1);
				break;
			}
		}
	}

	if (token.autocompletionString.indexOf("<") == 0) token.autocompletionString = token.autocompletionString.substring(1);
	if (token.autocompletionString.indexOf(">", token.length - 1) !== -1) token.autocompletionString = token.autocompletionString.substring(0, token.autocompletionString.length - 1);
	return token;
};

var postprocessResourceTokenForCompletion = function(wdqsqe, token, suggestedString) {
	if (token.tokenPrefix && token.autocompletionString && token.tokenPrefixUri) {
		// we need to get the suggested string back to prefixed form
		suggestedString = token.tokenPrefix + suggestedString.substring(token.tokenPrefixUri.length);
	} else {
		// it is a regular uri. add '<' and '>' to string
		suggestedString = "<" + suggestedString + ">";
	}
	return suggestedString;
};

var fetchFromLov = function(wdqsqe, completer, token, callback) {
	if (!token || !token.string || token.string.trim().length == 0) {
		wdqsqe.autocompleters.notifications.getEl(completer)
			.empty()
			.append("Nothing to autocomplete yet!");
		return false;
	}
	var maxResults = 50;

	var args = {
		q: token.autocompletionString,
		page: 1
	};
	if (completer.name == "classes") {
		args.type = "class";
	} else {
		args.type = "property";
	}
	var results = [];
	var url = "";
	var updateUrl = function() {
		url = "http://lov.okfn.org/dataset/lov/api/v2/autocomplete/terms?" + $.param(args);
	};
	updateUrl();
	var increasePage = function() {
		args.page++;
		updateUrl();
	};
	var doRequests = function() {
		$.get(
			url,
			function(data) {
				for (var i = 0; i < data.results.length; i++) {
					if ($.isArray(data.results[i].uri) && data.results[i].uri.length > 0) {
						results.push(data.results[i].uri[0]);
					} else {
						results.push(data.results[i].uri);
					}

				}
				if (results.length < data.total_results && results.length < maxResults) {
					increasePage();
					doRequests();
				} else {
					//if notification bar is there, show feedback, or close
					if (results.length > 0) {
						wdqsqe.autocompleters.notifications.hide(wdqsqe, completer)
					} else {
						wdqsqe.autocompleters.notifications.getEl(completer).text("0 matches found...");
					}
					callback(results);
					// requests done! Don't call this function again
				}
			}).fail(function(jqXHR, textStatus, errorThrown) {
			wdqsqe.autocompleters.notifications.getEl(completer)
				.empty()
				.append("Failed fetching suggestions..");

		});
	};
	//if notification bar is there, show a loader
	wdqsqe.autocompleters.notifications.getEl(completer)
		.empty()
		.append($("<span>Fetchting autocompletions &nbsp;</span>"))
		.append($(yutils.svg.getElement(require('../imgs.js').loader)).addClass("notificationLoader"));
	doRequests();
};



module.exports = {
	fetchFromLov: fetchFromLov,
	preprocessResourceTokenForCompletion: preprocessResourceTokenForCompletion,
	postprocessResourceTokenForCompletion: postprocessResourceTokenForCompletion,
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hdXRvY29tcGxldGVycy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbnZhciAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpLFxuXHR1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKSxcblx0eXV0aWxzID0gcmVxdWlyZSgnd2Rxcy1zdG9yYWdlJyk7XG4vKipcbiAqIFdoZXJlIHRoZSBiYXNlIGNsYXNzIG9ubHkgY29udGFpbnMgZnVuY3Rpb25hbGl0eSByZWxhdGVkIHRvIC1hbGwtIGNvbXBsZXRpb25zLCB0aGlzIGNsYXNzIGNvbnRhaW5zIHNvbWUgdXRpbHMgdXNlZCBoZXJlIGFuZCB0aGVyZSBpbiBvdXIgYXV0b2NvbXBsZXRpb25zXG4gKi9cblxuXG5cbi8qKlxuICogQ29udmVydHMgcmRmOnR5cGUgdG8gaHR0cDovLy4uLi90eXBlIGFuZCBjb252ZXJ0cyA8aHR0cDovLy4uLj4gdG8gaHR0cDovLy4uLlxuICogU3RvcmVzIGFkZGl0aW9uYWwgaW5mbyBzdWNoIGFzIHRoZSB1c2VkIG5hbWVzcGFjZSBhbmQgcHJlZml4IGluIHRoZSB0b2tlbiBvYmplY3RcbiAqL1xudmFyIHByZXByb2Nlc3NSZXNvdXJjZVRva2VuRm9yQ29tcGxldGlvbiA9IGZ1bmN0aW9uKHdkcXNxZSwgdG9rZW4pIHtcblx0dmFyIHF1ZXJ5UHJlZml4ZXMgPSB3ZHFzcWUuZ2V0UHJlZml4ZXNGcm9tUXVlcnkoKTtcblx0aWYgKCF0b2tlbi5zdHJpbmcuaW5kZXhPZihcIjxcIikgPT0gMCkge1xuXHRcdHRva2VuLnRva2VuUHJlZml4ID0gdG9rZW4uc3RyaW5nLnN1YnN0cmluZygwLCB0b2tlbi5zdHJpbmcuaW5kZXhPZihcIjpcIikgKyAxKTtcblxuXHRcdGlmIChxdWVyeVByZWZpeGVzW3Rva2VuLnRva2VuUHJlZml4LnNsaWNlKDAsIC0xKV0gIT0gbnVsbCkge1xuXHRcdFx0dG9rZW4udG9rZW5QcmVmaXhVcmkgPSBxdWVyeVByZWZpeGVzW3Rva2VuLnRva2VuUHJlZml4LnNsaWNlKDAsIC0xKV07XG5cdFx0fVxuXHR9XG5cblx0dG9rZW4uYXV0b2NvbXBsZXRpb25TdHJpbmcgPSB0b2tlbi5zdHJpbmcudHJpbSgpO1xuXHRpZiAoIXRva2VuLnN0cmluZy5pbmRleE9mKFwiPFwiKSA9PSAwICYmIHRva2VuLnN0cmluZy5pbmRleE9mKFwiOlwiKSA+IC0xKSB7XG5cdFx0Ly8gaG1tLCB0aGUgdG9rZW4gaXMgcHJlZml4ZWQuIFdlIHN0aWxsIG5lZWQgdGhlIGNvbXBsZXRlIHVyaSBmb3IgYXV0b2NvbXBsZXRpb25zLiBnZW5lcmF0ZSB0aGlzIVxuXHRcdGZvciAodmFyIHByZWZpeCBpbiBxdWVyeVByZWZpeGVzKSB7XG5cdFx0XHRpZiAodG9rZW4uc3RyaW5nLmluZGV4T2YocHJlZml4KSA9PSAwKSB7XG5cdFx0XHRcdHRva2VuLmF1dG9jb21wbGV0aW9uU3RyaW5nID0gcXVlcnlQcmVmaXhlc1twcmVmaXhdO1xuXHRcdFx0XHR0b2tlbi5hdXRvY29tcGxldGlvblN0cmluZyArPSB0b2tlbi5zdHJpbmcuc3Vic3RyaW5nKHByZWZpeC5sZW5ndGggKyAxKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKHRva2VuLmF1dG9jb21wbGV0aW9uU3RyaW5nLmluZGV4T2YoXCI8XCIpID09IDApIHRva2VuLmF1dG9jb21wbGV0aW9uU3RyaW5nID0gdG9rZW4uYXV0b2NvbXBsZXRpb25TdHJpbmcuc3Vic3RyaW5nKDEpO1xuXHRpZiAodG9rZW4uYXV0b2NvbXBsZXRpb25TdHJpbmcuaW5kZXhPZihcIj5cIiwgdG9rZW4ubGVuZ3RoIC0gMSkgIT09IC0xKSB0b2tlbi5hdXRvY29tcGxldGlvblN0cmluZyA9IHRva2VuLmF1dG9jb21wbGV0aW9uU3RyaW5nLnN1YnN0cmluZygwLCB0b2tlbi5hdXRvY29tcGxldGlvblN0cmluZy5sZW5ndGggLSAxKTtcblx0cmV0dXJuIHRva2VuO1xufTtcblxudmFyIHBvc3Rwcm9jZXNzUmVzb3VyY2VUb2tlbkZvckNvbXBsZXRpb24gPSBmdW5jdGlvbih3ZHFzcWUsIHRva2VuLCBzdWdnZXN0ZWRTdHJpbmcpIHtcblx0aWYgKHRva2VuLnRva2VuUHJlZml4ICYmIHRva2VuLmF1dG9jb21wbGV0aW9uU3RyaW5nICYmIHRva2VuLnRva2VuUHJlZml4VXJpKSB7XG5cdFx0Ly8gd2UgbmVlZCB0byBnZXQgdGhlIHN1Z2dlc3RlZCBzdHJpbmcgYmFjayB0byBwcmVmaXhlZCBmb3JtXG5cdFx0c3VnZ2VzdGVkU3RyaW5nID0gdG9rZW4udG9rZW5QcmVmaXggKyBzdWdnZXN0ZWRTdHJpbmcuc3Vic3RyaW5nKHRva2VuLnRva2VuUHJlZml4VXJpLmxlbmd0aCk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gaXQgaXMgYSByZWd1bGFyIHVyaS4gYWRkICc8JyBhbmQgJz4nIHRvIHN0cmluZ1xuXHRcdHN1Z2dlc3RlZFN0cmluZyA9IFwiPFwiICsgc3VnZ2VzdGVkU3RyaW5nICsgXCI+XCI7XG5cdH1cblx0cmV0dXJuIHN1Z2dlc3RlZFN0cmluZztcbn07XG5cbnZhciBmZXRjaEZyb21Mb3YgPSBmdW5jdGlvbih3ZHFzcWUsIGNvbXBsZXRlciwgdG9rZW4sIGNhbGxiYWNrKSB7XG5cdGlmICghdG9rZW4gfHwgIXRva2VuLnN0cmluZyB8fCB0b2tlbi5zdHJpbmcudHJpbSgpLmxlbmd0aCA9PSAwKSB7XG5cdFx0d2Rxc3FlLmF1dG9jb21wbGV0ZXJzLm5vdGlmaWNhdGlvbnMuZ2V0RWwoY29tcGxldGVyKVxuXHRcdFx0LmVtcHR5KClcblx0XHRcdC5hcHBlbmQoXCJOb3RoaW5nIHRvIGF1dG9jb21wbGV0ZSB5ZXQhXCIpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHR2YXIgbWF4UmVzdWx0cyA9IDUwO1xuXG5cdHZhciBhcmdzID0ge1xuXHRcdHE6IHRva2VuLmF1dG9jb21wbGV0aW9uU3RyaW5nLFxuXHRcdHBhZ2U6IDFcblx0fTtcblx0aWYgKGNvbXBsZXRlci5uYW1lID09IFwiY2xhc3Nlc1wiKSB7XG5cdFx0YXJncy50eXBlID0gXCJjbGFzc1wiO1xuXHR9IGVsc2Uge1xuXHRcdGFyZ3MudHlwZSA9IFwicHJvcGVydHlcIjtcblx0fVxuXHR2YXIgcmVzdWx0cyA9IFtdO1xuXHR2YXIgdXJsID0gXCJcIjtcblx0dmFyIHVwZGF0ZVVybCA9IGZ1bmN0aW9uKCkge1xuXHRcdHVybCA9IFwiaHR0cDovL2xvdi5va2ZuLm9yZy9kYXRhc2V0L2xvdi9hcGkvdjIvYXV0b2NvbXBsZXRlL3Rlcm1zP1wiICsgJC5wYXJhbShhcmdzKTtcblx0fTtcblx0dXBkYXRlVXJsKCk7XG5cdHZhciBpbmNyZWFzZVBhZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRhcmdzLnBhZ2UrKztcblx0XHR1cGRhdGVVcmwoKTtcblx0fTtcblx0dmFyIGRvUmVxdWVzdHMgPSBmdW5jdGlvbigpIHtcblx0XHQkLmdldChcblx0XHRcdHVybCxcblx0XHRcdGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLnJlc3VsdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAoJC5pc0FycmF5KGRhdGEucmVzdWx0c1tpXS51cmkpICYmIGRhdGEucmVzdWx0c1tpXS51cmkubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKGRhdGEucmVzdWx0c1tpXS51cmlbMF0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goZGF0YS5yZXN1bHRzW2ldLnVyaSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHJlc3VsdHMubGVuZ3RoIDwgZGF0YS50b3RhbF9yZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoIDwgbWF4UmVzdWx0cykge1xuXHRcdFx0XHRcdGluY3JlYXNlUGFnZSgpO1xuXHRcdFx0XHRcdGRvUmVxdWVzdHMoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL2lmIG5vdGlmaWNhdGlvbiBiYXIgaXMgdGhlcmUsIHNob3cgZmVlZGJhY2ssIG9yIGNsb3NlXG5cdFx0XHRcdFx0aWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0d2Rxc3FlLmF1dG9jb21wbGV0ZXJzLm5vdGlmaWNhdGlvbnMuaGlkZSh3ZHFzcWUsIGNvbXBsZXRlcilcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0d2Rxc3FlLmF1dG9jb21wbGV0ZXJzLm5vdGlmaWNhdGlvbnMuZ2V0RWwoY29tcGxldGVyKS50ZXh0KFwiMCBtYXRjaGVzIGZvdW5kLi4uXCIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYWxsYmFjayhyZXN1bHRzKTtcblx0XHRcdFx0XHQvLyByZXF1ZXN0cyBkb25lISBEb24ndCBjYWxsIHRoaXMgZnVuY3Rpb24gYWdhaW5cblx0XHRcdFx0fVxuXHRcdFx0fSkuZmFpbChmdW5jdGlvbihqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcblx0XHRcdHdkcXNxZS5hdXRvY29tcGxldGVycy5ub3RpZmljYXRpb25zLmdldEVsKGNvbXBsZXRlcilcblx0XHRcdFx0LmVtcHR5KClcblx0XHRcdFx0LmFwcGVuZChcIkZhaWxlZCBmZXRjaGluZyBzdWdnZXN0aW9ucy4uXCIpO1xuXG5cdFx0fSk7XG5cdH07XG5cdC8vaWYgbm90aWZpY2F0aW9uIGJhciBpcyB0aGVyZSwgc2hvdyBhIGxvYWRlclxuXHR3ZHFzcWUuYXV0b2NvbXBsZXRlcnMubm90aWZpY2F0aW9ucy5nZXRFbChjb21wbGV0ZXIpXG5cdFx0LmVtcHR5KClcblx0XHQuYXBwZW5kKCQoXCI8c3Bhbj5GZXRjaHRpbmcgYXV0b2NvbXBsZXRpb25zICZuYnNwOzwvc3Bhbj5cIikpXG5cdFx0LmFwcGVuZCgkKHl1dGlscy5zdmcuZ2V0RWxlbWVudChyZXF1aXJlKCcuLi9pbWdzLmpzJykubG9hZGVyKSkuYWRkQ2xhc3MoXCJub3RpZmljYXRpb25Mb2FkZXJcIikpO1xuXHRkb1JlcXVlc3RzKCk7XG59O1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGZldGNoRnJvbUxvdjogZmV0Y2hGcm9tTG92LFxuXHRwcmVwcm9jZXNzUmVzb3VyY2VUb2tlbkZvckNvbXBsZXRpb246IHByZXByb2Nlc3NSZXNvdXJjZVRva2VuRm9yQ29tcGxldGlvbixcblx0cG9zdHByb2Nlc3NSZXNvdXJjZVRva2VuRm9yQ29tcGxldGlvbjogcG9zdHByb2Nlc3NSZXNvdXJjZVRva2VuRm9yQ29tcGxldGlvbixcbn07Il19
},{"../imgs.js":29,"./utils.js":25,"wdqs-storage":18}],26:[function(require,module,exports){
(function (global){
'use strict';
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
module.exports = function(wdqsqe) {
	return {
		isValidCompletionPosition: function() {
			var token = wdqsqe.getTokenAt(wdqsqe.getCursor());
			if (token.type != "ws") {
				token = wdqsqe.getCompleteToken(token);
				if (token && token.string.indexOf("?") == 0) {
					return true;
				}
			}
			return false;
		},
		get: function(token) {
			if (token.trim().length == 0) return []; //nothing to autocomplete
			var distinctVars = {};
			//do this outside of codemirror. I expect jquery to be faster here (just finding dom elements with classnames)
			$(wdqsqe.getWrapperElement()).find(".cm-atom").each(function() {
				var variable = this.innerHTML;
				if (variable.indexOf("?") == 0) {
					//ok, lets check if the next element in the div is an atom as well. In that case, they belong together (may happen sometimes when query is not syntactically valid)
					var nextEl = $(this).next();
					var nextElClass = nextEl.attr('class');
					if (nextElClass && nextEl.attr('class').indexOf("cm-atom") >= 0) {
						variable += nextEl.text();
					}

					//skip single questionmarks
					if (variable.length <= 1) return;

					//it should match our token ofcourse
					if (variable.indexOf(token) !== 0) return;

					//skip exact matches
					if (variable == token) return;

					//store in map so we have a unique list 
					distinctVars[variable] = true;


				}
			});
			var variables = [];
			for (var variable in distinctVars) {
				variables.push(variable);
			}
			variables.sort();
			return variables;
		},
		async: false,
		bulk: false,
		autoShow: true,
	}
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hdXRvY29tcGxldGVycy92YXJpYWJsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2Rxc3FlKSB7XG5cdHJldHVybiB7XG5cdFx0aXNWYWxpZENvbXBsZXRpb25Qb3NpdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdG9rZW4gPSB3ZHFzcWUuZ2V0VG9rZW5BdCh3ZHFzcWUuZ2V0Q3Vyc29yKCkpO1xuXHRcdFx0aWYgKHRva2VuLnR5cGUgIT0gXCJ3c1wiKSB7XG5cdFx0XHRcdHRva2VuID0gd2Rxc3FlLmdldENvbXBsZXRlVG9rZW4odG9rZW4pO1xuXHRcdFx0XHRpZiAodG9rZW4gJiYgdG9rZW4uc3RyaW5nLmluZGV4T2YoXCI/XCIpID09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0sXG5cdFx0Z2V0OiBmdW5jdGlvbih0b2tlbikge1xuXHRcdFx0aWYgKHRva2VuLnRyaW0oKS5sZW5ndGggPT0gMCkgcmV0dXJuIFtdOyAvL25vdGhpbmcgdG8gYXV0b2NvbXBsZXRlXG5cdFx0XHR2YXIgZGlzdGluY3RWYXJzID0ge307XG5cdFx0XHQvL2RvIHRoaXMgb3V0c2lkZSBvZiBjb2RlbWlycm9yLiBJIGV4cGVjdCBqcXVlcnkgdG8gYmUgZmFzdGVyIGhlcmUgKGp1c3QgZmluZGluZyBkb20gZWxlbWVudHMgd2l0aCBjbGFzc25hbWVzKVxuXHRcdFx0JCh3ZHFzcWUuZ2V0V3JhcHBlckVsZW1lbnQoKSkuZmluZChcIi5jbS1hdG9tXCIpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciB2YXJpYWJsZSA9IHRoaXMuaW5uZXJIVE1MO1xuXHRcdFx0XHRpZiAodmFyaWFibGUuaW5kZXhPZihcIj9cIikgPT0gMCkge1xuXHRcdFx0XHRcdC8vb2ssIGxldHMgY2hlY2sgaWYgdGhlIG5leHQgZWxlbWVudCBpbiB0aGUgZGl2IGlzIGFuIGF0b20gYXMgd2VsbC4gSW4gdGhhdCBjYXNlLCB0aGV5IGJlbG9uZyB0b2dldGhlciAobWF5IGhhcHBlbiBzb21ldGltZXMgd2hlbiBxdWVyeSBpcyBub3Qgc3ludGFjdGljYWxseSB2YWxpZClcblx0XHRcdFx0XHR2YXIgbmV4dEVsID0gJCh0aGlzKS5uZXh0KCk7XG5cdFx0XHRcdFx0dmFyIG5leHRFbENsYXNzID0gbmV4dEVsLmF0dHIoJ2NsYXNzJyk7XG5cdFx0XHRcdFx0aWYgKG5leHRFbENsYXNzICYmIG5leHRFbC5hdHRyKCdjbGFzcycpLmluZGV4T2YoXCJjbS1hdG9tXCIpID49IDApIHtcblx0XHRcdFx0XHRcdHZhcmlhYmxlICs9IG5leHRFbC50ZXh0KCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly9za2lwIHNpbmdsZSBxdWVzdGlvbm1hcmtzXG5cdFx0XHRcdFx0aWYgKHZhcmlhYmxlLmxlbmd0aCA8PSAxKSByZXR1cm47XG5cblx0XHRcdFx0XHQvL2l0IHNob3VsZCBtYXRjaCBvdXIgdG9rZW4gb2Zjb3Vyc2Vcblx0XHRcdFx0XHRpZiAodmFyaWFibGUuaW5kZXhPZih0b2tlbikgIT09IDApIHJldHVybjtcblxuXHRcdFx0XHRcdC8vc2tpcCBleGFjdCBtYXRjaGVzXG5cdFx0XHRcdFx0aWYgKHZhcmlhYmxlID09IHRva2VuKSByZXR1cm47XG5cblx0XHRcdFx0XHQvL3N0b3JlIGluIG1hcCBzbyB3ZSBoYXZlIGEgdW5pcXVlIGxpc3QgXG5cdFx0XHRcdFx0ZGlzdGluY3RWYXJzW3ZhcmlhYmxlXSA9IHRydWU7XG5cblxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHZhciB2YXJpYWJsZXMgPSBbXTtcblx0XHRcdGZvciAodmFyIHZhcmlhYmxlIGluIGRpc3RpbmN0VmFycykge1xuXHRcdFx0XHR2YXJpYWJsZXMucHVzaCh2YXJpYWJsZSk7XG5cdFx0XHR9XG5cdFx0XHR2YXJpYWJsZXMuc29ydCgpO1xuXHRcdFx0cmV0dXJuIHZhcmlhYmxlcztcblx0XHR9LFxuXHRcdGFzeW5jOiBmYWxzZSxcblx0XHRidWxrOiBmYWxzZSxcblx0XHRhdXRvU2hvdzogdHJ1ZSxcblx0fVxufTsiXX0=
},{}],27:[function(require,module,exports){
(function (global){
var sparql = require('./sparql.js'),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var quote = function(string) {
  return "'" + string + "'";
};
module.exports = {
  createCurlString : function(wdqsqe, config) {
    var ajaxConfig = sparql.getAjaxConfig(wdqsqe, config);
    
    var url = wdqsqe.options.sparql.endpoint;
    if (wdqsqe.options.sparql.requestMethod == 'GET') {
      url += '?' + $.param(ajaxConfig.data);
    }
    var cmds = [
      'curl', url,
      '-X', wdqsqe.options.sparql.requestMethod
    ];
    if (wdqsqe.options.sparql.requestMethod == 'POST') {
      cmds.push('--data ' + quote($.param(ajaxConfig.data)));
    }
    for (var header in ajaxConfig.headers) {
      cmds.push('-H ' + quote(header + ': ' + ajaxConfig.headers[header]));
    }
    return cmds.join(' ');




  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jdXJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHNwYXJxbCA9IHJlcXVpcmUoJy4vc3BhcnFsLmpzJyksXG4gICAgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbnZhciBxdW90ZSA9IGZ1bmN0aW9uKHN0cmluZykge1xuICByZXR1cm4gXCInXCIgKyBzdHJpbmcgKyBcIidcIjtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlQ3VybFN0cmluZyA6IGZ1bmN0aW9uKHdkcXNxZSwgY29uZmlnKSB7XG4gICAgdmFyIGFqYXhDb25maWcgPSBzcGFycWwuZ2V0QWpheENvbmZpZyh3ZHFzcWUsIGNvbmZpZyk7XG4gICAgXG4gICAgdmFyIHVybCA9IHdkcXNxZS5vcHRpb25zLnNwYXJxbC5lbmRwb2ludDtcbiAgICBpZiAod2Rxc3FlLm9wdGlvbnMuc3BhcnFsLnJlcXVlc3RNZXRob2QgPT0gJ0dFVCcpIHtcbiAgICAgIHVybCArPSAnPycgKyAkLnBhcmFtKGFqYXhDb25maWcuZGF0YSk7XG4gICAgfVxuICAgIHZhciBjbWRzID0gW1xuICAgICAgJ2N1cmwnLCB1cmwsXG4gICAgICAnLVgnLCB3ZHFzcWUub3B0aW9ucy5zcGFycWwucmVxdWVzdE1ldGhvZFxuICAgIF07XG4gICAgaWYgKHdkcXNxZS5vcHRpb25zLnNwYXJxbC5yZXF1ZXN0TWV0aG9kID09ICdQT1NUJykge1xuICAgICAgY21kcy5wdXNoKCctLWRhdGEgJyArIHF1b3RlKCQucGFyYW0oYWpheENvbmZpZy5kYXRhKSkpO1xuICAgIH1cbiAgICBmb3IgKHZhciBoZWFkZXIgaW4gYWpheENvbmZpZy5oZWFkZXJzKSB7XG4gICAgICBjbWRzLnB1c2goJy1IICcgKyBxdW90ZShoZWFkZXIgKyAnOiAnICsgYWpheENvbmZpZy5oZWFkZXJzW2hlYWRlcl0pKTtcbiAgICB9XG4gICAgcmV0dXJuIGNtZHMuam9pbignICcpO1xuXG5cblxuXG4gIH1cbn07XG4iXX0=
},{"./sparql.js":33}],28:[function(require,module,exports){
(function (global){
/**
 * The default options of WDQSQE (check the CodeMirror documentation for even
 * more options, such as disabling line numbers, or changing keyboard shortcut
 * keys). Either change the default options by setting WDQSQE.defaults, or by
 * passing your own options as second argument to the WDQSQE constructor
 */
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9kZWZhdWx0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhlIGRlZmF1bHQgb3B0aW9ucyBvZiBXRFFTUUUgKGNoZWNrIHRoZSBDb2RlTWlycm9yIGRvY3VtZW50YXRpb24gZm9yIGV2ZW5cbiAqIG1vcmUgb3B0aW9ucywgc3VjaCBhcyBkaXNhYmxpbmcgbGluZSBudW1iZXJzLCBvciBjaGFuZ2luZyBrZXlib2FyZCBzaG9ydGN1dFxuICoga2V5cykuIEVpdGhlciBjaGFuZ2UgdGhlIGRlZmF1bHQgb3B0aW9ucyBieSBzZXR0aW5nIFdEUVNRRS5kZWZhdWx0cywgb3IgYnlcbiAqIHBhc3NpbmcgeW91ciBvd24gb3B0aW9ucyBhcyBzZWNvbmQgYXJndW1lbnQgdG8gdGhlIFdEUVNRRSBjb25zdHJ1Y3RvclxuICovXG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKSxcblx0V0RRU1FFID0gcmVxdWlyZSgnLi9pbmRleC5qcycpO1xuXHRXRFFTUUUuZGVmYXVsdHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgV0RRU1FFLmRlZmF1bHRzLCB7XG5cdG1vZGU6IFwic3BhcnFsMTFcIixcblx0LyoqXG5cdCAqIFF1ZXJ5IHN0cmluZ1xuXHQgKi9cblx0dmFsdWU6IFwiUFJFRklYIHJkZjogPGh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyM+XFxuUFJFRklYIHJkZnM6IDxodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjPlxcblNFTEVDVCAqIFdIRVJFIHtcXG4gID9zdWIgP3ByZWQgP29iaiAuXFxufSBcXG5MSU1JVCAxMFwiLFxuXHRoaWdobGlnaHRTZWxlY3Rpb25NYXRjaGVzOiB7XG5cdFx0c2hvd1Rva2VuOiAvXFx3L1xuXHR9LFxuXHR0YWJNb2RlOiBcImluZGVudFwiLFxuXHRsaW5lTnVtYmVyczogdHJ1ZSxcblx0bGluZVdyYXBwaW5nOiB0cnVlLFxuXHRiYWNrZHJvcDogZmFsc2UsXG5cdGZvbGRHdXR0ZXI6IHtcblx0XHRyYW5nZUZpbmRlcjogbmV3IFdEUVNRRS5mb2xkLmNvbWJpbmUoV0RRU1FFLmZvbGQuYnJhY2UsIFdEUVNRRS5mb2xkLnByZWZpeClcblx0fSxcblx0Y29sbGFwc2VQcmVmaXhlc09uTG9hZDogZmFsc2UsXG5cdGd1dHRlcnM6IFtcImd1dHRlckVycm9yQmFyXCIsIFwiQ29kZU1pcnJvci1saW5lbnVtYmVyc1wiLCBcIkNvZGVNaXJyb3ItZm9sZGd1dHRlclwiXSxcblx0bWF0Y2hCcmFja2V0czogdHJ1ZSxcblx0Zml4ZWRHdXR0ZXI6IHRydWUsXG5cdHN5bnRheEVycm9yQ2hlY2s6IHRydWUsXG5cdC8qKlxuXHQgKiBFeHRyYSBzaG9ydGN1dCBrZXlzLiBDaGVjayB0aGUgQ29kZU1pcnJvciBtYW51YWwgb24gaG93IHRvIGFkZCB5b3VyIG93blxuXHQgKlxuXHQgKiBAcHJvcGVydHkgZXh0cmFLZXlzXG5cdCAqIEB0eXBlIG9iamVjdFxuXHQgKi9cblx0ZXh0cmFLZXlzOiB7XG5cdFx0Ly9cdFx0XHRcdFx0XCJDdHJsLVNwYWNlXCIgOiBmdW5jdGlvbih3ZHFzcWUpIHtcblx0XHQvL1x0XHRcdFx0XHRcdFdEUVNRRS5hdXRvQ29tcGxldGUod2Rxc3FlKTtcblx0XHQvL1x0XHRcdFx0XHR9LFxuXHRcdFwiQ3RybC1TcGFjZVwiOiBXRFFTUUUuYXV0b0NvbXBsZXRlLFxuXG5cdFx0XCJDbWQtU3BhY2VcIjogV0RRU1FFLmF1dG9Db21wbGV0ZSxcblx0XHRcIkN0cmwtRFwiOiBXRFFTUUUuZGVsZXRlTGluZSxcblx0XHRcIkN0cmwtS1wiOiBXRFFTUUUuZGVsZXRlTGluZSxcblx0XHRcIkNtZC1EXCI6IFdEUVNRRS5kZWxldGVMaW5lLFxuXHRcdFwiQ21kLUtcIjogV0RRU1FFLmRlbGV0ZUxpbmUsXG5cdFx0XCJDdHJsLS9cIjogV0RRU1FFLmNvbW1lbnRMaW5lcyxcblx0XHRcIkNtZC0vXCI6IFdEUVNRRS5jb21tZW50TGluZXMsXG5cdFx0XCJDdHJsLUFsdC1Eb3duXCI6IFdEUVNRRS5jb3B5TGluZURvd24sXG5cdFx0XCJDdHJsLUFsdC1VcFwiOiBXRFFTUUUuY29weUxpbmVVcCxcblx0XHRcIkNtZC1BbHQtRG93blwiOiBXRFFTUUUuY29weUxpbmVEb3duLFxuXHRcdFwiQ21kLUFsdC1VcFwiOiBXRFFTUUUuY29weUxpbmVVcCxcblx0XHRcIlNoaWZ0LUN0cmwtRlwiOiBXRFFTUUUuZG9BdXRvRm9ybWF0LFxuXHRcdFwiU2hpZnQtQ21kLUZcIjogV0RRU1FFLmRvQXV0b0Zvcm1hdCxcblx0XHRcIkN0cmwtXVwiOiBXRFFTUUUuaW5kZW50TW9yZSxcblx0XHRcIkNtZC1dXCI6IFdEUVNRRS5pbmRlbnRNb3JlLFxuXHRcdFwiQ3RybC1bXCI6IFdEUVNRRS5pbmRlbnRMZXNzLFxuXHRcdFwiQ21kLVtcIjogV0RRU1FFLmluZGVudExlc3MsXG5cdFx0XCJDdHJsLVNcIjogV0RRU1FFLnN0b3JlUXVlcnksXG5cdFx0XCJDbWQtU1wiOiBXRFFTUUUuc3RvcmVRdWVyeSxcblx0XHRcIkN0cmwtRW50ZXJcIjogV0RRU1FFLmV4ZWN1dGVRdWVyeSxcblx0XHRcIkNtZC1FbnRlclwiOiBXRFFTUUUuZXhlY3V0ZVF1ZXJ5LFxuXHRcdFwiRjExXCI6IGZ1bmN0aW9uKHdkcXNxZSkge1xuXHRcdFx0d2Rxc3FlLnNldE9wdGlvbihcImZ1bGxTY3JlZW5cIiwgIXdkcXNxZS5nZXRPcHRpb24oXCJmdWxsU2NyZWVuXCIpKTtcblx0XHR9LFxuXHRcdFwiRXNjXCI6IGZ1bmN0aW9uKHdkcXNxZSkge1xuXHRcdFx0aWYgKHdkcXNxZS5nZXRPcHRpb24oXCJmdWxsU2NyZWVuXCIpKSB3ZHFzcWUuc2V0T3B0aW9uKFwiZnVsbFNjcmVlblwiLCBmYWxzZSk7XG5cdFx0fVxuXHR9LFxuXHRjdXJzb3JIZWlnaHQ6IDAuOSxcblxuXG5cdC8qKlxuXHQgKiBTaG93IGEgYnV0dG9uIHdpdGggd2hpY2ggdXNlcnMgY2FuIGNyZWF0ZSBhIGxpbmsgdG8gdGhpcyBxdWVyeS4gU2V0IHRoaXMgdmFsdWUgdG8gbnVsbCB0byBkaXNhYmxlIHRoaXMgZnVuY3Rpb25hbGl0eS5cblx0ICogQnkgZGVmYXVsdCwgdGhpcyBmZWF0dXJlIGlzIGVuYWJsZWQsIGFuZCB0aGUgb25seSB0aGUgcXVlcnkgdmFsdWUgaXMgYXBwZW5kZWQgdG8gdGhlIGxpbmsuXG5cdCAqIHBzLiBUaGlzIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGlzIHBhcnNlYWJsZSBieSBqUXVlcnkucGFyYW0gKGh0dHA6Ly9hcGkuanF1ZXJ5LmNvbS9qUXVlcnkucGFyYW0vKVxuXHQgKi9cblx0Y3JlYXRlU2hhcmVMaW5rOiBXRFFTUUUuY3JlYXRlU2hhcmVMaW5rLFxuXG5cdGNyZWF0ZVNob3J0TGluazogbnVsbCxcblxuXHQvKipcblx0ICogQ29uc3VtZSBsaW5rcyBzaGFyZWQgYnkgb3RoZXJzLCBieSBjaGVja2luZyB0aGUgdXJsIGZvciBhcmd1bWVudHMgY29taW5nIGZyb20gYSBxdWVyeSBsaW5rLiBEZWZhdWx0cyBieSBvbmx5IGNoZWNraW5nIHRoZSAncXVlcnk9JyBhcmd1bWVudCBpbiB0aGUgdXJsXG5cdCAqL1xuXHRjb25zdW1lU2hhcmVMaW5rOiBXRFFTUUUuY29uc3VtZVNoYXJlTGluayxcblxuXG5cblxuXHQvKipcblx0ICogQ2hhbmdlIHBlcnNpc3RlbmN5IHNldHRpbmdzIGZvciB0aGUgV0RRU1FFIHF1ZXJ5IHZhbHVlLiBTZXR0aW5nIHRoZSB2YWx1ZXNcblx0ICogdG8gbnVsbCwgd2lsbCBkaXNhYmxlIHBlcnNpc3RhbmN5OiBub3RoaW5nIGlzIHN0b3JlZCBiZXR3ZWVuIGJyb3dzZXJcblx0ICogc2Vzc2lvbnMgU2V0dGluZyB0aGUgdmFsdWVzIHRvIGEgc3RyaW5nIChvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYVxuXHQgKiBzdHJpbmcpLCB3aWxsIHN0b3JlIHRoZSBxdWVyeSBpbiBsb2NhbHN0b3JhZ2UgdXNpbmcgdGhlIHNwZWNpZmllZCBzdHJpbmcuXG5cdCAqIEJ5IGRlZmF1bHQsIHRoZSBJRCBpcyBkeW5hbWljYWxseSBnZW5lcmF0ZWQgdXNpbmcgdGhlIGNsb3Nlc3QgZG9tIElELCB0byBhdm9pZCBjb2xsaXNzaW9ucyB3aGVuIHVzaW5nIG11bHRpcGxlIFdEUVNRRSBpdGVtcyBvbiBvbmVcblx0ICogcGFnZVxuXHQgKlxuXHQgKiBAdHlwZSBmdW5jdGlvbnxzdHJpbmdcblx0ICovXG5cdHBlcnNpc3RlbnQ6IGZ1bmN0aW9uKHdkcXNxZSkge1xuXHRcdHJldHVybiBcIndkcXNxZV9cIiArICQod2Rxc3FlLmdldFdyYXBwZXJFbGVtZW50KCkpLmNsb3Nlc3QoJ1tpZF0nKS5hdHRyKCdpZCcpICsgXCJfcXVlcnlWYWxcIjtcblx0fSxcblxuXG5cdC8qKlxuXHQgKiBTZXR0aW5ncyBmb3IgcXVlcnlpbmcgc3BhcnFsIGVuZHBvaW50c1xuXHQgKi9cblx0c3BhcnFsOiB7XG5cdFx0cXVlcnlOYW1lOiBmdW5jdGlvbih3ZHFzcWUpIHtyZXR1cm4gd2Rxc3FlLmdldFF1ZXJ5TW9kZSgpfSxcblx0XHRzaG93UXVlcnlCdXR0b246IGZhbHNlLFxuXG5cdFx0LyoqZlxuXHRcdCAqIEVuZHBvaW50IHRvIHF1ZXJ5XG5cdFx0ICpcblx0XHQgKiBAcHJvcGVydHkgc3BhcnFsLmVuZHBvaW50XG5cdFx0ICogQHR5cGUgU3RyaW5nfGZ1bmN0aW9uXG5cdFx0ICovXG5cdFx0ZW5kcG9pbnQ6IFwiaHR0cHM6Ly9xdWVyeS53aWtpZGF0YS5vcmcvc3BhcnFsXCIsXG5cdFx0LyoqXG5cdFx0ICogUmVxdWVzdCBtZXRob2QgdmlhIHdoaWNoIHRvIGFjY2VzcyBTUEFSUUwgZW5kcG9pbnRcblx0XHQgKlxuXHRcdCAqIEBwcm9wZXJ0eSBzcGFycWwucmVxdWVzdE1ldGhvZFxuXHRcdCAqIEB0eXBlIFN0cmluZ3xmdW5jdGlvblxuXHRcdCAqL1xuXHRcdHJlcXVlc3RNZXRob2Q6IFwiR0VUXCIsXG5cblx0XHQvKipcblx0XHQgKiBAdHlwZSBTdHJpbmd8ZnVuY3Rpb25cblx0XHQgKi9cblx0XHRhY2NlcHRIZWFkZXJHcmFwaDogXCJ0ZXh0L3R1cnRsZSwqLyo7cT0wLjlcIixcblx0XHQvKipcblx0XHQgKiBAdHlwZSBTdHJpbmd8ZnVuY3Rpb25cblx0XHQgKi9cblx0XHRhY2NlcHRIZWFkZXJTZWxlY3Q6IFwiYXBwbGljYXRpb24vc3BhcnFsLXJlc3VsdHMranNvbiwqLyo7cT0wLjlcIixcblx0XHQvKipcblx0XHQgKiBAdHlwZSBTdHJpbmd8ZnVuY3Rpb25cblx0XHQgKi9cblx0XHRhY2NlcHRIZWFkZXJVcGRhdGU6IFwidGV4dC9wbGFpbiwqLyo7cT0wLjlcIixcblxuXHRcdC8qKlxuXHRcdCAqIE5hbWVkIGdyYXBocyB0byBxdWVyeS5cblx0XHQgKi9cblx0XHRuYW1lZEdyYXBoczogW10sXG5cdFx0LyoqXG5cdFx0ICogRGVmYXVsdCBncmFwaHMgdG8gcXVlcnkuXG5cdFx0ICovXG5cdFx0ZGVmYXVsdEdyYXBoczogW10sXG5cblx0XHQvKipcblx0XHQgKiBBZGRpdGlvbmFsIHJlcXVlc3QgYXJndW1lbnRzLiBBZGQgdGhlbSBpbiB0aGUgZm9ybToge25hbWU6IFwibmFtZVwiLCB2YWx1ZTogXCJ2YWx1ZVwifVxuXHRcdCAqL1xuXHRcdGFyZ3M6IFtdLFxuXG5cdFx0LyoqXG5cdFx0ICogQWRkaXRpb25hbCByZXF1ZXN0IGhlYWRlcnNcblx0XHQgKi9cblx0XHRoZWFkZXJzOiB7fSxcblxuXHRcdGdldFF1ZXJ5Rm9yQWpheDogbnVsbCxcblx0XHQvKipcblx0XHQgKiBTZXQgb2YgYWpheCBjYWxsYmFja3Ncblx0XHQgKi9cblx0XHRjYWxsYmFja3M6IHtcblx0XHRcdGJlZm9yZVNlbmQ6IG51bGwsXG5cdFx0XHRjb21wbGV0ZTogbnVsbCxcblx0XHRcdGVycm9yOiBudWxsLFxuXHRcdFx0c3VjY2VzczogbnVsbFxuXHRcdH0sXG5cdFx0aGFuZGxlcnM6IHt9IC8va2VlcCBoZXJlIGZvciBiYWNrd2FyZHMgY29tcGF0YWJpbGl0eVxuXHR9XG59KTtcbiJdfQ==
},{"./index.js":30}],29:[function(require,module,exports){
'use strict';
module.exports = {
	query: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 80 80" enable-background="new 0 0 80 80" xml:space="preserve"><g ></g><g >	<path d="M64.622,2.411H14.995c-6.627,0-12,5.373-12,12v49.897c0,6.627,5.373,12,12,12h49.627c6.627,0,12-5.373,12-12V14.411   C76.622,7.783,71.249,2.411,64.622,2.411z M24.125,63.906V15.093L61,39.168L24.125,63.906z"/></g></svg>',
	queryInvalid: '<svg   xmlns:dc="http://purl.org/dc/elements/1.1/"   xmlns:cc="http://creativecommons.org/ns#"   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"   xmlns:svg="http://www.w3.org/2000/svg"   xmlns="http://www.w3.org/2000/svg"   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"   version="1.1"   x="0px"   y="0px"   width="100%"   height="100%"   viewBox="0 0 73.627 73.897"   enable-background="new 0 0 80 80"   xml:space="preserve"      inkscape:version="0.48.4 r9939"   sodipodi:docname="warning.svg"><metadata     ><rdf:RDF><cc:Work         rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type           rdf:resource="http://purl.org/dc/dcmitype/StillImage" /></cc:Work></rdf:RDF></metadata><defs      /><sodipodi:namedview     pagecolor="#ffffff"     bordercolor="#666666"     borderopacity="1"     objecttolerance="10"     gridtolerance="10"     guidetolerance="10"     inkscape:pageopacity="0"     inkscape:pageshadow="2"     inkscape:window-width="1855"     inkscape:window-height="1056"          showgrid="false"     inkscape:zoom="3.1936344"     inkscape:cx="36.8135"     inkscape:cy="36.9485"     inkscape:window-x="2625"     inkscape:window-y="24"     inkscape:window-maximized="1"     inkscape:current-layer="svg2" /><g     transform="translate(-2.995,-2.411)"      /><g     transform="translate(-2.995,-2.411)"     ><path       d="M 64.622,2.411 H 14.995 c -6.627,0 -12,5.373 -12,12 v 49.897 c 0,6.627 5.373,12 12,12 h 49.627 c 6.627,0 12,-5.373 12,-12 V 14.411 c 0,-6.628 -5.373,-12 -12,-12 z M 24.125,63.906 V 15.093 L 61,39.168 24.125,63.906 z"       inkscape:connector-curvature="0"        /></g><path     d="M 66.129381,65.903784 H 49.769875 c -1.64721,0 -2.889385,-0.581146 -3.498678,-1.63595 -0.609293,-1.055608 -0.491079,-2.422161 0.332391,-3.848223 l 8.179753,-14.167069 c 0.822934,-1.42633 1.9477,-2.211737 3.166018,-2.211737 1.218319,0 2.343086,0.785407 3.166019,2.211737 l 8.179751,14.167069 c 0.823472,1.426062 0.941686,2.792615 0.33239,3.848223 -0.609023,1.054804 -1.851197,1.63595 -3.498138,1.63595 z M 59.618815,60.91766 c 0,-0.850276 -0.68944,-1.539719 -1.539717,-1.539719 -0.850276,0 -1.539718,0.689443 -1.539718,1.539719 0,0.850277 0.689442,1.539718 1.539718,1.539718 0.850277,0 1.539717,-0.689441 1.539717,-1.539718 z m 0.04155,-9.265919 c 0,-0.873061 -0.707939,-1.580998 -1.580999,-1.580998 -0.873061,0 -1.580999,0.707937 -1.580999,1.580998 l 0.373403,5.610965 h 0.0051 c 0.05415,0.619747 0.568548,1.10761 1.202504,1.10761 0.586239,0 1.075443,-0.415756 1.188563,-0.968489 0.0092,-0.04476 0.0099,-0.09248 0.01392,-0.138854 h 0.01072 l 0.367776,-5.611232 z"          inkscape:connector-curvature="0"     style="fill:#aa8800" /></svg>',
	download: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="tiny" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 100 100" xml:space="preserve"><g ></g><g >	<path fill-rule="evenodd" fill="#000000" d="M88,84v-2c0-2.961-0.859-4-4-4H16c-2.961,0-4,0.98-4,4v2c0,3.102,1.039,4,4,4h68   C87.02,88,88,87.039,88,84z M58,12H42c-5,0-6,0.941-6,6v22H16l34,34l34-34H64V18C64,12.941,62.939,12,58,12z"/></g></svg>',
	share: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  x="0px" y="0px" width="100%" height="100%" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M36.764,50c0,0.308-0.07,0.598-0.088,0.905l32.247,16.119c2.76-2.338,6.293-3.797,10.195-3.797  C87.89,63.228,95,70.338,95,79.109C95,87.89,87.89,95,79.118,95c-8.78,0-15.882-7.11-15.882-15.891c0-0.316,0.07-0.598,0.088-0.905  L31.077,62.085c-2.769,2.329-6.293,3.788-10.195,3.788C12.11,65.873,5,58.771,5,50c0-8.78,7.11-15.891,15.882-15.891  c3.902,0,7.427,1.468,10.195,3.797l32.247-16.119c-0.018-0.308-0.088-0.598-0.088-0.914C63.236,12.11,70.338,5,79.118,5  C87.89,5,95,12.11,95,20.873c0,8.78-7.11,15.891-15.882,15.891c-3.911,0-7.436-1.468-10.195-3.806L36.676,49.086  C36.693,49.394,36.764,49.684,36.764,50z"/></svg>',
	warning: '<svg   xmlns:dc="http://purl.org/dc/elements/1.1/"   xmlns:cc="http://creativecommons.org/ns#"   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"   xmlns:svg="http://www.w3.org/2000/svg"   xmlns="http://www.w3.org/2000/svg"   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"   version="1.1"   x="0px"   y="0px"   viewBox="0 0 66.399998 66.399998"   enable-background="new 0 0 69.3 69.3"   xml:space="preserve"   height="100%"   width="100%"   inkscape:version="0.48.4 r9939"   ><g      transform="translate(-1.5,-1.5)"     style="fill:#ff0000"><path       d="M 34.7,1.5 C 16.4,1.5 1.5,16.4 1.5,34.7 1.5,53 16.4,67.9 34.7,67.9 53,67.9 67.9,53 67.9,34.7 67.9,16.4 53,1.5 34.7,1.5 z m 0,59.4 C 20.2,60.9 8.5,49.1 8.5,34.7 8.5,20.2 20.3,8.5 34.7,8.5 c 14.4,0 26.2,11.8 26.2,26.2 0,14.4 -11.8,26.2 -26.2,26.2 z"      inkscape:connector-curvature="0"       style="fill:#ff0000" /><path       d="m 34.6,47.1 c -1.4,0 -2.5,0.5 -3.5,1.5 -0.9,1 -1.4,2.2 -1.4,3.6 0,1.6 0.5,2.8 1.5,3.8 1,0.9 2.1,1.3 3.4,1.3 1.3,0 2.4,-0.5 3.4,-1.4 1,-0.9 1.5,-2.2 1.5,-3.7 0,-1.4 -0.5,-2.6 -1.4,-3.6 -0.9,-1 -2.1,-1.5 -3.5,-1.5 z"       inkscape:connector-curvature="0"       style="fill:#ff0000" /><path       d="m 34.8,13.9 c -1.5,0 -2.8,0.5 -3.7,1.6 -0.9,1 -1.4,2.4 -1.4,4.2 0,1.1 0.1,2.9 0.2,5.6 l 0.8,13.1 c 0.2,1.8 0.4,3.2 0.9,4.1 0.5,1.2 1.5,1.8 2.9,1.8 1.3,0 2.3,-0.7 2.9,-1.9 0.5,-1 0.7,-2.3 0.9,-4 L 39.4,25 c 0.1,-1.3 0.2,-2.5 0.2,-3.8 0,-2.2 -0.3,-3.9 -0.8,-5.1 -0.5,-1 -1.6,-2.2 -4,-2.2 z"       inkscape:connector-curvature="0"       style="fill:#ff0000" /></g></svg>',
	fullscreen: '<svg   xmlns:dc="http://purl.org/dc/elements/1.1/"   xmlns:cc="http://creativecommons.org/ns#"   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"   xmlns:svg="http://www.w3.org/2000/svg"   xmlns="http://www.w3.org/2000/svg"   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"   version="1.1"      x="0px"   y="0px"   width="100%"   height="100%"   viewBox="5 -10 74.074074 100"   enable-background="new 0 0 100 100"   xml:space="preserve"   inkscape:version="0.48.4 r9939"   sodipodi:docname="noun_2186_cc.svg"><metadata     ><rdf:RDF><cc:Work         rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type           rdf:resource="http://purl.org/dc/dcmitype/StillImage" /></cc:Work></rdf:RDF></metadata><defs      /><sodipodi:namedview     pagecolor="#ffffff"     bordercolor="#666666"     borderopacity="1"     objecttolerance="10"     gridtolerance="10"     guidetolerance="10"     inkscape:pageopacity="0"     inkscape:pageshadow="2"     inkscape:window-width="640"     inkscape:window-height="480"          showgrid="false"     fit-margin-top="0"     fit-margin-left="0"     fit-margin-right="0"     fit-margin-bottom="0"     inkscape:zoom="2.36"     inkscape:cx="44.101509"     inkscape:cy="31.481481"     inkscape:window-x="65"     inkscape:window-y="24"     inkscape:window-maximized="0"     inkscape:current-layer="Layer_1" /><path     d="m -7.962963,-10 v 38.889 l 16.667,-16.667 16.667,16.667 5.555,-5.555 -16.667,-16.667 16.667,-16.667 h -38.889 z"          inkscape:connector-curvature="0"     style="fill:#010101" /><path     d="m 92.037037,-10 v 38.889 l -16.667,-16.667 -16.666,16.667 -5.556,-5.555 16.666,-16.667 -16.666,-16.667 h 38.889 z"          inkscape:connector-curvature="0"     style="fill:#010101" /><path     d="M -7.962963,90 V 51.111 l 16.667,16.666 16.667,-16.666 5.555,5.556 -16.667,16.666 16.667,16.667 h -38.889 z"          inkscape:connector-curvature="0"     style="fill:#010101" /><path     d="M 92.037037,90 V 51.111 l -16.667,16.666 -16.666,-16.666 -5.556,5.556 16.666,16.666 -16.666,16.667 h 38.889 z"          inkscape:connector-curvature="0"     style="fill:#010101" /></svg>',
	smallscreen: '<svg   xmlns:dc="http://purl.org/dc/elements/1.1/"   xmlns:cc="http://creativecommons.org/ns#"   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"   xmlns:svg="http://www.w3.org/2000/svg"   xmlns="http://www.w3.org/2000/svg"   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"   version="1.1"      x="0px"   y="0px"   width="100%"   height="100%"   viewBox="5 -10 74.074074 100"   enable-background="new 0 0 100 100"   xml:space="preserve"   inkscape:version="0.48.4 r9939"   sodipodi:docname="noun_2186_cc.svg"><metadata     ><rdf:RDF><cc:Work         rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type           rdf:resource="http://purl.org/dc/dcmitype/StillImage" /></cc:Work></rdf:RDF></metadata><defs      /><sodipodi:namedview     pagecolor="#ffffff"     bordercolor="#666666"     borderopacity="1"     objecttolerance="10"     gridtolerance="10"     guidetolerance="10"     inkscape:pageopacity="0"     inkscape:pageshadow="2"     inkscape:window-width="1855"     inkscape:window-height="1056"          showgrid="false"     fit-margin-top="0"     fit-margin-left="0"     fit-margin-right="0"     fit-margin-bottom="0"     inkscape:zoom="2.36"     inkscape:cx="44.101509"     inkscape:cy="31.481481"     inkscape:window-x="65"     inkscape:window-y="24"     inkscape:window-maximized="1"     inkscape:current-layer="Layer_1" /><path     d="m 30.926037,28.889 0,-38.889 -16.667,16.667 -16.667,-16.667 -5.555,5.555 16.667,16.667 -16.667,16.667 38.889,0 z"          inkscape:connector-curvature="0"     style="fill:#010101" /><path     d="m 53.148037,28.889 0,-38.889 16.667,16.667 16.666,-16.667 5.556,5.555 -16.666,16.667 16.666,16.667 -38.889,0 z"          inkscape:connector-curvature="0"     style="fill:#010101" /><path     d="m 30.926037,51.111 0,38.889 -16.667,-16.666 -16.667,16.666 -5.555,-5.556 16.667,-16.666 -16.667,-16.667 38.889,0 z"          inkscape:connector-curvature="0"     style="fill:#010101" /><path     d="m 53.148037,51.111 0,38.889 16.667,-16.666 16.666,16.666 5.556,-5.556 -16.666,-16.666 16.666,-16.667 -38.889,0 z"          inkscape:connector-curvature="0"     style="fill:#010101" /></svg>',
};

},{}],30:[function(require,module,exports){
(function (global){
'use strict';

/**
 * Load libraries
 */
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBMb2FkIGxpYnJhcmllc1xuICovXG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKSxcbiAgICBDb2RlTWlycm9yID0gcmVxdWlyZShcImNvZGVtaXJyb3JcIiksXG4gICAgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyksXG4gICAgU3RvcmFnZSA9IHJlcXVpcmUoJ3dkcXMtc3RvcmFnZScpLFxuICAgIFN2ZyA9IHJlcXVpcmUoJy4uL2xpYi9zdmcuanMnKSxcbiAgICBpbWdzID0gcmVxdWlyZSgnLi9pbWdzLmpzJyk7XG5cbnJlcXVpcmUoXCIuLi9saWIvZGVwYXJhbS5qc1wiKTtcbnJlcXVpcmUoJy4vcHJlZml4Rm9sZC5qcycpO1xucmVxdWlyZSgnY29kZW1pcnJvci9hZGRvbi9mb2xkL2ZvbGRjb2RlLmpzJyk7XG5yZXF1aXJlKCdjb2RlbWlycm9yL2FkZG9uL2ZvbGQvZm9sZGd1dHRlci5qcycpO1xucmVxdWlyZSgnY29kZW1pcnJvci9hZGRvbi9mb2xkL3htbC1mb2xkLmpzJyk7XG5yZXF1aXJlKCdjb2RlbWlycm9yL2FkZG9uL2ZvbGQvYnJhY2UtZm9sZC5qcycpO1xucmVxdWlyZSgnY29kZW1pcnJvci9hZGRvbi9oaW50L3Nob3ctaGludC5qcycpO1xucmVxdWlyZSgnY29kZW1pcnJvci9hZGRvbi9zZWFyY2gvc2VhcmNoY3Vyc29yLmpzJyk7XG5yZXF1aXJlKCdjb2RlbWlycm9yL2FkZG9uL2VkaXQvbWF0Y2hicmFja2V0cy5qcycpO1xucmVxdWlyZSgnY29kZW1pcnJvci9hZGRvbi9ydW5tb2RlL3J1bm1vZGUuanMnKTtcbnJlcXVpcmUoJ2NvZGVtaXJyb3IvYWRkb24vZGlzcGxheS9mdWxsc2NyZWVuLmpzJyk7XG5yZXF1aXJlKCcuLi9saWIvZ3JhbW1hci90b2tlbml6ZXIuanMnKTtcblxudmFyIHJvb3QgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHBhcmVudCwgY29uZmlnKSB7XG4gICAgdmFyIHJvb3RFbCA9ICQoXCI8ZGl2PlwiLCB7XG4gICAgICAgIGNsYXNzOiAnd2Rxc3FlJ1xuICAgIH0pLmFwcGVuZFRvKCQocGFyZW50KSk7XG4gICAgY29uZmlnID0gZXh0ZW5kQ29uZmlnKGNvbmZpZyk7XG4gICAgdmFyIHdkcXNxZSA9IGV4dGVuZENtSW5zdGFuY2UoQ29kZU1pcnJvcihyb290RWxbMF0sIGNvbmZpZykpO1xuICAgIHBvc3RQcm9jZXNzQ21FbGVtZW50KHdkcXNxZSk7XG4gICAgcmV0dXJuIHdkcXNxZTtcbn07XG5cbnJvb3QuZnJvbVRleHRBcmVhID0gZnVuY3Rpb24odGV4dEFyZWFFbCwgY29uZmlnKSB7XG4gICAgY29uZmlnID0gZXh0ZW5kQ29uZmlnKGNvbmZpZyk7XG4gICAgdmFyIHJvb3RFbCA9ICQoXCI8ZGl2PlwiLCB7XG4gICAgICAgIGNsYXNzOiAnd2Rxc3FlJ1xuICAgIH0pLmluc2VydEJlZm9yZSgkKHRleHRBcmVhRWwpKS5hcHBlbmQoJCh0ZXh0QXJlYUVsKSk7XG4gICAgdmFyIHdkcXNxZSA9IGV4dGVuZENtSW5zdGFuY2UoQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEodGV4dEFyZWFFbCwgY29uZmlnKSk7XG4gICAgcG9zdFByb2Nlc3NDbUVsZW1lbnQod2Rxc3FlKTtcbiAgICByZXR1cm4gd2Rxc3FlO1xufTtcblxudmFyIGV4dGVuZENvbmZpZyA9IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgIHZhciBleHRlbmRlZENvbmZpZyA9ICQuZXh0ZW5kKHRydWUsIHt9LCByb290LmRlZmF1bHRzLCBjb25maWcpO1xuICAgIHJldHVybiBleHRlbmRlZENvbmZpZztcbn07XG5cbnZhciBleHRlbmRDbUluc3RhbmNlID0gZnVuY3Rpb24od2Rxc3FlKSB7XG4gICAgLy9pbnN0YW50aWF0ZSBhdXRvY29tcGxldGVyc1xuICAgIHdkcXNxZS5hdXRvY29tcGxldGVycyA9IHJlcXVpcmUoJy4vYXV0b2NvbXBsZXRlcnMvYXV0b2NvbXBsZXRlckJhc2UuanMnKShyb290LCB3ZHFzcWUpO1xuICAgIGlmICh3ZHFzcWUub3B0aW9ucy5hdXRvY29tcGxldGVycykge1xuICAgICAgICB3ZHFzcWUub3B0aW9ucy5hdXRvY29tcGxldGVycy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgICAgIGlmIChyb290LkF1dG9jb21wbGV0ZXJzW25hbWVdKSB3ZHFzcWUuYXV0b2NvbXBsZXRlcnMuaW5pdChuYW1lLCByb290LkF1dG9jb21wbGV0ZXJzW25hbWVdKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgd2Rxc3FlLmxhc3RRdWVyeUR1cmF0aW9uID0gbnVsbDtcbiAgICB3ZHFzcWUuZ2V0Q29tcGxldGVUb2tlbiA9IGZ1bmN0aW9uKHRva2VuLCBjdXIpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJy4vdG9rZW5VdGlscy5qcycpLmdldENvbXBsZXRlVG9rZW4od2Rxc3FlLCB0b2tlbiwgY3VyKTtcbiAgICB9O1xuICAgIHdkcXNxZS5nZXRQcmV2aW91c05vbldzVG9rZW4gPSBmdW5jdGlvbihsaW5lLCB0b2tlbikge1xuICAgICAgICByZXR1cm4gcmVxdWlyZSgnLi90b2tlblV0aWxzLmpzJykuZ2V0UHJldmlvdXNOb25Xc1Rva2VuKHdkcXNxZSwgbGluZSwgdG9rZW4pO1xuICAgIH07XG4gICAgd2Rxc3FlLmdldE5leHROb25Xc1Rva2VuID0gZnVuY3Rpb24obGluZU51bWJlciwgY2hhck51bWJlcikge1xuICAgICAgICByZXR1cm4gcmVxdWlyZSgnLi90b2tlblV0aWxzLmpzJykuZ2V0TmV4dE5vbldzVG9rZW4od2Rxc3FlLCBsaW5lTnVtYmVyLCBjaGFyTnVtYmVyKTtcbiAgICB9O1xuICAgIHdkcXNxZS5jb2xsYXBzZVByZWZpeGVzID0gZnVuY3Rpb24oY29sbGFwc2UpIHtcbiAgICAgICAgaWYgKGNvbGxhcHNlID09PSB1bmRlZmluZWQpIGNvbGxhcHNlID0gdHJ1ZTtcbiAgICAgICAgd2Rxc3FlLmZvbGRDb2RlKHJlcXVpcmUoJy4vcHJlZml4Rm9sZC5qcycpLmZpbmRGaXJzdFByZWZpeExpbmUod2Rxc3FlKSwgcm9vdC5mb2xkLnByZWZpeCwgKGNvbGxhcHNlID8gXCJmb2xkXCIgOiBcInVuZm9sZFwiKSk7XG4gICAgfTtcbiAgICB2YXIgYmFja2Ryb3AgPSBudWxsO1xuICAgIHZhciBhbmltYXRlU3BlZWQgPSBudWxsO1xuICAgIHdkcXNxZS5zZXRCYWNrZHJvcCA9IGZ1bmN0aW9uKHNob3cpIHtcblxuXG4gICAgICAgIGlmICh3ZHFzcWUub3B0aW9ucy5iYWNrZHJvcCB8fCB3ZHFzcWUub3B0aW9ucy5iYWNrZHJvcCA9PT0gMCB8fCB3ZHFzcWUub3B0aW9ucy5iYWNrZHJvcCA9PT0gJzAnKSB7XG4gICAgICAgICAgICBpZiAoYW5pbWF0ZVNwZWVkID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZVNwZWVkID0gK3dkcXNxZS5vcHRpb25zLmJhY2tkcm9wO1xuICAgICAgICAgICAgICAgIGlmIChhbmltYXRlU3BlZWQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9haCwgd2Rxc3FlLm9wdGlvbnMuYmFja2Ryb3Agd2FzICd0cnVlJy4gU2V0IHRoaXMgdG8gZGVmYXVsdCBhbmltYXRlIHNwZWVkIDQwMFxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU3BlZWQgPSA0MDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWJhY2tkcm9wKSB7XG4gICAgICAgICAgICAgICAgYmFja2Ryb3AgPSAkKCc8ZGl2PicsIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdiYWNrZHJvcCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmluc2VydEFmdGVyKCQod2Rxc3FlLmdldFdyYXBwZXJFbGVtZW50KCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaG93KSB7XG4gICAgICAgICAgICAgICAgYmFja2Ryb3Auc2hvdyhhbmltYXRlU3BlZWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiYWNrZHJvcC5oaWRlKGFuaW1hdGVTcGVlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZSBxdWVyeS4gUGFzcyBhIGNhbGxiYWNrIGZ1bmN0aW9uLCBvciBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0IChzZWVcbiAgICAgKiBkZWZhdWx0IHNldHRpbmdzIGJlbG93IGZvciBwb3NzaWJsZSB2YWx1ZXMpIEkuZS4sIHlvdSBjYW4gY2hhbmdlIHRoZVxuICAgICAqIHF1ZXJ5IGNvbmZpZ3VyYXRpb24gYnkgZWl0aGVyIGNoYW5naW5nIHRoZSBkZWZhdWx0IHNldHRpbmdzLCBjaGFuZ2luZyB0aGVcbiAgICAgKiBzZXR0aW5ncyBvZiB0aGlzIGRvY3VtZW50LCBvciBieSBwYXNzaW5nIHF1ZXJ5IHNldHRpbmdzIHRvIHRoaXMgZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZG9jLnF1ZXJ5XG4gICAgICogQHBhcmFtIGZ1bmN0aW9ufG9iamVjdFxuICAgICAqL1xuICAgIHdkcXNxZS5xdWVyeSA9IGZ1bmN0aW9uKGNhbGxiYWNrT3JDb25maWcpIHtcbiAgICAgICAgcm9vdC5leGVjdXRlUXVlcnkod2Rxc3FlLCBjYWxsYmFja09yQ29uZmlnKTtcbiAgICB9O1xuXG4gICAgd2Rxc3FlLmdldFVybEFyZ3VtZW50cyA9IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgICAgICByZXR1cm4gcm9vdC5nZXRVcmxBcmd1bWVudHMod2Rxc3FlLCBjb25maWcpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaCBkZWZpbmVkIHByZWZpeGVzIGZyb20gcXVlcnkgc3RyaW5nXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGRvYy5nZXRQcmVmaXhlc0Zyb21RdWVyeVxuICAgICAqIEByZXR1cm4gb2JqZWN0XG4gICAgICovXG4gICAgd2Rxc3FlLmdldFByZWZpeGVzRnJvbVF1ZXJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKCcuL3ByZWZpeFV0aWxzLmpzJykuZ2V0UHJlZml4ZXNGcm9tUXVlcnkod2Rxc3FlKTtcbiAgICB9O1xuXG4gICAgd2Rxc3FlLmFkZFByZWZpeGVzID0gZnVuY3Rpb24ocHJlZml4ZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJy4vcHJlZml4VXRpbHMuanMnKS5hZGRQcmVmaXhlcyh3ZHFzcWUsIHByZWZpeGVzKTtcbiAgICB9O1xuICAgIHdkcXNxZS5yZW1vdmVQcmVmaXhlcyA9IGZ1bmN0aW9uKHByZWZpeGVzKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKCcuL3ByZWZpeFV0aWxzLmpzJykucmVtb3ZlUHJlZml4ZXMod2Rxc3FlLCBwcmVmaXhlcyk7XG4gICAgfTtcblxuICAgIHdkcXNxZS5nZXRWYWx1ZVdpdGhvdXRDb21tZW50cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2xlYW5lZFF1ZXJ5ID0gXCJcIjtcbiAgICAgICAgcm9vdC5ydW5Nb2RlKHdkcXNxZS5nZXRWYWx1ZSgpLCBcInNwYXJxbDExXCIsIGZ1bmN0aW9uKHN0cmluZ1ZhbCwgY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lICE9IFwiY29tbWVudFwiKSB7XG4gICAgICAgICAgICAgICAgY2xlYW5lZFF1ZXJ5ICs9IHN0cmluZ1ZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjbGVhbmVkUXVlcnk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoIHRoZSBxdWVyeSB0eXBlIChlLmcuLCBTRUxFQ1R8fERFU0NSSUJFfHxJTlNFUlR8fERFTEVURXx8QVNLfHxDT05TVFJVQ1QpXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGRvYy5nZXRRdWVyeVR5cGVcbiAgICAgKiBAcmV0dXJuIHN0cmluZ1xuICAgICAqXG4gICAgICovXG4gICAgd2Rxc3FlLmdldFF1ZXJ5VHlwZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gd2Rxc3FlLnF1ZXJ5VHlwZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEZldGNoIHRoZSBxdWVyeSBtb2RlOiAncXVlcnknIG9yICd1cGRhdGUnXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGRvYy5nZXRRdWVyeU1vZGVcbiAgICAgKiBAcmV0dXJuIHN0cmluZ1xuICAgICAqXG4gICAgICovXG4gICAgd2Rxc3FlLmdldFF1ZXJ5TW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdHlwZSA9IHdkcXNxZS5nZXRRdWVyeVR5cGUoKTtcbiAgICAgICAgaWYgKHR5cGUgPT0gXCJJTlNFUlRcIiB8fCB0eXBlID09IFwiREVMRVRFXCIgfHwgdHlwZSA9PSBcIkxPQURcIiB8fCB0eXBlID09IFwiQ0xFQVJcIiB8fCB0eXBlID09IFwiQ1JFQVRFXCIgfHwgdHlwZSA9PSBcIkRST1BcIiB8fCB0eXBlID09IFwiQ09QWVwiIHx8IHR5cGUgPT0gXCJNT1ZFXCIgfHwgdHlwZSA9PSBcIkFERFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJ1cGRhdGVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcInF1ZXJ5XCI7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB3ZHFzcWUuc2V0Q2hlY2tTeW50YXhFcnJvcnMgPSBmdW5jdGlvbihpc0VuYWJsZWQpIHtcbiAgICAgICAgd2Rxc3FlLm9wdGlvbnMuc3ludGF4RXJyb3JDaGVjayA9IGlzRW5hYmxlZDtcbiAgICAgICAgY2hlY2tTeW50YXgod2Rxc3FlKTtcbiAgICB9O1xuXG4gICAgd2Rxc3FlLmVuYWJsZUNvbXBsZXRlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgYWRkQ29tcGxldGVyVG9TZXR0aW5ncyh3ZHFzcWUub3B0aW9ucywgbmFtZSk7XG4gICAgICAgIGlmIChyb290LkF1dG9jb21wbGV0ZXJzW25hbWVdKSB3ZHFzcWUuYXV0b2NvbXBsZXRlcnMuaW5pdChuYW1lLCByb290LkF1dG9jb21wbGV0ZXJzW25hbWVdKTtcbiAgICB9O1xuICAgIHdkcXNxZS5kaXNhYmxlQ29tcGxldGVyID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgICByZW1vdmVDb21wbGV0ZXJGcm9tU2V0dGluZ3Mod2Rxc3FlLm9wdGlvbnMsIG5hbWUpO1xuICAgIH07XG4gICAgcmV0dXJuIHdkcXNxZTtcbn07XG5cbnZhciBhZGRDb21wbGV0ZXJUb1NldHRpbmdzID0gZnVuY3Rpb24oc2V0dGluZ3MsIG5hbWUpIHtcbiAgICBpZiAoIXNldHRpbmdzLmF1dG9jb21wbGV0ZXJzKSBzZXR0aW5ncy5hdXRvY29tcGxldGVycyA9IFtdO1xuICAgIHNldHRpbmdzLmF1dG9jb21wbGV0ZXJzLnB1c2gobmFtZSk7XG59O1xudmFyIHJlbW92ZUNvbXBsZXRlckZyb21TZXR0aW5ncyA9IGZ1bmN0aW9uKHNldHRpbmdzLCBuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBzZXR0aW5ncy5hdXRvY29tcGxldGVycyA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHZhciBpbmRleCA9ICQuaW5BcnJheShuYW1lLCBzZXR0aW5ncy5hdXRvY29tcGxldGVycyk7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBzZXR0aW5ncy5hdXRvY29tcGxldGVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgcmVtb3ZlQ29tcGxldGVyRnJvbVNldHRpbmdzKHNldHRpbmdzLCBuYW1lKTsgLy9qdXN0IGluIGNhc2UuIHN1cHBvc2UgMSBjb21wbGV0ZXIgaXMgbGlzdGVkIHR3aWNlXG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgcG9zdFByb2Nlc3NDbUVsZW1lbnQgPSBmdW5jdGlvbih3ZHFzcWUpIHtcbiAgICAvKipcbiAgICAgKiBTZXQgZG9jIHZhbHVlXG4gICAgICovXG4gICAgdmFyIHN0b3JhZ2VJZCA9IHV0aWxzLmdldFBlcnNpc3RlbmN5SWQod2Rxc3FlLCB3ZHFzcWUub3B0aW9ucy5wZXJzaXN0ZW50KTtcbiAgICBpZiAoc3RvcmFnZUlkKSB7XG4gICAgICAgIHZhciB2YWx1ZUZyb21TdG9yYWdlID0gU3RvcmFnZS5zdG9yYWdlLmdldChzdG9yYWdlSWQpO1xuICAgICAgICBpZiAodmFsdWVGcm9tU3RvcmFnZSlcbiAgICAgICAgICAgIHdkcXNxZS5zZXRWYWx1ZSh2YWx1ZUZyb21TdG9yYWdlKTtcbiAgICB9XG5cbiAgICByb290LmRyYXdCdXR0b25zKHdkcXNxZSk7XG5cbiAgICAvKipcbiAgICAgKiBBZGQgZXZlbnQgaGFuZGxlcnNcbiAgICAgKi9cbiAgICB3ZHFzcWUub24oJ2JsdXInLCBmdW5jdGlvbih3ZHFzcWUsIGV2ZW50SW5mbykge1xuICAgICAgICByb290LnN0b3JlUXVlcnkod2Rxc3FlKTtcbiAgICB9KTtcbiAgICB3ZHFzcWUub24oJ2NoYW5nZScsIGZ1bmN0aW9uKHdkcXNxZSwgZXZlbnRJbmZvKSB7XG4gICAgICAgIGNoZWNrU3ludGF4KHdkcXNxZSk7XG4gICAgICAgIHJvb3QudXBkYXRlUXVlcnlCdXR0b24od2Rxc3FlKTtcbiAgICAgICAgcm9vdC5wb3NpdGlvbkJ1dHRvbnMod2Rxc3FlKTtcbiAgICB9KTtcbiAgICB3ZHFzcWUub24oJ2NoYW5nZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9lLmcuIG9uIHBhc3RlXG4gICAgICAgIGNoZWNrU3ludGF4KHdkcXNxZSk7XG4gICAgICAgIHJvb3QudXBkYXRlUXVlcnlCdXR0b24od2Rxc3FlKTtcbiAgICAgICAgcm9vdC5wb3NpdGlvbkJ1dHRvbnMod2Rxc3FlKTtcbiAgICB9KTtcblxuICAgIHdkcXNxZS5vbignY3Vyc29yQWN0aXZpdHknLCBmdW5jdGlvbih3ZHFzcWUsIGV2ZW50SW5mbykge1xuICAgICAgICB1cGRhdGVCdXR0b25zVHJhbnNwYXJlbmN5KHdkcXNxZSk7XG4gICAgfSk7XG4gICAgd2Rxc3FlLnByZXZRdWVyeVZhbGlkID0gZmFsc2U7XG4gICAgY2hlY2tTeW50YXgod2Rxc3FlKTsgLy8gb24gZmlyc3QgbG9hZCwgY2hlY2sgYXMgd2VsbCAob3VyIHN0b3JlZCBvciBkZWZhdWx0IHF1ZXJ5IG1pZ2h0IGJlIGluY29ycmVjdClcbiAgICByb290LnBvc2l0aW9uQnV0dG9ucyh3ZHFzcWUpO1xuXG4gICAgJCh3ZHFzcWUuZ2V0V3JhcHBlckVsZW1lbnQoKSkub24oJ21vdXNlZW50ZXInLCAnLmNtLWF0b20nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1hdGNoVGV4dCA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAkKHdkcXNxZS5nZXRXcmFwcGVyRWxlbWVudCgpKS5maW5kKCcuY20tYXRvbScpLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLnRleHQoKSA9PT0gbWF0Y2hUZXh0O1xuICAgICAgICB9KS5hZGRDbGFzcygnbWF0Y2hpbmdWYXInKTtcbiAgICB9KS5vbignbW91c2VsZWF2ZScsICcuY20tYXRvbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHdkcXNxZS5nZXRXcmFwcGVyRWxlbWVudCgpKS5maW5kKCcubWF0Y2hpbmdWYXInKS5yZW1vdmVDbGFzcygnbWF0Y2hpbmdWYXInKTtcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBjaGVjayB1cmwgYXJncyBhbmQgbW9kaWZ5IHdkcXNxZSBzZXR0aW5ncyBpZiBuZWVkZWRcbiAgICAgKi9cbiAgICBpZiAod2Rxc3FlLm9wdGlvbnMuY29uc3VtZVNoYXJlTGluaykge1xuICAgICAgICB3ZHFzcWUub3B0aW9ucy5jb25zdW1lU2hhcmVMaW5rKHdkcXNxZSwgZ2V0VXJsUGFyYW1zKCkpO1xuICAgICAgICAvL2FuZDogYWRkIGEgaGFzaCBsaXN0ZW5lciFcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd2Rxc3FlLm9wdGlvbnMuY29uc3VtZVNoYXJlTGluayh3ZHFzcWUsIGdldFVybFBhcmFtcygpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh3ZHFzcWUub3B0aW9ucy5jb2xsYXBzZVByZWZpeGVzT25Mb2FkKSB3ZHFzcWUuY29sbGFwc2VQcmVmaXhlcyh0cnVlKTtcbn07XG5cbi8qKlxuICogZ2V0IHVybCBwYXJhbXMuIGZpcnN0IHRyeSBmZXRjaGluZyB1c2luZyBoYXNoLiBJZiBpdCBmYWlscywgdHJ5IHRoZSByZWd1bGFyIHF1ZXJ5IHBhcmFtZXRlcnMgKGZvciBiYWNrd2FyZHMgY29tcGF0YWJpbGl0eSlcbiAqL1xudmFyIGdldFVybFBhcmFtcyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vZmlyc3QgdHJ5IGhhc2hcbiAgICB2YXIgdXJsUGFyYW1zID0gbnVsbDtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gubGVuZ3RoID4gMSkge1xuICAgICAgICAvL2ZpcmVmb3ggZG9lcyBzb21lIGRlY29kaW5nIGlmIHdlJ3JlIHVzaW5nIHdpbmRvdy5sb2NhdGlvbi5oYXNoIChlLmcuIHRoZSArIHNpZ24gaW4gY29udGVudFR5cGUgc2V0dGluZ3MpXG4gICAgICAgIC8vRG9uJ3Qgd2FudCB0aGlzLiBTbyBzaW1wbHkgZ2V0IHRoZSBoYXNoIHN0cmluZyBvdXJzZWx2ZXNcbiAgICAgICAgdXJsUGFyYW1zID0gJC5kZXBhcmFtKGxvY2F0aW9uLmhyZWYuc3BsaXQoXCIjXCIpWzFdKVxuICAgIH1cbiAgICBpZiAoKCF1cmxQYXJhbXMgfHwgISgncXVlcnknIGluIHVybFBhcmFtcykpICYmIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gubGVuZ3RoID4gMSkge1xuICAgICAgICAvL29rLCB0aGVuIGp1c3QgdHJ5IHJlZ3VsYXIgdXJsIHBhcmFtc1xuICAgICAgICB1cmxQYXJhbXMgPSAkLmRlcGFyYW0od2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkpO1xuICAgIH1cbiAgICByZXR1cm4gdXJsUGFyYW1zO1xufTtcblxuXG5cbi8qKlxuICogVXBkYXRlIHRyYW5zcGFyZW5jeSBvZiBidXR0b25zLiBJbmNyZWFzZSB0cmFuc3BhcmVuY3kgd2hlbiBjdXJzb3IgaXMgYmVsb3cgYnV0dG9uc1xuICovXG5cbnZhciB1cGRhdGVCdXR0b25zVHJhbnNwYXJlbmN5ID0gZnVuY3Rpb24od2Rxc3FlKSB7XG4gICAgd2Rxc3FlLmN1cnNvciA9ICQoXCIuQ29kZU1pcnJvci1jdXJzb3JcIik7XG4gICAgaWYgKHdkcXNxZS5idXR0b25zICYmIHdkcXNxZS5idXR0b25zLmlzKFwiOnZpc2libGVcIikgJiYgd2Rxc3FlLmN1cnNvci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICh1dGlscy5lbGVtZW50c092ZXJsYXAod2Rxc3FlLmN1cnNvciwgd2Rxc3FlLmJ1dHRvbnMpKSB7XG4gICAgICAgICAgICB3ZHFzcWUuYnV0dG9ucy5maW5kKFwic3ZnXCIpLmF0dHIoXCJvcGFjaXR5XCIsIFwiMC4yXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2Rxc3FlLmJ1dHRvbnMuZmluZChcInN2Z1wiKS5hdHRyKFwib3BhY2l0eVwiLCBcIjEuMFwiKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBjbGVhckVycm9yID0gbnVsbDtcbnZhciBjaGVja1N5bnRheCA9IGZ1bmN0aW9uKHdkcXNxZSwgZGVlcGNoZWNrKSB7XG5cbiAgICB3ZHFzcWUucXVlcnlWYWxpZCA9IHRydWU7XG5cbiAgICB3ZHFzcWUuY2xlYXJHdXR0ZXIoXCJndXR0ZXJFcnJvckJhclwiKTtcblxuICAgIHZhciBzdGF0ZSA9IG51bGw7XG4gICAgZm9yICh2YXIgbCA9IDA7IGwgPCB3ZHFzcWUubGluZUNvdW50KCk7ICsrbCkge1xuICAgICAgICB2YXIgcHJlY2lzZSA9IGZhbHNlO1xuICAgICAgICBpZiAoIXdkcXNxZS5wcmV2UXVlcnlWYWxpZCkge1xuICAgICAgICAgICAgLy8gd2UgZG9uJ3Qgd2FudCBjYWNoZWQgaW5mb3JtYXRpb24gaW4gdGhpcyBjYXNlLCBvdGhlcndpc2UgdGhlXG4gICAgICAgICAgICAvLyBwcmV2aW91cyBlcnJvciBzaWduIG1pZ2h0IHN0aWxsIHNob3cgdXAsXG4gICAgICAgICAgICAvLyBldmVuIHRob3VnaCB0aGUgc3ludGF4IGVycm9yIG1pZ2h0IGJlIGdvbmUgYWxyZWFkeVxuICAgICAgICAgICAgcHJlY2lzZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG9rZW4gPSB3ZHFzcWUuZ2V0VG9rZW5BdCh7XG4gICAgICAgICAgICBsaW5lOiBsLFxuICAgICAgICAgICAgY2g6IHdkcXNxZS5nZXRMaW5lKGwpLmxlbmd0aFxuICAgICAgICB9LCBwcmVjaXNlKTtcbiAgICAgICAgdmFyIHN0YXRlID0gdG9rZW4uc3RhdGU7XG4gICAgICAgIHdkcXNxZS5xdWVyeVR5cGUgPSBzdGF0ZS5xdWVyeVR5cGU7XG4gICAgICAgIGlmIChzdGF0ZS5PSyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKCF3ZHFzcWUub3B0aW9ucy5zeW50YXhFcnJvckNoZWNrKSB7XG4gICAgICAgICAgICAgICAgLy90aGUgbGlicmFyeSB3ZSB1c2UgYWxyZWFkeSBtYXJrcyBldmVyeXRoaW5nIGFzIGJlaW5nIGFuIGVycm9yLiBPdmVyd3JpdGUgdGhpcyBjbGFzcyBhdHRyaWJ1dGUuXG4gICAgICAgICAgICAgICAgJCh3ZHFzcWUuZ2V0V3JhcHBlckVsZW1lbnQpLmZpbmQoXCIuc3AtZXJyb3JcIikuY3NzKFwiY29sb3JcIiwgXCJibGFja1wiKTtcbiAgICAgICAgICAgICAgICAvL3dlIGRvbid0IHdhbnQgdG8gZ3V0dGVyIGVycm9yLCBzbyByZXR1cm5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB3YXJuaW5nRWwgPSBTdmcuZ2V0RWxlbWVudChpbWdzLndhcm5pbmcpO1xuICAgICAgICAgICAgaWYgKHN0YXRlLnBvc3NpYmxlQ3VycmVudCAmJiBzdGF0ZS5wb3NzaWJsZUN1cnJlbnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vXHRcdFx0XHR3YXJuaW5nRWwuc3R5bGUuekluZGV4ID0gXCI5OTk5OTk5OVwiO1xuICAgICAgICAgICAgICAgIHJlcXVpcmUoJy4vdG9vbHRpcCcpKHdkcXNxZSwgd2FybmluZ0VsLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cGVjdGVkRW5jb2RlZCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5wb3NzaWJsZUN1cnJlbnQuZm9yRWFjaChmdW5jdGlvbihleHBlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWRFbmNvZGVkLnB1c2goXCI8c3Ryb25nIHN0eWxlPSd0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lJz5cIiArICQoXCI8ZGl2Lz5cIikudGV4dChleHBlY3RlZCkuaHRtbCgpICsgXCI8L3N0cm9uZz5cIik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJUaGlzIGxpbmUgaXMgaW52YWxpZC4gRXhwZWN0ZWQ6IFwiICsgZXhwZWN0ZWRFbmNvZGVkLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdhcm5pbmdFbC5zdHlsZS5tYXJnaW5Ub3AgPSBcIjJweFwiO1xuICAgICAgICAgICAgd2FybmluZ0VsLnN0eWxlLm1hcmdpbkxlZnQgPSBcIjJweFwiO1xuICAgICAgICAgICAgd2FybmluZ0VsLmNsYXNzTmFtZSA9ICdwYXJzZUVycm9ySWNvbic7XG4gICAgICAgICAgICB3ZHFzcWUuc2V0R3V0dGVyTWFya2VyKGwsIFwiZ3V0dGVyRXJyb3JCYXJcIiwgd2FybmluZ0VsKTtcblxuICAgICAgICAgICAgd2Rxc3FlLnF1ZXJ5VmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdkcXNxZS5wcmV2UXVlcnlWYWxpZCA9IHdkcXNxZS5xdWVyeVZhbGlkO1xuICAgIGlmIChkZWVwY2hlY2spIHtcbiAgICAgICAgaWYgKHN0YXRlICE9IG51bGwgJiYgc3RhdGUuc3RhY2sgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgc3RhY2sgPSBzdGF0ZS5zdGFjayxcbiAgICAgICAgICAgICAgICBsZW4gPSBzdGF0ZS5zdGFjay5sZW5ndGg7XG4gICAgICAgICAgICAvLyBCZWNhdXNlIGluY3JlbWVudGFsIHBhcnNlciBkb2Vzbid0IHJlY2VpdmUgZW5kLW9mLWlucHV0XG4gICAgICAgICAgICAvLyBpdCBjYW4ndCBjbGVhciBzdGFjaywgc28gd2UgaGF2ZSB0byBjaGVjayB0aGF0IHdoYXRldmVyXG4gICAgICAgICAgICAvLyBpcyBsZWZ0IG9uIHRoZSBzdGFjayBpcyBuaWxsYWJsZVxuICAgICAgICAgICAgaWYgKGxlbiA+IDEpXG4gICAgICAgICAgICAgICAgd2Rxc3FlLnF1ZXJ5VmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGxlbiA9PSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YWNrWzBdICE9IFwic29sdXRpb25Nb2RpZmllclwiICYmIHN0YWNrWzBdICE9IFwiP2xpbWl0T2Zmc2V0Q2xhdXNlc1wiICYmIHN0YWNrWzBdICE9IFwiP29mZnNldENsYXVzZVwiKVxuICAgICAgICAgICAgICAgICAgICB3ZHFzcWUucXVlcnlWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbi8qKlxuICogU3RhdGljIFV0aWxzXG4gKi9cbi8vIGZpcnN0IHRha2UgYWxsIENvZGVNaXJyb3IgcmVmZXJlbmNlcyBhbmQgc3RvcmUgdGhlbSBpbiB0aGUgWUFTUUUgb2JqZWN0XG4kLmV4dGVuZChyb290LCBDb2RlTWlycm9yKTtcblxuXG4vL2FkZCByZWdpc3RyYXIgZm9yIGF1dG9jb21wbGV0ZXJzXG5yb290LkF1dG9jb21wbGV0ZXJzID0ge307XG5yb290LnJlZ2lzdGVyQXV0b2NvbXBsZXRlciA9IGZ1bmN0aW9uKG5hbWUsIGNvbnN0cnVjdG9yKSB7XG4gICAgcm9vdC5BdXRvY29tcGxldGVyc1tuYW1lXSA9IGNvbnN0cnVjdG9yO1xuICAgIGFkZENvbXBsZXRlclRvU2V0dGluZ3Mocm9vdC5kZWZhdWx0cywgbmFtZSk7XG59XG5cbnJvb3QuYXV0b0NvbXBsZXRlID0gZnVuY3Rpb24od2Rxc3FlKSB7XG4gICAgLy90aGlzIGZ1bmN0aW9uIGdldHMgY2FsbGVkIHdoZW4gcHJlc3NpbmcgdGhlIGtleWJvYXJkIHNob3J0Y3V0LiBJLmUuLCBhdXRvU2hvdyA9IGZhbHNlXG4gICAgd2Rxc3FlLmF1dG9jb21wbGV0ZXJzLmF1dG9Db21wbGV0ZShmYWxzZSk7XG59O1xuLy9pbmNsdWRlIHRoZSBhdXRvY29tcGxldGVycyB3ZSBwcm92aWRlIG91dC1vZi10aGUtYm94XG5yb290LnJlZ2lzdGVyQXV0b2NvbXBsZXRlcihcInByZWZpeGVzXCIsIHJlcXVpcmUoXCIuL2F1dG9jb21wbGV0ZXJzL3ByZWZpeGVzLmpzXCIpKTtcbnJvb3QucmVnaXN0ZXJBdXRvY29tcGxldGVyKFwicHJvcGVydGllc1wiLCByZXF1aXJlKFwiLi9hdXRvY29tcGxldGVycy9wcm9wZXJ0aWVzLmpzXCIpKTtcbnJvb3QucmVnaXN0ZXJBdXRvY29tcGxldGVyKFwiY2xhc3Nlc1wiLCByZXF1aXJlKFwiLi9hdXRvY29tcGxldGVycy9jbGFzc2VzLmpzXCIpKTtcbnJvb3QucmVnaXN0ZXJBdXRvY29tcGxldGVyKFwidmFyaWFibGVzXCIsIHJlcXVpcmUoXCIuL2F1dG9jb21wbGV0ZXJzL3ZhcmlhYmxlcy5qc1wiKSk7XG5cblxucm9vdC5wb3NpdGlvbkJ1dHRvbnMgPSBmdW5jdGlvbih3ZHFzcWUpIHtcbiAgICB2YXIgc2Nyb2xsQmFyID0gJCh3ZHFzcWUuZ2V0V3JhcHBlckVsZW1lbnQoKSkuZmluZChcIi5Db2RlTWlycm9yLXZzY3JvbGxiYXJcIik7XG4gICAgdmFyIG9mZnNldCA9IDA7XG4gICAgaWYgKHNjcm9sbEJhci5pcyhcIjp2aXNpYmxlXCIpKSB7XG4gICAgICAgIG9mZnNldCA9IHNjcm9sbEJhci5vdXRlcldpZHRoKCk7XG4gICAgfVxuICAgIGlmICh3ZHFzcWUuYnV0dG9ucy5pcyhcIjp2aXNpYmxlXCIpKSB3ZHFzcWUuYnV0dG9ucy5jc3MoXCJyaWdodFwiLCBvZmZzZXQgKyA0KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgc2hhcmUgbGlua1xuICpcbiAqIEBtZXRob2QgWUFTUUUuY3JlYXRlU2hhcmVMaW5rXG4gKiBAcGFyYW0ge2RvY30gWUFTUUUgZG9jdW1lbnRcbiAqIEBkZWZhdWx0IHtxdWVyeTogZG9jLmdldFZhbHVlKCl9XG4gKiBAcmV0dXJuIG9iamVjdFxuICovXG5yb290LmNyZWF0ZVNoYXJlTGluayA9IGZ1bmN0aW9uKHdkcXNxZSkge1xuICAgIC8vZXh0ZW5kIGV4aXN0aW5nIGxpbmssIHNvIGZpcnN0IGZldGNoIGN1cnJlbnQgYXJndW1lbnRzXG4gICAgdmFyIHVybFBhcmFtcyA9IHt9O1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaC5sZW5ndGggPiAxKSB1cmxQYXJhbXMgPSAkLmRlcGFyYW0od2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpKTtcbiAgICB1cmxQYXJhbXNbJ3F1ZXJ5J10gPSB3ZHFzcWUuZ2V0VmFsdWUoKTtcbiAgICByZXR1cm4gdXJsUGFyYW1zO1xufTtcbnJvb3QuZ2V0QXNDdXJsID0gZnVuY3Rpb24od2Rxc3FlLCBhamF4Q29uZmlnKSB7XG4gICAgdmFyIGN1cmwgPSByZXF1aXJlKCcuL2N1cmwuanMnKTtcbiAgICByZXR1cm4gY3VybC5jcmVhdGVDdXJsU3RyaW5nKHdkcXNxZSwgYWpheENvbmZpZyk7XG59O1xuLyoqXG4gKiBDb25zdW1lIHRoZSBzaGFyZSBsaW5rLCBieSBwYXJzaW5nIHRoZSBkb2N1bWVudCBVUkwgZm9yIHBvc3NpYmxlIHdkcXNxZSBhcmd1bWVudHMsIGFuZCBzZXR0aW5nIHRoZSBhcHByb3ByaWF0ZSB2YWx1ZXMgaW4gdGhlIFlBU1FFIGRvY1xuICpcbiAqIEBtZXRob2QgWUFTUUUuY29uc3VtZVNoYXJlTGlua1xuICogQHBhcmFtIHtkb2N9IFlBU1FFIGRvY3VtZW50XG4gKi9cbnJvb3QuY29uc3VtZVNoYXJlTGluayA9IGZ1bmN0aW9uKHdkcXNxZSwgdXJsUGFyYW1zKSB7XG4gICAgaWYgKHVybFBhcmFtcyAmJiB1cmxQYXJhbXMucXVlcnkpIHtcbiAgICAgICAgd2Rxc3FlLnNldFZhbHVlKHVybFBhcmFtcy5xdWVyeSk7XG4gICAgfVxufTtcbnJvb3QuZHJhd0J1dHRvbnMgPSBmdW5jdGlvbih3ZHFzcWUpIHtcbiAgICB3ZHFzcWUuYnV0dG9ucyA9ICQoXCI8ZGl2IGNsYXNzPSd3ZHFzcWVfYnV0dG9ucyc+PC9kaXY+XCIpLmFwcGVuZFRvKCQod2Rxc3FlLmdldFdyYXBwZXJFbGVtZW50KCkpKTtcblxuICAgIC8qKlxuICAgICAqIGRyYXcgc2hhcmUgbGluayBidXR0b25cbiAgICAgKi9cbiAgICBpZiAod2Rxc3FlLm9wdGlvbnMuY3JlYXRlU2hhcmVMaW5rKSB7XG4gICAgICAgIHZhciBzdmdTaGFyZSA9ICQoU3ZnLmdldEVsZW1lbnQoaW1ncy5zaGFyZSkpO1xuICAgICAgICBzdmdTaGFyZS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciBwb3B1cCA9ICQoXCI8ZGl2IGNsYXNzPSd3ZHFzcWVfc2hhcmVQb3B1cCc+PC9kaXY+XCIpLmFwcGVuZFRvKHdkcXNxZS5idXR0b25zKTtcbiAgICAgICAgICAgICAgICAkKCdodG1sJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3B1cCkgcG9wdXAucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBwb3B1cC5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJChcIjxpbnB1dD5cIikudmFsKGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3QgKyBsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCArIFwiI1wiICsgJC5wYXJhbSh3ZHFzcWUub3B0aW9ucy5jcmVhdGVTaGFyZUxpbmsod2Rxc3FlKSkpO1xuXG4gICAgICAgICAgICAgICAgJGlucHV0LmZvY3VzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5zZWxlY3QoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBXb3JrIGFyb3VuZCBDaHJvbWUncyBsaXR0bGUgcHJvYmxlbVxuICAgICAgICAgICAgICAgICAgICAkdGhpcy5tb3VzZXVwKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCBmdXJ0aGVyIG1vdXNldXAgaW50ZXJ2ZW50aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy51bmJpbmQoXCJtb3VzZXVwXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHBvcHVwLmVtcHR5KCkuYXBwZW5kKCQoJzxkaXY+Jywge2NsYXNzOidpbnB1dFdyYXBwZXInfSkuYXBwZW5kKCRpbnB1dCkpO1xuICAgICAgICAgICAgICAgIGlmICh3ZHFzcWUub3B0aW9ucy5jcmVhdGVTaG9ydExpbmspIHtcbiAgICAgICAgICAgICAgICAgICAgcG9wdXAuYWRkQ2xhc3MoJ2VuYWJsZVNob3J0Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoJzxidXR0b24+U2hvcnRlbjwvYnV0dG9uPicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3dkcXNxZV9idG4gd2Rxc3FlX2J0bi1zbSB3ZHFzcWVfYnRuLXByaW1hcnknKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnYnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZHFzcWUub3B0aW9ucy5jcmVhdGVTaG9ydExpbmsoJGlucHV0LnZhbCgpLCBmdW5jdGlvbihlcnJTdHJpbmcsIHNob3J0TGluaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3B1cC5maW5kKCcuaW5wdXRXcmFwcGVyJykuYXBwZW5kKCQoJzxzcGFuPicsIHtjbGFzczpcInNob3J0bGlua0VyclwifSkudGV4dChlcnJTdHJpbmcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC52YWwoc2hvcnRMaW5rKS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFwcGVuZFRvKHBvcHVwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJCgnPGJ1dHRvbj5DVVJMPC9idXR0b24+JylcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCd3ZHFzcWVfYnRuIHdkcXNxZV9idG4tc20gd2Rxc3FlX2J0bi1wcmltYXJ5JylcbiAgICAgICAgICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2J1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQudmFsKHJvb3QuZ2V0QXNDdXJsKHdkcXNxZSkpLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmFwcGVuZFRvKHBvcHVwKTtcbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb25zID0gc3ZnU2hhcmUucG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBwb3B1cC5jc3MoXCJ0b3BcIiwgKHBvc2l0aW9ucy50b3AgKyBzdmdTaGFyZS5vdXRlckhlaWdodCgpICsgcGFyc2VJbnQocG9wdXAuY3NzKCdwYWRkaW5nLXRvcCcpKSApICsgXCJweFwiKS5jc3MoXCJsZWZ0XCIsICgocG9zaXRpb25zLmxlZnQgKyBzdmdTaGFyZS5vdXRlcldpZHRoKCkpIC0gcG9wdXAub3V0ZXJXaWR0aCgpKSArIFwicHhcIik7XG4gICAgICAgICAgICAgICAgJGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFkZENsYXNzKFwid2Rxc3FlX3NoYXJlXCIpXG4gICAgICAgICAgICAuYXR0cihcInRpdGxlXCIsIFwiU2hhcmUgeW91ciBxdWVyeVwiKVxuICAgICAgICAgICAgLmFwcGVuZFRvKHdkcXNxZS5idXR0b25zKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogZHJhdyBmdWxsc2NyZWVuIGJ1dHRvblxuICAgICAqL1xuXG4gICAgdmFyIHRvZ2dsZUZ1bGxzY3JlZW4gPSAkKCc8ZGl2PicsIHtcbiAgICAgICAgY2xhc3M6ICdmdWxsc2NyZWVuVG9nZ2xlQnRucydcbiAgICB9KVxuICAgICAgICAuYXBwZW5kKCQoU3ZnLmdldEVsZW1lbnQoaW1ncy5mdWxsc2NyZWVuKSlcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcIndkcXNxZV9mdWxsc2NyZWVuQnRuXCIpXG4gICAgICAgICAgICAuYXR0cihcInRpdGxlXCIsIFwiU2V0IGVkaXRvciBmdWxsIHNjcmVlblwiKVxuICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHdkcXNxZS5zZXRPcHRpb24oXCJmdWxsU2NyZWVuXCIsIHRydWUpO1xuICAgICAgICAgICAgfSkpXG4gICAgICAgIC5hcHBlbmQoJChTdmcuZ2V0RWxlbWVudChpbWdzLnNtYWxsc2NyZWVuKSlcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcIndkcXNxZV9zbWFsbHNjcmVlbkJ0blwiKVxuICAgICAgICAgICAgLmF0dHIoXCJ0aXRsZVwiLCBcIlNldCBlZGl0b3IgdG8gbm9ybWFsZSBzaXplXCIpXG4gICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgd2Rxc3FlLnNldE9wdGlvbihcImZ1bGxTY3JlZW5cIiwgZmFsc2UpO1xuICAgICAgICAgICAgfSkpXG4gICAgd2Rxc3FlLmJ1dHRvbnMuYXBwZW5kKHRvZ2dsZUZ1bGxzY3JlZW4pO1xuXG5cbiAgICBpZiAod2Rxc3FlLm9wdGlvbnMuc3BhcnFsLnNob3dRdWVyeUJ1dHRvbikge1xuICAgICAgICAkKFwiPGRpdj5cIiwge1xuICAgICAgICAgICAgY2xhc3M6ICd3ZHFzcWVfcXVlcnlCdXR0b24nXG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJxdWVyeV9idXN5XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3ZHFzcWUueGhyKSB3ZHFzcWUueGhyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJvb3QudXBkYXRlUXVlcnlCdXR0b24od2Rxc3FlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3ZHFzcWUucXVlcnkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZFRvKHdkcXNxZS5idXR0b25zKTtcbiAgICAgICAgcm9vdC51cGRhdGVRdWVyeUJ1dHRvbih3ZHFzcWUpO1xuICAgIH1cblxufTtcblxuXG52YXIgcXVlcnlCdXR0b25JZHMgPSB7XG4gICAgXCJidXN5XCI6IFwibG9hZGVyXCIsXG4gICAgXCJ2YWxpZFwiOiBcInF1ZXJ5XCIsXG4gICAgXCJlcnJvclwiOiBcInF1ZXJ5SW52YWxpZFwiXG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgcXVlcnkgYnV0dG9uIGRlcGVuZGluZyBvbiBjdXJyZW50IHF1ZXJ5IHN0YXR1cy4gSWYgbm8gcXVlcnkgc3RhdHVzIGlzIHBhc3NlZCB2aWEgdGhlIHBhcmFtZXRlciwgaXQgYXV0by1kZXRlY3RzIHRoZSBjdXJyZW50IHF1ZXJ5IHN0YXR1c1xuICpcbiAqIEBwYXJhbSB7ZG9jfSBZQVNRRSBkb2N1bWVudFxuICogQHBhcmFtIHN0YXR1cyB7c3RyaW5nfG51bGwsIFwiYnVzeVwifFwidmFsaWRcInxcImVycm9yXCJ9XG4gKi9cbnJvb3QudXBkYXRlUXVlcnlCdXR0b24gPSBmdW5jdGlvbih3ZHFzcWUsIHN0YXR1cykge1xuICAgIHZhciBxdWVyeUJ1dHRvbiA9ICQod2Rxc3FlLmdldFdyYXBwZXJFbGVtZW50KCkpLmZpbmQoXCIud2Rxc3FlX3F1ZXJ5QnV0dG9uXCIpO1xuICAgIGlmIChxdWVyeUJ1dHRvbi5sZW5ndGggPT0gMCkgcmV0dXJuOyAvL25vIHF1ZXJ5IGJ1dHRvbiBkcmF3blxuXG4gICAgLy9kZXRlY3Qgc3RhdHVzXG4gICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgICAgc3RhdHVzID0gXCJ2YWxpZFwiO1xuICAgICAgICBpZiAod2Rxc3FlLnF1ZXJ5VmFsaWQgPT09IGZhbHNlKSBzdGF0dXMgPSBcImVycm9yXCI7XG4gICAgfVxuXG4gICAgaWYgKHN0YXR1cyAhPSB3ZHFzcWUucXVlcnlTdGF0dXMpIHtcbiAgICAgICAgcXVlcnlCdXR0b25cbiAgICAgICAgICAgIC5lbXB0eSgpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoZnVuY3Rpb24oaW5kZXgsIGNsYXNzTmFtZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lcy5zcGxpdChcIiBcIikuZmlsdGVyKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgY2xhc3NuYW1lIGZyb20gcHJldmlvdXMgc3RhdHVzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjLmluZGV4T2YoXCJxdWVyeV9cIikgPT0gMDtcbiAgICAgICAgICAgICAgICB9KS5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT0gXCJidXN5XCIpIHtcbiAgICAgICAgICAgIHF1ZXJ5QnV0dG9uLmFwcGVuZCgkKCc8ZGl2PicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ2xvYWRlcicsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB3ZHFzcWUucXVlcnlTdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09IFwidmFsaWRcIiB8fCBzdGF0dXMgPT0gXCJlcnJvclwiKSB7XG4gICAgICAgICAgICBxdWVyeUJ1dHRvbi5hZGRDbGFzcyhcInF1ZXJ5X1wiICsgc3RhdHVzKTtcbiAgICAgICAgICAgIFN2Zy5kcmF3KHF1ZXJ5QnV0dG9uLCBpbWdzW3F1ZXJ5QnV0dG9uSWRzW3N0YXR1c11dKTtcbiAgICAgICAgICAgIHdkcXNxZS5xdWVyeVN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnJvb3Quc3RvcmVRdWVyeSA9IGZ1bmN0aW9uKHdkcXNxZSkge1xuICAgIHZhciBzdG9yYWdlSWQgPSB1dGlscy5nZXRQZXJzaXN0ZW5jeUlkKHdkcXNxZSwgd2Rxc3FlLm9wdGlvbnMucGVyc2lzdGVudCk7XG4gICAgaWYgKHN0b3JhZ2VJZCkge1xuICAgICAgICB5dXRpbHMuc3RvcmFnZS5zZXQoc3RvcmFnZUlkLCB3ZHFzcWUuZ2V0VmFsdWUoKSwgXCJtb250aFwiKTtcbiAgICB9XG59O1xucm9vdC5jb21tZW50TGluZXMgPSBmdW5jdGlvbih3ZHFzcWUpIHtcbiAgICB2YXIgc3RhcnRMaW5lID0gd2Rxc3FlLmdldEN1cnNvcih0cnVlKS5saW5lO1xuICAgIHZhciBlbmRMaW5lID0gd2Rxc3FlLmdldEN1cnNvcihmYWxzZSkubGluZTtcbiAgICB2YXIgbWluID0gTWF0aC5taW4oc3RhcnRMaW5lLCBlbmRMaW5lKTtcbiAgICB2YXIgbWF4ID0gTWF0aC5tYXgoc3RhcnRMaW5lLCBlbmRMaW5lKTtcblxuICAgIC8vIGlmIGFsbCBsaW5lcyBzdGFydCB3aXRoICMsIHJlbW92ZSB0aGlzIGNoYXIuIE90aGVyd2lzZSBhZGQgdGhpcyBjaGFyXG4gICAgdmFyIGxpbmVzQXJlQ29tbWVudGVkID0gdHJ1ZTtcbiAgICBmb3IgKHZhciBpID0gbWluOyBpIDw9IG1heDsgaSsrKSB7XG4gICAgICAgIHZhciBsaW5lID0gd2Rxc3FlLmdldExpbmUoaSk7XG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA9PSAwIHx8IGxpbmUuc3Vic3RyaW5nKDAsIDEpICE9IFwiI1wiKSB7XG4gICAgICAgICAgICBsaW5lc0FyZUNvbW1lbnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IG1pbjsgaSA8PSBtYXg7IGkrKykge1xuICAgICAgICBpZiAobGluZXNBcmVDb21tZW50ZWQpIHtcbiAgICAgICAgICAgIC8vIGxpbmVzIGFyZSBjb21tZW50ZWQsIHNvIHJlbW92ZSBjb21tZW50c1xuICAgICAgICAgICAgd2Rxc3FlLnJlcGxhY2VSYW5nZShcIlwiLCB7XG4gICAgICAgICAgICAgICAgbGluZTogaSxcbiAgICAgICAgICAgICAgICBjaDogMFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGxpbmU6IGksXG4gICAgICAgICAgICAgICAgY2g6IDFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTm90IGFsbCBsaW5lcyBhcmUgY29tbWVudGVkLCBzbyBhZGQgY29tbWVudHNcbiAgICAgICAgICAgIHdkcXNxZS5yZXBsYWNlUmFuZ2UoXCIjXCIsIHtcbiAgICAgICAgICAgICAgICBsaW5lOiBpLFxuICAgICAgICAgICAgICAgIGNoOiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxufTtcblxucm9vdC5jb3B5TGluZVVwID0gZnVuY3Rpb24od2Rxc3FlKSB7XG4gICAgdmFyIGN1cnNvciA9IHdkcXNxZS5nZXRDdXJzb3IoKTtcbiAgICB2YXIgbGluZUNvdW50ID0gd2Rxc3FlLmxpbmVDb3VudCgpO1xuICAgIC8vIEZpcnN0IGNyZWF0ZSBuZXcgZW1wdHkgbGluZSBhdCBlbmQgb2YgdGV4dFxuICAgIHdkcXNxZS5yZXBsYWNlUmFuZ2UoXCJcXG5cIiwge1xuICAgICAgICBsaW5lOiBsaW5lQ291bnQgLSAxLFxuICAgICAgICBjaDogd2Rxc3FlLmdldExpbmUobGluZUNvdW50IC0gMSkubGVuZ3RoXG4gICAgfSk7XG4gICAgLy8gQ29weSBhbGwgbGluZXMgdG8gdGhlaXIgbmV4dCBsaW5lXG4gICAgZm9yICh2YXIgaSA9IGxpbmVDb3VudDsgaSA+IGN1cnNvci5saW5lOyBpLS0pIHtcbiAgICAgICAgdmFyIGxpbmUgPSB3ZHFzcWUuZ2V0TGluZShpIC0gMSk7XG4gICAgICAgIHdkcXNxZS5yZXBsYWNlUmFuZ2UobGluZSwge1xuICAgICAgICAgICAgbGluZTogaSxcbiAgICAgICAgICAgIGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGxpbmU6IGksXG4gICAgICAgICAgICBjaDogd2Rxc3FlLmdldExpbmUoaSkubGVuZ3RoXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5yb290LmNvcHlMaW5lRG93biA9IGZ1bmN0aW9uKHdkcXNxZSkge1xuICAgIHJvb3QuY29weUxpbmVVcCh3ZHFzcWUpO1xuICAgIC8vIE1ha2Ugc3VyZSBjdXJzb3IgZ29lcyBvbmUgZG93biAod2UgYXJlIGNvcHlpbmcgZG93bndhcmRzKVxuICAgIHZhciBjdXJzb3IgPSB3ZHFzcWUuZ2V0Q3Vyc29yKCk7XG4gICAgY3Vyc29yLmxpbmUrKztcbiAgICB3ZHFzcWUuc2V0Q3Vyc29yKGN1cnNvcik7XG59O1xucm9vdC5kb0F1dG9Gb3JtYXQgPSBmdW5jdGlvbih3ZHFzcWUpIHtcbiAgICBpZiAod2Rxc3FlLnNvbWV0aGluZ1NlbGVjdGVkKCkpIHtcbiAgICAgICAgdmFyIHRvID0ge1xuICAgICAgICAgICAgbGluZTogd2Rxc3FlLmdldEN1cnNvcihmYWxzZSkubGluZSxcbiAgICAgICAgICAgIGNoOiB3ZHFzcWUuZ2V0U2VsZWN0aW9uKCkubGVuZ3RoXG4gICAgICAgIH07XG4gICAgICAgIGF1dG9Gb3JtYXRSYW5nZSh3ZHFzcWUsIHdkcXNxZS5nZXRDdXJzb3IodHJ1ZSksIHRvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdG90YWxMaW5lcyA9IHdkcXNxZS5saW5lQ291bnQoKTtcbiAgICAgICAgdmFyIHRvdGFsQ2hhcnMgPSB3ZHFzcWUuZ2V0VGV4dEFyZWEoKS52YWx1ZS5sZW5ndGg7XG4gICAgICAgIGF1dG9Gb3JtYXRSYW5nZSh3ZHFzcWUsIHtcbiAgICAgICAgICAgIGxpbmU6IDAsXG4gICAgICAgICAgICBjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBsaW5lOiB0b3RhbExpbmVzLFxuICAgICAgICAgICAgY2g6IHRvdGFsQ2hhcnNcbiAgICAgICAgfSk7XG4gICAgfVxuXG59O1xuXG5cbnZhciBhdXRvRm9ybWF0UmFuZ2UgPSBmdW5jdGlvbih3ZHFzcWUsIGZyb20sIHRvKSB7XG4gICAgdmFyIGFic1N0YXJ0ID0gd2Rxc3FlLmluZGV4RnJvbVBvcyhmcm9tKTtcbiAgICB2YXIgYWJzRW5kID0gd2Rxc3FlLmluZGV4RnJvbVBvcyh0byk7XG4gICAgLy8gSW5zZXJ0IGFkZGl0aW9uYWwgbGluZSBicmVha3Mgd2hlcmUgbmVjZXNzYXJ5IGFjY29yZGluZyB0byB0aGVcbiAgICAvLyBtb2RlJ3Mgc3ludGF4XG4gICAgdmFyIHJlcyA9IGF1dG9Gb3JtYXRMaW5lQnJlYWtzKHdkcXNxZS5nZXRWYWx1ZSgpLCBhYnNTdGFydCwgYWJzRW5kKTtcblxuICAgIC8vIFJlcGxhY2UgYW5kIGF1dG8taW5kZW50IHRoZSByYW5nZVxuICAgIHdkcXNxZS5vcGVyYXRpb24oZnVuY3Rpb24oKSB7XG4gICAgICAgIHdkcXNxZS5yZXBsYWNlUmFuZ2UocmVzLCBmcm9tLCB0byk7XG4gICAgICAgIHZhciBzdGFydExpbmUgPSB3ZHFzcWUucG9zRnJvbUluZGV4KGFic1N0YXJ0KS5saW5lO1xuICAgICAgICB2YXIgZW5kTGluZSA9IHdkcXNxZS5wb3NGcm9tSW5kZXgoYWJzU3RhcnQgKyByZXMubGVuZ3RoKS5saW5lO1xuICAgICAgICBmb3IgKHZhciBpID0gc3RhcnRMaW5lOyBpIDw9IGVuZExpbmU7IGkrKykge1xuICAgICAgICAgICAgd2Rxc3FlLmluZGVudExpbmUoaSwgXCJzbWFydFwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxudmFyIGF1dG9Gb3JtYXRMaW5lQnJlYWtzID0gZnVuY3Rpb24odGV4dCwgc3RhcnQsIGVuZCkge1xuICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZyhzdGFydCwgZW5kKTtcbiAgICB2YXIgYnJlYWtBZnRlckFycmF5ID0gW1xuICAgICAgICBbXCJrZXl3b3JkXCIsIFwid3NcIiwgXCJwcmVmaXhlZFwiLCBcIndzXCIsIFwidXJpXCJdLCAvLyBpLmUuIHByZWZpeCBkZWNsYXJhdGlvblxuICAgICAgICBbXCJrZXl3b3JkXCIsIFwid3NcIiwgXCJ1cmlcIl0gLy8gaS5lLiBiYXNlXG4gICAgXTtcbiAgICB2YXIgYnJlYWtBZnRlckNoYXJhY3RlcnMgPSBbXCJ7XCIsIFwiLlwiLCBcIjtcIl07XG4gICAgdmFyIGJyZWFrQmVmb3JlQ2hhcmFjdGVycyA9IFtcIn1cIl07XG4gICAgdmFyIGdldEJyZWFrVHlwZSA9IGZ1bmN0aW9uKHN0cmluZ1ZhbCwgdHlwZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJyZWFrQWZ0ZXJBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHN0YWNrVHJhY2UudmFsdWVPZigpLnRvU3RyaW5nKCkgPT0gYnJlYWtBZnRlckFycmF5W2ldLnZhbHVlT2YoKVxuICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnJlYWtBZnRlckNoYXJhY3RlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzdHJpbmdWYWwgPT0gYnJlYWtBZnRlckNoYXJhY3RlcnNbaV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJyZWFrQmVmb3JlQ2hhcmFjdGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gZG9uJ3Qgd2FudCB0byBpc3N1ZSAnYnJlYWtiZWZvcmUnIEFORCAnYnJlYWthZnRlcicsIHNvIGNoZWNrXG4gICAgICAgICAgICAvLyBjdXJyZW50IGxpbmVcbiAgICAgICAgICAgIGlmICgkLnRyaW0oY3VycmVudExpbmUpICE9ICcnICYmIHN0cmluZ1ZhbCA9PSBicmVha0JlZm9yZUNoYXJhY3RlcnNbaV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICB2YXIgZm9ybWF0dGVkUXVlcnkgPSBcIlwiO1xuICAgIHZhciBjdXJyZW50TGluZSA9IFwiXCI7XG4gICAgdmFyIHN0YWNrVHJhY2UgPSBbXTtcbiAgICBDb2RlTWlycm9yLnJ1bk1vZGUodGV4dCwgXCJzcGFycWwxMVwiLCBmdW5jdGlvbihzdHJpbmdWYWwsIHR5cGUpIHtcbiAgICAgICAgc3RhY2tUcmFjZS5wdXNoKHR5cGUpO1xuICAgICAgICB2YXIgYnJlYWtUeXBlID0gZ2V0QnJlYWtUeXBlKHN0cmluZ1ZhbCwgdHlwZSk7XG4gICAgICAgIGlmIChicmVha1R5cGUgIT0gMCkge1xuICAgICAgICAgICAgaWYgKGJyZWFrVHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkUXVlcnkgKz0gc3RyaW5nVmFsICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgICBjdXJyZW50TGluZSA9IFwiXCI7XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyAoLTEpXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkUXVlcnkgKz0gXCJcXG5cIiArIHN0cmluZ1ZhbDtcbiAgICAgICAgICAgICAgICBjdXJyZW50TGluZSA9IHN0cmluZ1ZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YWNrVHJhY2UgPSBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRMaW5lICs9IHN0cmluZ1ZhbDtcbiAgICAgICAgICAgIGZvcm1hdHRlZFF1ZXJ5ICs9IHN0cmluZ1ZhbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhY2tUcmFjZS5sZW5ndGggPT0gMSAmJiBzdGFja1RyYWNlWzBdID09IFwic3Atd3NcIilcbiAgICAgICAgICAgIHN0YWNrVHJhY2UgPSBbXTtcbiAgICB9KTtcbiAgICByZXR1cm4gJC50cmltKGZvcm1hdHRlZFF1ZXJ5LnJlcGxhY2UoL1xcblxccypcXG4vZywgJ1xcbicpKTtcbn07XG5cbnJlcXVpcmUoJy4vc3BhcnFsLmpzJyk7XG5yZXF1aXJlKCcuL2RlZmF1bHRzLmpzJyk7XG5yb290LiQgPSAkO1xucm9vdC52ZXJzaW9uID0ge1xuICAgIFwiQ29kZU1pcnJvclwiOiBDb2RlTWlycm9yLnZlcnNpb24sXG4gICAgXCJXRFFTUUVcIjogcmVxdWlyZShcIi4uL3BhY2thZ2UuanNvblwiKS52ZXJzaW9uLFxuICAgIFwianF1ZXJ5XCI6ICQuZm4uanF1ZXJ5LFxuICAgIFwid2Rxcy1zdG9yYWdlXCI6IFN0b3JhZ2UudmVyc2lvblxufTsiXX0=
},{"../lib/deparam.js":2,"../lib/grammar/tokenizer.js":4,"../lib/svg.js":5,"../package.json":20,"./autocompleters/autocompleterBase.js":21,"./autocompleters/classes.js":22,"./autocompleters/prefixes.js":23,"./autocompleters/properties.js":24,"./autocompleters/variables.js":26,"./curl.js":27,"./defaults.js":28,"./imgs.js":29,"./prefixFold.js":31,"./prefixUtils.js":32,"./sparql.js":33,"./tokenUtils.js":34,"./tooltip":35,"./utils.js":36,"codemirror":undefined,"codemirror/addon/display/fullscreen.js":7,"codemirror/addon/edit/matchbrackets.js":8,"codemirror/addon/fold/brace-fold.js":9,"codemirror/addon/fold/foldcode.js":10,"codemirror/addon/fold/foldgutter.js":11,"codemirror/addon/fold/xml-fold.js":12,"codemirror/addon/hint/show-hint.js":13,"codemirror/addon/runmode/runmode.js":14,"codemirror/addon/search/searchcursor.js":15,"wdqs-storage":18}],31:[function(require,module,exports){
var CodeMirror = require('codemirror'),
	tokenUtils = require('./tokenUtils.js');

"use strict";
var lookFor = "PREFIX";
module.exports = {
	findFirstPrefixLine: function(cm) {
		var lastLine = cm.lastLine();
		for (var i = 0; i <= lastLine; ++i) {
			if (findFirstPrefix(cm, i) >= 0) {
				return i;
			}
		}
	}
};

function findFirstPrefix(cm, line, ch, lineText) {
	if (!ch) ch = 0;
	if (!lineText) lineText = cm.getLine(line);
	lineText = lineText.toUpperCase();
	for (var at = ch, pass = 0;;) {
		var found = lineText.indexOf(lookFor, at);
		if (found == -1) {
			if (pass == 1)
				break;
			pass = 1;
			at = lineText.length;
			continue;
		}
		if (pass == 1 && found < ch)
			break;
		tokenType = cm.getTokenTypeAt(CodeMirror.Pos(line, found + 1));
		if (!/^(comment|string)/.test(tokenType))
			return found + 1;
		at = found - 1;
	}
}

CodeMirror.registerHelper("fold", "prefix", function(cm, start) {
	var line = start.line,
		lineText = cm.getLine(line);

	var startCh, tokenType;

	function hasPreviousPrefix() {
		var hasPreviousPrefix = false;
		for (var i = line - 1; i >= 0; i--) {
			if (cm.getLine(i).toUpperCase().indexOf(lookFor) >= 0) {
				hasPreviousPrefix = true;
				break;
			}
		}
		return hasPreviousPrefix;
	}


	function findOpening(openCh) {
		for (var at = start.ch, pass = 0;;) {
			var found = at <= 0 ? -1 : lineText.lastIndexOf(openCh, at - 1);
			if (found == -1) {
				if (pass == 1)
					break;
				pass = 1;
				at = lineText.length;
				continue;
			}
			if (pass == 1 && found < start.ch)
				break;
			tokenType = cm.getTokenTypeAt(CodeMirror.Pos(line, found + 1));
			if (!/^(comment|string)/.test(tokenType))
				return found + 1;
			at = found - 1;
		}
	}
	var getLastPrefixPos = function(line, ch) {
		var prefixKeywordToken = cm.getTokenAt(CodeMirror.Pos(line, ch + 1));
		if (!prefixKeywordToken || prefixKeywordToken.type != "keyword") return -1;
		var prefixShortname = tokenUtils.getNextNonWsToken(cm, line, prefixKeywordToken.end + 1);
		if (!prefixShortname || prefixShortname.type != "string-2") return -1; //missing prefix keyword shortname
		var prefixUri = tokenUtils.getNextNonWsToken(cm, line, prefixShortname.end + 1);
		if (!prefixUri || prefixUri.type != "variable-3") return -1; //missing prefix uri
		return prefixUri.end;
	}

	//only use opening prefix declaration
	if (hasPreviousPrefix())
		return;
	var prefixStart = findFirstPrefix(cm, line, start.ch, lineText);

	if (prefixStart == null)
		return;
	var stopAt = '{'; //if this char is there, we won't have a chance of finding more prefixes
	var stopAtNextLine = false;
	var count = 1,
		lastLine = cm.lastLine(),
		end, endCh;
	var prefixEndChar = getLastPrefixPos(line, prefixStart);
	var prefixEndLine = line;

	outer: for (var i = line; i <= lastLine; ++i) {
		if (stopAtNextLine)
			break;
		var text = cm.getLine(i),
			pos = i == line ? prefixStart + 1 : 0;

		for (;;) {
			if (!stopAtNextLine && text.indexOf(stopAt) >= 0)
				stopAtNextLine = true;

			var nextPrefixDeclaration = text.toUpperCase()
				.indexOf(lookFor, pos);

			if (nextPrefixDeclaration >= 0) {
				if ((endCh = getLastPrefixPos(i, nextPrefixDeclaration)) > 0) {
					prefixEndChar = endCh;
					prefixEndLine = i;
					pos = prefixEndChar;
				}
				pos++;
			} else {
				break;
			}
		}
	}
	return {
		from: CodeMirror.Pos(line, prefixStart + lookFor.length),
		to: CodeMirror.Pos(prefixEndLine, prefixEndChar)
	};
});
},{"./tokenUtils.js":34,"codemirror":undefined}],32:[function(require,module,exports){
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
},{}],33:[function(require,module,exports){
(function (global){
'use strict';
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zcGFycWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbnZhciAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpLFxuXHR1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKSxcblx0V0RRU1FFID0gcmVxdWlyZSgnLi9pbmRleC5qcycpO1xuXG5XRFFTUUUuZ2V0QWpheENvbmZpZyA9IGZ1bmN0aW9uKHdkcXNxZSwgY2FsbGJhY2tPckNvbmZpZykge1xuXHR2YXIgY2FsbGJhY2sgPSAodHlwZW9mIGNhbGxiYWNrT3JDb25maWcgPT0gXCJmdW5jdGlvblwiID8gY2FsbGJhY2tPckNvbmZpZyA6IG51bGwpO1xuXHR2YXIgY29uZmlnID0gKHR5cGVvZiBjYWxsYmFja09yQ29uZmlnID09IFwib2JqZWN0XCIgPyBjYWxsYmFja09yQ29uZmlnIDoge30pO1xuXG5cdGlmICh3ZHFzcWUub3B0aW9ucy5zcGFycWwpXG5cdFx0Y29uZmlnID0gJC5leHRlbmQoe30sIHdkcXNxZS5vcHRpb25zLnNwYXJxbCwgY29uZmlnKTtcblxuXHQvL2ZvciBiYWNrd2FyZHMgY29tcGF0YWJpbGl0eSwgbWFrZSBzdXJlIHdlIGNvcHkgc3BhcnFsIGhhbmRsZXJzIHRvIHNwYXJxbCBjYWxsYmFja3Ncblx0aWYgKGNvbmZpZy5oYW5kbGVycylcblx0XHQkLmV4dGVuZCh0cnVlLCBjb25maWcuY2FsbGJhY2tzLCBjb25maWcuaGFuZGxlcnMpO1xuXG5cblx0aWYgKCFjb25maWcuZW5kcG9pbnQgfHwgY29uZmlnLmVuZHBvaW50Lmxlbmd0aCA9PSAwKVxuXHRcdHJldHVybjsgLy8gbm90aGluZyB0byBxdWVyeSFcblxuXHQvKipcblx0ICogaW5pdGlhbGl6ZSBhamF4IGNvbmZpZ1xuXHQgKi9cblx0dmFyIGFqYXhDb25maWcgPSB7XG5cdFx0dXJsOiAodHlwZW9mIGNvbmZpZy5lbmRwb2ludCA9PSBcImZ1bmN0aW9uXCIgPyBjb25maWcuZW5kcG9pbnQod2Rxc3FlKSA6IGNvbmZpZy5lbmRwb2ludCksXG5cdFx0dHlwZTogKHR5cGVvZiBjb25maWcucmVxdWVzdE1ldGhvZCA9PSBcImZ1bmN0aW9uXCIgPyBjb25maWcucmVxdWVzdE1ldGhvZCh3ZHFzcWUpIDogY29uZmlnLnJlcXVlc3RNZXRob2QpLFxuXHRcdGhlYWRlcnM6IHtcblx0XHRcdEFjY2VwdDogZ2V0QWNjZXB0SGVhZGVyKHdkcXNxZSwgY29uZmlnKSxcblx0XHR9XG5cdH07XG5cdGlmIChjb25maWcueGhyRmllbGRzKSBhamF4Q29uZmlnLnhockZpZWxkcyA9IGNvbmZpZy54aHJGaWVsZHM7XG5cdC8qKlxuXHQgKiBhZGQgY29tcGxldGUsIGJlZm9yZXNlbmQsIGV0YyBjYWxsYmFja3MgKGlmIHNwZWNpZmllZClcblx0ICovXG5cdHZhciBoYW5kbGVyRGVmaW5lZCA9IGZhbHNlO1xuXHRpZiAoY29uZmlnLmNhbGxiYWNrcykge1xuXHRcdGZvciAodmFyIGhhbmRsZXIgaW4gY29uZmlnLmNhbGxiYWNrcykge1xuXHRcdFx0aWYgKGNvbmZpZy5jYWxsYmFja3NbaGFuZGxlcl0pIHtcblx0XHRcdFx0aGFuZGxlckRlZmluZWQgPSB0cnVlO1xuXHRcdFx0XHRhamF4Q29uZmlnW2hhbmRsZXJdID0gY29uZmlnLmNhbGxiYWNrc1toYW5kbGVyXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0YWpheENvbmZpZy5kYXRhID0gd2Rxc3FlLmdldFVybEFyZ3VtZW50cyhjb25maWcpO1xuXHRpZiAoIWhhbmRsZXJEZWZpbmVkICYmICFjYWxsYmFjaylcblx0XHRyZXR1cm47IC8vIG9rLCB3ZSBjYW4gcXVlcnksIGJ1dCBoYXZlIG5vIGNhbGxiYWNrcy4ganVzdCBzdG9wIG5vd1xuXG5cdC8vIGlmIG9ubHkgY2FsbGJhY2sgaXMgcGFzc2VkIGFzIGFyZywgYWRkIHRoYXQgb24gYXMgJ29uQ29tcGxldGUnIGNhbGxiYWNrXG5cdGlmIChjYWxsYmFjaylcblx0XHRhamF4Q29uZmlnLmNvbXBsZXRlID0gY2FsbGJhY2s7XG5cblxuXG5cdC8qKlxuXHQgKiBtZXJnZSBhZGRpdGlvbmFsIHJlcXVlc3QgaGVhZGVyc1xuXHQgKi9cblx0aWYgKGNvbmZpZy5oZWFkZXJzICYmICEkLmlzRW1wdHlPYmplY3QoY29uZmlnLmhlYWRlcnMpKVxuXHRcdCQuZXh0ZW5kKGFqYXhDb25maWcuaGVhZGVycywgY29uZmlnLmhlYWRlcnMpO1xuXG5cblx0dmFyIHF1ZXJ5U3RhcnQgPSBuZXcgRGF0ZSgpO1xuXHR2YXIgdXBkYXRlWWFzcWUgPSBmdW5jdGlvbigpIHtcblx0XHR3ZHFzcWUubGFzdFF1ZXJ5RHVyYXRpb24gPSBuZXcgRGF0ZSgpIC0gcXVlcnlTdGFydDtcblx0XHRXRFFTUUUudXBkYXRlUXVlcnlCdXR0b24od2Rxc3FlKTtcblx0XHR3ZHFzcWUuc2V0QmFja2Ryb3AoZmFsc2UpO1xuXHR9O1xuXHQvL01ha2Ugc3VyZSB0aGUgcXVlcnkgYnV0dG9uIGlzIHVwZGF0ZWQgYWdhaW4gb24gY29tcGxldGVcblx0dmFyIGNvbXBsZXRlQ2FsbGJhY2tzID0gW1xuXHRcdGZ1bmN0aW9uKCl7cmVxdWlyZSgnLi9pbmRleC5qcycpLnNpZ25hbCh3ZHFzcWUsICdxdWVyeUZpbmlzaCcsIGFyZ3VtZW50cyl9LFxuXHRcdHVwZGF0ZVlhc3FlXG5cdF07XG5cblx0aWYgKGFqYXhDb25maWcuY29tcGxldGUpIHtcblx0XHRjb21wbGV0ZUNhbGxiYWNrcy5wdXNoKGFqYXhDb25maWcuY29tcGxldGUpO1xuXHR9XG5cdGFqYXhDb25maWcuY29tcGxldGUgPSBjb21wbGV0ZUNhbGxiYWNrcztcblx0cmV0dXJuIGFqYXhDb25maWc7XG59O1xuXG5cblxuV0RRU1FFLmV4ZWN1dGVRdWVyeSA9IGZ1bmN0aW9uKHdkcXNxZSwgY2FsbGJhY2tPckNvbmZpZykge1xuXHRXRFFTUUUuc2lnbmFsKHdkcXNxZSwgJ3F1ZXJ5Jywgd2Rxc3FlLCBjYWxsYmFja09yQ29uZmlnKTtcblx0V0RRU1FFLnVwZGF0ZVF1ZXJ5QnV0dG9uKHdkcXNxZSwgXCJidXN5XCIpO1xuXHR3ZHFzcWUuc2V0QmFja2Ryb3AodHJ1ZSk7XG5cdHdkcXNxZS54aHIgPSAkLmFqYXgoV0RRU1FFLmdldEFqYXhDb25maWcod2Rxc3FlLCBjYWxsYmFja09yQ29uZmlnKSk7XG59O1xuXG5cbldEUVNRRS5nZXRVcmxBcmd1bWVudHMgPSBmdW5jdGlvbih3ZHFzcWUsIGNvbmZpZykge1xuXHR2YXIgcXVlcnlNb2RlID0gd2Rxc3FlLmdldFF1ZXJ5TW9kZSgpO1xuXHR2YXIgZGF0YSA9IFt7XG5cdFx0bmFtZTogdXRpbHMuZ2V0U3RyaW5nKHdkcXNxZSwgd2Rxc3FlLm9wdGlvbnMuc3BhcnFsLnF1ZXJ5TmFtZSksXG5cdFx0dmFsdWU6IChjb25maWcuZ2V0UXVlcnlGb3JBamF4PyBjb25maWcuZ2V0UXVlcnlGb3JBamF4KHdkcXNxZSk6IHdkcXNxZS5nZXRWYWx1ZSgpKVxuXHR9XTtcblxuXHQvKipcblx0ICogYWRkIG5hbWVkIGdyYXBocyB0byBhamF4IGNvbmZpZ1xuXHQgKi9cblx0aWYgKGNvbmZpZy5uYW1lZEdyYXBocyAmJiBjb25maWcubmFtZWRHcmFwaHMubGVuZ3RoID4gMCkge1xuXHRcdHZhciBhcmdOYW1lID0gKHF1ZXJ5TW9kZSA9PSBcInF1ZXJ5XCIgPyBcIm5hbWVkLWdyYXBoLXVyaVwiIDogXCJ1c2luZy1uYW1lZC1ncmFwaC11cmkgXCIpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY29uZmlnLm5hbWVkR3JhcGhzLmxlbmd0aDsgaSsrKVxuXHRcdFx0ZGF0YS5wdXNoKHtcblx0XHRcdFx0bmFtZTogYXJnTmFtZSxcblx0XHRcdFx0dmFsdWU6IGNvbmZpZy5uYW1lZEdyYXBoc1tpXVxuXHRcdFx0fSk7XG5cdH1cblx0LyoqXG5cdCAqIGFkZCBkZWZhdWx0IGdyYXBocyB0byBhamF4IGNvbmZpZ1xuXHQgKi9cblx0aWYgKGNvbmZpZy5kZWZhdWx0R3JhcGhzICYmIGNvbmZpZy5kZWZhdWx0R3JhcGhzLmxlbmd0aCA+IDApIHtcblx0XHR2YXIgYXJnTmFtZSA9IChxdWVyeU1vZGUgPT0gXCJxdWVyeVwiID8gXCJkZWZhdWx0LWdyYXBoLXVyaVwiIDogXCJ1c2luZy1ncmFwaC11cmkgXCIpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY29uZmlnLmRlZmF1bHRHcmFwaHMubGVuZ3RoOyBpKyspXG5cdFx0XHRkYXRhLnB1c2goe1xuXHRcdFx0XHRuYW1lOiBhcmdOYW1lLFxuXHRcdFx0XHR2YWx1ZTogY29uZmlnLmRlZmF1bHRHcmFwaHNbaV1cblx0XHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIGFkZCBhZGRpdGlvbmFsIHJlcXVlc3QgYXJnc1xuXHQgKi9cblx0aWYgKGNvbmZpZy5hcmdzICYmIGNvbmZpZy5hcmdzLmxlbmd0aCA+IDApICQubWVyZ2UoZGF0YSwgY29uZmlnLmFyZ3MpO1xuXG5cdHJldHVybiBkYXRhO1xufTtcblxudmFyIGdldEFjY2VwdEhlYWRlciA9IGZ1bmN0aW9uKHdkcXNxZSwgY29uZmlnKSB7XG5cdHZhciBhY2NlcHRIZWFkZXIgPSBudWxsO1xuXHRpZiAoY29uZmlnLmFjY2VwdEhlYWRlciAmJiAhY29uZmlnLmFjY2VwdEhlYWRlckdyYXBoICYmICFjb25maWcuYWNjZXB0SGVhZGVyU2VsZWN0ICYmICFjb25maWcuYWNjZXB0SGVhZGVyVXBkYXRlKSB7XG5cdFx0Ly90aGlzIGlzIHRoZSBvbGQgY29uZmlnLiBGb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHksIGtlZXAgc3VwcG9ydGluZyBpdFxuXHRcdGlmICh0eXBlb2YgY29uZmlnLmFjY2VwdEhlYWRlciA9PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdGFjY2VwdEhlYWRlciA9IGNvbmZpZy5hY2NlcHRIZWFkZXIod2Rxc3FlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YWNjZXB0SGVhZGVyID0gY29uZmlnLmFjY2VwdEhlYWRlcjtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0aWYgKHdkcXNxZS5nZXRRdWVyeU1vZGUoKSA9PSBcInVwZGF0ZVwiKSB7XG5cdFx0XHRhY2NlcHRIZWFkZXIgPSAodHlwZW9mIGNvbmZpZy5hY2NlcHRIZWFkZXIgPT0gXCJmdW5jdGlvblwiID8gY29uZmlnLmFjY2VwdEhlYWRlclVwZGF0ZSh3ZHFzcWUpIDogY29uZmlnLmFjY2VwdEhlYWRlclVwZGF0ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBxVHlwZSA9IHdkcXNxZS5nZXRRdWVyeVR5cGUoKTtcblx0XHRcdGlmIChxVHlwZSA9PSBcIkRFU0NSSUJFXCIgfHwgcVR5cGUgPT0gXCJDT05TVFJVQ1RcIikge1xuXHRcdFx0XHRhY2NlcHRIZWFkZXIgPSAodHlwZW9mIGNvbmZpZy5hY2NlcHRIZWFkZXJHcmFwaCA9PSBcImZ1bmN0aW9uXCIgPyBjb25maWcuYWNjZXB0SGVhZGVyR3JhcGgod2Rxc3FlKSA6IGNvbmZpZy5hY2NlcHRIZWFkZXJHcmFwaCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhY2NlcHRIZWFkZXIgPSAodHlwZW9mIGNvbmZpZy5hY2NlcHRIZWFkZXJTZWxlY3QgPT0gXCJmdW5jdGlvblwiID8gY29uZmlnLmFjY2VwdEhlYWRlclNlbGVjdCh3ZHFzcWUpIDogY29uZmlnLmFjY2VwdEhlYWRlclNlbGVjdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBhY2NlcHRIZWFkZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0Z2V0QWpheENvbmZpZzogV0RRU1FFLmdldEFqYXhDb25maWdcbn07XG4iXX0=
},{"./index.js":30,"./utils.js":36}],34:[function(require,module,exports){
'use strict';
/**
 * When typing a query, this query is sometimes syntactically invalid, causing
 * the current tokens to be incorrect This causes problem for autocompletion.
 * http://bla might result in two tokens: http:// and bla. We'll want to combine
 * these
 * 
 * @param wdqsqe {doc}
 * @param token {object}
 * @param cursor {object}
 * @return token {object}
 * @method WDQSQE.getCompleteToken
 */
var getCompleteToken = function(wdqsqe, token, cur) {
	if (!cur) {
		cur = wdqsqe.getCursor();
	}
	if (!token) {
		token = wdqsqe.getTokenAt(cur);
	}
	var prevToken = wdqsqe.getTokenAt({
		line: cur.line,
		ch: token.start
	});
	// not start of line, and not whitespace
	if (
		prevToken.type != null && prevToken.type != "ws" && token.type != null && token.type != "ws"
	) {
		token.start = prevToken.start;
		token.string = prevToken.string + token.string;
		return getCompleteToken(wdqsqe, token, {
			line: cur.line,
			ch: prevToken.start
		}); // recursively, might have multiple tokens which it should include
	} else if (token.type != null && token.type == "ws") {
		//always keep 1 char of whitespace between tokens. Otherwise, autocompletions might end up next to the previous node, without whitespace between them
		token.start = token.start + 1;
		token.string = token.string.substring(1);
		return token;
	} else {
		return token;
	}
};
var getPreviousNonWsToken = function(wdqsqe, line, token) {
	var previousToken = wdqsqe.getTokenAt({
		line: line,
		ch: token.start
	});
	if (previousToken != null && previousToken.type == "ws") {
		previousToken = getPreviousNonWsToken(wdqsqe, line, previousToken);
	}
	return previousToken;
}
var getNextNonWsToken = function(wdqsqe, lineNumber, charNumber) {
	if (charNumber == undefined)
		charNumber = 1;
	var token = wdqsqe.getTokenAt({
		line: lineNumber,
		ch: charNumber
	});
	if (token == null || token == undefined || token.end < charNumber) {
		return null;
	}
	if (token.type == "ws") {
		return getNextNonWsToken(wdqsqe, lineNumber, token.end + 1);
	}
	return token;
};

module.exports = {
	getPreviousNonWsToken: getPreviousNonWsToken,
	getCompleteToken: getCompleteToken,
	getNextNonWsToken: getNextNonWsToken,
};
},{}],35:[function(require,module,exports){
(function (global){
'use strict';
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
	utils = require('./utils.js');

/**
 * Write our own tooltip, to avoid loading another library for just this functionality. For now, we only use tooltip for showing parse errors, so this is quite a tailored solution
 * Requirements: 
 * 		position tooltip within codemirror frame as much as possible, to avoid z-index issues with external things on page
 * 		use html as content
 */
module.exports = function(wdqsqe, parent, html) {
	var parent = $(parent);
	var tooltip;
	parent.hover(function() {
			if (typeof html == "function") html = html();
			tooltip = $("<div>").addClass('wdqsqe_tooltip').html(html).appendTo(parent);
			repositionTooltip();
		},
		function() {
			$(".wdqsqe_tooltip").remove();
		});



	/**
	 * only need to take into account top and bottom offset for this usecase
	 */
	var repositionTooltip = function() {
		if ($(wdqsqe.getWrapperElement()).offset().top >= tooltip.offset().top) {
			//shit, move the tooltip down. The tooltip now hovers over the top edge of the wdqsqe instance
			tooltip.css('bottom', 'auto');
			tooltip.css('top', '26px');
		}
	};
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy90b29sdGlwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKSxcblx0dXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG5cbi8qKlxuICogV3JpdGUgb3VyIG93biB0b29sdGlwLCB0byBhdm9pZCBsb2FkaW5nIGFub3RoZXIgbGlicmFyeSBmb3IganVzdCB0aGlzIGZ1bmN0aW9uYWxpdHkuIEZvciBub3csIHdlIG9ubHkgdXNlIHRvb2x0aXAgZm9yIHNob3dpbmcgcGFyc2UgZXJyb3JzLCBzbyB0aGlzIGlzIHF1aXRlIGEgdGFpbG9yZWQgc29sdXRpb25cbiAqIFJlcXVpcmVtZW50czogXG4gKiBcdFx0cG9zaXRpb24gdG9vbHRpcCB3aXRoaW4gY29kZW1pcnJvciBmcmFtZSBhcyBtdWNoIGFzIHBvc3NpYmxlLCB0byBhdm9pZCB6LWluZGV4IGlzc3VlcyB3aXRoIGV4dGVybmFsIHRoaW5ncyBvbiBwYWdlXG4gKiBcdFx0dXNlIGh0bWwgYXMgY29udGVudFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdkcXNxZSwgcGFyZW50LCBodG1sKSB7XG5cdHZhciBwYXJlbnQgPSAkKHBhcmVudCk7XG5cdHZhciB0b29sdGlwO1xuXHRwYXJlbnQuaG92ZXIoZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAodHlwZW9mIGh0bWwgPT0gXCJmdW5jdGlvblwiKSBodG1sID0gaHRtbCgpO1xuXHRcdFx0dG9vbHRpcCA9ICQoXCI8ZGl2PlwiKS5hZGRDbGFzcygnd2Rxc3FlX3Rvb2x0aXAnKS5odG1sKGh0bWwpLmFwcGVuZFRvKHBhcmVudCk7XG5cdFx0XHRyZXBvc2l0aW9uVG9vbHRpcCgpO1xuXHRcdH0sXG5cdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHQkKFwiLndkcXNxZV90b29sdGlwXCIpLnJlbW92ZSgpO1xuXHRcdH0pO1xuXG5cblxuXHQvKipcblx0ICogb25seSBuZWVkIHRvIHRha2UgaW50byBhY2NvdW50IHRvcCBhbmQgYm90dG9tIG9mZnNldCBmb3IgdGhpcyB1c2VjYXNlXG5cdCAqL1xuXHR2YXIgcmVwb3NpdGlvblRvb2x0aXAgPSBmdW5jdGlvbigpIHtcblx0XHRpZiAoJCh3ZHFzcWUuZ2V0V3JhcHBlckVsZW1lbnQoKSkub2Zmc2V0KCkudG9wID49IHRvb2x0aXAub2Zmc2V0KCkudG9wKSB7XG5cdFx0XHQvL3NoaXQsIG1vdmUgdGhlIHRvb2x0aXAgZG93bi4gVGhlIHRvb2x0aXAgbm93IGhvdmVycyBvdmVyIHRoZSB0b3AgZWRnZSBvZiB0aGUgd2Rxc3FlIGluc3RhbmNlXG5cdFx0XHR0b29sdGlwLmNzcygnYm90dG9tJywgJ2F1dG8nKTtcblx0XHRcdHRvb2x0aXAuY3NzKCd0b3AnLCAnMjZweCcpO1xuXHRcdH1cblx0fTtcbn07Il19
},{"./utils.js":36}],36:[function(require,module,exports){
(function (global){
'use strict';
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

var keyExists = function(objectToTest, key) {
	var exists = false;
	try {
		if (objectToTest[key] !== undefined)
			exists = true;
	} catch (e) {}
	return exists;
};

var getPersistencyId = function(wdqsqe, persistentIdCreator) {
	var persistencyId = null;

	if (persistentIdCreator) {
		if (typeof persistentIdCreator == "string") {
			persistencyId = persistentIdCreator;
		} else {
			persistencyId = persistentIdCreator(wdqsqe);
		}
	}
	return persistencyId;
};

var elementsOverlap = (function() {
	function getPositions(elem) {
		var pos, width, height;
		pos = $(elem).offset();
		width = $(elem).width();
		height = $(elem).height();
		return [
			[pos.left, pos.left + width],
			[pos.top, pos.top + height]
		];
	}

	function comparePositions(p1, p2) {
		var r1, r2;
		r1 = p1[0] < p2[0] ? p1 : p2;
		r2 = p1[0] < p2[0] ? p2 : p1;
		return r1[1] > r2[0] || r1[0] === r2[0];
	}

	return function(a, b) {
		var pos1 = getPositions(a),
			pos2 = getPositions(b);
		return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
	};
})();

var getString = function(wdqsqe, item) {
	if (typeof item == "function") {
		return item(wdqsqe);
	} else {
		return item;
	}
}
module.exports = {
	keyExists: keyExists,
	getPersistencyId: getPersistencyId,
	elementsOverlap: elementsOverlap,
	getString:getString
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5cbnZhciBrZXlFeGlzdHMgPSBmdW5jdGlvbihvYmplY3RUb1Rlc3QsIGtleSkge1xuXHR2YXIgZXhpc3RzID0gZmFsc2U7XG5cdHRyeSB7XG5cdFx0aWYgKG9iamVjdFRvVGVzdFtrZXldICE9PSB1bmRlZmluZWQpXG5cdFx0XHRleGlzdHMgPSB0cnVlO1xuXHR9IGNhdGNoIChlKSB7fVxuXHRyZXR1cm4gZXhpc3RzO1xufTtcblxudmFyIGdldFBlcnNpc3RlbmN5SWQgPSBmdW5jdGlvbih3ZHFzcWUsIHBlcnNpc3RlbnRJZENyZWF0b3IpIHtcblx0dmFyIHBlcnNpc3RlbmN5SWQgPSBudWxsO1xuXG5cdGlmIChwZXJzaXN0ZW50SWRDcmVhdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBwZXJzaXN0ZW50SWRDcmVhdG9yID09IFwic3RyaW5nXCIpIHtcblx0XHRcdHBlcnNpc3RlbmN5SWQgPSBwZXJzaXN0ZW50SWRDcmVhdG9yO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwZXJzaXN0ZW5jeUlkID0gcGVyc2lzdGVudElkQ3JlYXRvcih3ZHFzcWUpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcGVyc2lzdGVuY3lJZDtcbn07XG5cbnZhciBlbGVtZW50c092ZXJsYXAgPSAoZnVuY3Rpb24oKSB7XG5cdGZ1bmN0aW9uIGdldFBvc2l0aW9ucyhlbGVtKSB7XG5cdFx0dmFyIHBvcywgd2lkdGgsIGhlaWdodDtcblx0XHRwb3MgPSAkKGVsZW0pLm9mZnNldCgpO1xuXHRcdHdpZHRoID0gJChlbGVtKS53aWR0aCgpO1xuXHRcdGhlaWdodCA9ICQoZWxlbSkuaGVpZ2h0KCk7XG5cdFx0cmV0dXJuIFtcblx0XHRcdFtwb3MubGVmdCwgcG9zLmxlZnQgKyB3aWR0aF0sXG5cdFx0XHRbcG9zLnRvcCwgcG9zLnRvcCArIGhlaWdodF1cblx0XHRdO1xuXHR9XG5cblx0ZnVuY3Rpb24gY29tcGFyZVBvc2l0aW9ucyhwMSwgcDIpIHtcblx0XHR2YXIgcjEsIHIyO1xuXHRcdHIxID0gcDFbMF0gPCBwMlswXSA/IHAxIDogcDI7XG5cdFx0cjIgPSBwMVswXSA8IHAyWzBdID8gcDIgOiBwMTtcblx0XHRyZXR1cm4gcjFbMV0gPiByMlswXSB8fCByMVswXSA9PT0gcjJbMF07XG5cdH1cblxuXHRyZXR1cm4gZnVuY3Rpb24oYSwgYikge1xuXHRcdHZhciBwb3MxID0gZ2V0UG9zaXRpb25zKGEpLFxuXHRcdFx0cG9zMiA9IGdldFBvc2l0aW9ucyhiKTtcblx0XHRyZXR1cm4gY29tcGFyZVBvc2l0aW9ucyhwb3MxWzBdLCBwb3MyWzBdKSAmJiBjb21wYXJlUG9zaXRpb25zKHBvczFbMV0sIHBvczJbMV0pO1xuXHR9O1xufSkoKTtcblxudmFyIGdldFN0cmluZyA9IGZ1bmN0aW9uKHdkcXNxZSwgaXRlbSkge1xuXHRpZiAodHlwZW9mIGl0ZW0gPT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0cmV0dXJuIGl0ZW0od2Rxc3FlKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gaXRlbTtcblx0fVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGtleUV4aXN0czoga2V5RXhpc3RzLFxuXHRnZXRQZXJzaXN0ZW5jeUlkOiBnZXRQZXJzaXN0ZW5jeUlkLFxuXHRlbGVtZW50c092ZXJsYXA6IGVsZW1lbnRzT3ZlcmxhcCxcblx0Z2V0U3RyaW5nOmdldFN0cmluZ1xufTtcbiJdfQ==
},{}]},{},[1])(1)
});


//# sourceMappingURL=wdqs-editor.js.map