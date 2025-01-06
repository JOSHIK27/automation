import { createSlice } from "@reduxjs/toolkit";

const initialState: { cardId: string; isSubscribed: boolean }[] = [
  {
    cardId: "1",
    isSubscribed: false,
  },
  {
    cardId: "2",
    isSubscribed: false,
  },
];

const updateBtnSlice = createSlice({
  name: "updateBtn",
  initialState,
  reducers: {
    setIsSubscribed: (state, action) => {
      const { cardId, isSubscribed } = action.payload;
      state.forEach((item) => {
        if (item.cardId === cardId) {
          item.isSubscribed = isSubscribed;
        }
      });
    },
    addBtnStatus: (state, action) => {
      const { cardId, isSubscribed } = action.payload;
      state.push({ cardId, isSubscribed });
    },
    insertBtnStatusInBetween: (state, action) => {
      const { cardId } = action.payload;
      const btnStatusToInsert = { cardId, isSubscribed: false };
      const updatedBtnStatus = state.map((btnStatus) => {
        if (Number(btnStatus.cardId) >= Number(cardId)) {
          return {
            ...btnStatus,
            cardId: String(Number(btnStatus.cardId) + 1),
          };
        }
        return btnStatus;
      });
      state.splice(0, state.length);

      updatedBtnStatus.push(btnStatusToInsert);
      updatedBtnStatus.sort((a, b) => Number(a.cardId) - Number(b.cardId));

      updatedBtnStatus.forEach((btnStatus) => {
        state.push(btnStatus);
      });
    },
    resetBtnStatus: (state) => {
      state.splice(0, state.length);
      state.push({ cardId: "1", isSubscribed: false });
      state.push({ cardId: "2", isSubscribed: false });
    },
  },
});

export const {
  setIsSubscribed,
  addBtnStatus,
  insertBtnStatusInBetween,
  resetBtnStatus,
} = updateBtnSlice.actions;
export default updateBtnSlice.reducer;
