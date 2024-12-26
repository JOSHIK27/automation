import { CheckIcon, ChevronRightIcon } from "lucide-react";

import { AnimatedSubscribeButton } from "./animated-subscribe-button";

export function AnimatedSubscribeButtonDemo({
  t1,
  t2,
  isSubscribed,
  disabled,
}: {
  t1: string;
  t2: string;
  isSubscribed: boolean;
  disabled: boolean;
}) {
  return (
    <AnimatedSubscribeButton
      buttonColor={disabled ? "#e5e7eb" : "teal"}
      buttonTextColor={disabled ? "#6b7280" : "white"}
      disabled={disabled}
      isSubscribed={isSubscribed}
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
