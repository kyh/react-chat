// Modules =================================================
var mongoose = require('mongoose');
var config   = require('./config/base');
var db       = require('./config/db');

// Websocket Server ========================================
require('./server/socket')();