// local strategy
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

module.exports = function() {	
    /* the strategy using the passport.use() method that uses an instance of the
     * LocalStrategy object. Notice how the LocalStrategy constructor takes a
     * callback function as an argument. It will later call this callback when trying to
     * authenticate a user.	
	*/ 
	passport.use(new LocalStrategy(function(username, password, done) {
		User.findOne({
			username: username
		}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message: 'Unknown user'
				});
			}
			if (!user.authenticate(password)) {
				return done(null, false, {
					message: 'Invalid password'
				});
			}
			// done is called when authentication process is over
			return done(null, user);	// with the user Mongoose object
		});
	}));
};
