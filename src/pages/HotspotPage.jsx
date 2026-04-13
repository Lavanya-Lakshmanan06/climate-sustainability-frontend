import React, { useState } from "react";
import { Flame, DollarSign, AlertTriangle, Lightbulb, Zap } from "lucide-react";

const emissionFactors = {
  electricity: 0.92,
  diesel: 2.68,
  petrol: 2.31,
  lpg: 1.51,
};

const costRates = {
  electricity: 0.12,
  diesel: 1.0,
  petrol: 1.2,
  lpg: 0.9,
};

const HotspotPage = () => {
  const [form, setForm] = useState({
    electricity: 0,
    diesel: 0,
    petrol: 0,
    lpg: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const totalEmission =
    form.electricity * emissionFactors.electricity +
    form.diesel * emissionFactors.diesel +
    form.petrol * emissionFactors.petrol +
    form.lpg * emissionFactors.lpg;

  const identifyEmissionHotspot = () => {
    if (totalEmission === 0) return "None";
    const emissionData = {
      Electricity: form.electricity * emissionFactors.electricity,
      Diesel: form.diesel * emissionFactors.diesel,
      Petrol: form.petrol * emissionFactors.petrol,
      LPG: form.lpg * emissionFactors.lpg,
    };
    return Object.keys(emissionData).reduce((a, b) =>
      emissionData[a] > emissionData[b] ? a : b
    );
  };

  const identifyCostHotspot = () => {
    if (totalEmission === 0) return "None";
    const costData = {
      Electricity: form.electricity * costRates.electricity,
      Diesel: form.diesel * costRates.diesel,
      Petrol: form.petrol * costRates.petrol,
      LPG: form.lpg * costRates.lpg,
    };
    return Object.keys(costData).reduce((a, b) =>
      costData[a] > costData[b] ? a : b
    );
  };

  const highestEmissionLabel = identifyEmissionHotspot();
  const highestCostLabel = identifyCostHotspot();
  const riskLevel = totalEmission === 0 ? "Minimal" : totalEmission > 400 ? "High" : totalEmission > 200 ? "Moderate" : "Low";
  const riskColor = riskLevel === "High" ? "text-red-500" : riskLevel === "Moderate" ? "text-yellow-500" : (riskLevel === "Minimal" ? "text-gray-500" : "text-green-500");

  return (
    <div className="flex flex-col items-center min-h-[80vh] py-8">
      <div className="w-full max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-2">
            Hotspot Identification
          </h1>
          <p className="text-gray-400">Identify the primary drivers of your emissions and costs to target reductions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Input Panel */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-xl font-bold text-white flex items-center mb-6">
              <Zap className="text-orange-400 mr-2 w-6 h-6" /> Data Sources
            </h2>
            <div className="space-y-5">
              {Object.keys(form).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-400 mb-2 capitalize tracking-wide">{key} Usage</label>
                  <input
                    type="number"
                    name={key}
                    value={form[key] || ""}
                    placeholder={`Enter ${key} amount`}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all shadow-inner"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Insights Panel */}
          <div className="space-y-6">
            
            {/* Emission Hotspot Card */}
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20 p-6 rounded-3xl shadow-lg relative overflow-hidden group hover:border-red-500/40 transition">
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition">
                <Flame className="w-32 h-32" />
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-red-500/20 rounded-2xl">
                  <Flame className="text-red-500 w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Highest Emission Source</p>
                  <h3 className="text-2xl font-bold text-white">{highestEmissionLabel}</h3>
                </div>
              </div>
            </div>

            {/* Cost Hotspot Card */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/20 p-6 rounded-3xl shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition">
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition">
                <DollarSign className="w-32 h-32" />
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-emerald-500/20 rounded-2xl">
                  <DollarSign className="text-emerald-400 w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Highest Cost Source</p>
                  <h3 className="text-2xl font-bold text-white">{highestCostLabel}</h3>
                </div>
              </div>
            </div>

            {/* Risk Assessment Card */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-white/10 p-6 rounded-3xl shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-white/5 rounded-2xl">
                  <AlertTriangle className={`${riskColor} w-7 h-7`} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Risk Level</p>
                  <h3 className={`text-xl font-bold ${riskColor}`}>{riskLevel}</h3>
                </div>
              </div>

              {highestEmissionLabel !== "None" && (
                <div className="mt-4 pt-4 border-t border-white/10 flex items-start space-x-3">
                  <Lightbulb className="text-yellow-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Focus on optimizing <strong className="text-white">{highestEmissionLabel}</strong> usage to significantly reduce your carbon footprint, and target <strong className="text-white">{highestCostLabel}</strong> to improve profit margins.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HotspotPage;
