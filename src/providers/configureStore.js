import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import feed from "./feed";
import modal from "./modal";
import photo from "./photo";
import token from "./token";
import user from "./user";

export const reducer = combineReducers({ photo, token, user, feed, modal });
const store = configureStore({ reducer });

export default store;
