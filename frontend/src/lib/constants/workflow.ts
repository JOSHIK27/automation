import { ConnectionLineType, MarkerType } from "@xyflow/react";

export const initialNodes = [
  {
    id: "1",
    position: { x: 400, y: 100 },
    data: {
      label: "Select the event that you want to trigger",
      type: "Trigger",
    },
    type: "custom",
    draggable: true,
    animated: true,
  },
  {
    id: "2",
    position: { x: 400, y: 350 },
    data: {
      label: "Select the action that you want to perform",
      type: "Action",
    },
    type: "custom",
    draggable: true,
    animated: true,
  },
];

export const initialEdges = [
  {
    id: "1->2",
    source: "1",
    target: "2",
    type: ConnectionLineType.SimpleBezier,
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      width: 30,
      height: 30,
      color: "#008080",
    },
  },
];
