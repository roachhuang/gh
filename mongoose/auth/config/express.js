process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose'),
express = require('./config/express'),
passport = require('./config/passport');
var db = mongoose();
var app = express();
var passport = passport();
app.listen(3000);
module.exports = app;
console.log('Server running at http://localhost:3000/');
Next, you'll need to register the Passport middleware in your Express application.
To do so, change your config/express.js file, as follows:
var config = require('./config'),
express = require('express'),
morgan = require('morgan'),
compress = require('compression'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
session = require('express-session'),
passport = require('passport');
module.exports = function() {
var app = express();
if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev'));
www.it-ebooks.info
Managing User Authentication Using Passport
[ 128 ]
} else if (process.env.NODE_ENV === 'production') {
app.use(compress());
}
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({
saveUninitialized: true,
resave: true,
secret: config.sessionSecret
}));
app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
require('../app/routes/index.server.routes.js')(app);
require('../app/routes/users.server.routes.js')(app);
app.use(express.static('./public'));
return app;
};