import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Handle, Position } from "@xyflow/react";
import { Separator } from "@/components/ui/separator";
import { BeatLoader } from "react-spinners";
import { BiCaptions, BiSolidImage } from "react-icons/bi";
import {
  RiDeleteBin6Line,
  RiErrorWarningLine,
  RiVideoUploadLine,
} from "react-icons/ri";
import { IoPlayCircle } from "react-icons/io5";
import { MdOutlineStickyNote2, MdFace, MdSummarize } from "react-icons/md";
import { FaVideo, FaLightbulb, FaSearch, FaClock } from "react-icons/fa";
import { setTasksStatus } from "@/app/store/slices/trigger-card-slices/task-status-slice";
import { toast } from "sonner";
import { useCurrentTaskQuery } from "@/hooks/queries/useCurrentTaskQuery";

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
  const dispatch = useDispatch();
  const taskStatus = useSelector((state: RootState) => state.taskstatus);
  console.log(taskStatus);
  const currentTaskStatus = taskStatus?.find((task: any) => task.cardId === id);

  const { ts, status, error } = useCurrentTaskQuery(currentTaskStatus);

  if (status === "success") {
    if (ts.status === "SUCCESS") {
      const updatedTaskStatus = taskStatus.map((task) => {
        if (task.cardId === id) {
          return { ...task, status: "SUCCESS" };
        }
        return task;
      });
      dispatch(setTasksStatus(updatedTaskStatus));
    }
  }

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
            ? "border-2 border-[#069494] ring-4 ring-[#069494]/20"
            : "border border-gray-200/60"
        }
        bg-white/95 rounded-xl w-[400px] p-6 relative
        shadow-[0_8px_30px_rgb(0,0,0,0.06)]
        hover:shadow-[0_16px_40px_rgb(0,0,0,0.08)]
        hover:scale-[1.02]
        transition-all duration-300 ease-out
        backdrop-blur-lg
      `}
    >
      {data.type === "Action" && (
        <Handle
          onConnect={(params) => console.log("handle onConnect", params)}
          type="target"
          isConnectableStart
          position={Position.Top}
          className="!w-5 !h-5 !border-[2px] !border-[#069494] !bg-white !rounded-full
            before:content-[''] before:absolute before:w-2 before:h-2 
            before:bg-gradient-to-br before:from-[#069494] before:to-[#40E0D0] 
            before:rounded-full before:top-1/2 before:left-1/2 
            before:-translate-x-1/2 before:-translate-y-1/2"
        />
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`
              flex items-center gap-2
              ${
                data.type === "Trigger"
                  ? "bg-gradient-to-br from-[#069494]/10 to-[#40E0D0]/5"
                  : "bg-gradient-to-br from-gray-50 to-gray-100/50"
              }
              rounded-lg px-4 py-2
              border border-gray-100
              hover:translate-y-[-2px]
              hover:shadow-lg hover:shadow-[#069494]/10
              transition-all duration-200
            `}
          >
            {data.type !== "Trigger" ? (
              <MdOutlineStickyNote2 className="text-teal text-lg" />
            ) : (
              <IoPlayCircle className="text-teal text-lg" />
            )}
            <span className="text-sm font-medium bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {data.type}
            </span>
          </div>
        </div>

        {currentTaskStatus &&
        (currentTaskStatus.status === "PENDING" ||
          currentTaskStatus.status === "Yet to be processed") ? (
          <div className="flex items-center gap-2 mr-2">
            {currentTaskStatus.status === "Yet to be processed" ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#069494]/10 text-[#069494]">
                Yet to be processed
              </span>
            ) : (
              <BeatLoader loading={true} size={8} color="#009688" />
            )}
          </div>
        ) : (
          <button
            onClick={() => {
              if (id === "1" || id === "2") {
                toast.error("You cannot delete the default tasks");
              }
            }}
            className="p-2.5 hover:bg-red-50 rounded-xl transition-all duration-200 group"
          >
            <RiDeleteBin6Line
              size={18}
              className="text-gray-400 group-hover:text-red-500 group-hover:rotate-12 transition-all"
            />
          </button>
        )}
      </div>

      <Separator className="my-4 bg-gradient-to-r from-[#069494]/10 via-[#40E0D0]/20 to-[#069494]/10" />

      <div className="px-1">
        {isPlaceholderLabel(data.label) ? (
          <span className="text-sm text-gray-400 italic flex items-center gap-2.5 px-2">
            <MdOutlineStickyNote2 className="text-gray-300" />
            No Description
          </span>
        ) : (
          <div
            className={`
              flex items-center gap-3
              bg-gradient-to-br from-gray-50 via-white to-gray-50
              border border-gray-200/60
              w-fit py-2.5 px-4 rounded-lg
              hover:border-[#069494]/30 hover:from-[#069494]/5 hover:to-white
              hover:shadow-lg hover:shadow-[#069494]/5
              hover:scale-[1.02]
              transition-all duration-200
              ${
                data.type === "Trigger"
                  ? "hover:from-blue-50/20 hover:to-white"
                  : ""
              }
            `}
          >
            <div
              className={`
              p-2 rounded-lg
              ${data.type === "Trigger" ? "bg-blue-50" : "bg-gray-50"}
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

      <Handle
        onConnect={(params) => console.log("handle onConnect", params)}
        type="source"
        isConnectableEnd
        position={Position.Bottom}
        className="!w-4 !h-4 !border-[2px] !border-[#069494] !bg-white !rounded-full"
      />

      {false && (
        <div className="mt-4">
          <Separator className="my-4 bg-gray-100" />

          <button
            onClick={() => {
              /* Add your result view/copy logic */
            }}
            className="group flex w-full items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 transition-all duration-200 hover:border-teal/20 hover:bg-teal/5"
          >
            <div className="flex items-center gap-2.5">
              <svg
                className="h-4 w-4 text-teal"
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
              <span className="text-sm text-gray-600">View result</span>
            </div>
            <svg
              className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
