import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";


// ================= ADD PRODUCT =================

// ================= ADD PRODUCT =================

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      subCategory,
      color,
      bestseller,
    } = req.body;

    const imageFiles = req.files;

    // ================= CHECK IMAGES =================

    if (!imageFiles || imageFiles.length === 0) {
      return res.json({
        success: false,
        message: "At least one image is required",
      });
    }

    // ================= CHECK STOCK =================

    if (stock === undefined || stock === "") {
      return res.json({
        success: false,
        message: "Stock quantity is required",
      });
    }

    if (Number(stock) < 0) {
      return res.json({
        success: false,
        message: "Stock quantity cannot be negative",
      });
    }

    // ================= UPLOAD ALL IMAGES =================

    const imageUrls = [];

    for (const imageFile of imageFiles) {
      const imageUpload = await cloudinary.uploader.upload(
        imageFile.path,
        {
          resource_type: "image",
        }
      );

      imageUrls.push(imageUpload.secure_url);
    }

    // ================= PARSE COLORS =================

    let parsedColors;

    try {
      parsedColors = JSON.parse(color);
    } catch (error) {
      return res.json({
        success: false,
        message: "Invalid color format",
      });
    }

    // ================= CREATE PRODUCT =================

    const product = new productModel({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      image: imageUrls,
      category,
      subCategory,
      color: parsedColors,
      bestseller: bestseller === "true",
    });

    await product.save();

    res.json({
      success: true,
      message: "Product Added",
      product,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
// ================= GET ALL PRODUCTS =================

const getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      products,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET SINGLE PRODUCT =================

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};



const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      stock,
      category,
      subCategory,
      color,
      bestseller,
      existingImages,
    } = req.body;

    let parsedColors = [];

    try {
      parsedColors = JSON.parse(color);
    } catch (error) {
      return res.json({
        success: false,
        message: "Invalid color format",
      });
    }

    let remainingImages = [];

    if (existingImages) {
      try {
        remainingImages = JSON.parse(existingImages);
      } catch (error) {
        return res.json({
          success: false,
          message: "Invalid existing images format",
        });
      }
    }

    /* ================= UPDATE DATA ================= */

    const updateData = {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
      subCategory,
      color: parsedColors,
      bestseller: bestseller === "true",
    };

    /* ================= NEW IMAGES ================= */

    const imageFiles = req.files || [];

    const newImageUrls = [];

    if (imageFiles.length > 0) {
      for (const imageFile of imageFiles) {
        const imageUpload =
          await cloudinary.uploader.upload(
            imageFile.path,
            {
              resource_type: "image",
            }
          );

        newImageUrls.push(
          imageUpload.secure_url
        );
      }
    }

    /* ================= COMBINE IMAGES ================= */

    const finalImages = [
      ...remainingImages,
      ...newImageUrls,
    ];

    if (finalImages.length > 5) {
      return res.json({
        success: false,
        message: "A product can have a maximum of 5 images",
      });
    }

    updateData.image = finalImages;

    /* ================= UPDATE PRODUCT ================= */

    const updatedProduct =
      await productModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedProduct) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
// ================= DELETE PRODUCT =================

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};


export {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};