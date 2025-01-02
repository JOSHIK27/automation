import { useQuery } from "@tanstack/react-query";

export function useWorkflowDetails(workflowId: string, userId: string) {
  const {
    data: workflowDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["workflowHistory", userId, workflowId],
    queryFn: async () => {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workflow-history/${userId}?workflowId=${workflowId}`
      );
      return resp.json();
    },
    enabled: !!userId,
  });
  return { workflowDetails, isLoading, error };
}
