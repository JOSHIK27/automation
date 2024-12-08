import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
export default function GenerateThumbnail({
  control,
  errors,
}: {
  control: any;
  errors: any;
}) {
  return (
    <>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">
          Enter Prompt
        </label>
        <Controller
          control={control}
          name="thumbnailPrompt"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Textarea {...field} placeholder="Enter Prompt" />
          )}
        />
        {errors.thumbnailPrompt?.type === "required" && (
          <p role="alert" className="text-red-500 text-sm mt-1.5">
            Please enter a prompt
          </p>
        )}
      </div>
    </>
  );
}
