import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Handle, Position } from "@xyflow/react";
import { Separator } from "@/components/ui/separator";
import { BeatLoader } from "react-spinners";
import { BiCaptions, BiSolidImage } from "react-icons/bi";
import { RiDeleteBin6Line, RiVideoUploadLine } from "react-icons/ri";
import { IoPlayCircle } from "react-icons/io5";
import { MdOutlineStickyNote2, MdFace, MdSummarize } from "react-icons/md";
import { FaVideo, FaLightbulb, FaSearch, FaClock } from "react-icons/fa";
import { setTasksStatus } from "@/app/store/slices/trigger-card-slices/task-status-slice";
import { toast } from "sonner";
import { useCurrentTaskQuery } from "@/hooks/queries/useCurrentTaskQuery";
import { useTaskStatusMutation } from "@/hooks/mutations/useTaskStatusMutation";
import { useEffect, useState } from "react";
import { useTaskStatusQuery } from "@/hooks/queries/useTaskStatusQuery";
import { usePathname } from "next/navigation";

export default function CustomNode({
  data,
  id,
}: {
  data: {
    label: string;
    type: string;
    selected: boolean;
    prompt?: string;
  };
  id: string;
}) {
  const workflowId = useSelector(
    (state: RootState) => state.workflowName.workflowId
  );
  const { data: currentTaskStatus } = useTaskStatusQuery(workflowId, id); // returns from task_status collections
  const { ts } = useCurrentTaskQuery(currentTaskStatus); // returns from celery polling
  const result = ts?.result;
  const isPlaceholderLabel = (label: string) => {
    return (
      label === "Select the event that you want to trigger" ||
      label === "Select the action that you want to perform"
    );
  };

  const getIconForLabel = (label: string) => {
    const iconProps = { className: "w-4 h-4 text-gray-600" };

    // Trigger types
    switch (label) {
      // Triggers
      case "Plan a video":
        return <FaVideo {...iconProps} className="w-4 h-4 text-blue-500" />;
      case "Generate Content Ideas":
        return (
          <FaLightbulb {...iconProps} className="w-4 h-4 text-yellow-500" />
        );
      case "When a video is uploaded":
        return (
          <RiVideoUploadLine
            {...iconProps}
            className="w-4 h-4 text-green-500"
          />
        );

      // Actions
      case "Generate thumbnail":
        return (
          <BiSolidImage {...iconProps} className="w-4 h-4 text-purple-500" />
        );
      case "Generate captions":
        return <BiCaptions {...iconProps} className="w-4 h-4 text-blue-500" />;
      case "Generate SEO optimized title":
      case "Generate SEO optimized keywords":
        return <FaSearch {...iconProps} className="w-4 h-4 text-blue-500" />;
      case "Generate summary":
        return (
          <MdSummarize {...iconProps} className="w-4 h-4 text-green-500" />
        );
      case "Generate timestamps":
        return <FaClock {...iconProps} className="w-4 h-4 text-red-500" />;
      case "Swap face":
        return <MdFace {...iconProps} className="w-4 h-4 text-orange-500" />;
      case "Analyse my channel videos and generate ideas":
        return (
          <FaLightbulb {...iconProps} className="w-4 h-4 text-yellow-500" />
        );
      default:
        return <MdOutlineStickyNote2 {...iconProps} />;
    }
  };

  return (
    <div
      className={`
        ${
          data.selected
            ? "ring-2 ring-teal-500/20 shadow-[0_0_0_1px_rgba(20,184,166,0.4)]"
            : "ring-1 ring-gray-950/5"
        }
        bg-gradient-to-b from-white via-white to-gray-50/80
        backdrop-blur-xl
        rounded-2xl w-[420px] relative
        shadow-[0_4px_20px_rgba(0,0,0,0.03)]
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        group
        transition-all duration-300 ease-out
      `}
    >
      {/* Premium glass effect header */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-teal-500/10 to-transparent" />

      {/* Handle for Action nodes */}
      {data.type === "Action" && (
        <Handle
          type="target"
          position={Position.Top}
          className="!w-3 !h-3 !border !border-teal-500/30 !bg-white !rounded-full
            before:content-[''] before:absolute before:w-1.5 before:h-1.5 
            before:bg-teal-500/40 before:rounded-full before:top-1/2 before:left-1/2 
            before:-translate-x-1/2 before:-translate-y-1/2
            hover:!border-teal-500/50 hover:before:bg-teal-500/60
            transition-all duration-200"
        />
      )}

      <div className="p-5">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className={`
                flex items-center gap-2 px-3 py-1.5
                ${
                  data.type === "Trigger"
                    ? "bg-gradient-to-br from-teal-50 to-emerald-50/50"
                    : "bg-gradient-to-br from-gray-50 to-slate-50/50"
                }
                rounded-lg
                ring-1 ring-gray-950/5
                group-hover:ring-teal-500/20
                transition-all duration-200
              `}
            >
              {data.type !== "Trigger" ? (
                <MdOutlineStickyNote2 className="text-teal-600/80 text-sm" />
              ) : (
                <IoPlayCircle className="text-teal-600/80 text-sm" />
              )}
              <span className="text-xs font-medium text-gray-600">
                {data.type}
              </span>
            </div>
          </div>

          {/* Status Indicators */}
          {result ? (
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium 
              bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-600
              ring-1 ring-emerald-500/20 group-hover:ring-emerald-500/30
              transition-all duration-200"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Complete</span>
            </div>
          ) : ts ? (
            ts.status !== "SUCCESS" || ts.status === "Yet to be processed" ? (
              <div className="flex items-center gap-2">
                {ts.status === "Yet to be processed" ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#069494]/10 text-[#069494]">
                    Yet to be processed
                  </span>
                ) : (
                  <BeatLoader loading={true} size={6} color="#069494" />
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  if (id === "1" || id === "2") {
                    toast.error("You cannot delete the default tasks");
                  }
                }}
                className="p-2.5 hover:bg-red-50/80 rounded-xl transition-all duration-200 group"
              >
                <RiDeleteBin6Line
                  size={16}
                  className="text-gray-400 group-hover:text-red-500 group-hover:rotate-12 transition-all"
                />
              </button>
            )
          ) : currentTaskStatus?.status === "Yet to be processed" ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#069494]/10 text-[#069494]">
              Yet to be processed
            </span>
          ) : null}
        </div>

        {/* Separator with gradient */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200/60 to-transparent my-4" />

        {/* Content Section */}
        <div className="px-1">
          {isPlaceholderLabel(data.label) ? (
            <span className="text-sm text-gray-400 italic flex items-center gap-2.5 px-2">
              <MdOutlineStickyNote2 className="text-gray-300" />
              Select an action
            </span>
          ) : (
            <div
              className={`
              flex items-center gap-3
              bg-gradient-to-br from-gray-50/80 via-white to-gray-50/80
              ring-1 ring-gray-950/5 group-hover:ring-teal-500/20
              w-fit py-2.5 px-4 rounded-xl
              group-hover:shadow-lg group-hover:shadow-teal-500/5
              transition-all duration-200
            `}
            >
              <div
                className={`
                p-2 rounded-lg
                ${data.type === "Trigger" ? "bg-teal-50/80" : "bg-gray-50/80"}
                transition-colors duration-200
              `}
              >
                {getIconForLabel(data.label)}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {data.label}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !border !border-teal-500/30 !bg-white !rounded-full
          hover:!border-teal-500/50
          transition-colors duration-200"
      />
    </div>
  );
}
