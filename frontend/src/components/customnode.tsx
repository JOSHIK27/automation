import { Handle, Position } from "@xyflow/react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CustomNode({
  data,
}: {
  data: { label: string; icon?: React.ReactNode };
}) {
  return (
    <div className="bg-[#FFFDF8] rounded-lg w-[400px] py-4 px-4 relative shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <Handle
        onConnect={(params) => console.log("handle onConnect", params)}
        type="target"
        isConnectableStart
        position={Position.Top}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1.5 border border-gray-200">
          <BsFillPlusCircleFill className="text-gray-500" />
          <span className="text-[12px] font-semibold text-gray-700">
            Trigger
          </span>
        </div>
        <button className="p-1.5 hover:bg-gray-200 rounded-full transition-colors duration-200">
          <RiDeleteBin6Line
            size={18}
            className="text-gray-500 hover:text-red-500"
          />
        </button>
      </div>
      <span className="text-[15px] font-semibold text-gray-800 block mb-4">
        {data.label}
      </span>
      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300">
        <BsFillPlusCircleFill className="text-gray-500" />
        Append Node
      </button>
      <Handle
        onConnect={(params) => console.log("handle onConnect", params)}
        type="source"
        isConnectableEnd
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
    </div>
  );
}
