import { CheckIcon, ChevronRightIcon } from "lucide-react";

import { AnimatedSubscribeButton } from "./animated-subscribe-button";

export function AnimatedSubscribeButtonDemo({
  t1,
  t2,
  nodes,
  setNodes,
  trigger,
  cardId,
  actions,
  setActions,
  isSubscribed,
  setIsSubscribed,
}: {
  t1: string;
  t2: string;
  nodes: Node[];
  setNodes: any;
  trigger: string;
  cardId: string;
  actions: any[];
  setActions: any;
  isSubscribed: boolean;
  setIsSubscribed: any;
}) {
  return (
    <AnimatedSubscribeButton
      buttonColor="black"
      buttonTextColor="white"
      subscribeStatus={false}
      nodes={nodes}
      setNodes={setNodes}
      trigger={trigger}
      cardId={cardId}
      actions={actions}
      isSubscribed={isSubscribed}
      setIsSubscribed={setIsSubscribed}
      initialText={
        <span className="group inline-flex items-center">
          {t1}
          <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      }
      changeText={
        <span className="group inline-flex items-center">
          <CheckIcon className="mr-2 size-4" />
          {t2}
        </span>
      }
    />
  );
}
