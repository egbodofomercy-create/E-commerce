import React from "react";

const Orders = () => {

  const orders = [
  {
    id: 1,
    name: "Gold Bracelet",
    color: "Gold",
    quantity: 2,
    payment: "Card",
    status: "Order Placed",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Silver Necklace",
    color: "Silver",
    quantity: 1,
    payment: "Bank Transfer",
    status: "Processing",
    image: "https://via.placeholder.com/100",
  },
];



  return (
    <div className="border-t pt-16">

      <div className="text-2xl mb-8">
        <h1 className="font-semibold text-blue-500">
          My Orders
        </h1>
      </div>

      {orders.map((order) => (
  <div
    key={order.id}
    className="border rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-5"
  >

    {/* Left Side */}
    <div className="flex gap-5">

      <img
        src={order.image}
        alt={order.name}
        className="w-20 h-20 object-cover rounded"
      />

      <div>
        <h2 className="font-semibold text-lg">
          {order.name}
        </h2>

        <p className="text-gray-600">
          Color: {order.color}
        </p>

        <p className="text-gray-600">
          Quantity: {order.quantity}
        </p>

        <p className="text-gray-600">
          Payment: {order.payment}
        </p>
      </div>

    </div>

    {/* Right Side */}
    <div className="flex flex-col items-start md:items-end gap-3">

      <span className="text-green-600 font-medium">
        ● {order.status}
      </span>

      <button className="border border-blue-500 text-blue-500 px-5 py-2 rounded hover:bg-blue-500 hover:text-white transition">
        Track Order
      </button>

    </div>

  </div>
))}
    </div>
  );
};

export default Orders;