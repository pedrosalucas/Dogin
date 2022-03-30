import { createSlice } from "@reduxjs/toolkit";

const createAsyncSlice = (config) => {
  const slice = createSlice({
    name: config.name,
    initialState: {
      data: null,
      loading: false,
      error: null,
      ...config.initialState,
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
      ...config.reducers,
    },
  });

  const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

  const asyncAction = (payload) => async (dispatch) => {
    try {
      dispatch(fetchStarted());

      const { url, options } = config.fetchConfig(payload);
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok === false) throw new Error(data.message);

      return dispatch(fetchSuccess(data));
    } catch (error) {
      return dispatch(fetchError(error.message));
    }
  };

  return { ...slice, asyncAction };
};

export default createAsyncSlice;
