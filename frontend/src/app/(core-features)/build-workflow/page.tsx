"use client";

// React and Next.js imports
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

// XYFlow imports
import {
  addEdge,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Controls,
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
  clearActions,
  insertActionInBetween,
} from "@/app/store/slices/trigger-card-slices/actions-slice";
import { useSaveWorkFlowMutation } from "@/hooks/mutations/useSaveWorkFlowMutation";

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
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
  addBtnStatus,
  insertBtnStatusInBetween,
  resetBtnStatus,
} from "@/app/store/slices/trigger-card-slices/update-btn-slice";
import { Loader } from "lucide-react";
import { useUserId } from "@/hooks/custom/useUserId";
import { useTriggerWorkFlowMutation } from "@/hooks/mutations/useTriggerWorkFlowMutation";
import { resetTriggerState } from "@/app/store/slices/trigger-card-slices/trigger-slice";
import {
  resetWorkflowName,
  setWorkflowId,
  setWorkflowName,
} from "@/app/store/slices/workflow-slice";
import { useUpdateWorkFlowMutation } from "@/hooks/mutations/useUpdateWorkFlowMutation";
import { usePubSubHubBubSubscribeMutation } from "@/hooks/mutations/usePubSubHubBubSubscribeMutation";
import { setStartFetching } from "@/app/store/slices/startfetching-slice";

type FormValues = {
  name: string;
  description: string;
};

export default function Flow() {
  // Authentication
  const { data: session, status } = useSession();
  const { userId, userStatus, userError } = useUserId(session);

  // Local state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showCard, setShowCard] = useState(false);
  const [cardId, setCardId] = useState<string>("");
  const [, setSelectValue] = useState("");
  const { workflowName, workflowId } = useSelector(
    (state: RootState) => state.workflowName
  );
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const startFetching = useSelector((state: RootState) => state.startFetching);

  // websocket
  useEffect(() => {
    if (userId) {
      const protocol = process.env.NODE_ENV === "production" ? "wss" : "ws";

      const ws = new WebSocket(
        `${protocol}://${process.env.NEXT_PUBLIC_API_URL_DUP}/ws?userId=${userId}`
      );
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data?.workflow_id === workflowId) {
          setRenderKey((prev) => prev + 1);
          dispatch(setStartFetching(data.client_state));
        }
      };
      return () => ws.close();
    }
  }, [userId, workflowId]);

  // Redux hooks and state
  const dispatch = useDispatch();
  const { workflowType, triggerType, channelId, videoTitle } = useSelector(
    (state: RootState) => state.trigger
  );
  const actionsList = useSelector((state: RootState) => state.actions);

  // Form handling
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // API mutations
  const saveWorkflowMutation = useSaveWorkFlowMutation();
  const updateWorkflowMutation = useUpdateWorkFlowMutation(workflowId);

  const triggerWorkflowMutation = useTriggerWorkFlowMutation();

  // Add this near other hooks at the top level

  const pubSubHubBubSubscribeMutation = usePubSubHubBubSubscribeMutation();

  useEffect(() => {
    return () => {
      dispatch(resetTriggerState());
      dispatch(clearActions());
      dispatch(resetBtnStatus());
      dispatch(resetWorkflowName());
    };
  }, []);

  useEffect(() => {
    if (nodes.length > 2 || edges.length > 1) {
      setHasUnsavedChanges(true);
    }
  }, [nodes, edges]);

  useEffect(() => {
    if (saveWorkflowMutation.isSuccess) {
      dispatch(setWorkflowName(saveWorkflowMutation.data.name));
      dispatch(setWorkflowId(saveWorkflowMutation.data.workflow_id));
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    }
    if (updateWorkflowMutation.isSuccess) {
      dispatch(setWorkflowName(updateWorkflowMutation.data.name));
      dispatch(setWorkflowId(updateWorkflowMutation.data.workflow_id));
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    }
  }, [saveWorkflowMutation.isSuccess, updateWorkflowMutation.isSuccess]);

  useEffect(() => {
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
    if (!workflowName) {
      toast.error("Please save the workflow before editing");
      return;
    }
    if (
      event.target.tagName === "SPAN" &&
      event.target.id.includes("action-placeholder")
    ) {
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

    if (workflowType === "Post Production") {
      pubSubHubBubSubscribeMutation.mutate({
        channel_id: channelId,
      });
    }
    triggerWorkflowMutation.mutate(
      {
        workflowId: workflowId,
        triggerState: {
          triggerType,
          workflowType,
          channelId,
          videoTitle,
        },
        actionsList,
      },
      {
        onSuccess: () => {
          setRenderKey((prev) => prev + 1);
          toast.success("Workflow triggered successfully!");
        },
      }
    );
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
    <div
      key={renderKey}
      className="relative -top-16 w-full"
      style={{ height: "100dvh" }}
    >
      <div className="fixed top-20 left-4 z-50 max-w-[calc(100vw-2rem)]">
        <div className="relative group">
          <div
            className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-teal-500/[0.07] to-teal-600/5 
            rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl"
          />

          <div
            className="relative flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4
            bg-gradient-to-b from-white via-white to-gray-50/80
            backdrop-blur-xl rounded-xl
            ring-1 ring-gray-950/5 group-hover:ring-teal-500/20
            shadow-[0_4px_20px_rgba(0,0,0,0.03)]
            group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
            transition-all duration-300 ease-out
            min-w-0 sm:min-w-[240px]"
          >
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-teal-500/10 to-transparent" />

            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="absolute -inset-1.5 bg-gradient-to-br from-teal-50 to-emerald-50/50
                  rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div
                  className="relative p-2 rounded-lg bg-gradient-to-br from-gray-50 to-slate-50/50
                  ring-1 ring-gray-950/5 group-hover:ring-teal-500/20
                  transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4 text-teal-600/80 transition-transform duration-300
                      group-hover:scale-110 group-hover:rotate-[-8deg]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-medium text-gray-400">
                  Workflow Name
                </span>
                <span
                  className="text-sm font-semibold text-gray-600 group-hover:text-gray-700
                  transition-colors duration-200 truncate max-w-[140px]"
                >
                  {workflowName ? workflowName : "Untitled Workflow"}
                </span>
              </div>
            </div>

            <div className="ml-auto pl-3 border-l border-gray-200/60">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300
                  ${
                    hasUnsavedChanges
                      ? "bg-amber-400 animate-pulse shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                      : "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.2)]"
                  }
                `}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed top-20 right-4 z-50 flex flex-col sm:flex-row gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="group inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5
                bg-white/90 hover:bg-white text-gray-700 rounded-xl
                shadow-lg hover:shadow-xl backdrop-blur-sm
                font-medium text-sm
                border border-gray-200/50
                transition-all duration-300
                hover:scale-[1.02] active:scale-[0.98]
                hover:border-teal-100
                h-[42px] w-full sm:w-auto"
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
          <DialogContent className="bg-[#F7F5F1]/90 backdrop-blur-sm border border-gray-200/50 w-[95vw] max-w-[600px] sm:w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-gray-700">Save Workflow</DialogTitle>
              <DialogDescription className="text-gray-500">
                Enter the details of your workflow before saving.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit((data) => {
                if (workflowName) {
                  updateWorkflowMutation.mutate({
                    user_id: userId ?? "",
                    nodes: nodes,
                    edges: edges,
                    ...data,
                  });
                } else {
                  saveWorkflowMutation.mutate({
                    user_id: userId ?? "",
                    nodes: nodes,
                    edges: edges,
                    ...data,
                  });
                }
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
                  {saveWorkflowMutation.isPending ||
                  updateWorkflowMutation.isPending ? (
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
                      {workflowName ? "Update Workflow" : "Save Workflow"}
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
            w-full sm:w-auto
            ${
              triggerWorkflowMutation.isPending
                ? "cursor-not-allowed px-4 py-2 sm:px-6 sm:py-3"
                : "px-3 py-2 sm:px-5 sm:py-2.5"
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
        <SheetContent className="w-[95vw] sm:w-[600px] bg-white overflow-y-auto">
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
          style={{
            backgroundColor: "#F8FAFC",
          }}
          gap={20}
        />
        <Controls />
      </ReactFlow>

      <div className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)]">
        <div
          className="group inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2
          bg-white/90 hover:bg-white rounded-xl
          shadow-lg hover:shadow-xl backdrop-blur-sm
          border transition-all duration-300
          overflow-hidden text-ellipsis whitespace-nowrap
          ${hasUnsavedChanges ? 'border-amber-200/50' : 'border-gray-200/50'}"
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-300
              ${
                hasUnsavedChanges ? "bg-amber-400 animate-pulse" : "bg-teal-500"
              }`}
            />
            <svg
              className={`w-4 h-4 transition-colors duration-200
                ${
                  hasUnsavedChanges
                    ? "text-amber-500"
                    : "text-gray-400 group-hover:text-teal-500"
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span
              className={`text-sm transition-colors duration-200
              ${
                hasUnsavedChanges
                  ? "text-amber-700"
                  : "text-gray-500 group-hover:text-gray-700"
              }`}
            >
              {hasUnsavedChanges
                ? "Unsaved changes"
                : lastSaved
                ? `Last saved: ${format(lastSaved, "MMM d, yyyy h:mm a")}`
                : "Not saved yet"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
