import { useMutation } from "@tanstack/react-query";

export function useAddUserMutation(session: any) {
  return useMutation({
    mutationKey: ["user"],
    mutationFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        body: JSON.stringify(session.user),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  });
}
