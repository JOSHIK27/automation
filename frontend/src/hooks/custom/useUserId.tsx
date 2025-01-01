import { sessionTokenName } from "@/lib/constants/common";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

export function useUserId(session: any) {
  const {
    data: userData,
    status: userStatus,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        {
          method: "POST",
          body: JSON.stringify(session?.user),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              Cookies.get(sessionTokenName) ?? "notsignedin"
            }`,
          },
        }
      );
      return userResponse.json();
    },
    enabled: !!session,
  });
  return { userId: userData?.user_id ?? "", userStatus, userError };
}
