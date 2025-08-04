const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const auth = require('../middleware/auth');

router.post('/', auth, cartController.addToCart);
router.get('/', auth, cartController.getCart);
router.post('/remove', auth, cartController.removeFromCart);
router.post('/update', auth, cartController.updateCartItem);

module.exports = router;
