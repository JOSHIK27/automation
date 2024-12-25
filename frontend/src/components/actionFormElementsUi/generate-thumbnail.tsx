import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function GenerateThumbnail({
  control,
  errors,
  cardId,
  actionsList,
  setIsSubscribed,
}: {
  control: any;
  errors: any;
  cardId: string;
  actionsList: any[];
  setIsSubscribed: (isSubscribed: boolean) => void;
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
            <Textarea
              onChange={(e) => {
                field.onChange(e);
                setIsSubscribed(false);
              }}
              placeholder="Enter Prompt"
              defaultValue={
                actionsList.find((action) => action.cardId === cardId)
                  ?.thumbnailPrompt
              }
            />
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
