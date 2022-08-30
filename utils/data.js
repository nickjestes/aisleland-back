let foods = [
    {
        typeName: 'Bread',
        aisleLocation: '4',
    },
    {
        typeName: 'Cereal',
        aisleLocation: '4'
    },
    {
        typeName: 'Chips',
        aisleLocation: '6'
    }
];

let householdItems = [
    {
        typeName: 'Baby Formula',
        aisleLocation: '2'
    },
    {
        typeName: 'Hair Products',
        aisleLocation: '2'
    },
    {
        typeName: 'Cold and Flu/Medicines',
        aisleLocation: '1'
    }
]


const ALLITEMS = {
    foodCategories: foods,
    householdCategories: householdItems,
};

module.exports = { ALLITEMS }; 