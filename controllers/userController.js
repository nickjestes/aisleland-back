const { User } = require('../models');
const { signToken, secret } = require('../utils/auth');
const jwt = require('jsonwebtoken');
const { json } = require('express');

module.exports = {
    // list all registered users
    listUsers: (req, res) => {
        User.find({})
        .then(data => {
            const filter = data.map(user => { return {
                id: user._id,
                userName: user.userName, 
                email: user.email
            }})

            res.json(filter);
        }).catch(err => {
            res.status(500).json({ msg: "ERROR", err })
        })
    },

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
            console.info(user);
            res.cookie('jwt', token, { maxAge: 60 * 60 * 2 * 1000 });

            /* DEBUG */
            // Cookies that have not been signed
            console.log('Cookies: ', req.cookies)

            // Cookies that have been signed
            console.log('Signed Cookies: ', req.signedCookies)
            /* DEBUG */

            return res.status(200).json({ user, msg: 'You are now logged in!', cookie: res.cookie });
        } catch (err) {
            console.error("now in catch block", err);
            res.status(400).json(err);
        }
    },

    // register an user 
    registerUser: (req, res) => {
        console.log("📣 creating with", { "body": req.body });

        User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastname,
        }).then(data => {
            // update cookie so user gets logged in
            const token = signToken(data)
            console.info(data, token);
            res.cookie('jwt', token, { maxAge: 60 * 60 * 2 * 1000 });
            res.status(201).json({ data });
        }).catch(err => {
            console.error("the err", err);
            res.status(500).json({ msg: "ERROR on user registration:", err })
        });
    },


    // updates an user, allows the user to change username/email/password
    updateUser(req, res) {

    },

    // logout the user, remove the req.session.user
    logoutUser: (req, res) => {
        console.log('📣 Logging out! Destroying cookie');
        res.cookie('jwt', '', { maxAge: 1 });

        /* DEBUG */
        // Cookies that have not been signed
        console.log('Cookies: ', req.cookies)

        // Cookies that have been signed
        console.log('Signed Cookies: ', req.signedCookies)
        /* DEBUG */
        // res.redirect('/');

    },

    // respond with a message of whether the user has a valid token
    protected: (req, res) => {
        const token = req.headers.authorization.split(" ")[1];

        try {
            const user = jwt.verify(token, secret);
            res.json({ message: `Welcome to the club, ${user.data.userName}` });
        } catch {
            res.status(403).json({ message: "Invalid token" });
        }
    },

    // respond with an user Object if user has a valid token
    checkToken: (req, res) => {
        const token = req.headers.authorization.split(" ")[1];

        try {
            const user = jwt.verify(token, secret);
            res.json(user);
        } catch {
            res.status(403).json({ message: "Invalid token" });
        }
    },
}