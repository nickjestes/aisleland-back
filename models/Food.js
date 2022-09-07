const { Schema, model } = require('mongoose');

const foodSchema = new Schema({
    typeName: {
        type: String,
        required: true,
    },
    aisleLocation: {
        type: String,
        required: false,
        default: '',
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

const Food = model('food', foodSchema);

module.exports = Food;