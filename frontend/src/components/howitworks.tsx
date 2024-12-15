export default function HowItWorks() {
  return (
    <section className="flex flex-col items-center justify-center my-32 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-teal-700 text-transparent bg-clip-text">
          How it works
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Three simple steps to transform your content creation workflow
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto relative">
        <div className="flex flex-col items-center text-center group p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 ring-1 ring-gray-200/50">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <span className="text-white text-2xl font-bold">1</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Create Content</h3>
          <p className="text-gray-600 leading-relaxed">
            Record or prepare your video content for upload to the platform.
            Support for all major video formats.
          </p>
        </div>

        <div className="flex flex-col items-center text-center group p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 ring-1 ring-gray-200/50">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <span className="text-white text-2xl font-bold">2</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Upload Video</h3>
          <p className="text-gray-600 leading-relaxed">
            Simply upload your video file through our intuitive drag-and-drop
            interface. Fast and secure.
          </p>
        </div>

        <div className="flex flex-col items-center text-center group p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 ring-1 ring-gray-200/50">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <span className="text-white text-2xl font-bold">3</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Auto-Generate Metadata</h3>
          <p className="text-gray-600 leading-relaxed">
            Our AI automatically generates all the metadata you need to publish
            your content with maximum impact.
          </p>
        </div>
      </div>
    </section>
  );
}
