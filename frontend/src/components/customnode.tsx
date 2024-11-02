import { Handle, Position } from "@xyflow/react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CustomNode({
  data,
}: {
  data: { label: string; type: string };
}) {
  return (
    <div className="bg-[#FFFDF8] rounded-lg w-[400px] py-5 px-6 relative shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] border border-gray-200 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] transition-all duration-300">
      <Handle
        onConnect={(params) => console.log("handle onConnect", params)}
        type="target"
        isConnectableStart
        position={Position.Top}
        className="w-4 h-4 bg-gray-400 border-2 border-white hover:scale-110 transition-transform duration-200"
      />
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5 bg-gray-100 rounded-md px-4 py-2 border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:translate-y-[-1px]">
          <BsFillPlusCircleFill className="text-gray-500" />
          <span className="text-[13px] font-semibold text-gray-700 hover:text-gray-800">
            {data.type}
          </span>
        </div>
        <button className="p-2 hover:bg-gray-200 rounded-full transition-all duration-200 hover:rotate-12">
          <RiDeleteBin6Line
            size={20}
            className="text-gray-500 hover:text-red-500"
          />
        </button>
      </div>
      <span className="text-[16px] font-semibold text-gray-800 block mb-5 leading-snug">
        {data.label}
      </span>
      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-5 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-3 border border-gray-200 hover:border-gray-300 hover:translate-y-[-1px] active:translate-y-[1px]">
        <BsFillPlusCircleFill className="text-gray-500" />
        Append Node
      </button>
      <Handle
        onConnect={(params) => console.log("handle onConnect", params)}
        type="source"
        isConnectableEnd
        position={Position.Bottom}
        className="w-4 h-4 bg-gray-400 border-2 border-white hover:scale-110 transition-transform duration-200"
      />
    </div>
  );
}
