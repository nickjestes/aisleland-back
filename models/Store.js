const { Schema, model } = require('mongoose');

// Schema to create major categories model
const majorCategorySchema = new Schema(
    {
        foodCategories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Food',
            },
        ],
        householdCategories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Household',
            },
        ],
    },
    {
        id: false,
    }
);

// Schema to create a store model
const storeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            default: true,
        },
        allItems: majorCategorySchema
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

const Store = model('store', storeSchema);


// Store.create({}, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

module.exports = Store;
