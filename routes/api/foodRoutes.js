const router = require('express').Router();
const {
    getFoods,
    // updateFood, // TODO
} = require('../../controllers/foodController');

// GET to /api/foods/ to request all Food items relating to that store
// (uses json with address field)
router.route('/').get(getFoods);



module.exports = router;
