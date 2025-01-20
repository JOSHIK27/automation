import { sessionTokenName } from "@/lib/constants/common";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Cookies from "js-cookie";
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
    mutationFn: (data) => {
      const sessionToken = Cookies.get(sessionTokenName);
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-workflow`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken ?? ""}`,
        },
        body: JSON.stringify({ ...data, workflow_id: workflowId }),
      }).then((res) => res.json());
    },
    onSuccess: (data) => {
      toast.success("Workflow updated successfully!");
    },
  });
}
