import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workflowType: "",
  triggerType: "",
  triggerInput: "",
};

const triggerSlice = createSlice({
  name: "trigger",
  initialState,
  reducers: {
    setTriggerState: (state, action) => {
      const { triggerType, triggerInput, workflowType } = action.payload;
      state.triggerType = triggerType;
      state.triggerInput = triggerInput;
      state.workflowType = workflowType;
    },
  },
});

export const { setTriggerState } = triggerSlice.actions;
export default triggerSlice.reducer;
