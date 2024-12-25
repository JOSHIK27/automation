import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function GenerateCaptions({
  setIsSubscribed,
  control,
  errors,
}: {
  setIsSubscribed: (isSubscribed: boolean) => void;
  control: any;
  errors: any;
}) {
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
                setIsSubscribed(false);
              }}
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
