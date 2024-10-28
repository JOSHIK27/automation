export default function HowItWorks() {
  return (
    <section className="flex flex-col items-center justify-center my-20">
      <div className="text-[48px] font-[600] mb-12">How it works</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 relative">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-neutral-800 text-2xl">1</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Create Content</h3>
          <p className="text-gray-600">
            Record or prepare your video content for upload to the platform.
          </p>
        </div>

        {/* Arrow 1 */}
        <div className="hidden md:block absolute left-[28%] top-[2rem] w-[100px] transform translate-x-1/2">
          <svg width="100" height="20" viewBox="0 0 100 20">
            <path
              d="M0,10 C30,0 70,0 100,10"
              fill="none"
              stroke="#888888"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M95,5 L100,10 L95,15"
              fill="none"
              stroke="#888888"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-neutral-800 text-2xl">2</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Upload Video</h3>
          <p className="text-gray-600">
            Simply upload your video file through our easy-to-use interface.
          </p>
        </div>

        {/* Arrow 2 */}
        <div className="hidden md:block absolute left-[61%] top-[2rem] w-[100px] transform translate-x-1/2">
          <svg width="100" height="20" viewBox="0 0 100 20">
            <path
              d="M0,10 C30,0 70,0 100,10"
              fill="none"
              stroke="#888888"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M95,5 L100,10 L95,15"
              fill="none"
              stroke="#888888"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-neutral-800 text-2xl">3</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Auto-Generate Thumbnails
          </h3>
          <p className="text-gray-600">
            Our AI automatically creates engaging thumbnails from your video.
          </p>
        </div>
      </div>
    </section>
  );
}
