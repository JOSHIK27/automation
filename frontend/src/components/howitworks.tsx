export default function HowItWorks() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/95 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] -z-10 opacity-50" />

      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-teal-600 to-teal-700 text-transparent bg-clip-text">
          How it works
        </h2>
        <p className="text-gray-600 text-xl font-light max-w-2xl mx-auto">
          Build powerful content automation workflows in three simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative">
        {/* Connecting line between steps */}
        <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-teal-600/20 via-teal-600/40 to-teal-600/20" />

        {[
          {
            step: 1,
            title: "Design Your Workflow",
            description:
              "Create custom workflows using our visual drag-and-drop builder. Connect AI actions and set up triggers for automation.",
            icon: "✏️",
          },
          {
            step: 2,
            title: "Configure Actions",
            description:
              "Customize each action in your workflow - from generating captions and summaries to creating AI thumbnails.",
            icon: "⚙️",
          },
          {
            step: 3,
            title: "Run & Monitor",
            description:
              "Execute your workflow and track the progress of each automated task in real-time through our dashboard.",
            icon: "📊",
          },
        ].map(({ step, title, description, icon }) => (
          <div key={step} className="group relative">
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-white hover:bg-gray-50 transition-all duration-300 ring-1 ring-gray-200 hover:ring-teal-200 hover:shadow-xl hover:shadow-teal-500/10">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center mb-8 shadow-lg transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                <span className="text-white text-2xl">{icon}</span>
                <span className="absolute -bottom-3 bg-white rounded-full w-8 h-8 flex items-center justify-center ring-4 ring-white">
                  <span className="text-sm font-bold text-teal-700">
                    {step}
                  </span>
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
