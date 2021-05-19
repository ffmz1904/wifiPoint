import {CREATE_POINT, UPDATE_POINT, DELETE_POINT, GET_ALL_POINTS} from '../utils/actionsConst';

const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case CREATE_POINT:
            return [ ... state, action.data ];
        case UPDATE_POINT:
            return [ ...state.map(point => point._id === action.data._id
                ? { ...action.data }
                : point
            )];
        case DELETE_POINT:
            return [ ...state.filter(point => point._id !== action.id)];
        case GET_ALL_POINTS:
            return [ ...action.data ];
        default:
            return state;
    }
};
