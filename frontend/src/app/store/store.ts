import { configureStore } from "@reduxjs/toolkit";
import videoTitleReducer from "./slices/trigger-card-slices/video-title-slice";
import channelIdReducer from "./slices/trigger-card-slices/channel-id-slice";
export const store = configureStore({
  reducer: {
    videoTitle: videoTitleReducer,
    channelId: channelIdReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
