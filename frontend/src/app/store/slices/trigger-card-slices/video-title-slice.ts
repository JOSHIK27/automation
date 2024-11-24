import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoTitleState {
  value: string;
}

const initialState: VideoTitleState = {
  value: "",
};

export const videoTitleSlice = createSlice({
  name: "videoTitle",
  initialState,
  reducers: {
    setVidTitle: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setVidTitle } = videoTitleSlice.actions;

export default videoTitleSlice.reducer;
