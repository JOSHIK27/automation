import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workflowType: "",
  triggerType: "",
  channelId: "",
  videoTitle: "",
};

const triggerSlice = createSlice({
  name: "trigger",
  initialState,
  reducers: {
    setTriggerState: (state, action) => {
      const { triggerType, workflowType, channelId, videoTitle } =
        action.payload;
      state.triggerType = triggerType;
      state.workflowType = workflowType;
      state.channelId = channelId;
      state.videoTitle = videoTitle;
    },
    resetTriggerState: (state) => {
      state.triggerType = "";
      state.workflowType = "";
      state.channelId = "";
      state.videoTitle = "";
    },
  },
});

export const { setTriggerState, resetTriggerState } = triggerSlice.actions;
export default triggerSlice.reducer;
