import { combineReducers, legacy_createStore as createStore } from "redux";
import eventReducer from "./eventReducer"; 

let reducers = combineReducers({
    eventComponent: eventReducer,
})

export type reducers = ReturnType<typeof reducers>

let store = createStore(reducers)


export default store;