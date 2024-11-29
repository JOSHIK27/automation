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
import { setVidTitle } from "@/app/store/slices/trigger-card-slices/video-title-slice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Textarea } from "./ui/textarea";
import { dataModel } from "@/data/selectDependencies";
import {
  setTriggerType,
  setWorkflowType,
  setTriggerInput,
} from "@/app/store/slices/trigger-card-slices/trigger-slice";
import { actionsSlice } from "@/app/store/slices/trigger-card-slices/actions-slice";
export default function TriggerCard({
  showCard,
  setShowCard,
  cardId,
  setTrigger,
  trigger,
  selectValue,
  setSelectValue,
  isSubscribed,
  setIsSubscribed,
  nodes,
  setNodes,
  actions,
  setActions,
}: {
  showCard: boolean;
  setShowCard: (show: boolean) => void;
  cardId: string;
  setTrigger: (trigger: string) => void;
  trigger: string;
  selectValue: string;
  setSelectValue: (value: string) => void;
  isSubscribed: boolean;
  setIsSubscribed: (isSubscribed: boolean) => void;
  nodes: any;
  setNodes: any;
  actions: any;
  setActions: any;
}) {
  const dispatch = useDispatch();
  const { updateAction } = actionsSlice.actions;
  const actionsList: any[] = useSelector((state: RootState) => state.actions);
  const currentAction = actionsList.find((action) => action.cardId === cardId);

  const triggerType = useSelector(
    (state: RootState) => state.trigger.triggerType
  );
  const workflowType = useSelector(
    (state: RootState) => state.trigger.workflowType
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
    setValue,
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  console.log(getValues());

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
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setValue("triggerType", "");
                      setIsSubscribed(false);
                      dispatch(setWorkflowType(value));
                      dispatch(setTriggerType(""));
                    }}
                  >
                    <SelectTrigger className="w-full border border-gray-200 bg-white hover:border-gray-300 transition-all duration-200 h-10 rounded-lg">
                      <SelectValue
                        placeholder={dataModel.workflowTypes.placeholder}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
                      {dataModel.workflowTypes.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
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
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectValue(value);
                      setIsSubscribed(false);
                      dispatch(setTriggerType(value));
                    }}
                  >
                    <SelectTrigger className="w-full border border-gray-200 bg-white hover:border-gray-300 transition-all duration-200 h-10 rounded-lg">
                      <SelectValue
                        placeholder={dataModel.triggerTypes.placeholder}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
                      {dataModel.triggerTypes.options[
                        workflowType as keyof typeof dataModel.triggerTypes.options
                      ]?.map((option) => (
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
            {triggerType && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  {
                    dataModel.triggerInputs[
                      triggerType as keyof typeof dataModel.triggerInputs
                    ].label
                  }
                </label>
                <Controller
                  control={control}
                  rules={{ required: "This field is required" }}
                  name="triggerInput"
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        dispatch(setTriggerInput(e.target.value));
                        setIsSubscribed(false);
                      }}
                      placeholder={
                        dataModel.triggerInputs[
                          triggerType as keyof typeof dataModel.triggerInputs
                        ].placeholder
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
              isSubscribed={isSubscribed}
              setIsSubscribed={setIsSubscribed}
              nodes={nodes as any}
              setNodes={setNodes as any}
              trigger={triggerType}
              cardId={cardId}
              t1="Submit"
              t2="Submitted"
              actions={actions}
              setActions={setActions}
            />
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Select Action
              </label>
              <Controller
                control={control}
                name="actionType"
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full border border-gray-200 bg-white hover:border-gray-300 transition-all duration-200 h-10 rounded-lg">
                      <SelectValue placeholder="Choose an action" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
                      {dataModel.actionTypes[
                        triggerType as keyof typeof dataModel.actionTypes
                      ]?.map((option) => (
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

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                {
                  dataModel.actionInputs[
                    currentAction?.actionType as keyof typeof dataModel.actionInputs
                  ].label
                }
              </label>
              <Controller
                control={control}
                name="actionInput"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      dispatch(
                        updateAction({
                          cardId,
                          actionType: currentAction?.actionType,
                          actionInput: e.target.value,
                        })
                      );
                    }}
                  />
                )}
              />
            </div>

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
          </form>
        )}
      </CardContent>
    </Card>
  );
}
