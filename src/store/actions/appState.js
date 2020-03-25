import { PROCESS_ADDED, PROCESS_REMOVED } from "../actionTypes";

export const processAdded = id => ({
    type: PROCESS_ADDED,
    payload: id
});

export const processRemoved = id => ({
    type: PROCESS_REMOVED,
    payload: id
});