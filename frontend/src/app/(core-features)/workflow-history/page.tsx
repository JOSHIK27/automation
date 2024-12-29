"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BsSearch, BsPlus, BsClock, BsPlayFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { sessionTokenName } from "@/lib/constants/common";
import Cookies from "js-cookie";

type Workflow = {
  name: string;
  description: string;
  created_at: string;
  workflow_id: string;
  nodes: any[];
  edges: any[];
};

export default function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  const sessionToken = Cookies.get(sessionTokenName);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#000000" />
      </div>
    );
  }

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["workflowhistory"],
    queryFn: async () => {
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        {
          method: "POST",
          body: JSON.stringify(session?.user),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken ?? "notsignedin"}`,
          },
        }
      );
      const { user_id } = await userResponse.json();

      const workflowHistoryResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workflow-history/${
          user_id ?? "notsignedin"
        }`,
        {
          method: "GET",
        }
      );
      if (!workflowHistoryResponse.ok)
        throw new Error("Failed to fetch the history");
      return workflowHistoryResponse.json();
    },
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, []);

  if (isFetching || !data)
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#36d7b7" />
      </div>
    );

  const filteredWorkflows = data.workflow_history.filter(
    (workflow: Workflow) =>
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="pt-28 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Your Workflows
              </h1>
              <p className="text-neutral-600">
                Manage and monitor your automated content workflows
              </p>
            </div>
            <Button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 transition-all duration-300">
              <BsPlus className="mr-2 text-lg" /> Create Workflow
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="mb-8 max-w-md">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search workflows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredWorkflows.map((workflow: Workflow, index: number) => (
              <WorkflowCard key={index} workflow={workflow} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowCard({ workflow }: { workflow: Workflow }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:border-teal-500 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-neutral-900">
          {workflow.name}
        </h3>
        <div
          className={cn(
            "px-3 py-1 rounded-full text-sm bg-neutral-100 text-neutral-700"
            // workflow.status === "active"
            //   ? "bg-teal-100 text-teal-700"
            //   : "bg-neutral-100 text-neutral-700"
          )}
        >
          {"Pending"}
        </div>
      </div>
      <p className="text-neutral-600 mb-6">{workflow.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-neutral-500">
            <BsClock className="mr-2" />
            {workflow.created_at}
          </div>
          <div className="text-sm text-neutral-500">{"0"} runs</div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-teal-50 hover:text-teal-600"
        >
          <BsPlayFill className="mr-2" /> Run Now
        </Button>
      </div>
    </div>
  );
}
