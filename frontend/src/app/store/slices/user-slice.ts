import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user_id: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.user_id = action.payload;
    },
  },
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;
