import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  ShoppingBag,
  DollarSign,
  Users,
  Plus,
  Pencil,
  Trash2,
  Package,
} from "lucide-react";

const Dashboard = ({ setCurrentPage }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(true);

  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [deletingProduct, setDeletingProduct] = useState(null);

  /* =========================================================
     FETCH DASHBOARD DATA
  ========================================================= */

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const [
          productsResponse,
          ordersResponse,
          usersResponse,
        ] = await Promise.all([
          axios.get("http://localhost:4000/api/product/list"),

          axios.get("http://localhost:4000/api/order/admin/list", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          axios.get("http://localhost:4000/api/user/count", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        /* ================= PRODUCTS ================= */

        if (productsResponse.data.success) {
          const products = productsResponse.data.products || [];

          const sortedProducts = [...products].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setAllProducts(sortedProducts);
          setRecentProducts(sortedProducts.slice(0, 5));
        }

        /* ================= ORDERS ================= */

        if (ordersResponse.data.success) {
          const orders = ordersResponse.data.orders || [];

          setTotalOrders(orders.length);

          const revenue = orders.reduce(
            (total, order) => total + Number(order.amount || 0),
            0
          );

          setTotalRevenue(revenue);
        }

        /* ================= USERS ================= */

        if (usersResponse.data.success) {
          setTotalUsers(usersResponse.data.count || 0);
        }
      } catch (error) {
        console.log("Dashboard error:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchDashboardData();
  }, []);

  /* =========================================================
     FORMAT PRICE
  ========================================================= */

  const formatPrice = (price) => {
    return `₦${Number(price || 0).toLocaleString("en-NG")}`;
  };

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  /* =========================================================
     STOCK STATUS
  ========================================================= */

  const getStockStatus = (stock) => {
    const quantity = Number(stock || 0);

    if (quantity === 0) {
      return {
        label: "Out of Stock",
        className: "bg-rose-50 text-rose-600",
      };
    }

    if (quantity <= 5) {
      return {
        label: "Low Stock",
        className: "bg-amber-50 text-amber-600",
      };
    }

    return {
      label: "In Stock",
      className: "bg-emerald-50 text-emerald-600",
    };
  };

  /* =========================================================
     DELETE PRODUCT
  ========================================================= */

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setDeletingProduct(productId);

      const token = localStorage.getItem("adminToken");

      const response = await axios.delete(
        `http://localhost:4000/api/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const updatedProducts = allProducts.filter(
          (product) => product._id !== productId
        );

        setAllProducts(updatedProducts);
        setRecentProducts(updatedProducts.slice(0, 5));
      } else {
        alert(response.data.message || "Failed to delete product");
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while deleting the product"
      );
    } finally {
      setDeletingProduct(null);
    }
  };

  /* =========================================================
     STATISTICS
  ========================================================= */

  const stats = [
    {
      title: "Total Products",
      value: allProducts.length,
      subtitle: "All products",
      icon: Box,
    },
    {
      title: "Total Orders",
      value: totalOrders,
      subtitle: "All orders",
      icon: ShoppingBag,
    },
    {
      title: "Total Revenue",
      value: formatPrice(totalRevenue),
      subtitle: "All time",
      icon: DollarSign,
    },
    {
      title: "Total Users",
      value: totalUsers,
      subtitle: "All users",
      icon: Users,
    },
  ];

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="w-full">
      {/* =====================================================
          KPI CARDS
      ===================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map(({ title, value, subtitle, icon: Icon }) => (
          <div
            key={title}
            className="
              bg-white
              rounded-2xl
              border border-gray-100
              shadow-sm
              p-6
              flex
              items-start
              gap-5
            "
          >
            {/* ICON BADGE */}
            <div
              className="
                w-12
                h-12
                rounded-xl
                bg-blue-50
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <Icon size={22} className="text-blue-600" />
            </div>

            {/* TEXT INFO */}
            <div>
              <p className="text-sm font-semibold text-gray-500">{title}</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">
                {value}
              </h3>
              <p className="text-xs text-gray-400 mt-1 font-medium">{subtitle}</p>
            </div>
          </div>
        ))}
      </section>

      {/* =====================================================
          RECENT PRODUCTS TABLE CARD
      ===================================================== */}
      <section className="w-full">
        <div
          className="
            bg-white
            rounded-2xl
            border border-gray-100
            p-8
            shadow-sm
          "
        >
          {/* ================= HEADER BAR ================= */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">
              Recent Products
            </h2>

            <button
              type="button"
              onClick={() => setCurrentPage("products")}
              className="
                flex
                items-center
                gap-2
                px-5
                py-2.5
                bg-blue-600
                hover:bg-blue-700
                text-white
                rounded-xl
                text-sm
                font-bold
                transition-all
                shadow-sm
              "
            >
              <Plus size={18} strokeWidth={2.5} />
              <span>Add Product</span>
            </button>
          </div>

          {/* ================= TABLE ================= */}
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[750px] text-left border-collapse">
              {/* ================= COLUMN HEADERS ================= */}
              <thead>
                <tr className="border-b border-gray-100 text-sm font-bold text-gray-400">
                  <th className="pb-4 font-bold tracking-wide">Product</th>
                  <th className="pb-4 font-bold tracking-wide">Price</th>
                  <th className="pb-4 font-bold tracking-wide">Stock</th>
                  <th className="pb-4 font-bold tracking-wide">Status</th>
                  <th className="pb-4 font-bold tracking-wide">Created At</th>
                  <th className="pb-4 font-bold tracking-wide text-right">Actions</th>
                </tr>
              </thead>

              {/* ================= BODY ================= */}
              <tbody className="divide-y divide-gray-100">
                {loadingProducts ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-12 text-center text-sm font-medium text-gray-400"
                    >
                      Loading products...
                    </td>
                  </tr>
                ) : recentProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Package size={28} className="text-gray-300 mb-2" />
                        <p className="text-sm font-bold text-gray-600">
                          No products available
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  recentProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock);
                    const productImage = Array.isArray(product.image)
                      ? product.image[0]
                      : product.image;

                    return (
                      <tr
                        key={product._id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        {/* PRODUCT DETAILS */}
                        <td className="py-5 pr-6">
                          <div className="flex items-center gap-4">
                            <div
                              className="
                                w-11
                                h-11
                                rounded-xl
                                bg-gray-50
                                border border-gray-100
                                overflow-hidden
                                flex
                                items-center
                                justify-center
                                shrink-0
                              "
                            >
                              {productImage ? (
                                <img
                                  src={productImage}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Package size={18} className="text-gray-300" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm font-bold text-gray-900 truncate">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-400 font-medium truncate mt-0.5">
                                {product.category || "General"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* PRICE */}
                        <td className="py-5 text-sm font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </td>

                        {/* STOCK */}
                        <td className="py-5 text-sm font-semibold text-gray-700">
                          {product.stock ?? 0}
                        </td>

                        {/* STATUS */}
                        <td className="py-5">
                          <span
                            className={`
                              inline-flex
                              items-center
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-bold
                              ${stockStatus.className}
                            `}
                          >
                            {stockStatus.label}
                          </span>
                        </td>

                        {/* CREATED AT */}
                        <td className="py-5 text-sm font-medium text-gray-400">
                          {formatDate(product.createdAt)}
                        </td>

                        {/* ACTIONS */}
                        <td className="py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* EDIT BUTTON */}
                            <button
                              type="button"
                              onClick={() => setCurrentPage("products")}
                              className="
                                p-2
                                rounded-lg
                                text-gray-400
                                hover:text-blue-600
                                hover:bg-blue-50
                                transition-colors
                              "
                              title="Edit product"
                            >
                              <Pencil size={16} />
                            </button>

                            {/* DELETE BUTTON */}
                            <button
                              type="button"
                              disabled={deletingProduct === product._id}
                              onClick={() => handleDeleteProduct(product._id)}
                              className="
                                p-2
                                rounded-lg
                                text-gray-400
                                hover:text-rose-600
                                hover:bg-rose-50
                                transition-colors
                                disabled:opacity-50
                              "
                              title="Delete product"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* =================================================
              VIEW ALL PRODUCTS LINK
          ================================================= */}
          {!loadingProducts && recentProducts.length > 0 && (
            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <button
                type="button"
                onClick={() => setCurrentPage("products")}
                className="
                  text-sm
                  font-bold
                  text-blue-600
                  hover:text-blue-700
                  transition-colors
                "
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;