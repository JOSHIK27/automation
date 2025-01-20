import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export function useWorkflowDetails(workflowId: string, userId: string) {
  const {
    data: workflowDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["workflowHistory", userId, workflowId],
    queryFn: async () => {
      const sessionToken = useSelector(
        (state: RootState) => state.sessionToken.sessionToken
      );
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workflow-history/${userId}?workflowId=${workflowId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionToken ?? ""}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return resp.json();
    },
    enabled: !!userId,
  });
  return { workflowDetails, isLoading, error };
}
