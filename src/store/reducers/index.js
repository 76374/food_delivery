import { combineReducers } from "redux";
import order from './order';
import appState from './appState';

const reducer = combineReducers({ order, appState });

 export default reducer;