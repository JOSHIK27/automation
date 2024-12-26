import { Controller } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { setIsSubscribed } from "@/app/store/slices/trigger-card-slices/update-btn-slice";
import { useDispatch } from "react-redux";

export default function GenerateThumbnail({
  control,
  errors,
  cardId,
  actionsList,
  isSubscribed,
}: {
  control: any;
  errors: any;
  cardId: string;
  actionsList: any[];
  isSubscribed: boolean;
}) {
  const dispatch = useDispatch();
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
              disabled={isSubscribed}
              onChange={(e) => {
                field.onChange(e);
                dispatch(
                  setIsSubscribed({
                    cardId: Number(cardId),
                    isSubscribed: false,
                  })
                );
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
