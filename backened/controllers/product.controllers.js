const Product = require('../models/product.js'); // use the actual filename case

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(req.query);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}