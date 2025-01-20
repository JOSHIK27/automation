import { sessionTokenName } from "@/lib/constants/common";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Cookies from "js-cookie";
export function usePubSubHubBubSubscribeMutation() {
  const sessionToken = Cookies.get(sessionTokenName);
  return useMutation<{ channel_id: string }, Error, { channel_id: string }>({
    mutationKey: ["pubsubhubbub"],
    mutationFn: async (data: { channel_id: string }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken ?? ""}`,
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
