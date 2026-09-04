import { useState } from "react";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Orders from "./pages/Orders";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") || ""
  );

  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedProductId, setSelectedProductId] = useState("");
const [selectedOrderId, setSelectedOrderId] = useState("");
  return (
    <>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <div className="min-h-screen bg-slate-50 flex">

          {/* Sidebar */}
          <Sidebar
            setToken={setToken}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />

          {/* Main Area */}
          <div className="flex-1 min-w-0">

       {/* Navbar - Dashboard only */}
{currentPage === "dashboard" && (
  <Navbar setToken={setToken} />
)}
            {/* Page Content */}
            <main className="p-6 sm:p-8 lg:p-10">
              {currentPage === "dashboard" && (
                <Dashboard setCurrentPage={setCurrentPage} />
              )}

              {currentPage === "products" && (
                <Products
  setCurrentPage={setCurrentPage}
  setSelectedProductId={setSelectedProductId}
  currentPage={currentPage}
/>
              )}

              {currentPage === "add-product" && (
                <AddProduct setCurrentPage={setCurrentPage} />
              )}

              {currentPage === "edit-product" && (
  <EditProduct
    setCurrentPage={setCurrentPage}
    selectedProductId={selectedProductId}
  />
)}

{currentPage === "orders" && (
  <Orders
    setCurrentPage={setCurrentPage}
    selectedOrderId={selectedOrderId}
    setSelectedOrderId={setSelectedOrderId}
  />
)}
            </main>

          </div>
        </div>
      )}
    </>
  );
};

export default App;