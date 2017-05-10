// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = new mongoose.Schema({

    local            : {
        email        : String,
        password     : String,    
        created_at   : { type: Date, default: Date.now}
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

/*
var validator = require('validator');
User.schema.path('email').validate(function(email) {
return validator.isEmail(email);
});
User.schema.path('password').validate(function(password) {
return validator.isLength(password, 6);
});
*/
// create the model for users and expose it to our app
// declare a model called users which has schema userSchema
// here 'users' is our mongodb collection name
var User = mongoose.model('users', userSchema);
module.exports = User;