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
  },
});

export const { setWorkflowType, setTriggerType, setTriggerInput } =
  triggerSlice.actions;
export default triggerSlice.reducer;
