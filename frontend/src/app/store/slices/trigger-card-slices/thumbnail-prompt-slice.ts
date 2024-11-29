import { createSlice } from "@reduxjs/toolkit";

interface ThumbnailPromptState {
  prompt: string;
}

const initialState: ThumbnailPromptState = {
  prompt: "",
};

export const thumbnailPromptSlice = createSlice({
  name: "thumbnailPrompt",
  initialState,
  reducers: {
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
  },
});

export const { setPrompt } = thumbnailPromptSlice.actions;
export default thumbnailPromptSlice.reducer;
