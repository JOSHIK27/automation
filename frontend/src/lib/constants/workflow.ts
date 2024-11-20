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
  {
    id: "customWithHandle",
    position: { x: 588, y: 550 },
    data: {
      label: "",
      type: "",
    },
    type: "customWithHandle",
    draggable: true,
  },
];

export const initialEdges = [
  {
    id: "1->2",
    source: "1",
    target: "2",
    type: "custom",
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      width: 30,
      height: 30,
      color: "#008080",
    },
  },
  {
    id: "2->customWithHandle",
    source: "2",
    target: "customWithHandle",
    animated: true,
  },
];
