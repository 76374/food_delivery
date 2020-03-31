import { combineReducers } from "redux";
import order from './order';
import appState from './appState';

export default combineReducers({ order, appState });