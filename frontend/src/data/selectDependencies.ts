export const dataModel = {
  workflowTypes: {
    placeholder: "Select Workflow Type",
    options: ["Pre Production", "Post Production"],
  },
  triggerTypes: {
    placeholder: "Select here...",
    options: {
      "Pre Production": ["Plan a video"],
      "Post Production": ["When a video is uploaded"],
    },
  },
  triggerInputs: {
    "Plan a video": {
      label: "Title of the video",
      type: "text",
      placeholder: "Enter title here...",
    },
    "When a video is uploaded": {
      label: "Channel ID",
      type: "text",
      placeholder: "Enter channel ID here...",
    },
  },
  actionTypes: {
    "Plan a video": ["Generate thumbnail", "Swap face"],
    "When a video is uploaded": ["Generate captions", "Generate summary"],
  },
  // actionInputs: {
  //   "Generate thumbnail": [
  //     {
  //       label: "Enter the prompt",
  //       type: "text",
  //       placeholder: "Enter prompt here...",
  //     },
  //   ],
  //   "Generate captions": [],
  // },
};
