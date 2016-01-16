var sparql = require('./sparql.js'),
    $ = require('jquery');
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
