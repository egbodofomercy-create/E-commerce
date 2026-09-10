
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosConfig from "../api/axiosConfig";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const response = await axiosConfig.get("/api/order/list");

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        toast.error(
          response.data.message || "Could not fetch orders"
        );
      }
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        toast.error("Please login to view your orders");
        navigate("/login");
        return;
      }

      toast.error(
        error.response?.data?.message ||
          "Could not fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return (
      <div className="border-t pt-16">
        <h1 className="text-2xl font-semibold text-blue-500 mb-8">
          My Orders
        </h1>

        <div className="py-20 text-center text-gray-500">
          Loading your orders...
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      {/* Heading */}

      <div className="text-2xl mb-8">
        <h1 className="font-semibold text-blue-500">
          My Orders
        </h1>
      </div>

      {/* No Orders */}

      {orders.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-xl font-medium">
            You haven't placed any orders yet.
          </h2>

          <p className="text-gray-500 mt-2">
            Your orders will appear here after checkout.
          </p>

          <button
            onClick={() => navigate("/collection")}
            className="bg-blue-500 text-white px-8 py-3 mt-6 rounded hover:bg-blue-600 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        /* Orders */

        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-5 mb-6"
          >
            {/* Order Header */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4 mb-5">
              <div>
                <p className="text-sm text-gray-500">
                  Order ID
                </p>

                <p className="font-medium break-all">
                  {order._id}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-sm text-gray-500">
                  Order Date
                </p>

                <p className="font-medium">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Products */}

            <div className="flex flex-col gap-5">
              {order.items?.map((item, index) => (
                <div
                  key={`${order._id}-${index}`}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  {/* Product */}

                  <div className="flex gap-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded" />
                    )}

                    <div>
                      <h2 className="font-semibold text-lg">
                        {item.name}
                      </h2>

                      {item.color && (
                        <p className="text-gray-600">
                          Color: {item.color}
                        </p>
                      )}

                      <p className="text-gray-600">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-gray-600">
                        Price: ₦
                        {Number(
                          item.price
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Status */}

                  <div className="flex flex-col sm:items-end gap-3">
                    <span className="text-green-600 font-medium">
                      ● {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Footer */}

            <div className="border-t mt-5 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-gray-600">
                  Payment:{" "}
                  <span className="font-medium text-gray-800">
                    {order.paymentMethod}
                  </span>
                </p>

                <p className="text-gray-600 mt-1">
                  Payment Status:{" "}
                  <span
                    className={
                      order.payment
                        ? "text-green-600 font-medium"
                        : "text-orange-500 font-medium"
                    }
                  >
                    {order.payment
                      ? "Paid"
                      : "Pending"}
                  </span>
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-sm text-gray-500">
                  Total
                </p>

                <p className="text-xl font-semibold">
                  ₦
                  {Number(
                    order.amount
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Track Order */}

            <button
              onClick={() =>
                toast(
                  `Current status: ${order.status}`
                )
              }
              className="w-full sm:w-auto border border-blue-500 text-blue-500 px-5 py-2 rounded hover:bg-blue-500 hover:text-white transition mt-5"
            >
              Track Order
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
