import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export function useWorkflowHistoryQuery(userId: string) {
  const sessionToken = useSelector(
    (state: RootState) => state.sessionToken.sessionToken
  );
  const {
    data: workflowHistory,
    status: workflowsStatus,
    error: workflowsError,
  } = useQuery({
    queryKey: ["history", userId],
    queryFn: async () => {
      const workflowHistoryResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workflow-history/${
          userId ?? "notsignedin"
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionToken ?? ""}`,
            "Access-Control-Allow-Origin": "*",
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
