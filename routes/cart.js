const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const auth = require('../middleware/auth');

router.post('/', auth, cartController.addToCart);
router.get('/', auth, cartController.getCart);

module.exports = router;