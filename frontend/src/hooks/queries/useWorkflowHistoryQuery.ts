import { useQuery } from "@tanstack/react-query";

export function useWorkflowHistoryQuery(userId: string) {
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
