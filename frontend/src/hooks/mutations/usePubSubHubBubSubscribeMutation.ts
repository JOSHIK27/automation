import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function usePubSubHubBubSubscribeMutation() {
  return useMutation<{ channel_id: string }, Error, { channel_id: string }>({
    mutationKey: ["pubsubhubbub"],
    mutationFn: async (data: { channel_id: string }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Waiting for video to be uploaded in youtube channel");
    },
  });
}
