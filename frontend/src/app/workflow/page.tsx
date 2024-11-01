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
import { useCallback, useEffect, useState } from "react";
import CustomNode from "@/components/customnode";
import { IoClose } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { AnimatedSubscribeButtonDemo } from "@/components/ui/animated-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const initialNodes = [
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
    position: { x: 400, y: 350 },
    data: {
      label: "Select the action that you want to perform",
      type: "Action",
    },
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
  const [trigger, setTrigger] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [cardId, setCardId] = useState<string>("");
  const [actions, setActions] = useState<any[]>([]);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    setIsSubscribed(false);
    setSelectValue("");
  }, [cardId]);

  const onConnect = useCallback(
    (connection: any) => {
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

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
        data: {
          label: "Select the action that you want to perform",
          type: "Action",
        },
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
    <div className="relative" style={{ height: "100dvh" }}>
      <Card
        className={`${
          showCard ? "absolute top-20 right-4 w-[400px] z-10" : "hidden"
        }`}
      >
        <CardHeader className="relative">
          <button
            className="absolute right-2 top-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setShowCard(false)}
          >
            <IoClose className="w-5 h-5 text-gray-500" />
          </button>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            <div className="flex items-center gap-2">
              <FaYoutube className="w-6 h-6 text-red-600" />
              YouTube
            </div>
          </CardTitle>
          <Separator className="my-4" />
        </CardHeader>
        <CardContent>
          {cardId === "1" ? (
            <Select
              value={selectValue}
              onValueChange={(value) => {
                setSelectValue(value);
                setTrigger(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="When a new video is uploaded">
                  When a new video is uploaded to my channel
                </SelectItem>
                <SelectItem value="When a new video is uploaded to a specific channel">
                  When a new video is uploaded to a specific channel
                </SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Select
              value={selectValue}
              onValueChange={(value) => {
                setSelectValue(value);
                setActions((a) => [...a, { cardId: cardId, action: value }]);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Generate a thumbnail">
                  Generate a thumbnail
                </SelectItem>
                <SelectItem value="Generate Captions">
                  Generate Captions
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        </CardContent>
        <CardFooter>
          <AnimatedSubscribeButtonDemo
            isSubscribed={isSubscribed}
            setIsSubscribed={setIsSubscribed}
            nodes={nodes as any}
            setNodes={setNodes as any}
            trigger={trigger}
            cardId={cardId}
            t1="Submit"
            t2="Submitted"
            actions={actions}
            setActions={setActions}
          />
        </CardFooter>
      </Card>

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
