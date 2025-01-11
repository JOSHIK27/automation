import { useMutation } from "@tanstack/react-query";

export function useTaskStatusMutation({
  workflowId,
  cardId,
}: {
  workflowId: string;
  cardId: string;
}) {
  return useMutation({
    mutationKey: ["update-task-status"],
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/update-task-status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ workflowId, cardId }),
        }
      );
      return response.json();
    },
  });
}
