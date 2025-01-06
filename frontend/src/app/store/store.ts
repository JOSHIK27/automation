import { configureStore } from "@reduxjs/toolkit";
import triggerReducer from "./slices/trigger-card-slices/trigger-slice";
import actionsReducer from "./slices/trigger-card-slices/actions-slice";
import taskstatusReducer from "./slices/trigger-card-slices/task-status-slice";
import userReducer from "./slices/user-slice";
import updateBtnReducer from "./slices/trigger-card-slices/update-btn-slice";
import workflowNameReducer from "./slices/workflow-name-slice";

export const store = configureStore({
  reducer: {
    trigger: triggerReducer,
    actions: actionsReducer,
    taskstatus: taskstatusReducer,
    user: userReducer,
    updateBtn: updateBtnReducer,
    workflowName: workflowNameReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
