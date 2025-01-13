"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useUserId } from "@/hooks/custom/useUserId";
import { HashLoader } from "react-spinners";

export default function Page() {
  const { data: session } = useSession();
  const { userId, userError, userStatus } = useUserId(session);
  useEffect(() => {
    if (userStatus === "success") {
      const ws = new WebSocket(`ws://localhost:8000/ws?userId=${userId}`);
      console.log("hi");
      ws.onmessage = (event) => {
        console.log(event.data);
      };
    }
  }, [userStatus]);

  if (userStatus === "pending") {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#009688" />
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-2 min-h-screen justify-center items-center">
      <label className="text-2xl font-bold">Message</label>
      <input className="border border-gray-300 rounded-md p-2" type="text" />
      <button className="bg-blue-500 text-white rounded-md p-2" type="submit">
        Send
      </button>
    </form>
  );
}
