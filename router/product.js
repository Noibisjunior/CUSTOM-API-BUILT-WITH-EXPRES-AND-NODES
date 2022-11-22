const authMiddleware = require('../middleware/auth');
const express = require('express');
const router = express.Router();



const {
  createProducts,
  getAllProducts,
  getSingleProducts,
  UpdateProducts,
  deleteProducts,
} = require('../controller/product');

router.route('/product').post(authMiddleware,createProducts).get(getAllProducts);
router
  .route('/product/:id')
  .get(getSingleProducts)
  .patch(authMiddleware,UpdateProducts)
  .delete(authMiddleware,deleteProducts);

module.exports = router;
