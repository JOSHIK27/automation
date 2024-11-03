export const initialNodes = [
  {
    id: "1",
    position: { x: 400, y: 100 },
    data: {
      label: "Select the event that you want to trigger",
      type: "Trigger",
    },
    type: "custom",
    draggable: false,
  },
  {
    id: "2",
    position: { x: 400, y: 500 },
    data: {
      label: "Select the action that you want to perform",
      type: "Action",
    },
    type: "custom",
    draggable: false,
  },
];

export const initialEdges = [
  {
    id: "1->2",
    source: "1",
    target: "2",
    type: "custom-edge",
  },
];
