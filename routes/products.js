const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProduct);
router.post('/', [auth, admin], productsController.addProduct); 

module.exports = router;