const Product = require('../models/Product');

module.exports = {
  getProducts,
  addProduct,
  getProduct,
  deleteProduct,
  getProductReviews,
};

function getProducts(req, res) {
  Product.find((err, products) => {
    if (err) {
      res.status(500).json({message: 'Unexpected error'});
    } else {
      res.json(products);
    }
  });
}

function addProduct(req, res) {
  const newProduct = Product(req.swagger.params.product.value);
  newProduct.save(function(err, city) {
    if (err || !city) {
      console.log(err);

      res.status(500).json({message: 'Unexpected error'});
    } else {
      res.json(newProduct);
    }
  });
}

function getProduct(req, res) {
  const productId = req.swagger.params.productId.value;
  Product.findById(productId, function(err, product) {
    if (err) {
      res.status(404).json({message: 'not found'});
    } else {
      res.json(product);
    }
  });
}

function getProductReviews(req, res) {
  const productId = req.swagger.params.productId.value;
  Product.findById(productId, function(err, product) {
    if (err) {
      res.status(404).json({message: 'not found'});
    } else {
      res.json(product.reviews);
    }
  });
}

function deleteProduct(req, res) {
  const productId = req.swagger.params.productId.value;
  Product.findByIdAndDelete(productId, (err, product) => {
    if (err || !product) {
      res.status(404).json({message: 'not found'});
    } else {
      res.json(product);
    }
  });
}
