const { ObjectId } = require('mongoose').Types;
const { Store, Household, Food } = require('../models');
const { ALLITEMS } = require('../utils/data');

module.exports = {

    // GET to request a store by address
    getSingleStoreByAddress(req, res) {
        // console.log("my address is ", req.params);
        Store.findOne({ address: req.params.address })
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

    // GET all stores
    getAllStores(req, res) {
        Store.find({})
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
    createStore: async (req, res) => {
        const { foodCategories3, householdCategories3 } = ALLITEMS[2];
        const foods = await Food.create(foodCategories3);
        const households = await Household.create(householdCategories3);

        await Store.collection.insertOne({
            name: req.body.name,
            address: req.body.address,
            zipCode: req.body.zipCode,
            allItems: {
                foodCategories: foods.map(x => x._id),
                householdCategories: households.map(x => x._id)
            },
        })
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));

    },
}
