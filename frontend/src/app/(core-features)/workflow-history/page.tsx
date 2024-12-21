"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BsSearch, BsPlus, BsClock, BsPlayFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

// Sample workflow data
const sampleWorkflows = [
  {
    id: 1,
    name: "YouTube Video Publishing",
    description:
      "Automatically publish videos to YouTube with custom thumbnails and descriptions",
    lastRun: "2 hours ago",
    status: "active",
    runs: 245,
  },
  {
    id: 2,
    name: "Blog Post Distribution",
    description:
      "Share blog posts across Medium, Dev.to, and social media platforms",
    lastRun: "1 day ago",
    status: "active",
    runs: 189,
  },
  {
    id: 3,
    name: "Social Media Content",
    description:
      "Schedule and post content across Twitter, LinkedIn, and Instagram",
    lastRun: "3 days ago",
    status: "paused",
    runs: 567,
  },
  {
    id: 4,
    name: "Newsletter Campaign",
    description:
      "Generate and send personalized newsletters to subscriber segments",
    lastRun: "1 week ago",
    status: "active",
    runs: 89,
  },
];

export default function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkflows = sampleWorkflows.filter(
    (workflow) =>
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
            {filteredWorkflows.map((workflow) => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowCard({ workflow }: { workflow: (typeof sampleWorkflows)[0] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:border-teal-500 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-neutral-900">
          {workflow.name}
        </h3>
        <div
          className={cn(
            "px-3 py-1 rounded-full text-sm",
            workflow.status === "active"
              ? "bg-teal-100 text-teal-700"
              : "bg-neutral-100 text-neutral-700"
          )}
        >
          {workflow.status}
        </div>
      </div>
      <p className="text-neutral-600 mb-6">{workflow.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-neutral-500">
            <BsClock className="mr-2" />
            {workflow.lastRun}
          </div>
          <div className="text-sm text-neutral-500">{workflow.runs} runs</div>
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
