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

export default function GenerateSummary({
  isSubscribed,
  control,
  errors,
  cardId,
  actionsList,
}: {
  isSubscribed: boolean;
  control: any;
  errors: any;
  cardId: string;
  actionsList: any[];
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
          name="summaryLanguage"
          rules={{ required: "Please select a language" }}
          render={({ field }) => (
            <Select
              {...field}
              disabled={isSubscribed}
              onValueChange={(value) => {
                field.onChange(value);
                dispatch(
                  setIsSubscribed({
                    cardId: Number(cardId),
                    isSubscribed: false,
                  })
                );
              }}
              defaultValue={
                actionsList.find((action) => action.cardId === cardId)
                  ?.summaryLanguage
              }
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
        {errors.summaryLanguage && (
          <p className="text-red-500 text-sm mt-1">
            {errors.summaryLanguage.message}
          </p>
        )}
      </div>
    </>
  );
}
