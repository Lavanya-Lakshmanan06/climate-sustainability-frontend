import { useState } from "react";
import { CheckCircle, Zap, Cloud, DollarSign, TrendingDown, Sparkles, Activity } from "lucide-react";

export default function EnergyEntry() {
  const [form, setForm] = useState({
    electricity: "",
    diesel: "",
    petrol: "",
    lpg: "",
  });

  const [totalEmission, setTotalEmission] = useState(0);
  const [cost, setCost] = useState(0);
  const [savings, setSavings] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const emissionFactors = {
    electricity: 0.82,
    diesel: 2.68,
    petrol: 2.31,
    lpg: 1.51,
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem("userEmail") || "test@test.com";
    
    try {
      const response = await fetch('/api/energy/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail,
          electricity: form.electricity || 0,
          diesel: form.diesel || 0,
          petrol: form.petrol || 0,
          lpg: form.lpg || 0
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setTotalEmission(data.totalEmission.toFixed(2));
        setCost(data.totalCost.toFixed(2));
        setSavings(data.savings.toFixed(2));
        
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert("Failed to save entry ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server ❌");
    }
  };

  const getHealthScore = () => {
    if (totalEmission < 200) return 85;
    if (totalEmission < 400) return 65;
    return 40;
  };

  return (
    <div className="max-w-6xl mx-auto py-8 relative">
      {/* Floating Success Toast */}
      {showSuccess && (
        <div className="fixed top-8 right-8 z-50 animate-in slide-in-from-top-8 fade-in duration-300">
          <div className="bg-[#0F172A] text-white px-6 py-4 rounded-xl shadow-2xl shadow-green-500/20 flex items-center space-x-3 border border-green-500">
            <CheckCircle className="w-6 h-6 text-green-400 animate-bounce" />
            <div className="flex flex-col">
              <span className="font-bold text-green-400">Success!</span>
              <span className="text-sm text-gray-300">Energy data saved securely 🌿</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-4 tracking-tight">
          Energy Data Entry
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Log your monthly consumption to instantly calculate your carbon footprint and discover actionable savings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 animate-in slide-in-from-bottom-8 fade-in duration-700">
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            
            <div className="flex items-center mb-6">
              <Zap className="w-6 h-6 text-green-400 mr-3" />
              <h2 className="text-xl font-bold text-white">Consumption Logs</h2>
            </div>
            
            <div className="space-y-5">
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Electricity (kWh)</label>
                <input
                  type="number"
                  name="electricity"
                  placeholder="e.g. 500"
                  onChange={handleChange}
                  className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition shadow-inner"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Diesel (Litres)</label>
                <input
                  type="number"
                  name="diesel"
                  placeholder="e.g. 150"
                  onChange={handleChange}
                  className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition shadow-inner"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Petrol (Litres)</label>
                <input
                  type="number"
                  name="petrol"
                  placeholder="e.g. 80"
                  onChange={handleChange}
                  className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition shadow-inner"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">LPG (kg)</label>
                <input
                  type="number"
                  name="lpg"
                  placeholder="e.g. 30"
                  onChange={handleChange}
                  className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition shadow-inner"
                />
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white p-4 rounded-xl font-bold transition-all shadow-lg shadow-green-500/25 mt-4 flex items-center justify-center">
                <Activity className="w-5 h-5 mr-2" /> Calculate & Save
              </button>

            </div>
          </form>
        </div>

        {/* Right Column: Insights */}
        <div className="lg:col-span-7 space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-150">
          
          {/* 🌿 Emission Result Card */}
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group hover:border-white/20 transition duration-300">
            <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition">
              <Cloud className="w-48 h-48" />
            </div>
            
            <div className="flex items-center space-x-4 mb-2">
              <div className="p-3 bg-white/5 rounded-2xl">
                <Cloud className="text-gray-300 w-8 h-8 group-hover:text-white transition" />
              </div>
              <h2 className="text-xl font-semibold text-gray-300">Total CO₂ Emission</h2>
            </div>

            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">
                {totalEmission}
              </span>
              <span className="text-xl font-medium text-gray-400">kg</span>
            </div>

            {/* Carbon Health Bar */}
            <div className="mt-8">
              <div className="flex justify-between text-sm font-medium text-gray-300 mb-3">
                <span>Carbon Health Index</span>
                <span className="text-emerald-400">{getHealthScore()}%</span>
              </div>
              <div className="w-full bg-gray-800 h-4 rounded-full overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-green-400 h-full rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${getHealthScore()}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 💰 Cost Analysis */}
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-red-500/10 shadow-lg hover:border-red-500/30 transition group">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-500/10 rounded-xl">
                  <DollarSign className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-gray-400 font-medium">Estimated Cost</h3>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                ₹{cost} <span className="text-sm font-normal text-gray-500">/mo</span>
              </div>
            </div>

            {/* 💰 Savings Analysis */}
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-emerald-500/10 shadow-lg hover:border-emerald-500/30 transition group">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-emerald-500/10 rounded-xl">
                  <TrendingDown className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-gray-400 font-medium">Potential Savings</h3>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                ₹{savings} <span className="text-sm font-normal text-emerald-500/50">/15% drop</span>
              </div>
            </div>
          </div>

          {/* 🤖 AI Suggestion Card */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-[2rem] shadow-lg flex items-start space-x-4">
            <div className="p-3 bg-emerald-500/20 rounded-2xl flex-shrink-0 animate-pulse">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-400 mb-2 text-lg">
                AI Sustainability Insight
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Based on your current consumption metrics, deploying a localized hybrid solar solution could reduce your diesel dependence, directly lowering your highest operational expense and cutting emissions by up to an estimated 30%.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
