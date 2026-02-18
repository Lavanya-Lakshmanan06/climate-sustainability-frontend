import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-[#0B1120] border-r border-white/10 p-6 flex flex-col">

      {/* Logo Section */}
      <div className="mb-10">
        <h1 className="text-xl font-bold text-green-400">
          Carbon Intelligence
        </h1>
        <p className="text-xs text-gray-400">
          SME Sustainability Platform
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-3">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-green-500 text-white"
                : "text-gray-300 hover:bg-white/5"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/energy"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-green-500 text-white"
                : "text-gray-300 hover:bg-white/5"
            }`
          }
        >
          Energy Entry
        </NavLink>

        <NavLink
          to="/government"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-green-500 text-white"
                : "text-gray-300 hover:bg-white/5"
            }`
          }
        >
          Government Support
        </NavLink>

        {/* 🔥 Hotspot Identification Link */}
        <NavLink
          to="/hotspot"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-green-500 text-white"
                : "text-gray-300 hover:bg-white/5"
            }`
          }
        >
          Hotspot Identification
        </NavLink>

      </nav>

      {/* Push logout to bottom */}
      <div className="flex-grow"></div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 hover:bg-red-600 p-3 rounded-lg font-semibold transition"
      >
        Logout
      </button>

    </div>
  );
}
