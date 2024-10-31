"use client";
import {
  addEdge,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Background } from "@xyflow/react";
import CustomEdge from "@/components/customedge";
import { BackgroundVariant } from "@xyflow/react";
import { useCallback } from "react";
import CustomNode from "@/components/customnode";

const initialNodes = [
  {
    id: "1",
    position: { x: 400, y: 100 },
    data: { label: "Select the event that you want to trigger" },
    type: "custom",
    draggable: false,
  },
  {
    id: "2",
    position: { x: 400, y: 350 },
    data: { label: "Select the action that you want to perform" },
    type: "custom",
    draggable: false,
  },
];

const initialEdges = [
  {
    id: "1->2",
    source: "1",
    target: "2",
    type: "custom-edge",
  },
];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  console.log(nodes, edges);
  const onConnect = useCallback(
    (connection: any) => {
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const onNodeClick = (event: any, node: any) => {
    let flag = false;
    edges.forEach((edge) => {
      if (edge.source === node.id) {
        flag = true;
      }
    });
    console.log(flag);
    if (!flag) {
      setNodes((nds) => [
        ...nds,
        {
          id: String(Number(node.id) + 1),
          position: {
            x: nodes[nodes.length - 1].position.x,
            y: nodes[nodes.length - 1].position.y + 250,
          },
          data: { label: "Select the action that you want to perform" },
          type: "custom",
          draggable: false,
        },
      ]);
      setEdges((eds) => [
        ...eds,
        {
          id: node.id + "->" + String(Number(node.id) + 1),
          source: node.id,
          target: String(Number(node.id) + 1),
          type: "custom-edge",
        },
      ]);
    } else {
      const currentNodes = nodes;
      const currentEdges = edges;
      const updatedNodes = currentNodes.map((n) => {
        if (n.id > node.id) {
          return {
            ...n,
            id: String(Number(n.id) + 1),
            position: { x: n.position.x, y: n.position.y + 250 },
          };
        }
        return n;
      });
      const newNode = {
        id: String(Number(node.id) + 1),
        position: {
          x: nodes[nodes.length - 1].position.x,
          y: nodes[Number(node.id) - 1].position.y + 250,
        },
        data: { label: "Select the action that you want to perform" },
        type: "custom",
        draggable: false,
      };
      updatedNodes.push(newNode);
      updatedNodes.sort((a, b) => Number(a.id) - Number(b.id));
      const newEdges: any[] = currentEdges.map((edge) => {
        if (Number(edge.source) > Number(node.id)) {
          return {
            ...edge,
            id:
              String(Number(edge.source) + 1) +
              "->" +
              String(Number(edge.target) + 1),
            source: String(Number(edge.source) + 1),
            target: String(Number(edge.target) + 1),
          };
        }
        return edge;
      });

      newEdges.push({
        id: String(Number(node.id) + 1) + "->" + String(Number(node.id) + 2),
        source: String(Number(node.id) + 1),
        target: String(Number(node.id) + 2),
        type: "custom-edge",
      });
      console.log(updatedNodes, newEdges);
      setNodes(updatedNodes);
      setEdges(newEdges);
    }
  };

  const edgeTypes = {
    "custom-edge": CustomEdge,
  };

  const nodeTypes = {
    custom: CustomNode,
  };

  return (
    <div style={{ height: "100dvh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={[20, 20]}
      >
        <Background
          variant={BackgroundVariant.Dots}
          style={{ backgroundColor: "#F7F5F1" }}
          gap={20}
        />
      </ReactFlow>
    </div>
  );
}
