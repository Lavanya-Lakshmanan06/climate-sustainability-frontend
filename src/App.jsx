import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import EnergyEntry from "./pages/EnergyEntry";
import GovernmentInfo from "./pages/GovernmentInfo";
import HotspotPage from "./pages/HotspotPage";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="flex h-screen bg-[#0F172A] text-gray-200">
              
              {/* Sidebar */}
              <Sidebar />

              {/* Main Content */}
              <div className="flex-1 p-8 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/energy" element={<EnergyEntry />} />
                  <Route path="/government" element={<GovernmentInfo />} />
                  <Route path="/hotspot" element={<HotspotPage />} />
                </Routes>
              </div>

            </div>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
