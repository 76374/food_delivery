import { PROCESS_ADDED, PROCESS_REMOVED, ERROR_OCCURED } from "../actionTypes";
import { combineObjects } from "../utils";

const initialState = {
    loading: false,
    error: null
};

const processes = [];

const processAdded = (state, id) => {
    if (processes.includes(id)) {
        return state;
    }
    processes.push(id);
    return combineObjects(state, { loading: true });
}

const processRemoved = (state, id) => {
    const index = processes.indexOf(id);
    if (index === -1) {
        return state;
    }
    processes.splice(index, 1);
    return combineObjects(state, { loading: processes.length > 0 });
}

const errorOccured = (state, payload) => {
    return combineObjects(state, { error: payload });
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PROCESS_ADDED:
            return processAdded(state, action.payload);
        case PROCESS_REMOVED:
            return processRemoved(state, action.payload);
        case ERROR_OCCURED:
            return errorOccured(state, action.payload);
        default:
            return state;
    }
}