import { createSlice } from "@reduxjs/toolkit";
import { actionItemType } from "@/types";

const initialState: actionItemType[] = [
  { cardId: "2", actionType: "", actionInput: "" },
];

export const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    addAction: (state, action) => {
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
    insertActionInBetween: (state, action) => {
      const { cardId, actionType, actionInput } = action.payload;
      const actionToInsert = { cardId, actionType, actionInput };

      const updatedActions = state.map((action) => {
        if (Number(action.cardId) >= Number(cardId)) {
          return {
            ...action,
            cardId: String(Number(action.cardId) + 1),
          };
        }
        return action;
      });
      state.splice(0, state.length);

      updatedActions.push(actionToInsert);
      updatedActions.sort((a, b) => Number(a.cardId) - Number(b.cardId));

      updatedActions.forEach((action) => {
        state.push(action);
      });
    },
  },
});

export const { addAction, updateAction, insertActionInBetween } =
  actionsSlice.actions;

export default actionsSlice.reducer;
