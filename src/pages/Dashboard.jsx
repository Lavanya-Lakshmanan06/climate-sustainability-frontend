import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [metrics, setMetrics] = useState({
    totalEmission: 0,
    scope1: 0,
    scope2: 0,
    scope3: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail") || "test@test.com";
        const response = await fetch(`/api/energy/dashboard?userEmail=${userEmail}`);
        if (response.ok) {
          const dashboard = await response.json();
          setData(dashboard.trend);
          setPieData(dashboard.pie);
          setMetrics({
            totalEmission: dashboard.totalEmission,
            scope1: dashboard.scope1,
            scope2: dashboard.scope2,
            scope3: dashboard.scope3
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleDownloadReport = () => {
    const reportContent = `
Carbon Sustainability Report
----------------------------
Total Emission: ${metrics.totalEmission} kg
Scope 1 (Direct Emissions): ${metrics.scope1} kg
Scope 2 (Electricity): ${metrics.scope2} kg
Scope 3 (Supply Chain): ${metrics.scope3} kg

Trend Data:
${data.map(d => `${d.date}: ${d.emission} kg`).join('\n')}
    `;
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sustainability-report.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const COLORS = ["#22c55e", "#3b82f6", "#facc15"];

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Carbon Dashboard
        </h1>

        <button 
          onClick={handleDownloadReport}
          className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-medium transition"
        >
          Download Sustainability Report
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Total Emission</p>
          <h2 className="text-2xl font-bold text-green-400">{metrics.totalEmission} kg</h2>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Industry Average</p>
          <h2 className="text-2xl font-bold">450 kg</h2>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Reduction Target</p>
          <h2 className="text-2xl font-bold">-18%</h2>
        </div>

      </div>

      {/* Scope Breakdown */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Scope 1</p>
          <h2 className="text-xl font-bold text-green-400">{metrics.scope1} kg</h2>
          <p className="text-xs text-gray-500">Direct Emissions</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Scope 2</p>
          <h2 className="text-xl font-bold text-blue-400">{metrics.scope2} kg</h2>
          <p className="text-xs text-gray-500">Electricity</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Scope 3</p>
          <h2 className="text-xl font-bold text-yellow-400">{metrics.scope3} kg</h2>
          <p className="text-xs text-gray-500">Supply Chain</p>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-8">

        {/* Line Chart */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-lg mb-4 text-gray-400">
            Emission Trend
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="emission"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-lg mb-4 text-gray-400">
            Emission Category Split
          </h2>

          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

      </div>

      {/* ESG Panel */}
      <div className="mt-8 bg-green-500/10 border border-green-400/30 p-6 rounded-xl">
        <h3 className="text-green-400 font-semibold mb-2">
          ESG Compliance Status
        </h3>
        <p className="text-gray-300 text-sm">
          Your company is currently aligned with 72% of SME sustainability
          compliance benchmarks. Focus on reducing diesel consumption
          to improve your ESG score further.
        </p>
      </div>

    </div>
  );
}
