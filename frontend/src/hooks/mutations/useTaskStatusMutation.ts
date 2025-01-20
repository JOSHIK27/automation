import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { sessionTokenName } from "@/lib/constants/common";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export function useTaskStatusMutation({
  workflowId,
  cardId,
}: {
  workflowId: string;
  cardId: string;
}) {
  const sessionToken = useSelector(
    (state: RootState) => state.sessionToken.sessionToken
  );
  return useMutation({
    mutationKey: ["update-task-status"],
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/update-task-status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken ?? ""}`,
          },
          body: JSON.stringify({ workflowId, cardId }),
        }
      );
      return response.json();
    },
  });
}
