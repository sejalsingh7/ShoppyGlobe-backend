// const router = require('express').Router();
// const Cart = require('../models/cart');

// // Add to cart
// router.post('/', async (req, res) => {
//   const { productId, quantity } = req.body;
//   let cart = await Cart.findOne({ user: req.userId });
//   if (!cart) cart = await Cart.create({ user: req.userId, items: [] });
//   const item = cart.items.find(i => i.product == productId);
//   if (item) item.quantity += quantity;
//   else cart.items.push({ product: productId, quantity });
//   await cart.save();
//   res.json(cart);
// });

// // Update quantity
// router.put('/:productId', async (req, res) => {
//   const { quantity } = req.body;
//   const cart = await Cart.findOne({ user: req.userId });
//   const item = cart.items.find(i => i.product == req.params.productId);
//   if (!item) return res.status(404).json({ message: 'Not in cart' });
//   item.quantity = quantity;
//   await cart.save();
//   res.json(cart);
// });

// // // Remove from cart
// // router.delete('/:productId', async (req, res) => {
// //   const cart = await Cart.findOne({ user: req.userId });
// //   cart.items = cart.items.filter(i => i.product != req.params.productId);
// //   await cart.save();
// //   res.json(cart);
// // });


// // Remove from cart by item _id
// router.delete('/:itemId', async (req, res) => {
//   const cart = await Cart.findOne({ user: req.userId });
//   if (!cart) return res.status(404).json({ message: 'Cart not found' });

//   const before = cart.items.length;

//   // Filter out the item by its _id
//   cart.items = cart.items.filter(i => i._id.toString() !== req.params.itemId);

//   if (cart.items.length === before) {
//     return res.status(404).json({ message: 'Item not found in cart' });
//   }

//   await cart.save();
//   res.json({ message: 'Item deleted', cart });
// });

// module.exports = router;


const router = require('express').Router();
const Cart = require('../models/cart');

// 🔐 Middleware to extract userId from token
// You must be using middleware that sets req.userId from your token
// If not, let me know — I’ll help you fix that too

// Add to cart
router.post('/', async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.userId });
  if (!cart) cart = await Cart.create({ user: req.userId, items: [] });

  const item = cart.items.find(i => i.product?.toString() === productId);
  if (item) item.quantity += quantity;
  else cart.items.push({ product: productId, quantity });

  await cart.save();
  res.json(cart);
});

// Update quantity
router.put('/:itemId', async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.find(i => i._id.toString() === req.params.itemId);
  if (!item) return res.status(404).json({ message: 'Item not in cart' });

  item.quantity = req.body.quantity;
  await cart.save();
  res.json({ message: 'Quantity updated', item });
});

// ✅ DELETE from cart using cart item _id
router.delete('/:itemId', async (req, res) => {
  console.log('🗑 DELETE /api/cart/' + req.params.itemId);

  const cart = await Cart.findOne({ user: req.userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const before = cart.items.length;

  cart.items = cart.items.filter(i => i._id.toString() !== req.params.itemId);

  if (cart.items.length === before) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }

  await cart.save();
  res.json({ message: 'Item deleted', cart });
});

// 🧹 Empty the entire cart for the logged-in user
router.delete('/', async (req, res) => {
  await Cart.deleteOne({ user: req.userId });
  res.json({ message: 'Cart is now empty!' });
});


module.exports = router;
