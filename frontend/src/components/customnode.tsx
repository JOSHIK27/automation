import { Handle, Position } from "@xyflow/react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CustomNode({
  data,
}: {
  data: { label: string; type: string };
}) {
  return (
    <div className="bg-white rounded-xl w-[400px] py-4 px-6 relative shadow-[0_10px_40px_-5px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.2)] transition-all duration-300">
      <Handle
        onConnect={(params) => console.log("handle onConnect", params)}
        type="target"
        isConnectableStart
        position={Position.Top}
        className="!w-1.5 !h-1.5 !border-[2px] !border-teal !bg-white"
      />
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200 hover:bg-gray-100 transition-all duration-200 hover:translate-y-[-2px]">
          <BsFillPlusCircleFill className="text-teal text-base" />
          <span className="text-sm font-medium text-gray-600">{data.type}</span>
        </div>
        <button className="p-1.5 hover:bg-gray-50 rounded-full transition-all duration-200 hover:rotate-12">
          <RiDeleteBin6Line
            size={18}
            className="text-teal hover:text-red-500"
          />
        </button>
      </div>
      <span className="text-base font-normal text-gray-900 block mb-3 leading-relaxed">
        {data.label}
      </span>
      <button className="w-full bg-teal text-white font-medium py-2 px-4 rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 hover:translate-y-[-2px] active:translate-y-[1px]">
        <BsFillPlusCircleFill className="text-white text-base" />
        Append Node
      </button>
      <Handle
        onConnect={(params) => console.log("handle onConnect", params)}
        type="source"
        isConnectableEnd
        position={Position.Bottom}
        className="!w-1.5 !h-1.5 !border-[2px] !border-teal !bg-white"
      />
    </div>
  );
}
