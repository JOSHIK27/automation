import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MdSummarize } from "react-icons/md";

export default function GenerateSummary({
  isResultOpen,
  setIsResultOpen,
  videoSummary,
}: {
  isResultOpen: boolean;
  setIsResultOpen: (open: boolean) => void;
  videoSummary: string;
}) {
  return (
    <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-700">
            <MdSummarize className="w-5 h-5 text-teal-500" />
            Video Summary
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div
            className="p-6 rounded-xl bg-gradient-to-br from-gray-50 via-white to-gray-50/80 
          ring-1 ring-gray-950/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          >
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {videoSummary}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
