import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChannelIdState {
  value: string;
}

const initialState: ChannelIdState = {
  value: "",
};

export const channelIdSlice = createSlice({
  name: "channelId",
  initialState,
  reducers: {
    setChannelId: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setChannelId } = channelIdSlice.actions;

export default channelIdSlice.reducer;
