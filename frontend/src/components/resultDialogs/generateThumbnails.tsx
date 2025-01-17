import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BiSolidImage } from "react-icons/bi";

export default function GenerateThumbnail({
  isResultOpen,
  setIsResultOpen,
  thumbnailUrls,
}: {
  isResultOpen: boolean;
  setIsResultOpen: (open: boolean) => void;
  thumbnailUrls: string[];
}) {
  return (
    <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-700">
            <BiSolidImage className="w-5 h-5 text-purple-500" />
            Generated Thumbnails
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            {thumbnailUrls.map((url, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl 
              bg-gradient-to-br from-gray-50 via-white to-gray-50/80
              ring-1 ring-gray-950/5 
              hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              hover:ring-purple-500/20
              transition-all duration-300"
              >
                <div className="absolute top-3 left-3 z-10">
                  <div
                    className="w-6 h-6 flex items-center justify-center rounded-lg 
                bg-purple-50/90 backdrop-blur-sm
                text-sm font-medium text-purple-600
                ring-1 ring-purple-500/20
                transition-colors duration-200"
                  >
                    {index + 1}
                  </div>
                </div>
                <div className="aspect-video relative">
                  <img
                    src={url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl
                  group-hover:scale-105 
                  transition-transform duration-300"
                  />
                  <div
                    className="absolute inset-0 rounded-xl 
                  ring-1 ring-inset ring-gray-950/5
                  group-hover:ring-purple-500/20
                  transition-colors duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
