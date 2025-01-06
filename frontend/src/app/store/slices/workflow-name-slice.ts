import { createSlice } from "@reduxjs/toolkit";

export const workflowNameSlice = createSlice({
  name: "workflowName",
  initialState: {
    workflowName: "",
    workflowId: "",
  },
  reducers: {
    setWorkflowName: (state, action) => {
      state.workflowName = action.payload;
    },
    setWorkflowId: (state, action) => {
      state.workflowId = action.payload;
    },
    resetWorkflowName: (state) => {
      state.workflowName = "";
      state.workflowId = "";
    },
  },
});

export const { setWorkflowName, setWorkflowId, resetWorkflowName } =
  workflowNameSlice.actions;
export default workflowNameSlice.reducer;
