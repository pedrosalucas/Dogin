import { PHOTO_GET } from "../api";

const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: "photo",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchStarted(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

export const getPhoto = (id) => async (dispatch) => {
  try {
    dispatch(fetchStarted());

    const { url, options } = PHOTO_GET(id);
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok === false) throw new Error(data.message);

    return dispatch(fetchSuccess(data));
  } catch (error) {
    return dispatch(fetchError(error.message));
  }
};

export default slice.reducer;
