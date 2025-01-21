import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { updateStartFetching } from "@/app/store/slices/startfetching-slice";

export function useCurrentTaskQuery(currentTaskStatus: any) {
  const startFetching = useSelector((state: RootState) => state.startFetching);
  const dispatch = useDispatch();
  const sessionToken = useSelector(
    (state: RootState) => state.sessionToken.sessionToken
  );
  const query = useQuery({
    queryKey: ["task-status", currentTaskStatus?.task_id],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/result/${currentTaskStatus?.task_id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionToken ?? ""}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return response.json();
    },
    enabled:
      !!currentTaskStatus?.task_id &&
      (currentTaskStatus?.status === "PENDING" ||
        startFetching.find((item) => item.id === currentTaskStatus?.cardId)
          ?.startFetching),
    refetchInterval: (data: any) =>
      data?.state?.data?.status === "SUCCESS" ||
      data?.state?.data?.status === "EXPIRED"
        ? false
        : 2000,
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
