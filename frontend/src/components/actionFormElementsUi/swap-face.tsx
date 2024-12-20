import { Controller } from "react-hook-form";
import { Input } from "../ui/input";

export default function SwapFace({
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
          Enter Source Image URL
        </label>
        <Controller
          control={control}
          name="sourceImageUrl"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Input
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            />
          )}
        />
        {errors.sourceImageUrl?.type === "required" && (
          <p role="alert" className="text-red-500 text-sm mt-1.5">
            Please enter a source image URL
          </p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">
          Enter Target Image URL
        </label>
        <Controller
          control={control}
          name="targetImageUrl"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Input
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            />
          )}
        />
      </div>
    </>
  );
}
