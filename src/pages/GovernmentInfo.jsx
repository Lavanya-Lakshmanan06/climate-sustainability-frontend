export default function GovernmentInfo() {
  const schemes = [
    {
      title: "MSME Sustainable (ZED) Certification",
      description:
        "Provides financial assistance for MSMEs to adopt Zero Defect Zero Effect manufacturing practices.",
      benefit: "Up to 80% subsidy for certification",
    },
    {
      title: "National Solar Mission",
      description:
        "Encourages businesses to shift towards solar power and renewable energy adoption.",
      benefit: "Capital subsidy for rooftop solar installation",
    },
    {
      title: "Energy Efficiency Financing Platform (EEFP)",
      description:
        "Supports SMEs in implementing energy-efficient technologies.",
      benefit: "Low-interest green loans",
    },
    {
      title: "Perform, Achieve & Trade (PAT)",
      description:
        "Government initiative to improve energy efficiency in industrial sectors.",
      benefit: "Energy saving certificates tradable in market",
    },
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Government Sustainability Support
      </h1>

      <div className="grid grid-cols-2 gap-6">

        {schemes.map((scheme, index) => (
          <div
            key={index}
            className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition duration-300"
          >
            <h2 className="text-lg font-semibold text-green-400 mb-2">
              {scheme.title}
            </h2>

            <p className="text-gray-300 text-sm mb-4">
              {scheme.description}
            </p>

            <div className="bg-green-500/10 p-3 rounded-lg text-sm text-green-300">
              Benefit: {scheme.benefit}
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}




