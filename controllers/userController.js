const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
    // login the user and create a session cookie
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({
                // lets user login via email or username
                $or: [
                    { userName: req.body.email },
                    { email: req.body.email }
                ]
            });

            if (!user) {
                res
                    .status(400)
                    .json({ msg: "invalid login credentials" });
                return;
            }

            const validPassword = await user.comparePassword(req.body.password);

            if (!validPassword) {
                res
                    .status(400)
                    .json({ msg: "invalid login credentials" });
                return;
            }

            // update cookie so user gets logged in 
            const token = signToken(user)
            console.info(user, token);
            res.cookie('jwt', token, { maxAge: 60 * 60 * 2 * 1000 });

            return res.status(200).json({ user, msg: 'You are now logged in!' });
        } catch (err) {
            console.error("now in catch block",err);
            res.status(400).json(err);
        }
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
            // update cookie so user gets logged in
            const token = signToken(data)
            console.info(data, token);
            res.cookie('jwt', token, { maxAge: 60 * 60 * 2 * 1000 });
            res.status(201).json({ data });
        }).catch(err => {
            console.error("the err", err);
            res.status(500).json({ msg: "ERROR on user registration:", err })
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