const {connection} = require('../config/connection');
const { Store, Household, Food, User } = require('../models');
const { ALLITEMS, userData, handleError } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected and proceeding to seed');

    // Drop existing tables
    await Store.deleteMany({});
    await Food.deleteMany({});
    await Household.deleteMany({});
    await User.deleteMany({});

    // Destructuring data.js 
    const { foodCategories1, householdCategories1 } = ALLITEMS[0];

    // create returns an array of objects created
    const foods1 = await Food.create(foodCategories1);
    const households1 = await Household.create(householdCategories1);

    // map to return just their _id
    // debug
    // console.log({ food_ids1: foods1.map(x => x._id) });
    // console.log({ household_ids1: households1.map(x => x._id) });

    // Add a store to the collection and await the results
    await Store.collection.insertOne({
        name: 'Safeway',
        address: '300 Bellevue Way NE, Bellevue, WA',
        zipCode: 98004,
        allItems: {
            foodCategories: foods1.map(x => x._id),
            householdCategories: households1.map(x => x._id)
        },
    });
    console.info('Finished seeding first store! 🎉');

    // Destructuring second element of data
    const { foodCategories2, householdCategories2 } = ALLITEMS[1];
    const foods2 = await Food.create(foodCategories2);
    const households2 = await Household.create(householdCategories2);

    // debug
    // console.log({ food_ids2: foods2.map(x => x._id) });
    // console.log({ household_ids2: households2.map(x => x._id) });

    await Store.collection.insertOne({
        name: 'Walgreen',
        address: '1135 116th Ave NE #105, Bellevue, WA',
        zipCode: 98004,
        allItems: {
            foodCategories: foods2.map(x => x._id),
            householdCategories: households2.map(x => x._id)
        },
    });
    console.info('Finished seeding second store! 🎉');

    // ? why doesn't this work
    // const user = await User.create(userData, (x) =>
    //     {
    //         console.error({x});
    //         err ? handleError(err) : console.info('User created 🎉');
    //     }
    // );
    // const user = await User.collection.insertOne(userData);

    // ? try catch block works
    try {
        await User.create(userData);
        console.info('User created 🎉');
    } catch (err) {
        console.error(err);
    }

    console.info('Seeding complete! 🌱');
    process.exit(0);
});
