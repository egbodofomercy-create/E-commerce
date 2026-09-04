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

  console.log(cartItems);

  return (
    <div className="border-t pt-14">

      <div className="inline-block border-2 border-blue-400 bg-blue-200 rounded-lg px-6 py-3 mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Your Cart
        </h1>
      </div>


      {Object.keys(cartItems).map((itemId) => {
        const product = products.find((item) => item._id === itemId);

        if (!product) return null;

        return Object.keys(cartItems[itemId]).map((color) => (
          <div
            key={itemId + color}
            className="flex items-center justify-between border-b py-4"
          >

            <div className="flex items-center gap-4">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-20"
              />

              <div>
                <p className="font-medium">
                  {product.name}
                </p>

                <p>
                  {currency}
                  {product.price}
                </p>

                <p>
                  Color: {color}
                </p>
              </div>
            </div>


            <div className="flex flex-col items-end gap-2">

              <input
                className="border max-w-16 px-2 py-1"
                type="number"
                min={1}
                value={cartItems[itemId][color]}
                onChange={(e) =>
                  updateQuantity(
                    itemId,
                    color,
                    Number(e.target.value)
                  )
                }
              />


              <button
                className="text-blue-500 text-sm"
                onClick={() =>
                  updateQuantity(itemId, color, 0)
                }
              >
                Remove
              </button>

            </div>

          </div>
        ));
      })}



      <div className="flex justify-end my-20">

        <div className="w-full sm:w-[450px]">

          <CartTotal />

          <button
            onClick={() => navigate("/placeorder")}
            className="bg-blue-500 text-white px-8 py-3 mt-6 w-full"
          >
            Proceed to Checkout
          </button>

        </div>

      </div>


    </div>
  );
};

export default Cart;