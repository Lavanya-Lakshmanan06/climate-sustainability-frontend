import React, { useState } from "react";

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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Hotspot Identification</h1>

      {/* Input Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label className="block text-gray-300 mb-1 capitalize">{key}</label>
            <input
              type="number"
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 text-white"
            />
          </div>
        ))}
      </div>

      {/* Hotspot Display */}
      <div className="mt-8 bg-red-500/10 border border-red-400/30 p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold text-red-400 mb-4">
          Hotspot Analysis
        </h2>

        <div className="text-gray-300 mb-2">
          🔥 Highest Emission Source:
          <span className="ml-2 font-bold text-white">{identifyEmissionHotspot()}</span>
        </div>

        <div className="text-gray-300 mb-2">
          💰 Highest Cost Source:
          <span className="ml-2 font-bold text-green-400">{identifyCostHotspot()}</span>
        </div>

        <div className="text-gray-300 mb-2">
          ⚠ Risk Level:
          <span className="ml-2 font-bold text-yellow-400">
            {totalEmission > 400 ? "High" : totalEmission > 200 ? "Moderate" : "Low"}
          </span>
        </div>

        <div className="mt-4 text-sm text-gray-300">
          📌 Focus on optimizing <strong>{identifyEmissionHotspot()}</strong> and{" "}
          <strong>{identifyCostHotspot()}</strong> usage to reduce emissions and cost.
        </div>
      </div>
    </div>
  );
};

export default HotspotPage;
