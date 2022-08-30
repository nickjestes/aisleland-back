const connection = require('../config/connection');
const { Store, Household, Food } = require('../models');
const { ALLITEMS } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected and proceeding to seed');

    // Drop existing tables
    await Store.deleteMany({});
    await Food.deleteMany({});
    await Household.deleteMany({});

    const { foodCategories, householdCategories } = ALLITEMS;

    // create returns an array of objects created
    const foods = await Food.create(foodCategories);
    const households = await Household.create(householdCategories);
    console.log({ food_ids: foods.map(x => x._id) });
    console.log({ household_ids: households.map(x => x._id) });



    // const itemsID = async () => (await Food.collection.distinct('_id'));
        
    // Add a store to the collection and await the results
    await Store.collection.insertOne({
        name: 'Safeway',
        address: '300 Bellevue Way NE, Bellevue, WA 98004',
        allItems: {
            foodCategories: foods.map(x => x._id),
            householdCategories: households.map(x => x._id)
        }, 
    });


    console.info('Seeding complete! 🌱');
    process.exit(0);
});
