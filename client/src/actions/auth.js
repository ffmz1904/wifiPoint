import * as authAPI from "../http/authAPI";
import {
    LOGIN,
    CHECK,
    LOGOUT
} from "../utils/actionsConst";
import {setError} from "./error";

const setUserData = data => ({
   type: LOGIN,
   data
});

const checkUserAuth = data => ({
    type: CHECK,
    data
});

const removeUserData = () => ({
   type: LOGOUT
});

export const registration = authData => async dispatch => {
    const response = await authAPI.registration(authData);

    if (!response.success) {
        console.log(response)
        return dispatch(setError(response.message));
    }

    return true;
}

export const login = authData => async dispatch => {
    const response = await authAPI.login(authData);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    localStorage.setItem('token', response.token);
    dispatch(setUserData(response.user));
    return true;
}

export const checkAuth = () => async dispatch => {
    const response = await authAPI.check();

    if (!response.success) {
        return false;
    }

    localStorage.setItem('token', response.token);
    dispatch(checkUserAuth(response.user));
};

export const logout = () => async dispatch => {
    localStorage.removeItem('token');
    dispatch(removeUserData());
};
