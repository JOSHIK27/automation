"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useUserId } from "@/hooks/custom/useUserId";
import { HashLoader } from "react-spinners";

export default function Page() {
  const { data: session } = useSession();
  const { userId, userError, userStatus } = useUserId(session);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    if (userStatus === "success") {
      const wsInstance = new WebSocket(
        `ws://localhost:8000/ws?userId=${userId}`
      );
      wsInstance.onmessage = (event) => {
        console.log(event.data);
      };
      setWs(wsInstance);
      return () => wsInstance.close();
    }
  }, [userStatus]);

  if (userStatus === "pending") {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#009688" />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ws?.send(message);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 min-h-screen justify-center items-center"
    >
      <label className="text-2xl font-bold">Message</label>
      <input
        onChange={(e) => setMessage(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
        type="text"
      />
      <button className="bg-blue-500 text-white rounded-md p-2" type="submit">
        Send
      </button>
    </form>
  );
}
