import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") || ""
  );

  const [currentPage, setCurrentPage] = useState("dashboard");
  const [counts, setCounts] = useState({ products: null, orders: null, customers: null });

  const pageTitles = {
    dashboard: ["Dashboard", "Welcome back, Admin 👋"],
    products: ["Products", "Manage your product catalog"],
    orders: ["Orders", "Track and manage customer orders"],
    customers: ["Customers", "View and manage your customers"],
  };

  const refreshCounts = useCallback(async () => {
    if (!token) return;
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        axios.get("http://localhost:4000/api/product/list"),
        axios.get("http://localhost:4000/api/order/admin/list", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:4000/api/user/count", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setCounts({
        products: productsRes.data.success ? productsRes.data.products.length : null,
        orders: ordersRes.data.success ? ordersRes.data.orders.length : null,
        customers: usersRes.data.success ? usersRes.data.count : null,
      });
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    const timeoutId = setTimeout(refreshCounts, 0);
    return () => clearTimeout(timeoutId);
  }, [refreshCounts]);

  return (
    <>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <div className="min-h-screen bg-slate-50 flex">

          <Sidebar
            setToken={setToken}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            counts={counts}
          />

          <div className="flex-1 min-w-0">

            <Navbar
              setToken={setToken}
              title={pageTitles[currentPage]?.[0] || ""}
              subtitle={pageTitles[currentPage]?.[1] || ""}
            />

            <main className="p-6 sm:p-8 lg:p-10">
              {currentPage === "dashboard" && (
                <Dashboard setCurrentPage={setCurrentPage} />
              )}

              {currentPage === "products" && (
                <Products currentPage={currentPage} onDataChanged={refreshCounts} />
              )}

              {currentPage === "orders" && (
                <Orders onDataChanged={refreshCounts} />
              )}

              {currentPage === "customers" && (
                <Customers currentPage={currentPage} />
              )}
            </main>

          </div>
        </div>
      )}
    </>
  );
};

export default App;