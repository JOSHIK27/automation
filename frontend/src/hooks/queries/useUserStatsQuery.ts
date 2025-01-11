import { useQuery } from "@tanstack/react-query";
import { sessionTokenName } from "@/lib/constants/common";
import Cookies from "js-cookie";

export function useUserStatsQuery(session: any) {
  const sessionToken = Cookies.get(sessionTokenName);
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
