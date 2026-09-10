import { useEffect, useState } from "react";
import axios from "axios";
import { FiX, FiPackage, FiCheck } from "react-icons/fi";

const statusOptions = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const statusPillClass = {
  "Order Placed": "bg-blue-50 text-blue-600",
  Processing: "bg-amber-50 text-amber-600",
  Shipped: "bg-indigo-50 text-indigo-600",
  Delivered: "bg-emerald-50 text-emerald-600",
  Cancelled: "bg-red-50 text-red-600",
};

const paymentMethodLabel = (method) => {
  if (!method) return "—";

  const normalized = method.toLowerCase().trim();

  if (
    normalized === "card" ||
    normalized === "pay with card" ||
    normalized === "credit card" ||
    normalized === "debit card"
  ) {
    return "Pay with Card";
  }

  if (
    normalized === "bank transfer" ||
    normalized === "bank"
  ) {
    return "Bank Transfer";
  }

  if (normalized === "ussd") {
    return "USSD";
  }

  return method;
};

const OrderDetails = ({ orderId, onClose, onUpdated }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  /* ================= FETCH ORDER ================= */

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("adminToken");

        const response = await axios.get(
          `http://localhost:4000/api/order/admin/single/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setOrder(response.data.order);
        } else {
          alert(response.data.message);
          onClose();
        }
      } catch (error) {
        console.log(error);
        onClose();
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  /* ================= FORMAT DATE ================= */

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (newStatus) => {
    if (!order) return;

    try {
      setUpdating(true);

      const token = localStorage.getItem("adminToken");

      const response = await axios.put(
        `http://localhost:4000/api/order/admin/status/${order._id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrder(response.data.order);
        onUpdated?.();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  /* ================= TOTALS ================= */

  const subtotal =
    order?.items?.reduce(
      (sum, item) =>
        sum + (item.price || 0) * (item.quantity || 1),
      0
    ) || 0;

  const delivery = order
    ? Math.max(Number(order.amount || 0) - subtotal, 0)
    : 0;

  const isPaid = Boolean(order?.payment);

  /* ================= MAIN ================= */

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-slate-900/40
        p-6
      "
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-[900px]
          h-[95vh]
          max-h-[950px]
          flex
          flex-col
          bg-white
          rounded-2xl
          overflow-hidden
          shadow-2xl
        "
      >
        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-slate-500">
              Loading order...
            </p>
          </div>
        ) : order ? (
          <>
            {/* =================================================
                HEADER
            ================================================= */}

            <div
              className="
                flex
                items-start
                justify-between
                px-10
                py-8
                border-b
                border-slate-200
                shrink-0
              "
            >
              <div>
                <h2 className="text-2xl font-bold text-[#454EFD]">
                  #{order._id.slice(-6).toUpperCase()}
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="
                  w-10
                  h-10
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-slate-400
                  hover:bg-slate-100
                  hover:text-slate-700
                  transition
                "
              >
                <FiX size={19} />
              </button>
            </div>

            {/* =================================================
                BODY
            ================================================= */}

            <div
              className="
                flex-1
                overflow-y-auto
                px-10
              "
            >
              <div className="min-h-full flex flex-col">

                {/* =================================================
                    CUSTOMER + SHIPPING
                ================================================= */}

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-16
                    py-10
                    min-h-[190px]
                    border-b
                    border-slate-200
                  "
                >
                  {/* CUSTOMER */}

                  <div className="flex flex-col justify-center">

                    <p
                      className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-400
                        mb-5
                      "
                    >
                      Customer
                    </p>

                    <p className="text-base font-semibold text-slate-900">
                      {[
                        order.address?.firstName,
                        order.address?.lastName,
                      ]
                        .filter(Boolean)
                        .join(" ") || "—"}
                    </p>

                    <p className="text-sm text-slate-500 mt-3">
                      {order.address?.email || "—"}
                    </p>

                    <p className="text-sm text-slate-500 mt-2">
                      {order.address?.phone || "—"}
                    </p>

                  </div>

                  {/* SHIPPING */}

                  <div className="flex flex-col justify-center">

                    <p
                      className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-400
                        mb-5
                      "
                    >
                      Shipping Address
                    </p>

                    <p
                      className="
                        text-sm
                        leading-7
                        text-slate-600
                        max-w-[340px]
                      "
                    >
                      {[
                        order.address?.street,
                        order.address?.city,
                        order.address?.state,
                      ]
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </p>

                  </div>
                </div>

                {/* =================================================
                    ITEMS
                ================================================= */}

                <div
                  className="
                    py-10
                    border-b
                    border-slate-200
                  "
                >
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-400
                      mb-5
                    "
                  >
                    Items
                  </p>

                  {/* ITEM LIST */}

                  <div>
                    {order.items?.map((item, index) => (
                      <div
                        key={index}
                        className={`
                          flex
                          items-center
                          gap-6
                          py-6
                          ${
                            index !== order.items.length - 1
                              ? "border-b border-slate-100"
                              : ""
                          }
                        `}
                      >
                        {/* IMAGE */}

                        <div
                          className="
                            w-20
                            h-20
                            rounded-xl
                            bg-slate-50
                            border
                            border-slate-100
                            flex
                            items-center
                            justify-center
                            overflow-hidden
                            shrink-0
                          "
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FiPackage
                              size={23}
                              className="text-slate-300"
                            />
                          )}
                        </div>

                        {/* PRODUCT */}

                        <div className="flex-1 min-w-0">

                          <p className="text-base font-semibold text-slate-900">
                            {item.name}

                            {item.color
                              ? ` · ${item.color}`
                              : ""}
                          </p>

                          <p className="text-sm text-slate-400 mt-2">
                            Qty {item.quantity || 1} × ₦
                            {Number(
                              item.price || 0
                            ).toLocaleString()}
                          </p>

                        </div>

                        {/* TOTAL */}

                        <p
                          className="
                            text-base
                            font-semibold
                            text-slate-900
                            shrink-0
                          "
                        >
                          ₦
                          {(
                            (item.price || 0) *
                            (item.quantity || 1)
                          ).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* =================================================
                      FINANCIAL BREAKDOWN
                  ================================================= */}

                  <div className="pt-7 mt-4">

                    <div className="space-y-4">

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          text-sm
                        "
                      >
                        <span className="text-slate-500">
                          Subtotal
                        </span>

                        <span className="font-medium text-slate-700">
                          ₦{subtotal.toLocaleString()}
                        </span>
                      </div>

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          text-sm
                        "
                      >
                        <span className="text-slate-500">
                          Delivery
                        </span>

                        <span className="font-medium text-slate-700">
                          {delivery > 0
                            ? `₦${delivery.toLocaleString()}`
                            : "Free"}
                        </span>
                      </div>

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          pt-5
                          mt-2
                          border-t
                          border-slate-200
                        "
                      >
                        <span className="text-base font-bold text-slate-900">
                          Total
                        </span>

                        <span className="text-lg font-bold text-slate-900">
                          ₦
                          {Number(
                            order.amount || 0
                          ).toLocaleString()}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>

                {/* =================================================
                    PAYMENT + STATUS
                ================================================= */}

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-16
                    py-10
                    min-h-[190px]
                  "
                >
                  {/* PAYMENT */}

                  <div className="flex flex-col justify-center">

                    <p
                      className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-400
                        mb-5
                      "
                    >
                      Payment
                    </p>

                    <div className="flex items-center gap-4">

                      <div
                        className={`
                          w-11
                          h-11
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          ${
                            isPaid
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600"
                          }
                        `}
                      >
                        <FiCheck size={19} />
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-slate-900">
                          {paymentMethodLabel(
                            order.paymentMethod
                          )}
                        </p>

                        <p
                          className={`
                            text-xs
                            mt-1
                            font-medium
                            ${
                              isPaid
                                ? "text-emerald-600"
                                : "text-amber-600"
                            }
                          `}
                        >
                          {isPaid ? "Paid" : "Unpaid"}
                        </p>

                      </div>

                    </div>
                  </div>

                  {/* STATUS */}

                  <div className="flex flex-col justify-center">

                    <p
                      className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-400
                        mb-5
                      "
                    >
                      Order Status
                    </p>

                    <span
                      className={`
                        w-fit
                        inline-flex
                        items-center
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold
                        ${
                          statusPillClass[order.status] ||
                          "bg-slate-100 text-slate-600"
                        }
                      `}
                    >
                      {order.status}
                    </span>

                  </div>
                </div>

              </div>
            </div>

            {/* =================================================
                FOOTER
            ================================================= */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-6
                px-10
                py-7
                border-t
                border-slate-200
                bg-slate-50
                shrink-0
              "
            >
              <p className="text-sm font-semibold text-slate-700">
                Update status
              </p>

              <select
                value={order.status}
                disabled={updating}
                onChange={(e) =>
                  updateStatus(e.target.value)
                }
                className="
                  h-12
                  min-w-[210px]
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-sm
                  font-medium
                  text-slate-700
                  outline-none
                  cursor-pointer
                  focus:border-blue-400
                  disabled:opacity-50
                  transition
                "
              >
                {statusOptions.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default OrderDetails;