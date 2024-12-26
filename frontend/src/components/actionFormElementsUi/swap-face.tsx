import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { setIsSubscribed } from "@/app/store/slices/trigger-card-slices/update-btn-slice";
import { useDispatch } from "react-redux";

export default function SwapFace({
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
          Enter Source Image URL
        </label>
        <Controller
          control={control}
          name="sourceImageUrl"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Input
              disabled={isSubscribed}
              onChange={(e) => {
                field.onChange(e.target.value);
                dispatch(
                  setIsSubscribed({
                    cardId: Number(cardId),
                    isSubscribed: false,
                  })
                );
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
              disabled={isSubscribed}
              onChange={(e) => {
                field.onChange(e.target.value);
                dispatch(
                  setIsSubscribed({
                    cardId: Number(cardId),
                    isSubscribed: false,
                  })
                );
              }}
            />
          )}
        />
      </div>
    </>
  );
}
