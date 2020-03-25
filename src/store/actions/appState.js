import { PROCESS_ADDED, PROCESS_REMOVED, ERROR_OCCURED } from "../actionTypes";

export const processAdded = id => ({
    type: PROCESS_ADDED,
    payload: id
});

export const processRemoved = id => ({
    type: PROCESS_REMOVED,
    payload: id
});

export const errorOccured = message => ({
    type: ERROR_OCCURED,
    payload: message === null ? null : { message }
});