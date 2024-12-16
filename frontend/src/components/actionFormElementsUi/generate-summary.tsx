import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function GenerateSummary({
  control,
  errors,
  cardId,
  actionsList,
}: {
  control: any;
  errors: any;
  cardId: string;
  actionsList: any[];
}) {
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
              onValueChange={field.onChange}
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
