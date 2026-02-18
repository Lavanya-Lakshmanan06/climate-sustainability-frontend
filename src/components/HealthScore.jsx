export default function HealthScore({ score }) {
  let color =
    score >= 80
      ? "text-green-400"
      : score >= 50
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg text-center">
      <p className="text-gray-400 mb-4">Carbon Health Score</p>

      <div className={`text-6xl font-bold ${color}`}>
        {score}
      </div>

      <p className="text-gray-500 mt-3">
        Sustainability Performance Rating
      </p>
    </div>
  );
}
