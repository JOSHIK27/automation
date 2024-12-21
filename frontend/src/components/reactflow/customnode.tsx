import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Handle, Position } from "@xyflow/react";
import { Separator } from "@/components/ui/separator";
import { BeatLoader } from "react-spinners";
import { BiCaptions, BiSolidImage } from "react-icons/bi";
import { RiDeleteBin6Line, RiVideoUploadLine } from "react-icons/ri";
import { IoPlayCircle } from "react-icons/io5";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { setTasksStatus } from "@/app/store/slices/trigger-card-slices/task-status-slice";
import { toast } from "sonner";
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
  const currentTaskStatus = taskStatus.find((task) => task.cardId === id);

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;
    if (currentTaskStatus && currentTaskStatus.status === "PENDING") {
      try {
        timerId = setInterval(() => {
          checkStatus();
        }, 2000);
      } catch (error) {
        console.error("Error setting up interval:", error);
      }
    }

    return () => {
      clearInterval(timerId);
    };
  }, [taskStatus]);

  const checkStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/result/${currentTaskStatus?.task_id}`
      );
      const data = await response.json();
      if (data.status === "SUCCESS") {
        const updatedTaskStatus = taskStatus.map((task) => {
          if (task.cardId === id) {
            return { ...task, status: "SUCCESS" };
          }
          return task;
        });
        dispatch(setTasksStatus(updatedTaskStatus));
      }
      return data;
    } catch (error) {
      console.error("Error checking status:", error);
    }
  };

  const isPlaceholderLabel = (label: string) => {
    return (
      label === "Select the event that you want to trigger" ||
      label === "Select the action that you want to perform"
    );
  };

  const getIconForLabel = (label: string) => {
    const iconProps = { className: "text-gray-400 text-[16px]" };

    switch (label) {
      case "Generate Captions":
        return <BiCaptions {...iconProps} />;
      case "Generate a thumbnail":
        return <BiSolidImage {...iconProps} />;
      default:
        return <RiVideoUploadLine {...iconProps} />;
    }
  };

  return (
    <div
      className={`
        ${
          data.selected
            ? "border-2 border-teal/40 ring-4 ring-teal/20"
            : "border border-gray-200/60"
        }
        bg-white/95 rounded-2xl w-[400px] p-7 relative
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        hover:shadow-[0_16px_40px_rgb(0,0,0,0.06)]
        hover:scale-[1.01]
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
          className="!w-6 !h-6 !border-[2px] !border-teal/60 !bg-white !rounded-full
            before:content-[''] before:absolute before:w-2.5 before:h-2.5 
            before:bg-gradient-to-br before:from-teal before:to-teal/80 
            before:rounded-full before:top-1/2 before:left-1/2 
            before:-translate-x-1/2 before:-translate-y-1/2"
        />
      )}

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div
            className={`
            flex items-center gap-2
            ${
              data.type === "Trigger"
                ? "bg-gradient-to-br from-teal/10 to-teal/5"
                : "bg-gradient-to-br from-gray-50 to-gray-100/50"
            }
            rounded-xl px-4 py-2.5
            border border-gray-100
            hover:translate-y-[-2px]
            hover:shadow-lg hover:shadow-teal/5
            transition-all duration-200
          `}
          >
            {data.type !== "Trigger" ? (
              <MdOutlineStickyNote2 className="text-teal text-lg" />
            ) : (
              <IoPlayCircle className="text-teal text-lg" />
            )}
            <span className="text-sm font-semibold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
              {data.type}
            </span>
          </div>
        </div>

        {currentTaskStatus && currentTaskStatus.status === "PENDING" ? (
          <div className="mr-2">
            <BeatLoader loading={true} size={8} color="#009688" />
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

      <Separator className="my-5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />

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
            w-fit py-3 px-5 rounded-xl
            hover:border-teal/30 hover:from-teal/5 hover:to-white
            hover:shadow-lg hover:shadow-teal/5
            hover:scale-[1.02]
            transition-all duration-200
          `}
          >
            {getIconForLabel(data.label)}
            <span className="text-sm font-medium bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
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
        className="!w-4 !h-4 !border-[2px] !border-teal/60 !bg-white"
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
