const { Schema, model } = require('mongoose');

const householdItemSchema = new Schema({
    typeName: {
        type: String,
        required: true,
    },
    aisleLocation: {
        type: String,
        required: true,
    },
    unixTimestamp: {
        type: Number,
        default: Date.now(),
    }
},
    {
        toJSON: {
            getters: true,
        },
        id: true,
        timestamps: true
    }
);

const HouseholdItem = model('householdItem', householdItemSchema);

module.exports = HouseholdItem;