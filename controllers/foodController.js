const { Store, Food } = require('../models');

module.exports = {
    // GET all Foods in db
    getFoods(req, res) {
        Store.findOne({ address: req.body.address })
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

    // update (PUT) a selected Food in db
    // updateFood(req, res) {

    // },
}