const router = require('express').Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log("product");
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

module.exports = router;
