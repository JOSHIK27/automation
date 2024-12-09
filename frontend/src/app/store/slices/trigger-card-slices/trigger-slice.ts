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
    setWorkflowType: (state, action) => {
      state.workflowType = action.payload;
    },
    setTriggerType: (state, action) => {
      state.triggerType = action.payload;
    },
    setTriggerInput: (state, action) => {
      state.triggerInput = action.payload;
    },
    setTriggerState: (state, action) => {
      const { triggerType, triggerInput, workflowType } = action.payload;
      state.triggerType = triggerType;
      state.triggerInput = triggerInput;
      state.workflowType = workflowType;
    },
  },
});

export const {
  setWorkflowType,
  setTriggerType,
  setTriggerInput,
  setTriggerState,
} = triggerSlice.actions;
export default triggerSlice.reducer;
