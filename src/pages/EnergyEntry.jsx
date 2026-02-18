import { useState } from "react";

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

  const emissionFactors = {
    electricity: 0.82,
    diesel: 2.68,
    petrol: 2.31,
    lpg: 1.51,
  };

  const handleChange = (e) => {
    const updatedForm = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updatedForm);

    // 🌿 Emission Calculation
    let total =
      (updatedForm.electricity || 0) * emissionFactors.electricity +
      (updatedForm.diesel || 0) * emissionFactors.diesel +
      (updatedForm.petrol || 0) * emissionFactors.petrol +
      (updatedForm.lpg || 0) * emissionFactors.lpg;

    setTotalEmission(total.toFixed(2));

    // 💰 Cost Assumptions (Demo Values)
    let totalCost =
      (updatedForm.electricity || 0) * 8 +     // ₹8 per kWh
      (updatedForm.diesel || 0) * 90 +        // ₹90 per litre
      (updatedForm.petrol || 0) * 100 +       // ₹100 per litre
      (updatedForm.lpg || 0) * 70;            // ₹70 per kg

    setCost(totalCost.toFixed(2));

    // 📉 Savings (15% Reduction Model)
    let estimatedSavings = totalCost * 0.15;
    setSavings(estimatedSavings.toFixed(2));
  };

  const getHealthScore = () => {
    if (totalEmission < 200) return 85;
    if (totalEmission < 400) return 65;
    return 40;
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-lg">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Energy Data Entry
        </h1>

        <form className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg">
          <div className="space-y-5">

            <input
              type="number"
              name="electricity"
              placeholder="Electricity (kWh)"
              onChange={handleChange}
              className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-lg"
            />

            <input
              type="number"
              name="diesel"
              placeholder="Diesel (Litres)"
              onChange={handleChange}
              className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-lg"
            />

            <input
              type="number"
              name="petrol"
              placeholder="Petrol (Litres)"
              onChange={handleChange}
              className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-lg"
            />

            <input
              type="number"
              name="lpg"
              placeholder="LPG (kg)"
              onChange={handleChange}
              className="w-full p-3 bg-[#0F172A] border border-gray-700 rounded-lg"
            />

          </div>
        </form>

        {/* 🌿 Emission Result */}
        <div className="mt-8 bg-white/5 p-6 rounded-2xl border border-white/10 text-center shadow-lg">
          <h2 className="text-gray-400 mb-2">
            Total CO₂ Emission
          </h2>

          <div className="text-3xl font-bold text-green-400">
            {totalEmission} kg
          </div>

          {/* Carbon Health Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Carbon Health</span>
              <span>{getHealthScore()}%</span>
            </div>
            <div className="w-full bg-gray-700 h-3 rounded-full">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${getHealthScore()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 💰 Cost & Savings Section */}
        <div className="mt-8 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg">

          <h2 className="text-lg text-gray-400 mb-4">
            Cost & Savings Analysis
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-400">Total Energy Cost</p>
              <h3 className="text-2xl font-bold text-red-400">
                ₹ {cost}
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-400">Potential Savings (15%)</p>
              <h3 className="text-2xl font-bold text-green-400">
                ₹ {savings}
              </h3>
            </div>

          </div>

          <div className="mt-4 text-sm text-gray-300">
            💡 Reducing fossil fuel consumption by 15% can significantly improve
            profitability while lowering carbon footprint.
          </div>

        </div>

        {/* 🤖 AI Suggestion */}
        <div className="mt-6 bg-green-500/10 border border-green-400/30 p-5 rounded-xl">
          <h3 className="font-semibold text-green-400 mb-2">
            AI Sustainability Suggestion
          </h3>
          <p className="text-gray-300 text-sm">
            Based on your energy usage, consider shifting to solar energy or
            optimizing diesel usage to reduce operational costs and emissions.
          </p>
        </div>

      </div>
    </div>
  );
}
