import { Handle, Position } from "@xyflow/react";

export default function CustomNodeWithHandle() {
  return (
    <>
      {/* <Handle type="source" position={Position.Top} /> */}
      <button className="button-edge__button">+</button>
      <Handle type="target" position={Position.Top} />
    </>
  );
}
