const { Store, Household } = require('../models');

module.exports = {
    // GET all Foods in db
    getHousehold(req, res) {
        Store.findOne({ address: req.body.address })
            .select('-__v')
            .then((store) =>
                // res.json(store.allItems.foodCategories)
                Household.find({ '_id': store.allItems.householdCategories })
                    .then((households) => {
                        res.json(households)
                    })
                    .catch((err) => res.status(500).json(err))
            ).catch((err) => res.status(500).json(err));
    },

    // update (POST) a selected Food in db
    // updateHousehold(req, res) {

    // },
}