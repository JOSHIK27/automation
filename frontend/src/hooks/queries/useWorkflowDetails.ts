import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { sessionTokenName } from "@/lib/constants/common";

export function useWorkflowDetails(workflowId: string, userId: string) {
  const {
    data: workflowDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["workflowHistory", userId, workflowId],
    queryFn: async () => {
      const sessionToken = Cookies.get(sessionTokenName);
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workflow-history/${userId}?workflowId=${workflowId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionToken ?? ""}`,
          },
        }
      );
      return resp.json();
    },
    enabled: !!userId,
  });
  return { workflowDetails, isLoading, error };
}
