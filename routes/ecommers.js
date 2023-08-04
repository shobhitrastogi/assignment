const express = require("express");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Order = require("../models/Order");

const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

const router = express.Router();
router.get('/categories', async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
  });
  
  // b. Product Listing
  router.get('/products/:category_id', async (req, res) => {
    const categoryId = req.params.category_id;
    const products = await Product.find({ category: categoryId });
    res.json(products);
  });
  
  // c. Product Details
  router.get('/products/:product_id', async (req, res) => {
    const productId = req.params.product_id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});

// d. Cart Management
// (Implemented in-memory for simplicity; use a database for real-world scenarios)
const cart = {};

router.post('/add_to_cart/:product_id', fetchUser, async (req, res) => {
  const productId = req.params.product_id;
  // Your logic to handle adding the product to the cart goes here
  res.json({ message: 'Product added to cart successfully' });
});

router.get('/view_cart', fetchUser, async (req, res) => {
  // Your logic to retrieve the cart and its contents goes here
  res.json(cart);
});

router.put(
    '/update_cart/:product_id',
    fetchUser,
    body('quantity').isInt({ min: 1 }),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      const productId = req.params.product_id;
      const quantity = req.body.quantity;
      cart[productId] = quantity;
      res.json({ message: 'Cart updated successfully' });
    }
  );

  router.delete('/remove_from_cart/:product_id', fetchUser, (req, res) => {
    const productId = req.params.product_id;
    delete cart[productId];
    res.json({ message: 'Product removed from cart successfully' });
  });
  
  // e. Order Placement (Assume that order placement API does not require cart authentication)
  router.post('/place_order', (req, res) => {
    // Process the order and store it in the database, including order details
    // Clear the cart after processing the order
    // Return the order details in the response
    res.json({ message: 'Order placed successfully' });
  });

// f. Order History
// (Assume that order history requires authentication)
router.get('/order_history', fetchUser, (req, res) => {
    // Fetch order history for the authenticated user
    // Return the order details in the response
    res.json({ message: 'Order history retrieved successfully' });
  });
  
  // g. Order Details
  // (Assume that order details require authentication)
  router.get('/order_details/:order_id', fetchUser, (req, res) => {
    const orderId = req.params.order_id;
    // Fetch the order details from the database based on orderId
    // Return the order details in the response
    res.json({ message: 'Order details retrieved successfully' });
  });

  module.exports = router;