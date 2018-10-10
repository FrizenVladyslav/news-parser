import { createStore, applyMiddleware } from "redux";
import reduxLogger from "redux-logger";
import rootReducers from "./reducers";


const store = createStore(rootReducers, applyMiddleware(reduxLogger));

export default store;