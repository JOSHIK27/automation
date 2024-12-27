"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { sessionTokenName } from "@/lib/constants/common";
import Cookies from "js-cookie";

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const sessionToken = Cookies.get(sessionTokenName);

  const { data: userStats, isLoading } = useQuery({
    queryKey: ["userStats"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user-stats`,
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
  });

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#008080" />
      </div>
    );
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F5F1] pt-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50 mb-6">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-teal-50 flex items-center justify-center border-2 border-teal-100">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user?.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl text-teal-600">
                  {session.user?.name?.[0].toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {session.user?.name}
              </h1>
              <p className="text-gray-500">{session.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            title="Total Workflows"
            value={userStats?.totalWorkflows || 0}
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            }
          />
          <StatCard
            title="Active Workflows"
            value={userStats?.activeWorkflows || 0}
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
          <StatCard
            title="Tasks Completed"
            value={userStats?.tasksCompleted || 0}
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            }
          />
        </div>

        {/* Account Settings */}
        <Card className="bg-white rounded-2xl shadow-sm border border-gray-200/50">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Account Settings
            </h2>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive notifications about your workflow status
                  </p>
                </div>
                <Button variant="outline">Manage</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Subscription Plan
                  </h3>
                  <p className="text-sm text-gray-500">
                    {userStats?.subscriptionPlan || "Free Plan"}
                  </p>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Upgrade
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/50">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-teal-50 rounded-lg text-teal-600">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
