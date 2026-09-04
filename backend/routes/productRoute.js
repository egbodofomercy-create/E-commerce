import express from "express";

import {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

import upload from "../middleware/multer.js";

const productRouter = express.Router();


// ================= ADD PRODUCT =================

productRouter.post(
  "/add",
  upload.array("images", 5),
  addProduct
);


// ================= GET PRODUCTS =================

productRouter.get(
  "/list",
  getProducts
);


// ================= GET SINGLE PRODUCT =================

productRouter.get(
  "/single/:id",
  getProductById
);


// ================= DELETE PRODUCT =================

productRouter.delete(
  "/delete/:id",
  deleteProduct
);


// ================= UPDATE PRODUCT =================

productRouter.put(
  "/update/:id",
  upload.single("image"),
  updateProduct
);


export default productRouter;
