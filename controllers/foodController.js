const { Store, Food } = require('../models');

module.exports = {
    // get all Foods in db
    getFoods(req, res) {
        Store.findOne({ _id: req.params.storeId })
            .select('-__v')
            .then((store) =>
                // res.json(store.allItems.foodCategories)
                Food.find({ '_id': store.allItems.foodCategories })
                    .then((foods) => {
                        res.json(foods)
                    })
                    .catch((err) => res.status(500).json(err))
            ).catch((err) => res.status(500).json(err));
    },

    // get single food item by _id
    getSingleFood(req, res) {
        Food.findOne({ _id: req.params.foodId })
            .then((food) => {
                res.json(food)
            })
            .catch((err) => res.status(500).json(err));
    },

    // update (POST) a selected Food in db
    updateFood(req, res) {
        Food.findOneAndUpdate({ _id: req.params.foodId },
            req.body,
            { runValidators: true, new: true }
        )
            .then((food) => res.json(food))
            .catch((err) => res.status(500).json(err));
    },
}