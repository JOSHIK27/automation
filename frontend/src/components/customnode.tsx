import { Handle, Position } from "@xyflow/react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CustomNode({
  data,
}: {
  data: { label: string; type: string };
}) {
  return (
    <div className="bg-white rounded-2xl w-[520px] py-8 px-9 relative shadow-[0_10px_40px_-5px_rgba(0,0,0,0.15)] border border-gray-100 hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.2)] transition-all duration-300">
      <Handle
        onConnect={(params) => console.log("handle onConnect", params)}
        type="target"
        isConnectableStart
        position={Position.Top}
        className="w-6 h-6 bg-gray-400 border-[3px] border-white hover:scale-110 transition-transform duration-200"
      />
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-6 py-3 border border-gray-200 hover:bg-gray-100 transition-all duration-200 hover:translate-y-[-2px]">
          <BsFillPlusCircleFill className="text-teal text-xl" />
          <span className="text-[15px] font-bold text-gray-600">
            {data.type}
          </span>
        </div>
        <button className="p-3 hover:bg-gray-50 rounded-full transition-all duration-200 hover:rotate-12">
          <RiDeleteBin6Line
            size={24}
            className="text-teal hover:text-red-500"
          />
        </button>
      </div>
      <span className="text-[20px] font-bold text-gray-900 block mb-8 leading-relaxed">
        {data.label}
      </span>
      <button className="w-full bg-teal text-white font-bold py-4 px-7 rounded-xl text-[16px] transition-all duration-200 flex items-center justify-center gap-4 border border-gray-200 hover:border-gray-300 hover:translate-y-[-2px] active:translate-y-[1px]">
        <BsFillPlusCircleFill className="text-white text-xl" />
        Append Node
      </button>
      <Handle
        onConnect={(params) => console.log("handle onConnect", params)}
        type="source"
        isConnectableEnd
        position={Position.Bottom}
        className="w-6 h-6 bg-gray-400 border-[3px] border-white hover:scale-110 transition-transform duration-200"
      />
    </div>
  );
}
