'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/tutorial', require('./tutorial'));
router.use('/members', require('./members'));
// router.use('/admin',require('./admin'));
// router.use('/orders',require('./orders'));
router.use('/products',require('./products'));
router.use('/accounts',require('./accounts'));


console.log('app routes');

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});