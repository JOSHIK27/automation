import { createSlice } from "@reduxjs/toolkit";

interface Action {
  cardId: string;
  actionType: string;
  actionInput: string;
}

const initialState: Action[] = [];

export const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    setActions: (state, action) => {
      state.push(action.payload);
    },
    updateAction: (state, action) => {
      const { cardId, actionType, actionInput } = action.payload;
      const actionToUpdate = state.find((action) => action.cardId === cardId);
      if (actionToUpdate) {
        actionToUpdate.actionType = actionType;
        actionToUpdate.actionInput = actionInput;
      }
    },
  },
});

export const { setActions, updateAction } = actionsSlice.actions;

export default actionsSlice.reducer;
