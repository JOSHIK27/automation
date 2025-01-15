import { useQuery } from "@tanstack/react-query";

export function useTaskStatusQuery(workflowId: string, cardId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["taskStatus", workflowId, cardId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/task-status/${workflowId}/${cardId}`
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
