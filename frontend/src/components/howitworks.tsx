export default function HowItWorks() {
  return (
    <section className="flex flex-col items-center justify-center my-32 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-teal-700 text-transparent bg-clip-text">
          How it works
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Build powerful content automation workflows in three simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto relative">
        <div className="flex flex-col items-center text-center group p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 ring-1 ring-gray-200/50">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <span className="text-white text-2xl font-bold">1</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Design Your Workflow</h3>
          <p className="text-gray-600 leading-relaxed">
            Create custom workflows using our visual drag-and-drop builder.
            Connect AI actions and set up triggers for automation.
          </p>
        </div>

        <div className="flex flex-col items-center text-center group p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 ring-1 ring-gray-200/50">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <span className="text-white text-2xl font-bold">2</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Configure Actions</h3>
          <p className="text-gray-600 leading-relaxed">
            Customize each action in your workflow - from generating captions
            and summaries to creating AI thumbnails.
          </p>
        </div>

        <div className="flex flex-col items-center text-center group p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 ring-1 ring-gray-200/50">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <span className="text-white text-2xl font-bold">3</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Run & Monitor</h3>
          <p className="text-gray-600 leading-relaxed">
            Execute your workflow and track the progress of each automated task
            in real-time through our dashboard.
          </p>
        </div>
      </div>
    </section>
  );
}
