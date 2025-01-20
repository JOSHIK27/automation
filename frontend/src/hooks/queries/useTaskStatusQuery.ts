import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { sessionTokenName } from "@/lib/constants/common";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export function useTaskStatusQuery(workflowId: string, cardId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["taskStatus", workflowId, cardId],
    queryFn: async () => {
      const sessionToken = useSelector(
        (state: RootState) => state.sessionToken.sessionToken
      );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/task-status/${workflowId}/${cardId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionToken ?? ""}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch task status");
      }
      return response.json();
    },
    enabled: !!workflowId && !!cardId,
    staleTime: 0,
  });

  return { data, isLoading, error };
}
