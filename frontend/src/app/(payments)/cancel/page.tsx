export default function Cancel() {
  return (
    <div className="min-h-screen bg-[#F7F5F1] flex justify-center items-center">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-8 text-center">
        <div className="mb-8">
          <div className="bg-red-50 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
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
          className="inline-flex items-center justify-center px-8 py-3 
            bg-teal-600 hover:bg-teal-700 text-white rounded-xl
            font-medium text-sm
            shadow-sm hover:shadow-md
            transition-all duration-200
            hover:scale-105 active:scale-95"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}
