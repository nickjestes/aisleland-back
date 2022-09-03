const router = require('express').Router();
const {
    loginUser,
    registerUser,
    // updateUser,
    // logoutUser,
} = require('../../controllers/userController');

// POST to /api/users/login with json to login
router.route('/login').post(loginUser);

// POST to /api/users with json to create a user
router.route('/').post(registerUser);

module.exports = router;