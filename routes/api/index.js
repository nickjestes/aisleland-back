const router = require('express').Router();
const foodRoutes = require('./foodRoutes');
const householdRoutes = require('./householdRoutes');
const storeRoutes = require('./storeRoutes')

router.use('/foods', foodRoutes);
router.use('/households', householdRoutes);
router.use('/stores', storeRoutes);


module.exports = router;
