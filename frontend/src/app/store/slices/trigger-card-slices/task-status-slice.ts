import { createSlice } from "@reduxjs/toolkit";

const initialState: any[] = [];

const taskstatusslice = createSlice({
  name: "taskstatus",
  initialState,
  reducers: {
    setTasksStatus: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setTasksStatus } = taskstatusslice.actions;
export default taskstatusslice.reducer;
