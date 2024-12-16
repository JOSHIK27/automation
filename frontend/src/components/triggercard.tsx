import { Controller, useForm } from "react-hook-form";
import { Separator } from "@radix-ui/react-separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { AnimatedSubscribeButtonDemo } from "./ui/animated-button";
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
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { dataModel } from "@/data/selectDependencies";
import { setTriggerState } from "@/app/store/slices/trigger-card-slices/trigger-slice";
import { setAction } from "@/app/store/slices/trigger-card-slices/actions-slice";
import { actionItemType } from "@/types";
import { useEffect, useState } from "react";
import GenerateThumbnail from "./actionFormElementsUi/generate-thumbnail";
import GenerateCaptions from "./actionFormElementsUi/generate-captions";
import SwapFace from "./actionFormElementsUi/swap-face";
import GenerateSummary from "./actionFormElementsUi/generate-summary";
import { toast } from "sonner";
import { MdFace, MdSummarize } from "react-icons/md";
import { Textarea } from "./ui/textarea";

export default function TriggerCard({
  showCard,
  setShowCard,
  cardId,
  trigger,
  setSelectValue,
  isSubscribed,
  setIsSubscribed,
  nodes,
  setNodes,
  actions,
}: {
  showCard: boolean;
  setShowCard: (show: boolean) => void;
  cardId: string;
  trigger: string;
  setSelectValue: (value: string) => void;
  isSubscribed: boolean;
  setIsSubscribed: (isSubscribed: boolean) => void;
  nodes: any;
  setNodes: any;
  actions: any;
}) {
  const dispatch = useDispatch();
  const [actionType, setActionType] = useState("");
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

  // interdependent fields for action type
  useEffect(() => {
    setActionType(watch("actionType"));
  }, [watch("actionType")]);

  // saving previous values of trigger fields
  useEffect(() => {
    reset();
    if (cardId === "1") {
      setValue("workflowType", workflowType);
      setValue("triggerType", triggerType);
      if (triggerType === "Plan a video") {
        setValue("videoTitle", videoTitle);
      } else {
        setValue("channelId", channelId);
      }
    }
    setActionType("");
    setValue("actionType", "");
  }, [cardId]);

  useEffect(() => {
    if (triggerType === "Plan a video") {
      setValue("videoTitle", videoTitle);
    } else {
      setValue("channelId", channelId);
    }
  }, [watch("triggerType")]);
  watch("workflowType");
  watch("triggerType");
  // useEffect(() => {
  //   reset();
  //   actionsList.forEach((action) => {
  //     if (
  //       action.cardId != "2" &&
  //       (action.actionInput === "" || action.actionType === "")
  //     ) {
  //       setFieldsDisabled(true);
  //     }
  //   });
  // }, [nodes.length, ]);

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
        })
      );
      const currentNodes = nodes;
      const updatedNodes = currentNodes.map((node: any) => {
        if (node.id === "1") {
          return {
            ...node,
            data: {
              label: triggerType,
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
      dispatch(setAction({ cardId, ...rest }));

      const currentNodes = nodes;
      const updatedNodes = currentNodes.map((node: any) => {
        if (node.id === cardId) {
          return { ...node, data: { label: actionType, type: "Action" } };
        }
        return node;
      });
      setNodes(updatedNodes);
    }
    setIsSubscribed(true);
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

  return (
    <Card
      className={`${
        showCard ? "absolute top-20 right-4 w-[450px] z-10" : "hidden"
      } bg-white/80 backdrop-blur-md border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-all duration-300 rounded-2xl`}
    >
      <CardHeader className="relative pb-2 space-y-4">
        <button
          className="absolute right-4 top-4 p-2 hover:bg-gray-100/80 rounded-full transition-all duration-200"
          onClick={() => setShowCard(false)}
        >
          <IoClose className="w-4 h-4 text-gray-500" />
        </button>
        <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <FaYoutube className="w-6 h-6 text-red-500" />
            </div>
            YouTube Integration
          </div>
        </CardTitle>
        <Separator className="my-3 bg-gradient-to-r from-gray-200 to-transparent" />
      </CardHeader>
      <CardContent className="pt-2">
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
                    defaultValue={workflowType}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setIsSubscribed(false);
                      setValue("triggerType", "");
                    }}
                  >
                    <SelectTrigger className="w-full bg-white/50 hover:bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 h-11 rounded-lg shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                      <SelectValue
                        placeholder={dataModel.workflowTypes.placeholder}
                        className="text-gray-600 placeholder:text-gray-400"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
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
                    defaultValue={triggerType}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectValue(value);
                      setIsSubscribed(false);
                      if (value === "Plan a video") {
                        setValue("videoTitle", videoTitle);
                      } else {
                        setValue("channelId", channelId);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full border border-gray-200 bg-white hover:border-gray-300 transition-all duration-200 h-10 rounded-lg">
                      <SelectValue
                        placeholder={dataModel.triggerTypes.placeholder}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
                      {(getValues("workflowType") || workflowType) ===
                      "Pre Production"
                        ? [
                            {
                              label: "Plan a video",
                              icon: (
                                <FaVideo className="w-4 h-4 text-blue-500" />
                              ),
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
                              className="cursor-pointer py-2.5 px-4 outline-none hover:bg-gray-50 focus:bg-gray-50 data-[state=checked]:bg-gray-50 data-[highlighted]:bg-gray-50 transition-colors duration-200"
                            >
                              <div className="flex items-center gap-2">
                                {option.icon}
                                {option.label}
                              </div>
                            </SelectItem>
                          ))
                        : [
                            {
                              label: "When a video is uploaded",
                              icon: (
                                <FaUpload className="w-4 h-4 text-green-500" />
                              ),
                            },
                          ].map((option) => (
                            <SelectItem
                              key={option.label}
                              value={option.label}
                              className="cursor-pointer py-2.5 px-4 outline-none hover:bg-gray-50 focus:bg-gray-50 data-[state=checked]:bg-gray-50 data-[highlighted]:bg-gray-50 transition-colors duration-200"
                            >
                              <div className="flex items-center gap-2">
                                {option.icon}
                                {option.label}
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
                        defaultValue={videoTitle}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          setIsSubscribed(false);
                        }}
                        placeholder="Enter title here..."
                        className="h-11 px-4 bg-white/50 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    )}
                  />
                  {errors.videoTitle?.type === "required" && (
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
                        defaultValue={channelId}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          setIsSubscribed(false);
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
            <AnimatedSubscribeButtonDemo
              disabled={false}
              isSubscribed={isSubscribed}
              setIsSubscribed={setIsSubscribed}
              nodes={nodes as any}
              setNodes={setNodes as any}
              trigger={getValues("triggerType")}
              cardId={cardId}
              t1="Submit"
              t2="Submitted"
              actions={actions}
            />
          </form>
        ) : (
          <form
            key={`action-form-${cardId}`}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
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
                      Number(cardId) > Number(firstCardIdWithEmptyFields)
                    }
                    defaultValue={
                      actionsList.find((action) => action.cardId === cardId)
                        ?.actionType
                    }
                    // value={actionType || ""}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full border border-gray-200 bg-white hover:border-gray-300 transition-all duration-200 h-10 rounded-lg">
                      <SelectValue placeholder="Choose an action" />
                    </SelectTrigger>
                    <SelectContent
                      id="action-types"
                      className="bg-white border-gray-200 rounded-lg shadow-lg"
                    >
                      {triggerType === "Plan a video" &&
                        [
                          {
                            label: "Generate thumbnail",
                            icon: (
                              <FaImage className="w-4 h-4 text-purple-500" />
                            ),
                          },
                          {
                            label: "Swap face",
                            icon: (
                              <MdFace className="w-4 h-4 text-orange-500" />
                            ),
                          },
                        ].map((option) => (
                          <SelectItem
                            key={option.label}
                            value={option.label}
                            className="cursor-pointer py-2.5 px-4 outline-none hover:bg-gray-50 focus:bg-gray-50 data-[state=checked]:bg-gray-50 data-[highlighted]:bg-gray-50 transition-colors duration-200"
                          >
                            <div className="flex items-center gap-2">
                              {option.icon}
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      {triggerType === "When a video is uploaded" &&
                        [
                          {
                            label: "Generate SEO optimized title",
                            icon: (
                              <FaSearch className="w-4 h-4 text-blue-500" />
                            ),
                          },
                          {
                            label: "Generate SEO optimized keywords",
                            icon: (
                              <FaSearch className="w-4 h-4 text-blue-500" />
                            ),
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
                            className="cursor-pointer py-2.5 px-4 outline-none hover:bg-gray-50 focus:bg-gray-50 data-[state=checked]:bg-gray-50 data-[highlighted]:bg-gray-50 transition-colors duration-200"
                          >
                            <div className="flex items-center gap-2">
                              {option.icon}
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}

                      {triggerType === "Generate Content Ideas" &&
                        [
                          {
                            label: "Generate thumbnail",
                            icon: (
                              <FaImage className="w-4 h-4 text-purple-500" />
                            ),
                          },
                          {
                            label:
                              "Analyse my channel videos and generate ideas",
                            icon: (
                              <FaLightbulb className="w-4 h-4 text-yellow-500" />
                            ),
                          },
                        ].map((option) => (
                          <SelectItem
                            key={option.label}
                            value={option.label}
                            className="cursor-pointer py-2.5 px-4 outline-none hover:bg-gray-50 focus:bg-gray-50 data-[state=checked]:bg-gray-50 data-[highlighted]:bg-gray-50 transition-colors duration-200"
                          >
                            <div className="flex items-center gap-2">
                              {option.icon}
                              {option.label}
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
            {actionType === "Generate thumbnail" && (
              <GenerateThumbnail
                control={control}
                errors={errors}
                cardId={cardId}
                actionsList={actionsList}
              />
            )}
            {actionType === "Generate captions" && (
              <GenerateCaptions control={control} errors={errors} />
            )}
            {actionType === "Swap face" && (
              <SwapFace control={control} errors={errors} />
            )}
            {actionType === "Generate summary" && (
              <GenerateSummary
                control={control}
                errors={errors}
                cardId={cardId}
                actionsList={actionsList}
              />
            )}
            {actionType === "Generate timestamps" && <></>}

            <AnimatedSubscribeButtonDemo
              disabled={Number(cardId) > Number(firstCardIdWithEmptyFields)}
              isSubscribed={isSubscribed}
              setIsSubscribed={setIsSubscribed}
              nodes={nodes as any}
              setNodes={setNodes as any}
              trigger={trigger}
              cardId={cardId}
              t1="Submit"
              t2="Submitted"
              actions={actions}
            />
          </form>
        )}
      </CardContent>
    </Card>
  );
}
