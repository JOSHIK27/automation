// React and hooks
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setTriggerState } from "@/app/store/slices/trigger-card-slices/trigger-slice";
import {
  setAction,
  clearActions,
} from "@/app/store/slices/trigger-card-slices/actions-slice";
import { setIsSubscribed } from "@/app/store/slices/trigger-card-slices/update-btn-slice";

// UI Components
import { Separator } from "@radix-ui/react-separator";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { AnimatedSubscribeButtonDemo } from "./ui/animated-button";

// Icons
import {
  FaYoutube,
  FaVideo,
  FaLightbulb,
  FaUpload,
  FaImage,
  FaClosedCaptioning,
  FaClock,
  FaEdit,
  FaSearch,
  FaExclamationCircle,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdFace, MdSummarize } from "react-icons/md";

// Action Components
import GenerateThumbnail from "./actionFormElementsUi/generate-thumbnail";
import GenerateCaptions from "./actionFormElementsUi/generate-captions";
import SwapFace from "./actionFormElementsUi/swap-face";
import GenerateSummary from "./actionFormElementsUi/generate-summary";

// Other imports
import { actionItemType } from "@/types";
import { dataModel } from "@/data/selectDependencies";
import { initialNodes, initialEdges } from "@/lib/constants/workflow";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function TriggerForm({
  showCard,
  setShowCard,
  cardId,
  setSelectValue,
  nodes,
  setNodes,
  setEdges,
}: {
  showCard: boolean;
  setShowCard: (show: boolean) => void;
  cardId: string;
  setSelectValue: (value: string) => void;
  nodes: any;
  setNodes: any;
  setEdges: any;
}) {
  const dispatch = useDispatch();
  const { triggerType, workflowType, videoTitle, channelId } = useSelector(
    (state: RootState) => state.trigger
  );
  const actionsList: actionItemType[] = useSelector(
    (state: RootState) => state.actions
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    getValues,
    reset,
    setValue,
  } = useForm();
  const [prevTriggerType, setPrevTriggerType] = useState<string | null>(null);
  const updateBtnState = useSelector((state: RootState) => state.updateBtn);

  watch("workflowType");
  watch("triggerType");
  watch("actionType");

  // update all the action nodes when trigger type changes
  useEffect(() => {
    if (prevTriggerType) {
      dispatch(clearActions());
      const updatedNodes = [...initialNodes];
      updatedNodes[0] = {
        ...updatedNodes[0],
        data: {
          ...updatedNodes[0].data,
          label: triggerType,
        },
      };
      setNodes(updatedNodes);
      setEdges(initialEdges);
    }
    setPrevTriggerType(triggerType);
  }, [triggerType]);

  // saving previous values of trigger fields
  useEffect(() => {
    // clear the existing formState when cardId changed
    reset();

    // if we are on the first card, set the values of the trigger fields to old values from trigger state
    if (cardId === "1") {
      setValue("workflowType", workflowType);
      setValue("triggerType", triggerType);
      if (triggerType === "Plan a video") {
        setValue("videoTitle", videoTitle);
      } else if (
        triggerType === "Generate Content Ideas" ||
        triggerType === "When a video is uploaded"
      ) {
        setValue("channelId", channelId);
      }
    } else {
      // For action cards, set the existing action values if they exist
      const existingAction = actionsList.find(
        (action) => action.cardId === cardId
      );

      if (existingAction && existingAction.actionType) {
        setValue("actionType", existingAction.actionType);

        // Set other form values from the existing action
        Object.entries(existingAction).forEach(([key, value]) => {
          if (key !== "cardId") {
            setValue(key as keyof actionItemType, value || "");
          }
        });
      } else {
        setValue("actionType", "");
      }
    }
  }, [cardId, actionsList]);

  // this is to conditionally render fields based on trigger type in trigger card
  useEffect(() => {
    if (cardId === "1") {
      if (triggerType === "Plan a video") {
        setValue("videoTitle", videoTitle);
      } else if (
        triggerType === "Generate Content Ideas" ||
        triggerType === "When a video is uploaded"
      ) {
        setValue("channelId", channelId);
      }
    }
  }, [watch("triggerType")]);

  const onSubmit = (data: any) => {
    if (cardId === "1") {
      const { triggerType, workflowType, videoTitle, channelId } = data;
      if (workflowType === "" || triggerType === "") {
        return;
      }
      if (triggerType === "Plan a video" && videoTitle === "") {
        return;
      }
      if (
        (triggerType === "When a video is uploaded" ||
          triggerType === "Generate Content Ideas") &&
        channelId === ""
      ) {
        return;
      }

      dispatch(
        setTriggerState({
          triggerType,
          workflowType,
          videoTitle,
          channelId,
          editable: false,
        })
      );
      const currentNodes = nodes;
      const updatedNodes = currentNodes.map((node: any) => {
        if (node.id === "1") {
          return {
            ...node,
            data: {
              label: getValues("triggerType"),
              type: "Trigger",
            },
          };
        }
        return node;
      });
      setNodes(updatedNodes);
      toast.warning(
        "If you change the trigger fields, all the actions will be deleted."
      );
    } else {
      const { triggerType, workflowType, videoTitle, channelId, ...rest } =
        data;
      dispatch(setAction({ cardId, ...rest, editable: false }));

      const currentNodes = nodes;
      const updatedNodes = currentNodes.map((node: any) => {
        if (node.id === cardId) {
          return {
            ...node,
            data: { label: getValues("actionType"), type: "Action" },
          };
        }
        return node;
      });
      setNodes(updatedNodes);
    }
    dispatch(setIsSubscribed({ cardId, isSubscribed: true }));
  };

  let firstCardIdWithEmptyFields = "10000000";
  actionsList.forEach((action) => {
    if (firstCardIdWithEmptyFields === "10000000") {
      Object.keys(action).forEach((key) => {
        if (action[key as keyof actionItemType] === "") {
          firstCardIdWithEmptyFields = action.cardId;
        }
      });
    }
  });

  const isSubscribed = updateBtnState.find(
    (state) => state.cardId === cardId
  )?.isSubscribed;

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-xl border border-red-500/10">
          <FaYoutube className="w-6 h-6 text-red-500" />
        </div>
        <span className="text-lg font-semibold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
          YouTube Integration
        </span>
      </div>

      <Separator className="bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />

      {cardId === "1" ? (
        <form
          key={`trigger-form-${cardId}`}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select Workflow Type
            </label>
            <Controller
              control={control}
              name="workflowType"
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select
                  disabled={isSubscribed}
                  defaultValue={workflowType}
                  onValueChange={(value) => {
                    field.onChange(value);
                    dispatch(
                      setIsSubscribed({ cardId: "1", isSubscribed: false })
                    );
                    setValue("triggerType", "");
                  }}
                >
                  <SelectTrigger className="w-full bg-white/50 hover:bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 h-11 rounded-xl shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    <SelectValue
                      placeholder={dataModel.workflowTypes.placeholder}
                      className="text-gray-600 placeholder:text-gray-400"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95">
                    <div className="px-1 py-2">
                      <SelectItem
                        value="Pre Production"
                        className="relative flex items-center cursor-pointer py-2.5 px-4 rounded-lg outline-none hover:bg-gray-50/80 focus:bg-gray-50/80 data-[state=checked]:bg-blue-50/50 data-[highlighted]:bg-gray-50/80 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <FaVideo className="w-4 h-4 text-blue-500" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-700">
                              Pre Production
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="Post Production"
                        className="relative flex items-center cursor-pointer py-2.5 px-4 rounded-lg outline-none hover:bg-gray-50/80 focus:bg-gray-50/80 data-[state=checked]:bg-green-50/50 data-[highlighted]:bg-gray-50/80 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-50 rounded-lg">
                            <FaEdit className="w-4 h-4 text-green-500" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-700">
                              Post Production
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    </div>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.workflowType?.type === "required" && (
              <p role="alert" className="text-red-500 text-sm mt-1.5">
                Please select a workflow type
              </p>
            )}
          </div>
          <div>
            <label
              className="text-sm font-medium text-gray-700 mb-1.5 block"
              htmlFor="triggerType"
            >
              Select Trigger
            </label>
            <Controller
              control={control}
              rules={{ required: "This field is required" }}
              name="triggerType"
              render={({ field }) => (
                <Select
                  disabled={isSubscribed}
                  defaultValue={triggerType}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectValue(value);
                    dispatch(
                      setIsSubscribed({ cardId: "1", isSubscribed: false })
                    );
                    if (value === "Plan a video") {
                      setValue("videoTitle", videoTitle);
                    } else {
                      setValue("channelId", channelId);
                    }
                  }}
                >
                  <SelectTrigger className="w-full bg-white/50 hover:bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 h-11 rounded-xl shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    <SelectValue
                      placeholder={dataModel.triggerTypes.placeholder}
                      className="text-gray-600 placeholder:text-gray-400"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95">
                    {(getValues("workflowType") || workflowType) ===
                      "Pre Production" &&
                      [
                        {
                          label: "Plan a video",
                          icon: <FaVideo className="w-4 h-4 text-blue-500" />,
                        },
                        {
                          label: "Generate Content Ideas",
                          icon: (
                            <FaLightbulb className="w-4 h-4 text-yellow-500" />
                          ),
                        },
                      ].map((option) => (
                        <SelectItem
                          key={option.label}
                          value={option.label}
                          className="relative flex items-center cursor-pointer py-2.5 px-4 rounded-lg outline-none hover:bg-gray-50/80 focus:bg-gray-50/80 data-[state=checked]:bg-blue-50/50 data-[highlighted]:bg-gray-50/80 transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              {option.icon}
                            </div>
                            <span className="font-medium text-gray-700">
                              {option.label}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    {(getValues("workflowType") || workflowType) ===
                      "Post Production" &&
                      [
                        {
                          label: "When a video is uploaded",
                          icon: <FaUpload className="w-4 h-4 text-green-500" />,
                        },
                      ].map((option) => (
                        <SelectItem
                          key={option.label}
                          value={option.label}
                          className="relative flex items-center cursor-pointer py-2.5 px-4 rounded-lg outline-none hover:bg-gray-50/80 focus:bg-gray-50/80 data-[state=checked]:bg-green-50/50 data-[highlighted]:bg-gray-50/80 transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 rounded-lg">
                              {option.icon}
                            </div>
                            <span className="font-medium text-gray-700">
                              {option.label}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.triggerType?.type === "required" && (
              <p role="alert" className="text-red-500 text-sm mt-1.5">
                Please select a trigger event
              </p>
            )}
          </div>
          {(getValues("triggerType") || triggerType) &&
            (getValues("triggerType") || triggerType) === "Plan a video" && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Title of the video
                </label>
                <Controller
                  control={control}
                  rules={{ required: "This field is required" }}
                  name="videoTitle"
                  render={({ field }) => (
                    <Textarea
                      disabled={isSubscribed}
                      defaultValue={videoTitle}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        dispatch(
                          setIsSubscribed({
                            cardId: "1",
                            isSubscribed: false,
                          })
                        );
                      }}
                      placeholder="Enter title here..."
                      className="h-12 px-4 bg-white hover:bg-gray-50/50 border border-gray-200 hover:border-gray-300 rounded-xl shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                    />
                  )}
                />
                {errors.videoTitle?.type === "required" && (
                  <p
                    role="alert"
                    className="text-red-500 text-sm mt-2 flex items-center gap-2 bg-red-50/50 p-2 rounded-lg border border-red-100"
                  >
                    <span className="p-1 bg-red-100 rounded-full">
                      <FaExclamationCircle className="w-3 h-3" />
                    </span>
                    Please enter the required input
                  </p>
                )}
              </div>
            )}
          {(getValues("triggerType") || triggerType) &&
            ["Generate Content Ideas", "When a video is uploaded"].includes(
              getValues("triggerType") || triggerType
            ) && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Enter the channel ID
                </label>
                <Controller
                  control={control}
                  rules={{ required: "This field is required" }}
                  name="channelId"
                  render={({ field }) => (
                    <Textarea
                      disabled={isSubscribed}
                      defaultValue={channelId}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        dispatch(
                          setIsSubscribed({
                            cardId: "1",
                            isSubscribed: false,
                          })
                        );
                      }}
                      placeholder="Enter channel ID here..."
                      className="h-11 px-4 bg-white/50 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  )}
                />
                {errors.channelId?.type === "required" && (
                  <p
                    role="alert"
                    className="text-red-500 text-sm mt-1.5 flex items-center gap-2"
                  >
                    <span className="p-1 bg-red-50 rounded-full">
                      <FaExclamationCircle className="w-3 h-3" />
                    </span>
                    Please enter the required input
                  </p>
                )}
              </div>
            )}

          <div className="flex flex-col gap-2">
            <AnimatedSubscribeButtonDemo
              disabled={false}
              isSubscribed={isSubscribed || false}
              t1="Submit"
              t2="Submitted"
            />
            {isSubscribed && (
              <button
                onClick={() =>
                  dispatch(
                    setIsSubscribed({ cardId: cardId, isSubscribed: false })
                  )
                }
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 font-medium"
                type="button"
              >
                Update
              </button>
            )}
          </div>
        </form>
      ) : (
        <form
          key={`action-form-${cardId}`}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Select Action
            </label>
            <Controller
              control={control}
              name="actionType"
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select
                  disabled={
                    isSubscribed ||
                    Number(cardId) > Number(firstCardIdWithEmptyFields)
                  }
                  defaultValue={
                    actionsList.find((action) => action.cardId === cardId)
                      ?.actionType
                  }
                  onValueChange={(value) => {
                    field.onChange(value);
                    dispatch(
                      setIsSubscribed({
                        cardId: cardId,
                        isSubscribed: false,
                      })
                    );
                  }}
                >
                  <SelectTrigger className="w-full bg-white/50 hover:bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 h-11 rounded-xl shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    <SelectValue
                      placeholder="Choose an action"
                      className="text-gray-600 placeholder:text-gray-400"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95">
                    {triggerType === "Plan a video" &&
                      [
                        {
                          label: "Generate thumbnail",
                          icon: <FaImage className="w-4 h-4 text-purple-500" />,
                        },
                        {
                          label: "Swap face",
                          icon: <MdFace className="w-4 h-4 text-orange-500" />,
                        },
                      ].map((option) => (
                        <SelectItem
                          key={option.label}
                          value={option.label}
                          className="relative flex items-center cursor-pointer py-2.5 px-4 rounded-lg outline-none hover:bg-gray-50/80 focus:bg-gray-50/80 data-[state=checked]:bg-purple-50/50 data-[highlighted]:bg-gray-50/80 transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 rounded-lg">
                              {option.icon}
                            </div>
                            <span className="font-medium text-gray-700">
                              {option.label}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    {triggerType === "When a video is uploaded" &&
                      [
                        {
                          label: "Generate SEO optimized title",
                          icon: <FaSearch className="w-4 h-4 text-blue-500" />,
                        },
                        {
                          label: "Generate SEO optimized keywords",
                          icon: <FaSearch className="w-4 h-4 text-blue-500" />,
                        },
                        {
                          label: "Generate captions",
                          icon: (
                            <FaClosedCaptioning className="w-4 h-4 text-blue-500" />
                          ),
                        },
                        {
                          label: "Generate summary",
                          icon: (
                            <MdSummarize className="w-4 h-4 text-green-500" />
                          ),
                        },
                        {
                          label: "Generate timestamps",
                          icon: <FaClock className="w-4 h-4 text-red-500" />,
                        },
                      ].map((option) => (
                        <SelectItem
                          key={option.label}
                          value={option.label}
                          className="relative flex items-center cursor-pointer py-2.5 px-4 rounded-lg outline-none hover:bg-gray-50/80 focus:bg-gray-50/80 data-[state=checked]:bg-blue-50/50 data-[highlighted]:bg-gray-50/80 transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              {option.icon}
                            </div>
                            <span className="font-medium text-gray-700">
                              {option.label}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    {triggerType === "Generate Content Ideas" &&
                      [
                        {
                          label: "Generate thumbnail",
                          icon: <FaImage className="w-4 h-4 text-purple-500" />,
                        },
                        {
                          label: "Analyse my channel videos and generate ideas",
                          icon: (
                            <FaLightbulb className="w-4 h-4 text-yellow-500" />
                          ),
                        },
                      ].map((option) => (
                        <SelectItem
                          key={option.label}
                          value={option.label}
                          className="relative flex items-center cursor-pointer py-2.5 px-4 rounded-lg outline-none hover:bg-gray-50/80 focus:bg-gray-50/80 data-[state=checked]:bg-yellow-50/50 data-[highlighted]:bg-gray-50/80 transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-50 rounded-lg">
                              {option.icon}
                            </div>
                            <span className="font-medium text-gray-700">
                              {option.label}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.actionType?.type === "required" && (
              <p role="alert" className="text-red-500 text-sm mt-1.5">
                Please select an action type
              </p>
            )}
          </div>
          {getValues("actionType") === "Generate thumbnail" && (
            <GenerateThumbnail
              isSubscribed={isSubscribed || false}
              control={control}
              errors={errors}
              cardId={cardId}
              actionsList={actionsList}
            />
          )}
          {getValues("actionType") === "Generate captions" && (
            <GenerateCaptions
              isSubscribed={isSubscribed || false}
              control={control}
              errors={errors}
              cardId={cardId}
            />
          )}
          {getValues("actionType") === "Swap face" && (
            <SwapFace
              isSubscribed={isSubscribed || false}
              control={control}
              errors={errors}
              cardId={cardId}
            />
          )}
          {getValues("actionType") === "Generate summary" && (
            <GenerateSummary
              isSubscribed={isSubscribed || false}
              control={control}
              errors={errors}
              cardId={cardId}
              actionsList={actionsList}
            />
          )}
          {getValues("actionType") === "Generate timestamps" && <></>}

          <div className="flex flex-col gap-2">
            <AnimatedSubscribeButtonDemo
              disabled={Number(cardId) > Number(firstCardIdWithEmptyFields)}
              isSubscribed={isSubscribed || false}
              t1="Submit"
              t2="Submitted"
            />
            {isSubscribed && (
              <button
                onClick={() =>
                  dispatch(
                    setIsSubscribed({
                      cardId: cardId,
                      isSubscribed: false,
                    })
                  )
                }
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 font-medium"
                type="button"
              >
                Update
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
