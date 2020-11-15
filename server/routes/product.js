const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Get all Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error.message);
  }
});

// Get a single Post
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error.message);
  }
});

// Post a new Product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });

  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    console.error(error.message);
  }
});

// ADMIN

// DELETE PRODUCT
router.delete('/:id', async (req, res) => {
  try {
    const removedProduct = await Product.deleteOne({ _id: req.params.id });
    res.json(removedProduct);
  } catch (error) {
    console.error(error.message);
  }
});

// UPDATE PRODUCT
router.patch('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          description: req.body.name,
          price: req.body.price,
        },
      }
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
