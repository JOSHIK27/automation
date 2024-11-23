import { Handle, Position } from "@xyflow/react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Separator } from "./ui/separator";
import { IoPlayCircle } from "react-icons/io5";
import { MdOutlineStickyNote2 } from "react-icons/md";

export default function CustomNode({
  data,
}: {
  data: { label: string; type: string; selected: boolean };
}) {
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
        <button className="p-1.5 hover:bg-gray-50 rounded-full transition-all duration-200 hover:rotate-12">
          <RiDeleteBin6Line
            size={18}
            className="text-teal hover:text-red-500"
          />
        </button>
      </div>
      <Separator className="my-3" />
      <span className="text-[13px] font-[400] text-gray-600 block leading-relaxed">
        {data.label === "Select the event that you want to trigger" ||
        data.label === "Select the action that you want to perform"
          ? "No Description"
          : data.label}
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
