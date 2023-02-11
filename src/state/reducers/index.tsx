import { combineReducers } from "redux";
import AppReducer from "../reducers/AppReducer";

export default combineReducers({
  app: AppReducer,
});
