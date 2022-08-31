const { Schema, model, SchemaTypes } = require('mongoose');
const bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;
require('mongoose-type-email');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true },
    },
    email: {
        type: SchemaTypes.Email,
        required: true,
        unique: true,
    },
    password: { type: String, required: true }
})



// User.create({
//     username: "alphaTester",
//     email: "somemail@email.com",
//     password: "password1",
// })

userSchema.pre('save', function (next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });

    });

});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


const User = model('user', userSchema);

module.exports = User;