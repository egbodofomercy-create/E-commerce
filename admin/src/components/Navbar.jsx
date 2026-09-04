import { useState } from "react";
import {
  FiChevronDown,
  FiPlus,
  FiLogOut,
} from "react-icons/fi";

const Navbar = ({ setToken }) => {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
  };

  return (
    <header className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      {/* ================= LEFT ================= */}


  <div>
    <h1 className="text-2xl font-semibold text-slate-900">
      Dashboard
    </h1>

    <p className="mt-1 text-sm text-slate-500">
      Welcome back, Admin 👋
    </p>
  </div>
      {/* ================= RIGHT ================= */}
      <div className="relative">

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="
            flex
            items-center
            gap-3
            px-3
            py-2
            rounded-xl
            hover:bg-slate-50
            transition-all
          "
        >

          {/* Avatar */}
          <div className="
            w-9
            h-9
            rounded-full
            bg-blue-50
            flex
            items-center
            justify-center
          ">
            <span className="text-blue-600 text-sm font-semibold">
              A
            </span>
          </div>

          {/* Admin */}
          <span className="text-sm font-medium text-slate-700">
            Admin
          </span>

          {/* Arrow */}
          <FiChevronDown
            size={16}
            className={`
              text-slate-400
              transition-transform
              duration-200
              ${open ? "rotate-180" : ""}
            `}
          />

        </button>


        {/* ================= DROPDOWN ================= */}
        {open && (
          <div
            className="
              absolute
              right-0
              top-full
              mt-3
              w-64
              bg-white
              border
              border-slate-100
              rounded-2xl
              shadow-[0_12px_40px_rgba(15,23,42,0.10)]
              p-3
              z-50
            "
          >

            {/* Account */}
            <div className="px-3 py-3">

              <div className="flex items-center gap-3">

                <div className="
                  w-10
                  h-10
                  rounded-full
                  bg-blue-50
                  flex
                  items-center
                  justify-center
                ">
                  <span className="text-blue-600 font-semibold">
                    A
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Admin
                  </p>

                  <p className="text-xs text-slate-400">
                    Store administrator
                  </p>
                </div>

              </div>

            </div>


            {/* Add Account */}
            <button
              type="button"
              className="
                w-full
                flex
                items-center
                gap-3
                px-3
                py-3
                rounded-xl
                text-left
                text-sm
                text-slate-600
                hover:bg-blue-50
                hover:text-blue-600
                transition
              "
            >

              <span className="
                w-8
                h-8
                rounded-lg
                bg-slate-50
                flex
                items-center
                justify-center
              ">
                <FiPlus size={16} />
              </span>

              Add another account

            </button>


            {/* Logout */}
            <button
              type="button"
              onClick={logout}
              className="
                w-full
                flex
                items-center
                gap-3
                px-3
                py-3
                rounded-xl
                text-left
                text-sm
                text-slate-500
                hover:bg-slate-50
                hover:text-slate-700
                transition
              "
            >

              <span className="
                w-8
                h-8
                rounded-lg
                bg-slate-50
                flex
                items-center
                justify-center
              ">
                <FiLogOut size={16} />
              </span>

              Logout

            </button>

          </div>
        )}

      </div>

    </header>
  );
};

export default Navbar;