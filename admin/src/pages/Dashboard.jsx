import { useEffect, useState } from "react";
import axios from "axios";

import {
  FiBox,
  FiShoppingBag,
  FiCreditCard,
  FiUsers,
} from "react-icons/fi";

const Dashboard = ({ setCurrentPage }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
const [totalOrders, setTotalOrders] = useState(0);
const [totalUsers, setTotalUsers] = useState(0);
const [totalRevenue, setTotalRevenue] = useState(0);
  useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const [
        productsResponse,
        ordersResponse,
        usersResponse,
      ] = await Promise.all([
        axios.get(
          "http://localhost:4000/api/product/list"
        ),

        axios.get(
          "http://localhost:4000/api/order/list"
        ),

        axios.get(
          "http://localhost:4000/api/user/count"
        ),
      ]);


      /* ================= PRODUCTS ================= */

      if (productsResponse.data.success) {
        const sortedProducts = [
          ...productsResponse.data.products,
        ].sort((a, b) => {
          return (
            new Date(b.createdAt) -
            new Date(a.createdAt)
          );
        });

        setAllProducts(sortedProducts);

        setRecentProducts(
          sortedProducts.slice(0, 5)
        );
      }


      /* ================= ORDERS ================= */

      if (ordersResponse.data.success) {
        const orders =
          ordersResponse.data.orders || [];

        setTotalOrders(orders.length);

        const revenue = orders.reduce(
          (total, order) => {
            return (
              total +
              Number(order.amount || 0)
            );
          },
          0
        );

        setTotalRevenue(revenue);
      }


      /* ================= USERS ================= */

      if (usersResponse.data.success) {
        setTotalUsers(
          usersResponse.data.count
        );
      }

    } catch (error) {
      console.log(error);

    } finally {
      setLoadingProducts(false);
    }
  };

  fetchDashboardData();
}, []);

  return (
    <div className="space-y-8">



      {/* ================= STATISTICS ================= */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
        max-w-5xl
      ">

        {/* ================= TOTAL PRODUCTS ================= */}

        <div className="
          bg-white
          border
          border-slate-200
          rounded-xl
          px-5
          py-5
        ">

          <div className="flex items-center gap-4">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-blue-50
              flex
              items-center
              justify-center
              shrink-0
            ">

              <FiBox
                size={21}
                className="text-blue-600"
                strokeWidth={1.7}
              />

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Total Products
              </p>

              <h2 className="
                text-2xl
                font-semibold
                text-blue-400
                mt-1
              ">
                {allProducts.length}
              </h2>

            </div>

          </div>

          <p className="text-xs text-slate-400 mt-4">
            All products
          </p>

        </div>


        {/* ================= TOTAL ORDERS ================= */}

        <div className="
          bg-white
          border
          border-slate-200
          rounded-xl
          px-5
          py-5
        ">

          <div className="flex items-center gap-4">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-blue-50
              flex
              items-center
              justify-center
              shrink-0
            ">

              <FiShoppingBag
                size={21}
                className="text-blue-600"
                strokeWidth={1.7}
              />

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Total Orders
              </p>

              <h2 className="
                text-2xl
                font-semibold
                text-blue-400
                mt-1
              ">
               {totalOrders}
              </h2>

            </div>

          </div>

          <p className="text-xs text-slate-400 mt-4">
            All orders
          </p>

        </div>


        {/* ================= TOTAL REVENUE ================= */}

        <div className="
          bg-white
          border
          border-slate-200
          rounded-xl
          px-5
          py-5
        ">

          <div className="flex items-center gap-4">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-blue-50
              flex
              items-center
              justify-center
              shrink-0
            ">

              <FiCreditCard
                size={21}
                className="text-blue-600"
                strokeWidth={1.7}
              />

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Total Revenue
              </p>

              <h2 className="
                text-2xl
                font-semibold
                text-blue-400
                mt-1
              ">
              ₦{totalRevenue.toLocaleString()}
              </h2>

            </div>

          </div>

          <p className="text-xs text-slate-400 mt-4">
            All time
          </p>

        </div>


        {/* ================= TOTAL USERS ================= */}

        <div className="
          bg-white
          border
          border-slate-200
          rounded-xl
          px-5
          py-5
        ">

          <div className="flex items-center gap-4">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-blue-50
              flex
              items-center
              justify-center
              shrink-0
            ">

              <FiUsers
                size={21}
                className="text-blue-600"
                strokeWidth={1.7}
              />

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Total Users
              </p>

              <h2 className="
                text-2xl
                font-semibold
                text-blue-400
                mt-1
              ">
              {totalUsers}
              </h2>

            </div>

          </div>

          <p className="text-xs text-slate-400 mt-4">
            All users
          </p>

        </div>

      </div>


      {/* ================= RECENT PRODUCTS ================= */}

      <div className="
        bg-white
        border
        border-slate-200
        rounded-xl
        overflow-hidden
      ">

        {/* Header */}

        <div className="
          flex
          items-center
          justify-between
          px-6
          py-5
          border-b
          border-slate-200
        ">

          <h2 className="
            text-xl
            font-semibold
            text-slate-900
          ">
            Recent Products
          </h2>

          <button
            type="button"
            onClick={() => setCurrentPage("products")}
            className="
              text-blue-500
              hover:text-blue-700
              text-sm
              font-medium
              transition
            "
          >
            View all products →
          </button>

        </div>


        {/* Products */}

        <div>

          {loadingProducts ? (

            <div className="
              px-6
              py-10
              text-center
              text-slate-500
            ">
              Loading recent products...
            </div>

          ) : recentProducts.length === 0 ? (

            <div className="
              px-6
              py-10
              text-center
              text-slate-500
            ">
              No products have been added yet.
            </div>

          ) : (

            recentProducts.map((product, index) => (

              <div
                key={product._id}
                className={`
                  flex
                  items-center
                  justify-between
                  px-6
                  py-4
                  ${
                    index !== recentProducts.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }
                `}
              >

                {/* Product */}

                <div className="
                  flex
                  items-center
                  gap-4
                ">

                  {product.image?.[0] ? (

                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="
                        w-12
                        h-12
                        object-cover
                        rounded-lg
                        border
                        border-slate-200
                      "
                    />

                  ) : (

                    <div className="
                      w-12
                      h-12
                      rounded-lg
                      bg-slate-100
                      flex
                      items-center
                      justify-center
                      text-xs
                      text-slate-400
                    ">
                      No image
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
                      mt-1
                    ">
                      {product.category || "Uncategorized"}
                    </p>

                  </div>

                </div>


                {/* Price */}

                <p className="
                  text-sm
                  font-medium
                  text-blue-600
                ">
                  ₦{product.price?.toLocaleString()}
                </p>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;