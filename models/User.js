const { Schema, model, SchemaTypes } = require('mongoose');
const bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 24,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        max: 128,
        validate: [
            validateEmail, "Invalid Email, please try another"
        ],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Invalid Email, please try another",
        ],
    },
    password: { type: String, required: true } // this is hashed
},
    {
        timestamps: true
    }
);

userSchema.pre('save', function (next) {
    //debug
    // console.log('logging inside of presave hook'); 

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
            // debug
            // console.info('user password hashed and stored into database');
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