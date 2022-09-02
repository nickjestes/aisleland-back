const { ObjectId } = require('mongoose').Types;
const { Store, Household, Food } = require('../models');

module.exports = {

    // GET to request a store by address
    getSingleStoreByAddress(req, res) {
        Store.findOne({ address: req.body.address })
            .select('-__v')
            .then((store) =>
                !store
                    ? res.status(404).json({ message: 'Store not found in database' })
                    : res.json(store)
            )
            .catch((err) => res.status(500).json(err));
    },

    // GET store(s) by name and zipcode
    getStoresByNameZip(req, res) {
        Store.find({
            name: req.body.name,
            zipCode: req.body.zipCode
        })
            .then((stores) => res.json(stores))
            .catch((err) => res.status(500).json(err));
    },

    // PUT to update an existing store 
    updateStore(req, res) {
        Store.findOneAndUpdate(req.params.storeId, req.body,
            { runValidators: true, new: true }
        )
            .then((store) =>
                !store
                    ? res.status(404)
                        .json({ errMessage: 'No store found with Id ❌' })
                    : res.json(store)
            )
            .catch((err) => res.status(500).json(err));
    },

    // POST to create a store
    createStore(req, res) {
        // expecting body to have json with name/address/zipCode k:v pairs
        Store.create(req.body)
            .then((store) => res.json(store))
            .catch((err) => {
                console.error(err);
                return res.status(500).json(err);
            });
    },
}
