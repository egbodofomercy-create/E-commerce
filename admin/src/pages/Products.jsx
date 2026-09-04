
import { useEffect, useState } from "react";
import axios from "axios";

import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiPackage,
} from "react-icons/fi";

const Products = ({
  setCurrentPage,
  setSelectedProductId,
  currentPage,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://localhost:4000/api/product/list"
        );

        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (currentPage === "products") {
      fetchProducts();
    }
  }, [currentPage]);

  /* ================= DELETE PRODUCT ================= */

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      const response = await axios.delete(
        `http://localhost:4000/api/product/delete/${id}`
      );

      if (response.data.success) {
        setProducts((prevProducts) =>
          prevProducts.filter(
            (product) => product._id !== id
          )
        );
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);

      alert(
        "Something went wrong while deleting the product"
      );
    }
  };

  /* ================= STOCK STATUS ================= */

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return {
        label: "Out of Stock",
        className:
          "bg-red-50 text-red-600 border border-red-100",
      };
    }

    if (stock <= 5) {
      return {
        label: "Low Stock",
        className:
          "bg-yellow-50 text-yellow-600 border border-yellow-100",
      };
    }

    return {
      label: "In Stock",
      className:
        "bg-green-50 text-green-600 border border-green-100",
    };
  };

  /* ================= FILTER PRODUCTS ================= */

  const filteredProducts = products.filter((product) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      product.name
        ?.toLowerCase()
        .includes(searchValue) ||
      product.category
        ?.toLowerCase()
        .includes(searchValue) ||
      product.subCategory
        ?.toLowerCase()
        .includes(searchValue);

    const productStatus = getStockStatus(
      product.stock || 0
    ).label;

    const matchesStatus =
      status === "all" ||
      productStatus === status;

    return matchesSearch && matchesStatus;
  });

  /* ================= DATE ================= */

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

  /* ================= PAGE ================= */

  return (
    <div className="space-y-7">

      {/* ================= HEADER ================= */}

      <div>
        <h1 className="text-3xl font-semibold text-slate-900">
          Products
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your products catalog
        </p>
      </div>


      {/* ================= PRODUCTS BOX ================= */}

      <div className="
        bg-white
        border
        border-slate-200
        rounded-xl
        overflow-hidden
      ">
{/* ================= TOOLBAR ================= */}

<div className="px-6 py-5 border-b border-slate-200">

  <div className="flex items-center justify-between w-full">

    {/* ================= TITLE ================= */}

    <h2 className="text-lg font-semibold text-slate-900 shrink-0">
      All Products
    </h2>


    {/* ================= RIGHT SIDE ================= */}

    <div className="flex items-center gap-4">

      {/* ================= SEARCH ================= */}

      <div className="
        flex
        items-center
        w-64
        h-10
        rounded-lg
        border
        border-slate-200
        bg-slate-50
        px-3
      ">

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


      {/* ================= STATUS ================= */}

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
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

        <option value="In Stock">
          In Stock
        </option>

        <option value="Out of Stock">
          Out of Stock
        </option>

        <option value="Low Stock">
          Low Stock
        </option>

      </select>


      {/* ================= ADD PRODUCT ================= */}

      <button
        type="button"
        onClick={() => setCurrentPage("add-product")}
        className="
          h-10
          inline-flex
          items-center
          justify-center
          gap-2
          px-5
          rounded-lg
          bg-blue-500
          hover:bg-blue-600
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


        {/* ================= TABLE ================= */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-225">

            {/* ================= TABLE HEADER ================= */}

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
                  Products
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
                  Price
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
                  Stock
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
                  Created At
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
                  Actions
                </th>

              </tr>

            </thead>


            {/* ================= TABLE BODY ================= */}

            <tbody>

              {/* ================= LOADING ================= */}

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="
                      px-6
                      py-12
                      text-center
                      text-sm
                      text-slate-500
                    "
                  >
                    Loading products...
                  </td>

                </tr>

              ) : filteredProducts.length === 0 ? (

                /* ================= EMPTY ================= */

                <tr>

                  <td
                    colSpan="6"
                    className="
                      px-6
                      py-14
                      text-center
                    "
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
                        No products found
                      </p>

                      <p className="
                        text-xs
                        text-slate-400
                        mt-1
                      ">
                        Try changing your search or filter.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                /* ================= PRODUCTS ================= */

                filteredProducts.map((product) => {

                  const stock = product.stock || 0;

                  const stockStatus =
                    getStockStatus(stock);

                  return (

                    <tr
                      key={product._id}
                      className="
                        border-b
                        border-slate-100
                        last:border-b-0
                        hover:bg-slate-50/70
                        transition
                      "
                    >

                      {/* ================= PRODUCT ================= */}

                      <td className="px-6 py-4">

                        <div className="
                          flex
                          items-center
                          gap-3
                        ">

                          {product.image?.[0] ? (

                            <img
                              src={product.image[0]}
                              alt={product.name}
                              className="
                                w-11
                                h-11
                                rounded-lg
                                object-cover
                                border
                                border-slate-200
                                shrink-0
                              "
                            />

                          ) : (

                            <div className="
                              w-11
                              h-11
                              rounded-lg
                              bg-slate-100
                              flex
                              items-center
                              justify-center
                              shrink-0
                            ">

                              <FiPackage
                                size={18}
                                className="text-slate-400"
                              />

                            </div>

                          )}

                          <div>

                            <p className="
                              text-sm
                              font-medium
                              text-slate-800
                            ">
                              {product.name}
                            </p>

                            <p className="
                              text-xs
                              text-slate-400
                              mt-0.5
                            ">
                              {product.category ||
                                "Uncategorized"}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* ================= PRICE ================= */}

                      <td className="
                        px-6
                        py-4
                        text-sm
                        font-medium
                        text-slate-700
                      ">
                        ₦{product.price?.toLocaleString()}
                      </td>


                      {/* ================= STOCK ================= */}

                      <td className="
                        px-6
                        py-4
                        text-sm
                        text-slate-600
                      ">
                        {stock}
                      </td>


                      {/* ================= STATUS ================= */}

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
                            ${stockStatus.className}
                          `}
                        >
                          {stockStatus.label}
                        </span>

                      </td>


                      {/* ================= CREATED ================= */}

                      <td className="
                        px-6
                        py-4
                        text-sm
                        text-slate-500
                      ">
                        {formatDate(product.createdAt)}
                      </td>


                      {/* ================= ACTIONS ================= */}

                      <td className="px-6 py-4">

                        <div className="
                          flex
                          items-center
                          justify-end
                          gap-2
                        ">

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProductId(
                                product._id
                              );

                              setCurrentPage(
                                "edit-product"
                              );
                            }}
                            title="Edit product"
                            className="
                              w-9
                              h-9
                              rounded-lg
                              flex
                              items-center
                              justify-center
                              text-slate-400
                              hover:text-blue-500
                              hover:bg-blue-50
                              transition
                            "
                          >
                            <FiEdit2 size={16} />
                          </button>


                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              deleteProduct(
                                product._id
                              )
                            }
                            title="Delete product"
                            className="
                              w-9
                              h-9
                              rounded-lg
                              flex
                              items-center
                              justify-center
                              text-slate-400
                              hover:text-red-500
                              hover:bg-red-50
                              transition
                            "
                          >
                            <FiTrash2 size={16} />
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

      </div>

    
  );
};

export default Products;
