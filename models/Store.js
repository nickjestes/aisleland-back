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
            required: true,
        },
        zipCode: {
            type: Number,
            required: true,
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

module.exports = Store;