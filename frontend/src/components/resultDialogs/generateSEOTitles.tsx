import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaVideo } from "react-icons/fa";

export default function GenerateSEOTitles({
  isResultOpen,
  setIsResultOpen,
  videoTitles,
}: {
  isResultOpen: boolean;
  setIsResultOpen: (open: boolean) => void;
  videoTitles: string[];
}) {
  return (
    <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-700">
            <FaVideo className="w-5 h-5 text-blue-500" />
            Video Titles
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {videoTitles.map((title, index) => (
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
                  className="w-6 h-6 flex items-center justify-center rounded-lg 
                bg-blue-50/80 group-hover:bg-blue-50 
                text-sm font-medium text-blue-600
                transition-colors duration-200"
                >
                  {index + 1}
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">{title}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
