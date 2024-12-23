import { ConnectionLineType, MarkerType } from "@xyflow/react";

type Node = {
  id: string;
  position: { x: number; y: number };
  data: {
    label: string;
    type: string;
    selected: boolean;
  };
  type: string;
  draggable: boolean;
};

type Edge = {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated: boolean;
  markerEnd: any;
};

export const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 400, y: 100 },
    data: {
      label: "Select the event that you want to trigger",
      type: "Trigger",
      selected: false,
    },
    type: "custom",
    draggable: true,
  },
  {
    id: "2",
    position: { x: 400, y: 350 },
    data: {
      label: "Select the action that you want to perform",
      type: "Action",
      selected: false,
    },
    type: "custom",
    draggable: true,
  },
  {
    id: "customWithHandle",
    position: { x: 588, y: 550 },
    data: {
      label: "",
      type: "",
      selected: false,
    },
    type: "customWithHandle",
    draggable: true,
  },
];

export const initialEdges: Edge[] = [
  {
    id: "1->2",
    source: "1",
    target: "2",
    type: "custom",
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#008080",
    },
  },
  {
    id: "2->customWithHandle",
    source: "2",
    target: "customWithHandle",
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
      width: 25,
      height: 25,
      color: "#008080",
    },
  },
];
