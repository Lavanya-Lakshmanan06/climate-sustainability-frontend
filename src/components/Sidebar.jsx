import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      {isLoggingOut && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F172A]/95 backdrop-blur-md transition-all duration-500 animate-in fade-in zoom-in duration-500">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-red-400 opacity-20 blur-xl rounded-full"></div>
            <div className="w-24 h-24 bg-red-500/20 border border-red-500/50 rounded-full flex items-center justify-center animate-bounce">
              <LogOut className="w-12 h-12 text-red-400 ml-1" />
            </div>
          </div>
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-white tracking-wide">Logging Out</h2>
            <p className="text-gray-400">See you next time!</p>
          </div>
          <div className="w-64 bg-gray-800 rounded-full h-1 overflow-hidden">
            <div className="bg-red-500 h-1 rounded-full transition-all duration-[2000ms] w-full ease-linear" style={{ animation: "progress3 2s linear" }}></div>
          </div>
          <style>{`
            @keyframes progress3 {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      )}
      <div className="w-64 bg-[#0B1120] border-r border-white/10 p-6 flex flex-col min-h-screen">


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
    </>
  );
}
