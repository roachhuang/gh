
/* When a user is authenticated, Passport will save its _id property to the
** session. Later on when the user object is needed, Passport will use the _id property
** to grab the user object from the database.
** The second thing the preceding code does is including the local strategy
** configuration file. This way, your server.js file will load the Passport configuration
** file, which in turn will load its strategies configuration file.
*/

var passport = require('passport'),
mongoose = require('mongoose');

module.exports = function() {
	var User = mongoose.model('User');
	// define how passport will handle user serialization.
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, '-password -salt', function(err, user) {
			done(err, user);
		});
	});
	require('./strategies/local.js')();
};
