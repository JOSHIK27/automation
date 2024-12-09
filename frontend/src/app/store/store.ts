import { configureStore } from "@reduxjs/toolkit";
import triggerReducer from "./slices/trigger-card-slices/trigger-slice";
import actionsReducer from "./slices/trigger-card-slices/actions-slice";

export const store = configureStore({
  reducer: {
    trigger: triggerReducer,
    actions: actionsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
