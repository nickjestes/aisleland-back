const router = require('express').Router();
const {
    getSingleStore,
    // createStore,
} = require('../../controllers/storeController');


// GET to /api/stores with json to get an individual store
router.route('/').get(getSingleStore);

// POST to /api/stores with json to create a new store // ! TODO
// router.route('/').post(createStore);

module.exports = router;
