const { Store, Household } = require('../models');

module.exports = {
    // get all Foods in db
    getHousehold(req, res) {
        Store.findOne({ _id: req.params.storeId })
            .select('-__v')
            .then((store) =>
                // res.json(store.allItems.foodCategories)
                Household.find({ _id: store.allItems.householdCategories })
                    .then((households) => {
                        res.json(households)
                    })
                    .catch((err) => res.status(500).json(err))
            ).catch((err) => res.status(500).json(err));
    },

    // get single household item by _id
    getSingleHousehold(req, res) {
        Household.findOne({ _id: req.params.householdId })
            .then((household) => {
                res.json(household)
            })
            .catch((err) => res.status(500).json(err));
    },

    // update (POST) a selected Food in db
    updateHousehold(req, res) {
        Household.findOneAndUpdate(
            { _id: req.params.householdId },
            { aisleLocation: req.body.aisleLocation },
            { runValidators: true, new: true }
        )
            .then((household) => res.json(household))
            .catch((err) => res.status(500).json(err));
    },
}