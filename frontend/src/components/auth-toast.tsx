"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function AuthToast() {
  const { data: session, status } = useSession();
  const toastShownRef = useRef(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user && !toastShownRef.current) {
      toast.success(`You are signed in!`, {
        duration: 3000,
        icon: "🎉",
      });
      toastShownRef.current = true;
    } else if (status === "unauthenticated") {
      toastShownRef.current = false;
    }
  }, [status, session]);

  return null;
}
