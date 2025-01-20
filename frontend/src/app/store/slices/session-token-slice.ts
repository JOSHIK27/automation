import { createSlice } from "@reduxjs/toolkit";

export const sessionTokenSlice = createSlice({
  name: "sessionToken",
  initialState: {
    sessionToken: "",
  },
  reducers: {
    setSessionToken: (state, action) => {
      state.sessionToken = action.payload;
    },
  },
});

export const { setSessionToken } = sessionTokenSlice.actions;
export default sessionTokenSlice.reducer;
