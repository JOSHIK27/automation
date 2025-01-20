import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { updateStartFetching } from "@/app/store/slices/startfetching-slice";

export function useCurrentTaskQuery(currentTaskStatus: any) {
  const startFetching = useSelector((state: RootState) => state.startFetching);
  const dispatch = useDispatch();
  const query = useQuery({
    queryKey: ["task-status", currentTaskStatus?.task_id],
    queryFn: async () => {
      const response = await fetch(
        `https://${process.env.API_URL}/result/${currentTaskStatus?.task_id}`
      );
      return response.json();
    },
    enabled:
      !!currentTaskStatus?.task_id &&
      (currentTaskStatus?.status === "PENDING" ||
        startFetching.find((item) => item.id === currentTaskStatus?.cardId)
          ?.startFetching),
    refetchInterval: (data: any) =>
      data?.state?.data?.status === "SUCCESS" ? false : 2000,
  });
  if (query.data?.status === "SUCCESS") {
    dispatch(
      updateStartFetching({
        id: currentTaskStatus?.cardId,
        startFetching: false,
      })
    );
  }

  return { latestStatus: query.data, status: query.status, error: query.error };
}
