import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = slice.actions;

export default slice.reducer;
