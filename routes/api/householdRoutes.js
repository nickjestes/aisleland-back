const router = require('express').Router();
const {
    getHousehold,
    getSingleHousehold,
    updateHousehold, 
} = require('../../controllers/householdController');

// GET to /api/households/:address to request all Food items relating to that store
router.route('/:address').get(getHousehold);

// GET to /api/households/:householdId to request the single household item
router.route('/:householdId').get(getSingleHousehold);

// PUT to /api/households/:householdId to update the household with json
router.route('/:householdId').put(updateHousehold);


module.exports = router;
