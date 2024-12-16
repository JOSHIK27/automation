import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workflowType: "",
  triggerType: "",
  triggerInput: "",
  channelId: "",
  videoTitle: "",
};

const triggerSlice = createSlice({
  name: "trigger",
  initialState,
  reducers: {
    setTriggerState: (state, action) => {
      const { triggerType, triggerInput, workflowType, channelId, videoTitle } =
        action.payload;
      state.triggerType = triggerType;
      state.triggerInput = triggerInput;
      state.workflowType = workflowType;
      state.channelId = channelId;
      state.videoTitle = videoTitle;
    },
  },
});

export const { setTriggerState } = triggerSlice.actions;
export default triggerSlice.reducer;
