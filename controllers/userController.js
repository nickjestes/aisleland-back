const { User } = require('../models');

module.exports = {
    // login the user and create a session cookie
    loginUser(req, res) {
        // User.
    },

    // register an user 
    registerUser: (req, res) => {
        console.log("📣 creating with", { "body": req.body });
        // User.create(req.body).then(data => {
        User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        }).then(data => {
            console.log("req session", req.session);
            // update session cookie so user gets logged in
            req.session.user = {
                id: data._id,
                userName: data.userName,
                email: data.email
            };
            res.status(201).json(data);
        }).catch(err => {
            console.error("the err",err);
            res.status(500).json({ msg: "ERROR", err })
            // console.info("my session now:", req.session.user);
        });
    },

//Item.create(req.body).then(function(item) { ... }, function(err) { ... });


    // updates an user, allows the user to change username/email/password
    updateUser(req, res) {

    },

    // logout the user, remove the req.session.user
    logoutUser(req, res) {

    },
}