import { combineReducers } from "redux";

import AuthReducer from "./authReducer";
import ErrorReducer from "./errorReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  errors: ErrorReducer,
  user: userReducer,
  posts: postReducer
});

export default rootReducer;
