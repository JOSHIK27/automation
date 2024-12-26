"use client";

// React and Next.js imports
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// XYFlow imports
import {
  addEdge,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  MarkerType,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  addAction,
  insertActionInBetween,
} from "@/app/store/slices/trigger-card-slices/actions-slice";
import { setTasksStatus } from "@/app/store/slices/trigger-card-slices/task-status-slice";

// Component imports
import CustomNode from "@/components/reactflow/customnode";
import CustomEdge from "@/components/reactflow/customedge";
import CustomNodeWithHandle from "@/components/customnodehandle";
import TriggerCard from "@/components/triggercard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Other imports
import { initialEdges, initialNodes } from "@/lib/constants/workflow";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  description: string;
};

export default function Flow() {
  // Router and authentication
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redux hooks and state
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.user_id);
  const { workflowType, triggerType, channelId, videoTitle, editable } =
    useSelector((state: RootState) => state.trigger);
  const actionsList = useSelector((state: RootState) => state.actions);

  // Local state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showCard, setShowCard] = useState(false);
  const [cardId, setCardId] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [, setSelectValue] = useState("");

  // Form handling
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // API mutations
  const mutation = useMutation<
    any,
    Error,
    {
      user_id: string;
      nodes: typeof nodes;
      edges: typeof edges;
    }
  >({
    mutationKey: ["saveWorkflow"],
    mutationFn: (data) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-workflow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
  });
  useEffect(() => {
    setIsSubscribed(false);
    setSelectValue("");
  }, [cardId, nodes.length]);
  useEffect(() => {
    const updatedNodes = nodes.map((node) => {
      if (node.id === cardId) {
        return {
          ...node,
          data: {
            ...node.data,
            selected: true,
          },
        };
      } else {
        return {
          ...node,
          data: {
            ...node.data,
            selected: false,
          },
        };
      }
    });
    setNodes(updatedNodes);
  }, [cardId]);

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
    let flag = target === "customWithHandle";
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
          selected: false,
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
          selected: false,
        },
        type: "customWithHandle",
        draggable: true,
      });
      const updatedNodes = nodes.filter((n) => n.id !== "customWithHandle");
      updatedNodes.push(newnodes[0]);
      updatedNodes.push(newnodes[1]);
      setNodes(updatedNodes);

      const updatedEdges = edges.filter((e) => e.target !== target);

      updatedEdges.push({
        id: `${source}->${String(Number(source) + 1)}`,
        source: source,
        target: String(Number(source) + 1),
        type: "custom",
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#008080",
        },
      });
      updatedEdges.push({
        id: `${String(Number(source) + 1)}->${"customWithHandle"}`,
        source: String(Number(source) + 1),
        target: "customWithHandle",
        animated: true,
        markerEnd: {
          type: MarkerType.Arrow,
          width: 30,
          height: 30,
          color: "#008080",
        },
      });
      setEdges(updatedEdges);
      dispatch(
        addAction({
          cardId: String(Number(source) + 1),
        })
      );
    } else {
      const currentNodes = nodes;
      const currentEdges = edges;
      let updatedNodes = currentNodes.map((n) => {
        if (n.id === "customWithHandle") {
          return {
            ...n,
            position: {
              x: n.position.x,
              y: n.position.y + 150,
            },
            data: {
              ...n.data,
              selected: false,
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
          selected: false,
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
      dispatch(
        insertActionInBetween({
          cardId: String(Number(source) + 1),
        })
      );
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

  const handleTriggerWorkflow = async () => {
    if (triggerType === "") {
      toast.error("Please select a trigger");
      return;
    }

    for (const action of actionsList) {
      for (const key in action) {
        if (!action[key as keyof typeof action]) {
          toast.error(`Please enter the input for ${key}`);
          return;
        }
      }
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/trigger-workflow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to trigger workflow");
      }

      const { response: data } = await response.json();
      console.log(data);
      dispatch(setTasksStatus(data));

      toast.success("Workflow triggered successfully!");
    } catch (error) {
      toast.error("Failed to trigger workflow");
    }
  };

  return (
    <div className="relative" style={{ height: "100dvh" }}>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Dialog>
          <DialogTrigger>
            <Button
              className="inline-flex items-center justify-center px-4 py-2
          bg-white/90 hover:bg-white text-gray-700 rounded-md
          shadow-lg backdrop-blur-sm
          font-medium text-sm
          border border-gray-200/50
          transition-all duration-200
          hover:scale-105 active:scale-95"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Save
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#F7F5F1]/90 backdrop-blur-sm border border-gray-200/50">
            <DialogHeader>
              <DialogTitle className="text-gray-700">Save Workflow</DialogTitle>
              <DialogDescription className="text-gray-500">
                Enter the details of your workflow before saving.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit((data) => {
                mutation.mutate({
                  user_id: userId ?? "",
                  nodes: nodes,
                  edges: edges,
                  ...data,
                });
              })}
              className="space-y-4"
            >
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">
                    Workflow Name
                  </Label>
                  <Input
                    {...form.register("name", { required: true })}
                    id="name"
                    placeholder="Enter workflow name"
                    className="bg-white/80"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700">
                    Description
                  </Label>
                  <Textarea
                    {...form.register("description")}
                    id="description"
                    placeholder="Enter workflow description (optional)"
                    className="bg-white/80 min-h-[100px]"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white/80 border-gray-200 text-gray-700 hover:bg-white"
                  >
                    Cancel
                  </Button>
                </DialogTrigger>
                <Button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Save Workflow
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <button
          onClick={handleTriggerWorkflow}
          className="inline-flex items-center justify-center px-4 py-2
          bg-teal-600/90 hover:bg-teal-600 text-white rounded-md
          shadow-lg backdrop-blur-sm
          font-medium text-sm
          border border-transparent
          transition-all duration-200
          hover:scale-105 active:scale-95"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Start
        </button>
      </div>

      <TriggerCard
        showCard={showCard}
        setShowCard={setShowCard}
        cardId={cardId}
        setSelectValue={setSelectValue}
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
        nodes={nodes}
        setNodes={setNodes}
        setEdges={setEdges}
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
