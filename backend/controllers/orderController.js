import orderModel from "../models/orderModel.js";

/* ================= CREATE ORDER ================= */

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment,
    } = req.body;

    if (!userId || !items || !amount || !address) {
      return res.json({
        success: false,
        message: "Missing order information",
      });
    }

    const order = new orderModel({
      userId,
      items,
      amount: Number(amount),
      address,
      paymentMethod: paymentMethod || "COD",
      payment: payment || false,
      status: "Order Placed",
    });

    await order.save();

    res.json({
      success: true,
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= GET ALL ORDERS ================= */

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= GET SINGLE ORDER ================= */

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderModel.findById(id);

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= UPDATE ORDER STATUS ================= */

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      }
    );

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order status updated successfully",
      order,
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
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};
