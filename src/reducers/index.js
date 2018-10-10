import { combineReducers } from "redux";
import post from "./post";
import regions from "./regions";

const rootReducers = combineReducers({
	post,
	regions,
});

export default rootReducers;