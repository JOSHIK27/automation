import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Handle, Position } from "@xyflow/react";
import { Separator } from "@/components/ui/separator";
import HashLoader from "react-spinners/HashLoader";
import { BiCaptions, BiSolidImage } from "react-icons/bi";
import { RiDeleteBin6Line, RiVideoUploadLine } from "react-icons/ri";
import { IoPlayCircle } from "react-icons/io5";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { setTasksStatus } from "@/app/store/slices/trigger-card-slices/task-status-slice";

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
            ? "border-2 border-teal/30 ring-2 ring-teal/20"
            : "border border-gray-200"
        }
        bg-white rounded-xl w-[400px] p-6 relative
        shadow-lg shadow-gray-100/50
        hover:shadow-xl hover:shadow-gray-200/50
        transition-all duration-300 ease-in-out
        backdrop-blur-sm
      `}
    >
      {data.type === "Action" && (
        <Handle
          onConnect={(params) => console.log("handle onConnect", params)}
          type="target"
          isConnectableStart
          position={Position.Top}
          className="!w-5 !h-5 !border-[2px] !border-teal/50 !bg-white !rounded-full
            before:content-[''] before:absolute before:w-2 before:h-2 
            before:bg-teal before:rounded-full before:top-1/2 
            before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
            hover:!border-teal transition-colors duration-200"
        />
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`
            flex items-center gap-1.5 
            ${data.type === "Trigger" ? "bg-teal/10" : "bg-gray-100"} 
            rounded-lg px-4 py-2 
            border border-gray-200/50
            hover:translate-y-[-1px]
            transition-all duration-200
          `}
          >
            {data.type !== "Trigger" ? (
              <MdOutlineStickyNote2 className="text-teal text-lg" />
            ) : (
              <IoPlayCircle className="text-teal text-lg" />
            )}
            <span className="text-sm font-semibold text-gray-700">
              {data.type}
            </span>
          </div>
        </div>

        {currentTaskStatus && currentTaskStatus.status === "PENDING" ? (
          <div className="mr-2">
            <HashLoader loading={true} size={20} color="#009688" />
          </div>
        ) : (
          <button className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 group">
            <RiDeleteBin6Line
              size={18}
              className="text-gray-400 group-hover:text-red-500 transition-colors"
            />
          </button>
        )}
      </div>

      <Separator className="my-4 bg-gray-100" />

      <div className="px-1">
        {isPlaceholderLabel(data.label) ? (
          <span className="text-sm text-gray-400 italic flex items-center gap-2">
            <MdOutlineStickyNote2 className="text-gray-300" />
            No Description
          </span>
        ) : (
          <div
            className={`
            flex items-center gap-2.5 
            bg-gradient-to-r from-gray-50 to-white
            border border-gray-200/70
            w-fit py-2.5 px-4 rounded-lg
            hover:border-teal/20 hover:from-teal/5 hover:to-white
            transition-all duration-200
          `}
          >
            {getIconForLabel(data.label)}
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
        className="!w-3 !h-3 !border-[2px] !border-teal/50 !bg-white
          hover:!border-teal transition-colors duration-200"
      />
    </div>
  );
}
