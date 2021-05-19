import {REMOVE_ERROR, SET_ERROR} from '../utils/actionsConst';

const defaultState = {
    isError: false,
    message: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return { isError: true, message: action.data };
        case REMOVE_ERROR:
            return { ...defaultState };
        default:
            return state;
    }
};
