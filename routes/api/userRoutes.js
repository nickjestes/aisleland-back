const router = require('express').Router();
const {
    listUsers,
    loginUser,
    registerUser,
    // updateUser,
    logoutUser,
    protected,
    checkToken,
} = require('../../controllers/userController');

// GET to /api/users/ to get a list of registered users
router.route('/').get(listUsers);

// POST to /api/users/login with json to login
router.route('/login').post(loginUser);

// POST to /api/users with json to create an user
router.route('/').post(registerUser);

// GET to /api/users/logout to destroy token and logout
router.route('/logout').get(logoutUser);

// GET to /api/users/protected to get if-authenticated message
router.route('/protected').get(protected);

// GET to /api/users/check-token to get jwt object
router.route('/check-token').get(checkToken);

module.exports = router;