export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-green-400 transition shadow-lg">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
      <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
    </div>
  );
}
