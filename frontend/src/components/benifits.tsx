import { RiRobot2Line } from "react-icons/ri";
import { BoltIcon, SparklesIcon } from "@heroicons/react/24/outline";

const benefits = [
  {
    title: "Visual Workflow Builder",
    description:
      "Create complex automation workflows with our intuitive drag-and-drop interface. Connect different AI actions and customize their behavior visually.",
    icon: RiRobot2Line,
    gradient: "from-teal-500 to-teal-600",
  },
  {
    title: "AI-Powered Content Generation",
    description:
      "Leverage advanced AI to automatically generate video captions, create engaging thumbnails, and produce content summaries.",
    icon: SparklesIcon,
    gradient: "from-teal-400 to-teal-500",
  },
  {
    title: "Customizable Triggers",
    description:
      "Set up automated workflows that respond to various triggers. Schedule actions or respond to events in real-time.",
    icon: BoltIcon,
    gradient: "from-teal-600 to-teal-700",
  },
];

export default function Benefits() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#F7F5F1] mb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-32 -left-40 bg-teal-100/30 rounded-full blur-3xl" />
        <div className="absolute w-[500px] h-[500px] -bottom-32 -right-40 bg-teal-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-base font-semibold text-teal-600 mb-3">
            POWERFUL FEATURES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500">
              Creator Stream
            </span>
            ?
          </h2>
          <p className="text-lg text-gray-600">
            Streamline your content creation with powerful automation tools
            designed for modern creators
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 
              shadow-sm border border-gray-200/50 hover:border-teal-500/20
              transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

              {/* Icon */}
              <div
                className={`relative w-14 h-14 rounded-xl bg-gradient-to-r ${benefit.gradient} 
                p-4 text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                <benefit.icon className="w-full h-full" />
              </div>

              {/* Content */}
              <div className="mt-6 relative">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-teal-500/20 rounded-2xl transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <button
            className="inline-flex items-center px-8 py-4 rounded-full 
            bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold
            hover:from-teal-500 hover:to-teal-400 transition-all duration-300
            shadow-sm hover:shadow-md hover:-translate-y-0.5 
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Start Creating
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
