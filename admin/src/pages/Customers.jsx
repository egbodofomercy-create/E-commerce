import { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch, FiUsers } from "react-icons/fi";

const Customers = ({ currentPage }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  /* ================= FETCH CUSTOMERS ================= */

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.get(
        "http://localhost:4000/api/user/list",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCustomers(response.data.users || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage === "customers") {
      const timeoutId = setTimeout(fetchCustomers, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [currentPage]);

  /* ================= FILTER ================= */

  const filteredCustomers = customers.filter((customer) => {
    const searchValue = search.toLowerCase().trim();
    return (
      !searchValue ||
      customer.name?.toLowerCase().includes(searchValue) ||
      customer.email?.toLowerCase().includes(searchValue)
    );
  });

  /* ================= HELPERS ================= */

  const initials = (name) =>
    (name || "?")
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

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
          CUSTOMERS CARD
      ===================================================== */}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

        {/* ================= TOOLBAR ================= */}

        <div className="px-6 py-5 border-b border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <h2 className="text-lg font-semibold text-slate-900 shrink-0">
              All Customers
            </h2>

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
              <FiSearch size={16} className="text-slate-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customers"
                className="
                  ml-3 flex-1 min-w-0 bg-transparent
                  text-sm text-slate-700 placeholder:text-slate-400 outline-none
                "
              />
            </div>

          </div>
        </div>

        {/* ================= TABLE ================= */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">

            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Joined
                </th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-sm text-slate-500">
                    Loading customers...
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-14 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                        <FiUsers size={21} className="text-blue-500" />
                      </div>
                      <p className="text-sm font-medium text-slate-700">
                        No customers found
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {search
                          ? "Try adjusting your search."
                          : "Customers will appear here once people sign up."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <span className="text-blue-600 text-xs font-semibold">
                            {initials(customer.name)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-800">
                          {customer.name || "—"}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {customer.email || "—"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {formatDate(customer.createdAt)}
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export default Customers;