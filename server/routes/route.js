const router = require('express').Router();

const userController = require('../controller/userController');
const productController = require('../controller/productController');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post(
  '/products',
  productController.allowIfLoggedin,
  productController.grantAccess('createOwn', 'Product'),
  productController.postProduct
);

router.get(
  '/products/:id',
  productController.allowIfLoggedin,
  productController.getProduct
);

router.get(
  '/products',
  productController.allowIfLoggedin,
  productController.grantAccess('readAny', 'Product'),
  productController.getProducts
);

router.patch(
  '/products/:id',
  productController.allowIfLoggedin,
  productController.grantAccess('updateAny', 'Product'),
  productController.updateProduct
);

router.delete(
  '/products/:id',
  productController.allowIfLoggedin,
  productController.grantAccess('deleteAny', 'Product'),
  productController.deleteProduct
);

module.exports = router;
