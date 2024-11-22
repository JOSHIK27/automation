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
import CustomEdge from "@/components/customedge";
import { ConnectionLineType } from "@xyflow/react";
import { useSession } from "next-auth/react";
import { initialEdges, initialNodes } from "@/lib/constants/workflow";
import TriggerCard from "@/components/triggercard";
import { useRouter } from "next/navigation";
import HashLoader from "react-spinners/HashLoader";
import CustomNodeWithHandle from "@/components/customnodehandle";

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

  const onEdgeClick = (event: any, edge: any) => {
    const { source, target } = edge;
    console.log(source, target);
    let flag = target === "customWithHandle";
    console.log(flag);
    if (flag) {
      let newnodexposition = 0,
        newnodeyposition = 0;
      nodes.forEach((n) => {
        if (n.id !== "customWithHandle") {
          newnodexposition = Math.max(newnodexposition, n.position.x);
          newnodeyposition = Math.max(newnodeyposition, n.position.y);
        }
      });
      const newnodes = [];
      newnodes.push({
        id: String(Number(source) + 1),
        position: {
          x: newnodexposition,
          y: newnodeyposition + 250,
        },
        data: {
          label: "Select the action that you want to perform",
          type: "Action",
        },
        type: "custom",
        draggable: true,
        animated: true,
      });
      newnodes.push({
        id: "customWithHandle",
        position: {
          x: 588,
          y: newnodeyposition + 200 + 250,
        },
        data: {
          label: "",
          type: "",
        },
        type: "customWithHandle",
        draggable: true,
      });
      const updatedNodes = nodes.filter((n) => n.id !== "customWithHandle");
      updatedNodes.push(newnodes[0]);
      updatedNodes.push(newnodes[1]);
      setNodes(updatedNodes);

      const updatedEdges = edges.filter((e) => e.target !== target);
      console.log(updatedEdges);

      updatedEdges.push({
        id: `${source}->${String(Number(source) + 1)}`,
        source: source,
        target: String(Number(source) + 1),
        type: "custom",
        animated: true,
        markerEnd: {
          type: MarkerType.Arrow,
          width: 30,
          height: 30,
          color: "#008080",
        },
      });
      console.log(updatedEdges);
      updatedEdges.push({
        id: `${String(Number(source) + 1)}->${"customWithHandle"}`,
        source: String(Number(source) + 1),
        target: "customWithHandle",
        animated: true,
      });
      console.log(updatedEdges);
      setEdges(updatedEdges);
    } else {
      const currentNodes = nodes;
      const currentEdges = edges;
      let updatedNodes = currentNodes.map((n) => {
        if (n.id === "customWithHandle") {
          return {
            ...n,
            position: {
              x: n.position.x,
              y: n.position.y + 200,
            },
          };
        }
        if (Number(n.id) > Number(source)) {
          return {
            ...n,
            id: String(Number(n.id) + 1),
            position: { x: n.position.x, y: n.position.y + 250 },
          };
        }
        return n;
      });
      let maxnodeheight = 0;
      updatedNodes.forEach((node) => {
        if (node.id !== "customWithHandle") {
          maxnodeheight = Math.max(maxnodeheight, node.position.y);
        }
      });
      updatedNodes = updatedNodes.map((node) => {
        if (node.id === "customWithHandle") {
          return {
            ...node,
            position: { x: node.position.x, y: maxnodeheight + 200 },
          };
        }
        return node;
      });
      let newnodexposition = 0,
        newnodeyposition = 0;
      updatedNodes.forEach((n) => {
        if (n.id === source) {
          newnodexposition = n.position.x;
          newnodeyposition = n.position.y + 250;
        }
      });
      const newNode = {
        id: String(Number(source) + 1),
        position: {
          x: newnodexposition,
          y: newnodeyposition,
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
        if (
          edge.target !== "customWithHandle" &&
          Number(edge.source) > Number(source)
        ) {
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
            type: "custom",
          };
        }
        if (edge.target === "customWithHandle") {
          return {
            ...edge,
            id: String(updatedNodes.length - 1) + "->" + "customWithHandle",
            source: String(updatedNodes.length - 1),
            target: "customWithHandle",
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
        id: String(Number(source) + 1) + "->" + String(Number(source) + 2),
        source: String(Number(source) + 1),
        target: String(Number(source) + 2),
        // type: ConnectionLineType.SimpleBezier,
        animated: true,
        markerEnd: {
          type: MarkerType.Arrow,
          width: 30,
          height: 30,
          color: "#008080",
        },
        type: "custom",
      });
      setNodes(updatedNodes);
      setEdges(newEdges);
    }
  };

  const onNodeClick = (event: any, node: any) => {
    if (event.target.tagName === "SPAN") {
      setShowCard(true);
      setCardId(node.id);
      return;
    }
  };

  const nodeTypes = {
    custom: CustomNode,
    customWithHandle: CustomNodeWithHandle,
  };
  const edgeTypes = {
    custom: CustomEdge,
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
        onEdgeClick={onEdgeClick}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        snapToGrid={true}
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
