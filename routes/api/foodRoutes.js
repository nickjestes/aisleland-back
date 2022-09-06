const router = require('express').Router();
const {
    getFoods,
    getSingleFood,
    updateFood, 
} = require('../../controllers/foodController');

// GET to /api/foods/:storeId to request all Food items relating to that store
router.route('/:storeId').get(getFoods);

// GET to /api/foods/:foodId to request the single food item
router.route('/:foodId').get(getSingleFood);

// PUT to /api/foods/:foodId to update the food with json
router.route('/:foodId').put(updateFood);

module.exports = router;
