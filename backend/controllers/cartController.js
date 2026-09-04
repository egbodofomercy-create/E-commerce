import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, color } = req.body;

    const userData = await userModel.findById(userId);

    let cartData = userData.cartData;

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId][color]) {
      cartData[itemId][color] += 1;
    } else {
      cartData[itemId][color] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

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
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId, color } = req.body;

    const userData = await userModel.findById(userId);

    let cartData = userData.cartData;

    if (cartData[itemId] && cartData[itemId][color]) {
      if (cartData[itemId][color] > 1) {
        cartData[itemId][color] -= 1;
      } else {
        delete cartData[itemId][color];

        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

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

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);

    const cartData = userData.cartData;

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

export { addToCart, removeFromCart, getUserCart };
