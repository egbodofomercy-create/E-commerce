
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const navigate = useNavigate();

  const {
    products,
    currency,
    cartItems,
    updateQuantity,
  } = useContext(ShopContext);

  const cartProductIds = Object.keys(cartItems);

  return (
    <div className="border-t pt-14">

      {/* ================= TITLE ================= */}

      <div className="inline-block border-2 border-blue-400 bg-blue-200 rounded-lg px-6 py-3 mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Your Cart
        </h1>
      </div>

      {/* ================= EMPTY CART ================= */}

      {cartProductIds.length === 0 ? (
        <div className="py-20 text-center">

          <h2 className="text-xl font-medium">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-2">
            Add some products to your cart to see them here.
          </p>

          <button
            onClick={() => navigate("/collection")}
            className="bg-blue-500 text-white px-8 py-3 mt-6"
          >
            Continue Shopping
          </button>

        </div>
      ) : (

        <>
          {/* ================= CART ITEMS ================= */}

          <div>

            {cartProductIds.map((itemId) => {
              const product = products.find(
                (item) => item._id === itemId
              );

              if (!product) return null;

              return Object.keys(cartItems[itemId]).map(
                (color) => {

                  const quantity =
                    cartItems[itemId][color];

                  return (
                    <div
                      key={itemId + color}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b py-5"
                    >

                      {/* Product */}

                      <div className="flex items-center gap-4">

                        <img
                          src={product.image?.[0]}
                          alt={product.name}
                          className="w-20 h-20 object-cover"
                        />

                        <div>

                          <p className="font-medium">
                            {product.name}
                          </p>

                          <p className="mt-1">
                            {currency}
                            {Number(
                              product.price
                            ).toLocaleString()}
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            Color: {color}
                          </p>

                        </div>

                      </div>

                      {/* Quantity */}

                      <div className="flex items-center gap-4">

                        <div className="flex items-center border border-gray-300">

                          <button
                            onClick={() =>
                              updateQuantity(
                                itemId,
                                color,
                                quantity - 1
                              )
                            }
                            className="px-3 py-2 hover:bg-gray-100"
                          >
                            −
                          </button>

                          <span className="px-4 py-2 min-w-[45px] text-center">
                            {quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                itemId,
                                color,
                                quantity + 1
                              )
                            }
                            disabled={
                              quantity >= product.stock
                            }
                            className={`px-3 py-2 ${
                              quantity >= product.stock
                                ? "text-gray-300 cursor-not-allowed"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            +
                          </button>

                        </div>

                        <button
                          onClick={() =>
                            updateQuantity(
                              itemId,
                              color,
                              0
                            )
                          }
                          className="text-red-500 text-sm hover:underline"
                        >
                          Remove
                        </button>

                      </div>

                    </div>
                  );
                }
              );
            })}

          </div>

          {/* ================= CART TOTAL ================= */}

          <div className="flex justify-end my-20">

            <div className="w-full sm:w-[450px]">

              <CartTotal />

              <button
                onClick={() =>
                  navigate("/placeorder")
                }
                className="bg-blue-500 text-white px-8 py-3 mt-6 w-full hover:bg-blue-600 transition"
              >
                Proceed to Checkout
              </button>

            </div>

          </div>

        </>
      )}

    </div>
  );
};

export default Cart;
