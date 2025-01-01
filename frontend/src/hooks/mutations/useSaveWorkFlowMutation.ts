import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSaveWorkFlowMutation() {
  return useMutation<
    any,
    Error,
    {
      user_id: string;
      nodes: any;
      edges: any;
    }
  >({
    mutationKey: ["saveWorkflow"],
    mutationFn: (data) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-workflow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      toast.success("Workflow saved successfully!");
    },
  });
}
