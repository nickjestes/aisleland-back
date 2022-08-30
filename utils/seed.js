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
    // const itemsID = [];

    // foodCategories.forEach(i => {
        
    // });

    await Food.create(foodCategories);
    // await itemsID = () => (Food.collection.distinct('_id'));

    await Household.create(householdCategories);

    // Add a store to the collection and await the results
    await Store.collection.insertOne({
        name: 'Safeway',
        address: '300 Bellevue Way NE, Bellevue, WA 98004',
        allItems: ALLITEMS, 
    });


    console.info('Seeding complete! 🌱');
    process.exit(0);
});
