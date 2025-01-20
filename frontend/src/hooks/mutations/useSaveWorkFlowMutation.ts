import { setWorkflowName } from "@/app/store/slices/workflow-slice";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { sessionTokenName } from "@/lib/constants/common";

export function useSaveWorkFlowMutation() {
  const sessionToken = Cookies.get(sessionTokenName);
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken ?? ""}`,
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      toast.success("Workflow saved successfully!");
    },
  });
}
