import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import feed from "./feed";
import modal from "./modal";
import photo from "./photo";
import token from "./token";
import user from "./user";

const middleware = [...getDefaultMiddleware()];
const reducer = combineReducers({ photo, token, user, feed, modal });
const store = configureStore({ reducer, middleware });

export default store;
