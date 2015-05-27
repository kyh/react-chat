// modules =================================================
var path            = require('path');
var express         = require('express');
var mongoose        = require('mongoose');
var flash           = require('connect-flash');

var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var methodOverride  = require('method-override');

var app             = express();
var router          = express.Router();

// configuration ===========================================
var config          = require('./config/base');
var db              = require('./config/db');

// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/client'));
app.use('/api', router);

// routes ==================================================
require('./server/routes')(app);
require('./server/socket')();

exports = module.exports = app; // expose app