'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

function UserEmailValidator(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

var UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    addressBilling: {
        type: String
    },
    addressShipping: {
        type: String
    },
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
    imageUrl: { 
        type: String 
    },
    phoneNumber: {
        type: String
    },
    accountType: {
        type: String
        //required: true,
        //enum: ["admin", "shopper"],
        //default: "shopper"
    },
    email: {
        type: String,
        validate: UserEmailValidator,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

UserSchema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

UserSchema.statics.generateSalt = generateSalt;
UserSchema.statics.encryptPassword = encryptPassword;

UserSchema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', UserSchema);