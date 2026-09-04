import { useEffect, useState } from "react";
import axios from "axios";

import {
  FiSearch,
  FiPackage,
  FiEye,
} from "react-icons/fi";

const Orders = ({
  setCurrentPage,
  setSelectedOrderId,
}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  /* ================= FETCH ORDERS ================= */

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/order/list"
        );

        if (response.data.success) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ================= FORMAT DATE ================= */

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  /* ================= STATUS STYLE ================= */

  const getStatusStyle = (orderStatus) => {
    switch (orderStatus) {
      case "Order Placed":
        return "bg-blue-50 text-blue-600 border border-blue-100";

      case "Processing":
        return "bg-yellow-50 text-yellow-600 border border-yellow-100";

      case "Shipped":
        return "bg-purple-50 text-purple-600 border border-purple-100";

      case "Delivered":
        return "bg-green-50 text-green-600 border border-green-100";

      case "Cancelled":
        return "bg-red-50 text-red-600 border border-red-100";

      default:
        return "bg-slate-50 text-slate-600 border border-slate-200";
    }
  };

  /* ================= FILTER ORDERS ================= */

  const filteredOrders = orders.filter((order) => {
    const searchValue = search.toLowerCase();

    const orderId = order._id?.toLowerCase() || "";

    const customerName =
      order.address?.firstName?.toLowerCase() ||
      "";

    const customerEmail =
      order.address?.email?.toLowerCase() ||
      "";

    const matchesSearch =
      orderId.includes(searchValue) ||
      customerName.includes(searchValue) ||
      customerEmail.includes(searchValue);

    const matchesStatus =
      status === "all" ||
      order.status === status;

    return matchesSearch && matchesStatus;
  });

  /* ================= VIEW ORDER ================= */

  const viewOrder = (id) => {
    setSelectedOrderId(id);
    setCurrentPage("order-details");
  };

  return (
    <div className="space-y-7">

      {/* ================= HEADER ================= */}

      <div>

        <h1 className="text-3xl font-semibold text-slate-900">
          Orders
        </h1>

        <p className="mt-2 text-slate-500">
          Manage customer orders
        </p>

      </div>


      {/* ================= ORDERS BOX ================= */}

      <div className="
        bg-white
        border
        border-slate-200
        rounded-xl
        overflow-hidden
      ">

      {/* ================= TOOLBAR ================= */}

<div className="
  px-7
  py-6
  border-b
  border-slate-200
">

  <div className="
    flex
    items-center
    justify-between
    w-full
  ">

    {/* LEFT — TITLE */}

    <h2 className="
      text-lg
      font-semibold
      text-slate-900
      shrink-0
    ">
      All Orders
    </h2>


    {/* RIGHT — SEARCH + STATUS */}

    <div className="
      flex
      items-center
      gap-4
      ml-auto
    ">

      {/* SEARCH */}

<div className="relative w-60">

  <FiSearch
    size={16}
    className="
      absolute
      left-4
      top-1/2
      -translate-y-1/2
      text-slate-400
      pointer-events-none
    "
  />

  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search orders"
    className="
      w-full
      h-10
      pl-11
      pr-4
      rounded-lg
      border
      border-slate-200
      bg-slate-50
      text-sm
      text-slate-700
      placeholder:text-slate-400
      outline-none
      focus:bg-white
      focus:border-blue-400
      transition
    "
  />

</div>

      {/* STATUS */}

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="
          h-10
          w-36
          px-3
          rounded-lg
          border
          border-slate-200
          bg-slate-50
          text-sm
          text-slate-600
          outline-none
          focus:bg-white
          focus:border-blue-400
          cursor-pointer
        "
      >

        <option value="all">
          All Status
        </option>

        <option value="Order Placed">
          Order Placed
        </option>

        <option value="Processing">
          Processing
        </option>

        <option value="Shipped">
          Shipped
        </option>

        <option value="Delivered">
          Delivered
        </option>

        <option value="Cancelled">
          Cancelled
        </option>

      </select>

    </div>

  </div>

</div>

        {/* ================= TABLE ================= */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-250">

            {/* HEADER */}

            <thead className="
              bg-slate-50
              border-b
              border-slate-200
            ">

              <tr>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                ">
                  Order
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                ">
                  Customer
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                ">
                  Items
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                ">
                  Amount
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                ">
                  Payment
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                ">
                  Status
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                ">
                  Date
                </th>

                <th className="
                  px-6
                  py-4
                  text-right
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                ">
                  Action
                </th>

              </tr>

            </thead>


            {/* BODY */}

            <tbody>

              {/* LOADING */}

              {loading ? (

                <tr>

                  <td
                    colSpan="8"
                    className="
                      px-6
                      py-12
                      text-center
                      text-sm
                      text-slate-500
                    "
                  >
                    Loading orders...
                  </td>

                </tr>

              ) : filteredOrders.length === 0 ? (

                /* EMPTY */

                <tr>

                  <td
                    colSpan="8"
                    className="px-6 py-14 text-center"
                  >

                    <div className="
                      flex
                      flex-col
                      items-center
                    ">

                      <div className="
                        w-12
                        h-12
                        rounded-xl
                        bg-blue-50
                        flex
                        items-center
                        justify-center
                        mb-3
                      ">

                        <FiPackage
                          size={21}
                          className="text-blue-500"
                        />

                      </div>

                      <p className="
                        text-sm
                        font-medium
                        text-slate-700
                      ">
                        No orders found
                      </p>

                      <p className="
                        text-xs
                        text-slate-400
                        mt-1
                      ">
                        Orders will appear here when customers place them.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                /* ORDERS */

                filteredOrders.map((order) => (

                  <tr
                    key={order._id}
                    className="
                      border-b
                      border-slate-100
                      last:border-b-0
                      hover:bg-slate-50/70
                      transition
                    "
                  >

                    {/* ORDER */}

                    <td className="px-6 py-4">

                      <p className="
                        text-sm
                        font-medium
                        text-slate-800
                      ">
                        #{order._id.slice(-6).toUpperCase()}
                      </p>

                    </td>


                    {/* CUSTOMER */}

                    <td className="px-6 py-4">

                      <div>

                        <p className="
                          text-sm
                          font-medium
                          text-slate-700
                        ">
                          {order.address?.firstName || "Customer"}
                        </p>

                        <p className="
                          text-xs
                          text-slate-400
                          mt-0.5
                        ">
                          {order.address?.email || "—"}
                        </p>

                      </div>

                    </td>


                    {/* ITEMS */}

                    <td className="
                      px-6
                      py-4
                      text-sm
                      text-slate-600
                    ">
                      {order.items?.length || 0}
                    </td>


                    {/* AMOUNT */}

                    <td className="
                      px-6
                      py-4
                      text-sm
                      font-medium
                      text-slate-700
                    ">
                      ₦{order.amount?.toLocaleString()}
                    </td>


                    {/* PAYMENT */}

                    <td className="px-6 py-4">

                      <span className="
                        inline-flex
                        items-center
                        px-2.5
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        bg-slate-50
                        text-slate-600
                        border
                        border-slate-200
                      ">
                        {order.paymentMethod || "COD"}
                      </span>

                    </td>


                    {/* STATUS */}

                    <td className="px-6 py-4">

                      <span
                        className={`
                          inline-flex
                          items-center
                          px-2.5
                          py-1
                          rounded-full
                          text-xs
                          font-medium
                          ${getStatusStyle(order.status)}
                        `}
                      >
                        {order.status || "Order Placed"}
                      </span>

                    </td>


                    {/* DATE */}

                    <td className="
                      px-6
                      py-4
                      text-sm
                      text-slate-500
                    ">
                      {formatDate(order.createdAt)}
                    </td>


                    {/* ACTION */}

                    <td className="
                      px-6
                      py-4
                      text-right
                    ">

                      <button
                        type="button"
                        onClick={() =>
                          viewOrder(order._id)
                        }
                        title="View order"
                        className="
                          w-9
                          h-9
                          rounded-lg
                          inline-flex
                          items-center
                          justify-center
                          text-slate-400
                          hover:text-blue-500
                          hover:bg-blue-50
                          transition
                        "
                      >

                        <FiEye size={16} />

                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Orders;