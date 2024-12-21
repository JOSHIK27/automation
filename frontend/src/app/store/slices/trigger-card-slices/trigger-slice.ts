import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workflowType: "",
  triggerType: "",
  channelId: "",
  videoTitle: "",
  editable: true,
};

const triggerSlice = createSlice({
  name: "trigger",
  initialState,
  reducers: {
    setTriggerState: (state, action) => {
      const { triggerType, workflowType, channelId, videoTitle, editable } =
        action.payload;
      state.triggerType = triggerType;
      state.workflowType = workflowType;
      state.channelId = channelId;
      state.videoTitle = videoTitle;
      state.editable = editable;
    },
  },
});

export const { setTriggerState } = triggerSlice.actions;
export default triggerSlice.reducer;
