import {
  FiHome,
  FiBox,
  FiPlusSquare,
  FiShoppingBag,
  FiLogOut,
} from "react-icons/fi";

import logo from "../assets/logo.png";

const Sidebar = ({
  setToken,
  setCurrentPage,
  currentPage,
}) => {
  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col">

      {/* Logo */}
      <div className="h-28 px-8 flex items-center">
        <img
          src={logo}
          alt="Bluvory"
          className="w-24 h-auto object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="px-6 pt-10">

        {/* Dashboard */}
        <button
          type="button"
          onClick={() => setCurrentPage("dashboard")}
          className={`
            w-full
            flex
            items-center
            gap-5
            px-5
            py-4
            rounded-xl
            text-left
            transition-all
            duration-200
            ${
              currentPage === "dashboard"
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-blue-500"
            }
          `}
        >
          <FiHome
            size={21}
            strokeWidth={
              currentPage === "dashboard" ? 2.2 : 1.6
            }
            className="shrink-0"
          />

          <span className="text-[15px]">
            Dashboard
          </span>
        </button>

        {/* 16px spacing */}
        <div className="h-4" />

        {/* Products */}
        <button
          type="button"
          onClick={() => setCurrentPage("products")}
          className={`
            w-full
            flex
            items-center
            gap-5
            px-5
            py-4
            rounded-xl
            text-left
            transition-all
            duration-200
            ${
              currentPage === "products"
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-blue-500"
            }
          `}
        >
          <FiBox
            size={21}
            strokeWidth={
              currentPage === "products" ? 2.2 : 1.6
            }
            className="shrink-0"
          />

          <span className="text-[15px]">
            Products
          </span>
        </button>

        {/* 16px spacing */}
        <div className="h-4" />

        {/* Add Product */}
        <button
          type="button"
          onClick={() => setCurrentPage("add-product")}
          className={`
            w-full
            flex
            items-center
            gap-5
            px-5
            py-4
            rounded-xl
            text-left
            transition-all
            duration-200
            ${
              currentPage === "add-product"
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-blue-500"
            }
          `}
        >
          <FiPlusSquare
            size={21}
            strokeWidth={
              currentPage === "add-product" ? 2.2 : 1.6
            }
            className="shrink-0"
          />

          <span className="text-[15px]">
            Add Product
          </span>
        </button>

        {/* 16px spacing */}
        <div className="h-4" />

        {/* Orders */}
        <button
          type="button"
          onClick={() => setCurrentPage("orders")}
          className={`
            w-full
            flex
            items-center
            gap-5
            px-5
            py-4
            rounded-xl
            text-left
            transition-all
            duration-200
            ${
              currentPage === "orders"
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-blue-500"
            }
          `}
        >
          <FiShoppingBag
            size={21}
            strokeWidth={
              currentPage === "orders" ? 2.2 : 1.6
            }
            className="shrink-0"
          />

          <span className="text-[15px]">
            Orders
          </span>
        </button>

      </nav>

      {/* Logout */}
     {/* Logout */}
<div className="mt-auto px-6 pb-10">

  {/* Divider */}
  <div className="border-t border-slate-200" />

  {/* Space between line and logout */}
 <div className="h-6" />

  <button
    type="button"
    onClick={logout}
    className="
      w-full
      flex
      items-center
      gap-5
      px-5
      py-4
      rounded-xl
      text-left
      text-slate-500
      hover:bg-slate-50
      hover:text-blue-500
      transition-all
      duration-200
    "
  >
    <FiLogOut
      size={21}
      strokeWidth={1.6}
      className="shrink-0"
    />

    <span className="text-[15px]">
      Logout
    </span>
  </button>

</div>

    </aside>
  );
};

export default Sidebar;