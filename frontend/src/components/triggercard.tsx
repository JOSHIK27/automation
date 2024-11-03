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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";

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
  const {
    register,
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
        showCard ? "absolute top-20 right-4 w-[400px] z-10" : "hidden"
      } border-gray-200 shadow-lg`}
    >
      <CardHeader className="relative">
        <button
          className="absolute right-2 top-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => setShowCard(false)}
        >
          <IoClose className="w-5 h-5 text-gray-500" />
        </button>
        <CardTitle className="text-2xl font-bold text-gray-900">
          <div className="flex items-center gap-2">
            <FaYoutube className="w-6 h-6 text-gray-900" />
            YouTube
          </div>
        </CardTitle>
        <Separator className="my-4 bg-gray-200" />
      </CardHeader>
      <CardContent>
        {cardId === "1" ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <label
              className="text-sm text-gray-500 font-medium mb-2 block"
              htmlFor="trigger"
            >
              Trigger
            </label>
            <Controller
              control={control}
              rules={{ required: "This field is required" }}
              name="trigger"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectValue(value);
                    setTrigger(value);
                    setIsSubscribed(false);
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
              )}
            />
            {errors.trigger?.type === "required" && (
              <p role="alert" className="text-red-500 text-sm mt-2">
                You must select an event
              </p>
            )}
            <br />
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
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <label
              className="text-sm text-gray-500 font-medium mb-2 block"
              htmlFor="action"
            >
              Action
            </label>
            <Controller
              control={control}
              rules={{ required: "This field is required" }}
              name="action"
              render={({ field }) => (
                <Select
                  value={field.value}
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
                  <SelectTrigger className="w-full border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                    <SelectValue placeholder="Select Action" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem
                      value="Generate a thumbnail"
                      className="hover:bg-gray-50"
                    >
                      Generate a thumbnail
                    </SelectItem>
                    <SelectItem
                      value="Generate Captions"
                      className="hover:bg-gray-50"
                    >
                      Generate Captions
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.action?.type === "required" && (
              <p role="alert" className="text-red-500 text-sm mt-2">
                You must select an action
              </p>
            )}
            <br />
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
