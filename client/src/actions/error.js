import {REMOVE_ERROR, SET_ERROR} from "../utils/actionsConst";

const showError = data => ({
    type: SET_ERROR,
    data
});

const hideError = () => ({
    type: REMOVE_ERROR
});

export const setError = data => async dispatch => {
    dispatch(showError(data));

    setTimeout(() => {
        dispatch(hideError())
    }, 1500);
};
