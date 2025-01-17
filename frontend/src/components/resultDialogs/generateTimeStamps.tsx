import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaClock } from "react-icons/fa";

export default function GenerateTimeStamps({
  isResultOpen,
  setIsResultOpen,
  timeStamps,
}: {
  isResultOpen: boolean;
  setIsResultOpen: (open: boolean) => void;
  timeStamps: any[];
}) {
  return (
    <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
      <DialogContent className="max-w-2xl">
        <div className="flex items-center justify-between mb-4 pr-4">
          <div className="flex items-center gap-2">
            <FaClock className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-700">
              Video Timestamps
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
        <div className="space-y-3">
          {timeStamps.map((timestamp, index) => {
            const [time, description] = Object.entries(timestamp)[0];
            return (
              <div
                key={index}
                className="group flex items-start gap-4 p-4 rounded-xl 
                    bg-gradient-to-br from-gray-50 via-white to-gray-50/80
                    ring-1 ring-gray-950/5 
                    hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                    hover:ring-teal-500/20
                    transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div
                    className="px-3 py-1.5 rounded-lg 
                        bg-red-50/80 group-hover:bg-red-50 
                        text-sm font-medium text-red-600
                        ring-1 ring-red-500/20
                        transition-colors duration-200"
                  >
                    {time}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm pt-1">
                  {description as string}
                </p>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
