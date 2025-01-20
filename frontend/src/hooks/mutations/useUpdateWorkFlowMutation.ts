import { sessionTokenName } from "@/lib/constants/common";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
export function useUpdateWorkFlowMutation(workflowId: string) {
  const sessionToken = useSelector(
    (state: RootState) => state.sessionToken.sessionToken
  );
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
      console.log("sessionToken", sessionToken);
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-workflow`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken ?? ""}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ ...data, workflow_id: workflowId }),
      }).then((res) => res.json());
    },
    onSuccess: (data) => {
      toast.success("Workflow updated successfully!");
    },
  });
}
