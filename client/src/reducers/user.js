import {LOGIN, CHECK, LOGOUT} from '../utils/actionsConst';

const defaultState = {
    isAuth: false,
    data: {},
    isAdmin: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN:
        case CHECK:
            return { ...state, isAuth: true, data: action.data, isAdmin: action.data.role === "admin" }
        case LOGOUT:
            return { ...defaultState };
        default:
            return state;
    }
};
