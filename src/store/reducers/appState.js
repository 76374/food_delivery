import { PROCESS_ADDED, PROCESS_REMOVED, ERROR_OCCURED, AUTH_SUBMITED, LOGOUT } from "../actionTypes";
import { combineObjects } from "../utils";

const initialState = {
    loading: false,
    error: null,
    authData: null
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

const authSubmited = (state, authData) => {
    return combineObjects(state, { authData });
}

const logout = state => {
    return combineObjects(state, { authData: null });
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PROCESS_ADDED:
            return processAdded(state, action.payload);
        case PROCESS_REMOVED:
            return processRemoved(state, action.payload);
        case ERROR_OCCURED:
            return errorOccured(state, action.payload);
        case AUTH_SUBMITED:
            return authSubmited(state, action.payload);
        case LOGOUT:
            return logout(state);
        default:
            return state;
    }
}