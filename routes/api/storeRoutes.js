const router = require('express').Router();
const {
    getSingleStoreByAddress,
    getStoresByNameZip,
    createStore,
} = require('../../controllers/storeController');


// GET to /api/stores with json to get an individual store
router.route('/').get(getSingleStoreByAddress);

// GET to /api/stores with json to get store(s)
router.route('/:name/:zipCode').get(getStoresByNameZip);

// POST to /api/stores with json to create a new store
router.route('/').post(createStore);

// PUT to /api/stores/:storeId to update a store // TODO

module.exports = router;
