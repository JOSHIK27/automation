import { useQuery } from "@tanstack/react-query";

export function useCurrentTaskQuery(currentTaskStatus: any) {
  const {
    data: ts,
    status,
    error,
  } = useQuery({
    queryKey: ["task-status", currentTaskStatus?.task_id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8000/result/${currentTaskStatus?.task_id}`
      );
      return response.json();
    },
    enabled: !!currentTaskStatus?.task_id,
    refetchInterval: currentTaskStatus?.status === "SUCCESS" ? false : 2000,
  });
  return { ts, status, error };
}
