import React from "react";
import { Landmark, Target, Award, ArrowRightCircle } from "lucide-react";

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
    {
      title: "FAME India Scheme Phase-II",
      description:
        "Encourages the transition to electric mobility by subsidizing the purchase of electric vehicles.",
      benefit: "Subsidies on EVs and charging infrastructure support",
    },
    {
      title: "SIDBI Green Finance Scheme",
      description:
        "Provides direct financial support to MSMEs for investments in green and energy-efficient technologies.",
      benefit: "Loans at concessional interest rates for green projects",
    },
    {
      title: "PLI Scheme for High Efficiency Solar PV Modules",
      description:
        "Promotes the manufacturing of high-efficiency solar photovoltaic modules in India.",
      benefit: "Financial incentives based on sales and efficiency",
    },
    {
      title: "Credit Linked Capital Subsidy Scheme (CLCSS)",
      description:
        "Facilitates technology up-gradation by providing upfront capital subsidy to MSMEs.",
      benefit: "15% capital subsidy up to ₹15 Lakhs on institutional finance",
    },
    {
      title: "Waste to Energy Scheme",
      description:
        "Supports the setting up of standalone biogas plants, Bio-CNG, and power generation from agricultural, industrial, and urban wastes.",
      benefit: "Central Financial Assistance (CFA) per kW/Cubic meter",
    },
    {
      title: "Sustainable Finance Scheme (SFS) by SIDBI",
      description:
        "Targeted funding for sustainable development projects that contribute to energy efficiency, cleaner production, and emission reduction in MSMEs.",
      benefit: "Financial assistance with lower interest rates and longer repayment periods",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      
      {/* Header Section */}
      <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-4">
          <Landmark className="w-10 h-10 text-blue-400" />
        </div>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4 tracking-tight">
          Government Sustainability Support
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Explore powerful national schemes and financial incentives designed to accelerate your business's transition to a sustainable future.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-8 fade-in duration-700">
        {schemes.map((scheme, index) => (
          <div
            key={index}
            className="group relative bg-[#0F172A] p-1 rounded-3xl overflow-hidden shadow-2xl transition hover:-translate-y-1 hover:shadow-emerald-500/20"
          >
            {/* Animated Glow Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Card Content */}
            <div className="relative h-full bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-[1.4rem] flex flex-col justify-between">
              
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {scheme.title}
                  </h2>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {scheme.description}
                </p>
              </div>

              {/* Benefit Highlight Area */}
              <div className="mt-auto bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 p-4 rounded-xl flex items-start space-x-3">
                <Award className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-emerald-300">
                  {scheme.benefit}
                </span>
              </div>
              
              <div className="absolute top-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRightCircle className="w-6 h-6 text-emerald-400" />
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}




