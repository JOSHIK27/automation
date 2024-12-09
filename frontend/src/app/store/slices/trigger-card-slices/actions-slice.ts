import { createSlice } from "@reduxjs/toolkit";
import { actionItemType } from "@/types";

const initialState: actionItemType[] = [{ cardId: "2" }];

export const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    setAction: (state, action) => {
      const { cardId } = action.payload;
      const cardExists = state.find((action) => action.cardId === cardId);
      if (!cardExists) {
        state.push(action.payload);
      } else {
        const index = state.findIndex((action) => action.cardId === cardId);
        if (index !== -1) {
          state[index] = action.payload;
        }
      }
    },
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
      const { cardId } = action.payload;
      const actionToInsert = { cardId };

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

export const { addAction, updateAction, insertActionInBetween, setAction } =
  actionsSlice.actions;

export default actionsSlice.reducer;
