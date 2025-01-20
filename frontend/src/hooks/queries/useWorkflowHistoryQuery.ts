import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { sessionTokenName } from "@/lib/constants/common";

export function useWorkflowHistoryQuery(userId: string) {
  const {
    data: workflowHistory,
    status: workflowsStatus,
    error: workflowsError,
  } = useQuery({
    queryKey: ["history", userId],
    queryFn: async () => {
      const sessionToken = Cookies.get(sessionTokenName);
      const workflowHistoryResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workflow-history/${
          userId ?? "notsignedin"
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionToken ?? ""}`,
          },
        }
      );
      if (!workflowHistoryResponse.ok)
        throw new Error("Failed to fetch the history");
      return workflowHistoryResponse.json();
    },
    enabled: !!userId,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
  return { workflowHistory, workflowsStatus, workflowsError };
}
