import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateWorkFlowMutation(workflowId: string) {
  return useMutation<
    any,
    Error,
    {
      user_id: string;
      nodes: any;
      edges: any;
    }
  >({
    mutationKey: ["updateWorkflow"],
    mutationFn: (data) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-workflow`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, workflow_id: workflowId }),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      toast.success("Workflow updated successfully!");
    },
  });
}
