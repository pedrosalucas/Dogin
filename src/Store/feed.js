import { PHOTOS_GET } from "../api";
import createAsyncSlice from "./helper/createAsyncSlice";

const slice = createAsyncSlice({
  name: "feed",
  initialState: {
    list: [],
    page: 1,
    hasContent: true,
  },
  reducers: {
    addPhotos(state, action) {
      state.list.push(...action.payload);

      if (action.payload.length === 0) state.hasContent = false;
    },
    addPage(state) {
      state.page++;
    },
    resetState(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.list = [];
      state.page = 1;
      state.hasContent = true;
    },
  },
  fetchConfig: ({ page, total, user }) => PHOTOS_GET({ page, total, user }),
});

export const fetchFeed = slice.asyncAction;
export const { addPhotos, addPage, resetState: resetFeedState } = slice.actions;

export const loadNewPhotos =
  ({ total, user }) =>
  async (dispatch, getState) => {
    const { feed } = getState();
    dispatch(addPage());

    const { payload } = await dispatch(
      fetchFeed({ page: feed.page, total, user })
    );
    await dispatch(addPhotos(payload));
  };

export default slice.reducer;
