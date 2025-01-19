import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { MdSummarize } from "react-icons/md";
import { Button } from "@/components/ui/button";

export default function GenerateKeywords({
  isResultOpen,
  setIsResultOpen,
  videoKeywords,
}: {
  isResultOpen: boolean;
  setIsResultOpen: (value: boolean) => void;
  videoKeywords: [string, number][];
}) {
  return (
    <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Generated Keywords</DialogTitle>
          <DialogDescription>
            Here are the SEO optimized keywords for your video with their
            relevance scores.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {videoKeywords?.map(([keyword, score], index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-700">{keyword}</span>
              <span className="text-sm text-gray-500">
                Score: {(score * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsResultOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
