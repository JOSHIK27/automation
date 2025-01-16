import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  id: string;
  startFetching: boolean;
}[] = [];

const startFetchingSlice = createSlice({
  name: "startFetching",
  initialState,
  reducers: {
    setStartFetching: (state, action) => {
      return action.payload;
    },
    updateStartFetching: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      console.log(index);
      if (index !== -1) {
        state[index].startFetching = action.payload.startFetching;
      }
      console.log(state);
    },
  },
});

export const { setStartFetching, updateStartFetching } =
  startFetchingSlice.actions;
export default startFetchingSlice.reducer;
