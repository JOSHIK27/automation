import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BiCaptions } from "react-icons/bi";

export default function GenerateCaptions({
  isResultOpen,
  setIsResultOpen,
}: {
  isResultOpen: boolean;
  setIsResultOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
      <DialogContent className="max-w-2xl">
        <div className="flex items-center justify-between mb-4 pr-8">
          <div className="flex items-center gap-2">
            <BiCaptions className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-700">
              Generated Captions
            </h2>
          </div>
          <button
            className="p-2.5 rounded-xl
    bg-gray-50/80 hover:bg-gray-100/80
    text-gray-400 hover:text-gray-600
    ring-1 ring-gray-950/5 hover:ring-gray-950/10
    transition-all duration-200
    group"
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          {/* File Format Options */}
          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded-xl 
    bg-blue-50/80 text-blue-600
    ring-1 ring-blue-500/20 
    hover:bg-blue-100/80
    transition-all duration-200
    text-sm font-medium"
            >
              Download SRT
            </button>
            <button
              className="px-4 py-2 rounded-xl 
    bg-gray-50/80 text-gray-600
    ring-1 ring-gray-950/5
    hover:bg-gray-100/80
    transition-all duration-200
    text-sm font-medium"
            >
              Download VTT
            </button>
          </div>

          {/* Caption Preview */}
          <div
            className="rounded-xl overflow-hidden
  bg-gradient-to-br from-gray-50 via-white to-gray-50/80
  ring-1 ring-gray-950/5"
          >
            <div
              className="px-4 py-3 border-b border-gray-100 bg-gray-50/50
    flex items-center justify-between"
            >
              <span className="text-sm font-medium text-gray-600">Preview</span>
              <span className="text-xs text-gray-400">SRT Format</span>
            </div>
            <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto">
              {[1, 2, 3].map((index) => (
                <div key={index} className="space-y-1">
                  <div className="text-xs text-gray-400">{index}</div>
                  <div className="text-xs text-gray-400">
                    00:0{index}:00,000 00:0{index}:05,000
                  </div>
                  <div className="text-sm text-gray-600">
                    {index === 1 &&
                      "Welcome to our comprehensive guide on artificial intelligence."}
                    {index === 2 &&
                      "In this video, we'll explore the fundamentals of machine learning."}
                    {index === 3 &&
                      "Let's begin by understanding what AI really means."}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Text */}
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl
  bg-yellow-50/50 text-yellow-600
  ring-1 ring-yellow-500/20"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">
              Choose your preferred format to download the captions file.
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
