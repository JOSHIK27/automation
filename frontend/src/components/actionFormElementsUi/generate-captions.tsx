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
              {...field}
              onValueChange={(value) => {
                field.onChange(value);
                dispatch(
                  setIsSubscribed({
                    cardId: Number(cardId),
                    isSubscribed: false,
                  })
                );
              }}
              disabled={isSubscribed}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </>
  );
}
