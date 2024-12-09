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
import { FaYoutube } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
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
  const actionsList: actionItemType[] = useSelector(
    (state: RootState) => state.actions
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    getValues,
  } = useForm();

  useEffect(() => {
    setActionType(watch("actionType"));
  }, [watch("actionType")]);

  useEffect(() => {
    setActionType("");
  }, [cardId]);

  watch("workflowType");
  watch("triggerType");
  watch("triggerInput");

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
      const { triggerType, triggerInput, workflowType } = data;
      if (workflowType === "" || triggerType === "" || triggerInput === "") {
        return;
      }

      dispatch(setTriggerState({ triggerType, triggerInput, workflowType }));
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
      const { triggerType, triggerInput, workflowType, ...rest } = data;
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
    if (
      firstCardIdWithEmptyFields === "10000000" &&
      (action.actionInput === "" || action.actionType === "")
    ) {
      firstCardIdWithEmptyFields = action.cardId;
    }
  });

  return (
    <Card
      className={`${
        showCard ? "absolute top-20 right-4 w-[450px] z-10" : "hidden"
      } border-gray-200 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.2)] transition-all duration-300 rounded-xl`}
    >
      <CardHeader className="relative pb-2">
        <button
          className="absolute right-4 top-4 p-1.5 hover:bg-gray-100 rounded-full transition-all duration-200"
          onClick={() => setShowCard(false)}
        >
          <IoClose className="w-4 h-4 text-gray-500 hover:text-gray-700" />
        </button>
        <CardTitle className="text-xl font-semibold text-gray-800">
          <div className="flex items-center gap-2.5">
            <FaYoutube className="w-5 h-5 text-red-600" />
            YouTube Integration
          </div>
        </CardTitle>
        <Separator className="my-3 bg-gray-100" />
      </CardHeader>
      <CardContent className="pt-2">
        {cardId === "1" ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                className="text-sm font-medium text-gray-700 mb-1.5 block"
                htmlFor="workflowType"
              >
                Select Workflow Type
              </label>
              <Controller
                control={control}
                name="workflowType"
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    defaultValue={getValues("workflowType")}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setIsSubscribed(false);
                    }}
                  >
                    <SelectTrigger className="w-full border border-gray-200 bg-white hover:border-gray-300 transition-all duration-200 h-10 rounded-lg">
                      <SelectValue
                        placeholder={dataModel.workflowTypes.placeholder}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
                      {/* {dataModel.workflowTypes.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))} */}
                      <SelectItem value="Pre Production">
                        Pre Production
                      </SelectItem>
                      <SelectItem value="Post Production">
                        Post Production
                      </SelectItem>
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
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectValue(value);
                      setIsSubscribed(false);
                    }}
                  >
                    <SelectTrigger className="w-full border border-gray-200 bg-white hover:border-gray-300 transition-all duration-200 h-10 rounded-lg">
                      <SelectValue
                        placeholder={dataModel.triggerTypes.placeholder}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
                      {getValues("workflowType") === "Pre Production"
                        ? ["Plan a video"].map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))
                        : ["When a video is uploaded"].map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
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
            {getValues("triggerType") && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  {getValues("triggerType") === "Plan a video"
                    ? "Title of the video"
                    : "Channel ID"}
                </label>
                <Controller
                  control={control}
                  rules={{ required: "This field is required" }}
                  name="triggerInput"
                  render={({ field }) => (
                    <Input
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setIsSubscribed(false);
                      }}
                      placeholder={
                        getValues("triggerType") === "Plan a video"
                          ? "Enter title here..."
                          : "Enter channel ID here..."
                      }
                    />
                  )}
                />
                {errors.triggerInput?.type === "required" && (
                  <p role="alert" className="text-red-500 text-sm mt-1.5">
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    // disabled={
                    //   Number(cardId) > Number(firstCardIdWithEmptyFields)
                    // }
                    value={actionType || ""}
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
                      {getValues("triggerType") === "Plan a video"
                        ? ["Generate thumbnail", "Swap face"].map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))
                        : [
                            "Generate captions",
                            "Generate summary",
                            "Generate timestamps",
                          ].map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
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
              <GenerateThumbnail control={control} errors={errors} />
            )}
            {actionType === "Generate captions" && (
              <GenerateCaptions control={control} errors={errors} />
            )}
            {actionType === "Swap face" && (
              <SwapFace control={control} errors={errors} />
            )}
            {actionType === "Generate summary" && (
              <GenerateSummary control={control} errors={errors} />
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
