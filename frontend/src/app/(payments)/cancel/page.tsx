export default function Cancel() {
  return (
    <div className="mt-10 flex justify-center items-center  p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center transform transition-all hover:scale-[1.02] border border-gray-100">
        <div className="mb-6 animate-bounce">
          <div className="bg-red-50 rounded-full p-3 w-16 h-16 mx-auto">
            <svg
              className="h-10 w-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Your payment process has been cancelled. If this was a mistake, please
          try again or contact our support team for assistance.
        </p>
        <a
          href="/"
          className="inline-block bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}
