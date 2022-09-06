const router = require('express').Router();
const foodRoutes = require('./foodRoutes');
const householdRoutes = require('./householdRoutes');
const storeRoutes = require('./storeRoutes');
const userRoutes = require('./userRoutes');

router.use('/foods', foodRoutes);
router.use('/households', householdRoutes);
router.use('/stores', storeRoutes);
router.use('/users', userRoutes);


module.exports = router;
