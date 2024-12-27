import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { setIsSubscribed } from "@/app/store/slices/trigger-card-slices/update-btn-slice";
import { useDispatch } from "react-redux";

export default function GenerateCaptions({
  isSubscribed,
  control,
  errors,
  cardId,
}: {
  isSubscribed: boolean;
  control: any;
  errors: any;
  cardId: string;
}) {
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">
          Select Language
        </label>
        <Controller
          control={control}
          name="captionsLanguage"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                dispatch(
                  setIsSubscribed({
                    cardId: cardId,
                    isSubscribed: false,
                  })
                );
              }}
              disabled={isSubscribed}
            >
              <SelectTrigger className="w-full bg-white/50 hover:bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 h-11 rounded-xl shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                <SelectValue
                  placeholder="Select Language"
                  className="text-gray-600 placeholder:text-gray-400"
                />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95">
                <SelectItem
                  value="en"
                  className="relative flex items-center cursor-pointer py-2.5 px-4 rounded-lg outline-none hover:bg-gray-50/80 focus:bg-gray-50/80 data-[state=checked]:bg-blue-50/50 data-[highlighted]:bg-gray-50/80 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-500">EN</span>
                    </div>
                    <span className="font-medium text-gray-700">English</span>
                  </div>
                </SelectItem>
                <SelectItem
                  value="es"
                  className="relative flex items-center cursor-pointer py-2.5 px-4 rounded-lg outline-none hover:bg-gray-50/80 focus:bg-gray-50/80 data-[state=checked]:bg-blue-50/50 data-[highlighted]:bg-gray-50/80 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-500">ES</span>
                    </div>
                    <span className="font-medium text-gray-700">Spanish</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </>
  );
}
