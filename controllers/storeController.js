const { ObjectId } = require('mongoose').Types;
const { Store, Household, Food } = require('../models');

module.exports = {

    // GET to request a store by address
    getSingleStore(req, res) {
        Store.findOne({ address: req.body.address })
            .select('-__v')
            .then((store) =>
                !store
                    ? res.status(404).json({ message: 'Store not found in database' })
                    : res.json(store)
            )
            .catch((err) => res.status(500).json(err));
    },

    // PUT to update an existing store // TODO

    // POST to create a store // TODO 
}
