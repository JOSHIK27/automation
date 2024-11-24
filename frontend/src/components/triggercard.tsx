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

export default function TriggerCard({
  showCard,
  setShowCard,
  cardId,
  setTrigger,
  trigger,
  channelId,
  setChannelId,
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
  setChannelId: any;
  channelId: string;
  selectValue: string;
  setSelectValue: (value: string) => void;
  isSubscribed: boolean;
  setIsSubscribed: (isSubscribed: boolean) => void;
  nodes: any;
  setNodes: any;
  actions: any;
  setActions: any;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

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
                htmlFor="trigger"
              >
                Select Trigger
              </label>
              <Controller
                control={control}
                rules={{ required: "This field is required" }}
                name="trigger"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectValue(value);
                      setTrigger(value);
                      setIsSubscribed(false);
                    }}
                  >
                    <SelectTrigger className="w-full border border-gray-200 bg-white hover:border-gray-300 transition-all duration-200 h-10 rounded-lg">
                      <SelectValue placeholder="Choose an event trigger" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
                      <SelectItem
                        value="When video uploads to my channel"
                        className="hover:bg-gray-50 cursor-pointer py-2.5"
                      >
                        When video uploads to my channel
                      </SelectItem>
                      <SelectItem
                        value="When video uploads to channel"
                        className="hover:bg-gray-50 cursor-pointer py-2.5"
                      >
                        When video uploads to channel
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.trigger?.type === "required" && (
                <p role="alert" className="text-red-500 text-sm mt-1.5">
                  Please select a trigger event
                </p>
              )}
            </div>
            <div>
              <label
                className="text-sm font-medium text-gray-700 mb-1.5 block"
                htmlFor="channelId"
              >
                Enter Channel Id
              </label>
              <Controller
                control={control}
                rules={{ required: "This field is required" }}
                name="channelId"
                render={({ field }) => (
                  <Input
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setChannelId(e.target.value);
                    }}
                    placeholder="Enter here..."
                  />
                )}
              />
              {errors.channelId?.type === "required" && (
                <p role="alert" className="text-red-500 text-sm mt-1.5">
                  Please enter channel id
                </p>
              )}
            </div>

            <AnimatedSubscribeButtonDemo
              isSubscribed={isSubscribed}
              setIsSubscribed={setIsSubscribed}
              nodes={nodes as any}
              setNodes={setNodes as any}
              trigger={trigger}
              channelId={channelId}
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
              <label
                className="text-sm font-medium text-gray-700 mb-1.5 block"
                htmlFor="action"
              >
                Select Action
              </label>
              <Controller
                control={control}
                rules={{ required: "This field is required" }}
                name="action"
                render={({ field }) => (
                  <Select
                    //   value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectValue(value);
                      setIsSubscribed(false);
                      setActions((a: any) => [
                        ...a,
                        { cardId: cardId, action: value },
                      ]);
                    }}
                  >
                    <SelectTrigger className="w-full border border-gray-200 bg-white hover:border-gray-300 transition-all duration-200 h-10 rounded-lg">
                      <SelectValue placeholder="Choose an action" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
                      <SelectItem
                        value="Generate a thumbnail"
                        className="hover:bg-gray-50 cursor-pointer py-2.5"
                      >
                        Generate a thumbnail
                      </SelectItem>
                      <SelectItem
                        value="Generate Captions"
                        className="hover:bg-gray-50 cursor-pointer py-2.5"
                      >
                        Generate Captions
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.action?.type === "required" && (
                <p role="alert" className="text-red-500 text-sm mt-1.5">
                  Please select an action
                </p>
              )}
            </div>

            <AnimatedSubscribeButtonDemo
              isSubscribed={isSubscribed}
              setIsSubscribed={setIsSubscribed}
              nodes={nodes as any}
              setNodes={setNodes as any}
              trigger={trigger}
              channelId={channelId}
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
