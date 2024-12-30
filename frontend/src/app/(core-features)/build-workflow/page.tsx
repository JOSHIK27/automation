"use client";

// React and Next.js imports
import { useCallback, useEffect, useState } from "react";
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
import TriggerForm from "@/components/triggerform";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Other imports
import { initialEdges, initialNodes } from "@/lib/constants/workflow";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  addBtnStatus,
  insertBtnStatusInBetween,
  setIsSubscribed,
} from "@/app/store/slices/trigger-card-slices/update-btn-slice";
import { Loader } from "lucide-react";

type FormValues = {
  name: string;
  description: string;
};

export default function Flow() {
  // Authentication
  const { status } = useSession();

  // Redux hooks and state
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.user_id);
  const { workflowType, triggerType, channelId, videoTitle } = useSelector(
    (state: RootState) => state.trigger
  );
  const actionsList = useSelector((state: RootState) => state.actions);

  // Local state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showCard, setShowCard] = useState(false);
  const [cardId, setCardId] = useState<string>("");
  const [, setSelectValue] = useState("");

  // Form handling
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // API mutations
  const saveWorkflowMutation = useMutation<
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
    onSuccess: (data) => {
      toast.success("Workflow saved successfully!");
    },
  });

  const triggerWorkflowMutation = useMutation<
    any,
    Error,
    {
      triggerState: {
        triggerType: string;
        workflowType: string;
        channelId: string;
        videoTitle: string;
      };
      actionsList: typeof actionsList;
    }
  >({
    mutationKey: ["triggerWorkflow"],
    mutationFn: async (data) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/trigger-workflow`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to trigger workflow");
      }
      return response.json();
    },
    onSuccess: (data) => {
      dispatch(setTasksStatus(data));
      toast.success("Workflow triggered successfully!");
    },
  });

  useEffect(() => {
    // dispatch(setIsSubscribed({ cardId: Number(cardId), isSubscribed: false }));
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

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#000000" />
      </div>
    );
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
      dispatch(
        addBtnStatus({
          cardId: String(Number(source) + 1),
          isSubscribed: false,
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
      dispatch(
        insertBtnStatusInBetween({
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
    if (workflowType === "") {
      toast.error("Please select a workflow");
      return;
    }
    if (
      (workflowType === "Plan a video" ||
        workflowType === "When a video is uploaded") &&
      channelId === ""
    ) {
      toast.error("Please enter channelId");
      return;
    } else if (workflowType === "Generate Content Ideas" && videoTitle === "") {
      toast.error("Please enter a video title");
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

    triggerWorkflowMutation.mutate({
      triggerState: {
        triggerType,
        workflowType,
        channelId,
        videoTitle,
      },
      actionsList,
    });
  };

  if (triggerWorkflowMutation.isError || saveWorkflowMutation.isError) {
    return (
      <div className="min-h-screen bg-[#F7F5F1] flex justify-center items-center p-4">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-8 text-center">
          <div className="mb-8">
            <div className="bg-red-50 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
              <svg
                className="h-10 w-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {triggerWorkflowMutation.isError
              ? "Trigger Workflow Error"
              : "Save Workflow Error"}
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {triggerWorkflowMutation.error?.message ||
              saveWorkflowMutation.error?.message}
          </p>
          <button
            onClick={() => {
              if (triggerWorkflowMutation.isError) {
                triggerWorkflowMutation.reset();
              }
              if (saveWorkflowMutation.isError) {
                saveWorkflowMutation.reset();
              }
            }}
            className="inline-flex items-center justify-center px-8 py-3 
              bg-teal-600 hover:bg-teal-700 text-white rounded-xl
              font-medium text-sm
              shadow-sm hover:shadow-md
              transition-all duration-200
              hover:scale-105 active:scale-95"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ height: "100dvh" }}>
      <div className="fixed top-20 left-4 z-50">
        <div
          className="group inline-flex items-center gap-2 px-3 py-1.5 
            bg-white/90 hover:bg-white rounded-md
            shadow-lg hover:shadow-xl backdrop-blur-sm
            border border-gray-200/50
            transition-all duration-300
            hover:scale-[1.02] active:scale-[0.98]
            hover:border-teal-100
            h-[42px]"
        >
          <svg
            className="w-4 h-4 text-gray-500 transition-colors duration-200 
              group-hover:text-teal-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span
            className="text-sm font-medium text-gray-700 group-hover:text-teal-600 
            transition-colors duration-200"
          >
            workflow/page.tsx
          </span>
        </div>
      </div>

      <div className="fixed top-20 right-4 z-50 flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="group inline-flex items-center justify-center px-4 py-2.5
                bg-white/90 hover:bg-white text-gray-700 rounded-xl
                shadow-lg hover:shadow-xl backdrop-blur-sm
                font-medium text-sm
                border border-gray-200/50
                transition-all duration-300
                hover:scale-[1.02] active:scale-[0.98]
                hover:border-teal-100
                h-[42px]"
            >
              <svg
                className="w-4 h-4 mr-2 text-teal-600 transition-transform duration-200 
                  group-hover:scale-110 group-hover:text-teal-500"
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
              <span className="relative tracking-wide group-hover:text-teal-600 transition-colors duration-200">
                Save Workflow
              </span>
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
                saveWorkflowMutation.mutate({
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
                    className="bg-white/90 hover:bg-white border-gray-200 
                      text-gray-600 hover:text-gray-700
                      transition-all duration-200
                      hover:scale-[1.02] active:scale-[0.98]
                      hover:border-gray-300 py-4"
                  >
                    Cancel
                  </Button>
                </DialogTrigger>
                <Button
                  type="submit"
                  className="group relative inline-flex items-center justify-center
                    bg-gradient-to-r from-teal-600 to-teal-500
                    hover:from-teal-500 hover:to-teal-600
                    text-white font-medium
                    shadow-[0_1px_10px_0_rgba(20,184,166,0.3)]
                    hover:shadow-[0_1px_12px_0_rgba(20,184,166,0.4)]
                    border border-teal-400/20
                    transition-all duration-300
                    hover:scale-[1.02] active:scale-[0.98]
                    px-6 py-4"
                >
                  {saveWorkflowMutation.isPending ? (
                    <Loader className="animate-spin w-5 h-5" color="#ffffff" />
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Save Workflow
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <button
          disabled={triggerWorkflowMutation.isPending}
          onClick={handleTriggerWorkflow}
          className={`group inline-flex items-center justify-center gap-2
            bg-gradient-to-r from-teal-600 to-teal-500
            hover:from-teal-500 hover:to-teal-600
            text-white rounded-xl
            shadow-[0_1px_12px_0_rgba(20,184,166,0.3)]
            hover:shadow-[0_1px_15px_0_rgba(20,184,166,0.4)]
            font-medium text-sm
            border border-teal-400/20
            transition-all duration-300
            hover:scale-[1.02] active:scale-[0.98]
            ${
              triggerWorkflowMutation.isPending
                ? "cursor-not-allowed px-6 py-3"
                : "px-5 py-2.5"
            }`}
        >
          {triggerWorkflowMutation.isPending ? (
            <Loader className="animate-spin w-5 h-5" color="#ffffff" />
          ) : (
            <>
              <span className="relative flex items-center gap-1">
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      className="opacity-70"
                    />
                  </svg>
                  <span className="font-semibold tracking-wide">
                    Start Workflow
                  </span>
                </span>
              </span>
            </>
          )}
        </button>
      </div>

      <Sheet open={showCard} onOpenChange={setShowCard}>
        <SheetContent className="w-[600px] sm:w-[600px] bg-white">
          <SheetHeader>
            <SheetTitle>Configure Workflow Action</SheetTitle>
          </SheetHeader>
          <TriggerForm
            showCard={showCard}
            setShowCard={setShowCard}
            cardId={cardId}
            setSelectValue={setSelectValue}
            nodes={nodes}
            setNodes={setNodes}
            setEdges={setEdges}
          />
        </SheetContent>
      </Sheet>

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
