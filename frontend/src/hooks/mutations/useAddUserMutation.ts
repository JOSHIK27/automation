import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { sessionTokenName } from "@/lib/constants/common";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export function useAddUserMutation(session: any) {
  const sessionToken = useSelector(
    (state: RootState) => state.sessionToken.sessionToken
  );
  console.log(sessionToken);
  return useMutation({
    mutationKey: ["user"],
    mutationFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        body: JSON.stringify(session.user),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken ?? ""}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.json();
    },
  });
}
