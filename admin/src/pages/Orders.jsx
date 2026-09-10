import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  FiSearch,
  FiPackage,
  FiEye,
} from "react-icons/fi";
import OrderDetails from "./OrderDetails";

const statusOptions = ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"];

const statusPillClass = {
  "Order Placed": "bg-blue-50 text-blue-600",
  Processing: "bg-amber-50 text-amber-600",
  Shipped: "bg-indigo-50 text-indigo-600",
  Delivered: "bg-emerald-50 text-emerald-600",
  Cancelled: "bg-red-50 text-red-600",
};

const Orders = ({ onDataChanged }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [viewingOrderId, setViewingOrderId] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  /* ================= FETCH ORDERS ================= */

  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.get(
        "http://localhost:4000/api/order/admin/list",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setOrders(response.data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(fetchOrders, 0);
    return () => clearTimeout(timeoutId);
  }, [fetchOrders]);

  /* ================= FORMAT DATE ================= */

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const customerName = (order) => {
    const a = order.address || {};
    return [a.firstName, a.lastName].filter(Boolean).join(" ") || "Customer";
  };

  /* ================= FILTER ORDERS ================= */

  const filteredOrders = orders.filter((order) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      !searchValue ||
      order._id?.toLowerCase().includes(searchValue) ||
      customerName(order).toLowerCase().includes(searchValue) ||
      order.address?.email?.toLowerCase().includes(searchValue);

    const matchesStatus = status === "all" || order.status === status;

    return matchesSearch && matchesStatus;
  });

  /* ================= UPDATE STATUS (inline dropdown) ================= */

  const updateStatus = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId);
      const token = localStorage.getItem("adminToken");

      const response = await axios.put(
        `http://localhost:4000/api/order/admin/status/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? response.data.order : o))
        );
        onDataChanged?.();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  /* ================= MAIN ================= */

  return (
    <div className="space-y-7">

      {/* =====================================================
          ORDERS CARD
      ===================================================== */}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

        {/* ================= TOOLBAR ================= */}

        <div className="px-6 py-5 border-b border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <h2 className="text-lg font-semibold text-slate-900 shrink-0">
              All Orders
            </h2>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

              <div
                className="
                  flex items-center
                  w-full sm:w-64
                  h-10
                  rounded-lg
                  border border-slate-200
                  bg-slate-50
                  px-3
                  focus-within:border-blue-300
                  focus-within:bg-white
                  transition
                "
              >
                <FiSearch size={16} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search orders"
                  className="
                    ml-3 flex-1 min-w-0 bg-transparent
                    text-sm text-slate-700 placeholder:text-slate-400 outline-none
                  "
                />
              </div>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="
                  h-10 w-full sm:w-40 rounded-lg border border-slate-200 bg-white
                  px-3 text-sm text-slate-600 outline-none cursor-pointer
                  hover:border-slate-300 focus:border-blue-300 transition
                "
              >
                <option value="all">All Status</option>
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

            </div>
          </div>
        </div>

        {/* ================= TABLE ================= */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">

            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Order</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Items</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Payment</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Date</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Action</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-sm text-slate-500">
                    Loading orders...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-14 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                        <FiPackage size={21} className="text-blue-500" />
                      </div>
                      <p className="text-sm font-medium text-slate-700">No orders found</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {search || status !== "all"
                          ? "Try changing your search or status filter."
                          : "Orders will appear here once customers place them."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    onClick={() => setViewingOrderId(order._id)}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70 transition cursor-pointer"
                  >

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        #{order._id?.slice(-6).toUpperCase()}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700">
                        {customerName(order)}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {order.address?.email || "—"}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {order.items?.length || 0}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700">
                      ₦{Number(order.amount || 0).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-normal bg-slate-50 text-slate-500 border border-slate-200">
                        {order.paymentMethod || "COD"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={order.status || "Order Placed"}
                        disabled={updatingOrderId === order._id}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className={`
                          text-xs font-medium rounded-full pl-3 pr-7 py-1
                          border-none outline-none cursor-pointer appearance-none
                          bg-[length:10px] bg-[right_8px_center] bg-no-repeat
                          disabled:opacity-50
                          ${statusPillClass[order.status] || "bg-slate-100 text-slate-600"}
                        `}
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2364748b'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E\")",
                        }}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-400">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingOrderId(order._id);
                          }}
                          title="View order"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition"
                        >
                          <FiEye size={16} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>
        </div>

      </div>

      {viewingOrderId && (
        <OrderDetails
          orderId={viewingOrderId}
          onClose={() => setViewingOrderId(null)}
          onUpdated={() => { fetchOrders(); onDataChanged?.(); }}
        />
      )}

    </div>
  );
};

export default Orders;