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
            name: req.params.name,
            zipCode: req.params.zipCode
        })
            .then((stores) => res.json(stores))
            .catch((err) => res.status(500).json(err));
    },
    // PUT to update an existing store // TODO

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
