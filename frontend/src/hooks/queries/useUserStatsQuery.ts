import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export function useUserStatsQuery(session: any) {
  const sessionToken = useSelector(
    (state: RootState) => state.sessionToken.sessionToken
  );
  const {
    data: userStats,
    status: userStatsStatus,
    error: userStatsError,
  } = useQuery({
    queryKey: ["userStats"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user-stats?email=${session.user.email}`,
        {
          headers: {
            Authorization: `Bearer ${sessionToken ?? ""}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch user stats");
      return response.json();
    },
    enabled: !!session,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
  return { userStats, userStatsStatus, userStatsError };
}
