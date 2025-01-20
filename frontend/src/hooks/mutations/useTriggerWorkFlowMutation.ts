import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { setTasksStatus } from "@/app/store/slices/trigger-card-slices/task-status-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export function useTriggerWorkFlowMutation() {
  const dispatch = useDispatch();
  const sessionToken = useSelector(
    (state: RootState) => state.sessionToken.sessionToken
  );
  return useMutation<
    any,
    Error,
    {
      workflowId: string;
      triggerState: {
        triggerType: string;
        workflowType: string;
        channelId: string;
        videoTitle: string;
      };
      actionsList: any;
    }
  >({
    mutationKey: ["triggerWorkflow"],
    mutationFn: async (data) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/trigger-workflow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken ?? ""}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to trigger workflow");
      }
      return response.json();
    },
    onSuccess: (data) => {
      dispatch(setTasksStatus(data));
      toast.success("Workflow triggered successfully!");
    },
  });
}
