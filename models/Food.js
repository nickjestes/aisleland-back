const { Schema, model } = require('mongoose');

const foodSchema = new Schema({
    typeName: {
        type: String,
        required: true,
    },
    aisleLocation: {
        type: String,
        required: true,
    },
},
    {
        toJSON: {
            getters: true,
        },
        id: true,
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
    }
);

const Food = model('food', foodSchema);

module.exports = Food;