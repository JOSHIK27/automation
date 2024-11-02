export default function OldVsNew() {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 max-w-6xl mx-auto">
      <div className="flex-1 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Old Way</h2>
        <div className="space-y-4">
          <p className="text-gray-600">Traditional Approach</p>
          {/* Add your old way content here */}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          vs
        </div>
      </div>

      <div className="flex-1 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">New Way</h2>
        <div className="space-y-4">
          <p className="text-gray-600">Modern Approach</p>
          {/* Add your new way content here */}
        </div>
      </div>
    </div>
  );
}
