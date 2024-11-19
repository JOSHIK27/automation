"use client";
import {
  addEdge,
  MarkerType,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Background } from "@xyflow/react";
import { BackgroundVariant } from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import CustomNode from "@/components/customnode";
import { ConnectionLineType } from "@xyflow/react";
import { useSession } from "next-auth/react";
import { initialEdges, initialNodes } from "@/lib/constants/workflow";
import TriggerCard from "@/components/triggercard";
import { useRouter } from "next/navigation";
import HashLoader from "react-spinners/HashLoader";

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [trigger, setTrigger] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [cardId, setCardId] = useState<string>("");
  const [actions, setActions] = useState<any[]>([]);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    setIsSubscribed(false);
    setSelectValue("");
  }, [cardId, nodes.length]);

  const onConnect = useCallback(
    (connection: any) => {
      const edge = { ...connection, type: ConnectionLineType.SimpleBezier };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#000000" />
      </div>
    );
  }
  if (!session) {
    return null;
  }

  const onNodeClick = (event: any, node: any) => {
    if (event.target.tagName === "SPAN") {
      setShowCard(true);
      setCardId(node.id);
      return;
    }
    if (event.target.tagName !== "BUTTON") {
      return;
    }
    let flag = false;
    edges.forEach((edge) => {
      if (edge.source === node.id) {
        flag = true;
      }
    });

    if (!flag) {
      setNodes((nds) => [
        ...nds,
        {
          id: String(Number(node.id) + 1),
          position: {
            x: nodes[nodes.length - 1].position.x,
            y: nodes[nodes.length - 1].position.y + 250,
          },
          data: {
            label: "Select the action that you want to perform",
            type: "Action",
          },
          type: "custom",
          draggable: true,
          animated: true,
        },
      ]);
      setEdges((eds) => [
        ...eds,
        {
          id: node.id + "->" + String(Number(node.id) + 1),
          source: node.id,
          target: String(Number(node.id) + 1),
          type: ConnectionLineType.SimpleBezier,
          animated: true,
          markerEnd: {
            type: MarkerType.Arrow,
            width: 30,
            height: 30,
            color: "#008080",
          },
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
        data: {
          label: "Select the action that you want to perform",
          type: "Action",
        },
        type: "custom",
        draggable: true,
        animated: true,
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
            animated: true,
            markerEnd: {
              type: MarkerType.Arrow,
              width: 30,
              height: 30,
              color: "#008080",
            },
          };
        }
        return edge;
      });

      newEdges.push({
        id: String(Number(node.id) + 1) + "->" + String(Number(node.id) + 2),
        source: String(Number(node.id) + 1),
        target: String(Number(node.id) + 2),
        type: ConnectionLineType.SimpleBezier,
        animated: true,
        markerEnd: {
          type: MarkerType.Arrow,
          width: 30,
          height: 30,
          color: "#008080",
        },
      });
      console.log(updatedNodes, newEdges);
      setNodes(updatedNodes);
      setEdges(newEdges);
    }
  };

  const nodeTypes = {
    custom: CustomNode,
  };

  return (
    <div className="relative" style={{ height: "100dvh" }}>
      <TriggerCard
        showCard={showCard}
        setShowCard={setShowCard}
        cardId={cardId}
        setTrigger={setTrigger}
        trigger={trigger}
        selectValue={selectValue}
        setSelectValue={setSelectValue}
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
        nodes={nodes}
        setNodes={setNodes}
        actions={actions}
        setActions={setActions}
      />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onConnect={onConnect}
        // edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        // snapToGrid={true}
        snapGrid={[20, 20]}
        connectionLineType={ConnectionLineType.SmoothStep}
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
