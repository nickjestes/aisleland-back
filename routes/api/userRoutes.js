const router = require('express').Router();
const {
    // loginUser,
    registerUser,
    // updateUser,
} = require('../../controllers/userController');

// POST to /api/users with json to create a user
router.route('/').post(registerUser);

module.exports = router;