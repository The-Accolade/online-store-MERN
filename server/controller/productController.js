const Product = require('../models/Product');
const { roles } = require('../roles');

// Get all Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      data: products,
    });
  } catch (error) {
    console.error(error.message);
  }
};

// Get a single Product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      data: product,
    });
  } catch (error) {
    console.error(error.message);
  }
};

// Post a new Product
exports.postProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });

  try {
    const savedProduct = await product.save();
    res.status(200).json({ data: savedProduct });
  } catch (error) {
    console.error(error.message);
  }
};

// ADMIN

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json({
      data: null,
      message: 'Product has been deleted',
    });
  } catch (error) {
    console.error(error.message);
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
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
    res.status(200).json({
      data: updatedProduct,
      message: 'Product has been updated',
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have the permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      return res.status(401).json({
        error: 'You need to be logged in to access this route',
      });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
