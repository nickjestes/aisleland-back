const router = require('express').Router();
const {
    getHousehold,
    // updateHousehold, // TODO
} = require('../../controllers/householdController');

// GET to /api/households/ to request all Food items relating to that store
// (uses json with address field of the Store)
router.route('/').get(getHousehold);



module.exports = router;
