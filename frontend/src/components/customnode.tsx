import { Handle, Position } from "@xyflow/react";
import { BiCaptions } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Separator } from "./ui/separator";
import { IoPlayCircle } from "react-icons/io5";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { BiSolidImage } from "react-icons/bi";
import { RiVideoUploadLine } from "react-icons/ri";
import HashLoader from "react-spinners/HashLoader";
import { GridLoader } from "react-spinners";
import { useState } from "react";

export default function CustomNode({
  data,
}: {
  data: { label: string; type: string; selected: boolean };
}) {
  const [loading, setLoading] = useState(true);
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
      className={`${
        data.selected
          ? "border-[1.5px] border-gray-400"
          : "border border-gray-200"
      } bg-white rounded-[8px] w-[400px] p-5 relative shadow-[0_10px_40px_-5px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.2)] transition-all duration-300`}
    >
      {data.type === "Action" && (
        <Handle
          onConnect={(params) => console.log("handle onConnect", params)}
          type="target"
          isConnectableStart
          position={Position.Top}
          className="!w-2 !h-2 !border-[2px] !border-teal !bg-white"
        />
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200 hover:bg-gray-100 transition-all duration-200 hover:translate-y-[-2px]">
          {data.type !== "Trigger" ? (
            <MdOutlineStickyNote2 className="text-teal text-[18px]" />
          ) : (
            <IoPlayCircle className="text-teal text-[18px]" />
          )}
          <span className="text-sm font-medium text-gray-600">{data.type}</span>
        </div>
        {loading ? (
          <HashLoader loading={true} size={18} color="#009688" />
        ) : (
          <button className="p-1.5 hover:bg-gray-50 rounded-full transition-all duration-200 hover:rotate-12">
            <RiDeleteBin6Line
              size={18}
              className="text-teal hover:text-red-500"
            />
          </button>
        )}
      </div>
      <Separator className="my-3" />
      <span
        className={`
          flex items-center gap-2 text-sm font-medium text-gray-600
          ${
            isPlaceholderLabel(data.label)
              ? "italic text-gray-400"
              : "bg-gray-50 border border-gray-200 w-fit py-2 px-3 rounded-lg hover:bg-gray-100 transition-all duration-200"
          }
        `}
      >
        {!isPlaceholderLabel(data.label) && (
          <>
            {getIconForLabel(data.label)}
            {data.label}
          </>
        )}
        {isPlaceholderLabel(data.label) && "No Description"}
      </span>
      <Handle
        onConnect={(params) => console.log("handle onConnect", params)}
        type="source"
        isConnectableEnd
        position={Position.Bottom}
        className="!w-2 !h-2 !border-[2px] !border-teal !bg-white"
      />
    </div>
  );
}
