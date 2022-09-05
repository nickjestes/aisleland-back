const router = require('express').Router();
const {
    loginUser,
    registerUser,
    // updateUser,
    protected,
    logoutUser,
} = require('../../controllers/userController');

// POST to /api/users/login with json to login
router.route('/login').post(loginUser);

// POST to /api/users with json to create a user
router.route('/').post(registerUser);

router.route('/logout').get(logoutUser);

router.route('/protected').get(protected);

module.exports = router;