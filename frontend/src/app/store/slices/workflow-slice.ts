import { createSlice } from "@reduxjs/toolkit";

export const workflowSlice = createSlice({
  name: "workflow",
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
  workflowSlice.actions;
export default workflowSlice.reducer;
