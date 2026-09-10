import userModel from "../models/userModel.js";

/* ================= ADD TO CART ================= */

const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, color } = req.body;

    if (!userId || !itemId || !color) {
      return res.status(400).json({
        success: false,
        message: "Missing cart information",
      });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId][color]) {
      cartData[itemId][color] += 1;
    } else {
      cartData[itemId][color] = 1;
    }

    await userModel.findByIdAndUpdate(userId, {
      cartData,
    });

    res.json({
      success: true,
      message: "Added to Cart",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= REMOVE FROM CART ================= */

const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, color } = req.body;

    if (!userId || !itemId || !color) {
      return res.status(400).json({
        success: false,
        message: "Missing cart information",
      });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = userData.cartData || {};

    if (cartData[itemId]?.[color]) {
      if (cartData[itemId][color] > 1) {
        cartData[itemId][color] -= 1;
      } else {
        delete cartData[itemId][color];

        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    }

    await userModel.findByIdAndUpdate(userId, {
      cartData,
    });

    res.json({
      success: true,
      message: "Removed from Cart",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET USER CART ================= */

const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = userData.cartData || {};

    res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= CLEAR CART ================= */

const clearCart = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });

    res.json({
      success: true,
      message: "Cart cleared successfully",
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
  addToCart,
  removeFromCart,
  getUserCart,
  clearCart,
};