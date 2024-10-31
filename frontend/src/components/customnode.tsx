import { Handle, Position } from "@xyflow/react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CustomNode({
  data,
}: {
  data: { label: string; icon?: React.ReactNode };
}) {
  return (
    <div className="bg-[#FFFDF8] rounded-md w-80 py-3 px-3 relative">
      <Handle
        onConnect={(params) => console.log("handle onConnect", params)}
        type="target"
        isConnectableStart
        position={Position.Top}
      />
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1">
          <BsFillPlusCircleFill />
          <span className="text-[12px] font-semibold text-gray-500">
            Trigger
          </span>
        </div>
        <RiDeleteBin6Line size={20} />
      </div>
      <span className="text-[13px] font-semibold text-gray-500">
        {data.label}
      </span>
      <button className="mt-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2 px-4 rounded-md text-sm transition-colors duration-200 flex items-center justify-center gap-2">
        <BsFillPlusCircleFill className="text-gray-500" />
        Append Node
      </button>
      <Handle
        onConnect={(params) => console.log("handle onConnect", params)}
        type="source"
        isConnectableEnd
        position={Position.Bottom}
      />
    </div>
  );
}
