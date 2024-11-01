"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AnimatedSubscribeButtonProps {
  buttonColor: string;
  buttonTextColor?: string;
  subscribeStatus: boolean;
  initialText: React.ReactElement | string;
  changeText: React.ReactElement | string;
  nodes: any;
  setNodes: any;
  trigger: string;
  cardId: string;
  actions: any[];
  isSubscribed: boolean;
  setIsSubscribed: any;
}

export const AnimatedSubscribeButton: React.FC<
  AnimatedSubscribeButtonProps
> = ({
  buttonColor,
  subscribeStatus,
  buttonTextColor,
  changeText,
  initialText,
  nodes,
  setNodes,
  trigger,
  cardId,
  actions,
  isSubscribed,
  setIsSubscribed,
}) => {
  const handleSubmit = () => {
    if (cardId === "1") {
      if (trigger === "") {
        return;
      }
      const currentNodes = nodes;
      const updatedNodes = currentNodes.map((node: any) => {
        if (node.id === "1") {
          return { ...node, data: { label: trigger, type: "Trigger" } };
        }
        return node;
      });
      setNodes(updatedNodes);
    } else {
      const currentNodes = nodes;
      let label = "";
      actions.forEach((action) => {
        if (action.cardId === cardId) {
          label = action.action;
        }
      });
      const updatedNodes = currentNodes.map((node: any) => {
        if (node.id === cardId) {
          return { ...node, data: { label: label, type: "Action" } };
        }
        return node;
      });
      setNodes(updatedNodes);
    }
    setIsSubscribed(true);
  };

  return (
    <AnimatePresence mode="wait">
      {isSubscribed ? (
        <motion.button
          className="relative flex w-full cursor-pointer items-center justify-center rounded-md border-none py-2"
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="action"
            className="relative block h-full w-full font-semibold"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            style={{ color: buttonTextColor }}
          >
            {changeText}
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          className="relative flex w-full cursor-pointer items-center justify-center rounded-md border-none py-2"
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          onClick={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="reaction"
            className="relative block font-semibold"
            initial={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            {initialText}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
