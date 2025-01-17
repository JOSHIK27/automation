import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaLightbulb } from "react-icons/fa";

export default function GenerateIdeas({
  isResultOpen,
  setIsResultOpen,
  contentIdeas,
}: {
  isResultOpen: boolean;
  setIsResultOpen: (open: boolean) => void;
  contentIdeas: string[];
}) {
  return (
    <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-700">
            <FaLightbulb className="w-5 h-5 text-yellow-500" />
            Content Ideas
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-3">
          {contentIdeas.map((idea, index) => (
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
                bg-teal-50/80 group-hover:bg-teal-50 
                text-sm font-medium text-teal-600
                transition-colors duration-200"
                >
                  {index + 1}
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">{idea}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
