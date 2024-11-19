import {
  BaseEdge,
  getStraightPath,
  getBezierPath,
  getSimpleBezierPath,
} from "@xyflow/react";

type CustomEdgeProps = {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
};

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: CustomEdgeProps) {
  const [edgePath] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
    </>
  );
}
