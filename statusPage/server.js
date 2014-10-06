var connect = require('connect');
var env = require('jsdom').env;
var $ = require('jquery');

connect().use(connect.static(__dirname)).listen(8080);
