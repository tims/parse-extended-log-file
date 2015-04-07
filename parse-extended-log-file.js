var fs = require('fs'),
    readline = require('readline'),
    stream = require('stream'),
    _ = require('lodash');

var rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

var directives = {};
var fields = [];
var directivePattern = /^#(.*?):\s*([^\s].*)/;

rl.on('line', function(line) {
  var matches = line.match(directivePattern);
  if (matches) {
    if (matches[1] === 'Version') {
      fields = [];
      directives = {};
    } else if (matches[1] === 'Fields') {
      fields = matches[2].split(/\s+/).map(function(name) {
        return name !== '-' ? name : null;
      });
    } 
    directives[matches[1]] = matches[2];
    return;
  }
  var values = _.map(line.split(/\s+/), function(value) {
    return decodeURIComponent(value);
  });
  
  var data = _.assign(_.zipObject(fields, values), {raw: line, directives: directives});

  if (data['cs-uri-query']) {
    data['cs-uri-query'] = _.zipObject(_.map(data['cs-uri-query'].split('&'), function(part) {
      return _.slice(part.match(/(.*?)=(.*)/), 1);
    }));
  }
  console.log(JSON.stringify(data));
});