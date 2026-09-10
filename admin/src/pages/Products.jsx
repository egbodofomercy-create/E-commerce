import { useEffect, useState } from "react";
import axios from "axios";

import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiPackage,
  FiChevronDown,
} from "react-icons/fi";

import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const Products = ({ currentPage }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);

  /* ================= FETCH PRODUCTS ================= */

 const fetchProducts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/product/list"
    );

      if (response.data.success) {
        setProducts(response.data.products || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage === "products") {
      const timeoutId = setTimeout(fetchProducts, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [currentPage]);

  /* ================= DELETE PRODUCT ================= */

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setDeletingProductId(id);

      const token = localStorage.getItem("adminToken");

      const response = await axios.delete(
        `http://localhost:4000/api/product/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setProducts((prev) =>
          prev.filter((product) => product._id !== id)
        );
      } else {
        alert(
          response.data.message ||
            "Failed to delete product"
        );
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while deleting the product"
      );
    } finally {
      setDeletingProductId(null);
    }
  };

  /* ================= STOCK STATUS ================= */

  const getStockStatus = (stock) => {
    const quantity = Number(stock || 0);

    if (quantity === 0) {
      return {
        label: "Out of Stock",
        className: "bg-red-50 text-red-600 border border-red-100",
      };
    }

    if (quantity <= 5) {
      return {
        label: "Low Stock",
        className: "bg-yellow-50 text-yellow-600 border border-yellow-100",
      };
    }

    return {
      label: "In Stock",
      className: "bg-green-50 text-green-600 border border-green-100",
    };
  };

  /* ================= FILTER PRODUCTS ================= */

  const filteredProducts = products.filter((product) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      !searchValue ||
      product.name?.toLowerCase().includes(searchValue) ||
      product.category?.toLowerCase().includes(searchValue) ||
      product.subCategory?.toLowerCase().includes(searchValue);

    const stockStatus = getStockStatus(product.stock);

    const matchesStatus =
      statusFilter === "All" ||
      stockStatus.label === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* ================= DATE ================= */

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  /* ================= PAGE ================= */

  return (
    <div className="space-y-7">

      {/* =====================================================
          PRODUCTS CARD
      ===================================================== */}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

        {/* ================= TOOLBAR ================= */}

        <div className="px-6 py-5 border-b border-slate-200">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            {/* LEFT */}

            <h2 className="text-lg font-semibold text-slate-900 shrink-0">
              All Products
            </h2>

            {/* RIGHT */}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

              {/* SEARCH */}

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
                <FiSearch
                  size={16}
                  className="text-slate-400 shrink-0"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products"
                  className="
                    ml-3
                    flex-1
                    min-w-0
                    bg-transparent
                    text-sm
                    text-slate-700
                    placeholder:text-slate-400
                    outline-none
                  "
                />
              </div>

              {/* STATUS FILTER */}

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="
                    appearance-none
                    w-full sm:w-40
                    h-10
                    rounded-lg
                    border border-slate-200
                    bg-white
                    pl-3 pr-9
                    text-sm
                    text-slate-600
                    outline-none
                    cursor-pointer
                    hover:border-slate-300
                    focus:border-blue-300
                    transition
                  "
                >
                  <option value="All">All Status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>

                <FiChevronDown
                  size={15}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    pointer-events-none
                  "
                />
              </div>

              {/* ADD PRODUCT */}

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="
  h-10
  inline-flex
  items-center
  justify-center
  gap-2
  px-5
  rounded-lg
  bg-blue-600
  hover:bg-blue-700
  text-white
  text-sm
  font-medium
  transition
  whitespace-nowrap
"
              >
                <FiPlus size={17} />
                Add Product
              </button>

            </div>
          </div>
        </div>

        {/* =====================================================
            TABLE
        ===================================================== */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Created At
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-sm text-slate-500">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-14 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                        <FiPackage size={21} className="text-blue-500" />
                      </div>
                      <p className="text-sm font-medium text-slate-700">
                        No products found
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {search || statusFilter !== "All"
                          ? "Try adjusting your search or filter."
                          : "Add your first product to get started."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const stock = Number(product.stock || 0);
                  const stockStatus = getStockStatus(stock);

                  return (
                    <tr
                      key={product._id}
                      className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.image?.[0] ? (
                            <img
                              src={product.image[0]}
                              alt={product.name}
                              className="w-11 h-11 rounded-lg object-cover border border-slate-200 shrink-0"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                              <FiPackage size={18} className="text-slate-400" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate max-w-[260px]">
                              {product.name}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[260px]">
                              {product.category || "Uncategorized"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-700">
                        ₦{Number(product.price || 0).toLocaleString("en-NG")}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {stock}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${stockStatus.className}`}>
                          {stockStatus.label}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {formatDate(product.createdAt)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingProductId(product._id)}
                            title="Edit product"
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition"
                          >
                            <FiEdit2 size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteProduct(product._id)}
                            disabled={deletingProductId === product._id}
                            title="Delete product"
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            {deletingProductId === product._id ? (
                              <span className="w-4 h-4 rounded-full border-2 border-slate-200 border-t-red-500 animate-spin" />
                            ) : (
                              <FiTrash2 size={16} />
                            )}
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

      </div>

      {showAddModal && (
        <AddProduct
          onClose={() => setShowAddModal(false)}
          onSaved={fetchProducts}
        />
      )}

      {editingProductId && (
        <EditProduct
          productId={editingProductId}
          onClose={() => setEditingProductId(null)}
          onSaved={fetchProducts}
        />
      )}

    </div>
  );
};

export default Products;