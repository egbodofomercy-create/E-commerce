import {
  FiHome,
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import logo from "../assets/logo.png";

const Sidebar = ({
  setToken,
  setCurrentPage,
  currentPage,
  counts = {},
}) => {
  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
  };

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: FiHome },
    { key: "products", label: "Products", count: counts.products, icon: FiBox },
    { key: "orders", label: "Orders", count: counts.orders, icon: FiShoppingBag },
    { key: "customers", label: "Customers", count: counts.customers, icon: FiUsers },
    { key: "settings", label: "Settings", icon: FiSettings },
  ];

  return (
    <aside
      className="
        w-[230px]
        min-h-screen
        bg-white
        border-r border-slate-200
        flex flex-col
        sticky top-0
      "
    >
      <div className="px-6 pt-7 pb-8">
        <img
          src={logo}
          alt="Bluvory"
          className="w-[82px] h-auto object-contain"
        />
      </div>

      <nav className="flex-1 px-3">
        <div className="space-y-1.5">
          {navItems.map(({ key, label, count, icon: Icon }) => {
            const active = currentPage === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setCurrentPage(key)}
                className={`
                  w-full h-11 flex items-center gap-3 px-3 rounded-lg
                  text-left transition-colors duration-150
                  ${
                    active
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }
                `}
              >
                <Icon
                  size={18}
                  strokeWidth={active ? 2.1 : 1.7}
                  className="shrink-0"
                />

                <span className={`text-[15px] ${active ? "font-semibold" : "font-medium"}`}>
                  {label}
                </span>

                {count !== undefined && count !== null && (
                  <span
                    className={`
                      ml-auto min-w-[23px] h-[21px] px-1.5
                      flex items-center justify-center rounded-full
                      text-[10px] font-medium
                      ${active ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"}
                    `}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="px-3 pb-6 pt-5 border-t border-slate-100">
        <button
          type="button"
          onClick={logout}
          className="
            w-full h-11 flex items-center gap-3 px-3 rounded-lg
            text-left text-slate-500 hover:bg-slate-50 hover:text-slate-800
            transition-colors duration-150
          "
        >
          <FiLogOut size={18} strokeWidth={1.7} className="shrink-0" />
          <span className="text-[15px] font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;