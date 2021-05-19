import * as wifiPointAPI from "../http/wifiPointAPI";
import {
    CREATE_POINT,
    UPDATE_POINT,
    DELETE_POINT,
    GET_ALL_POINTS
} from "../utils/actionsConst";
import {setError} from "./error";

const setNewPoint = data => ({
    type: CREATE_POINT,
    data
});

const setUpdatedPoint = data => ({
    type: UPDATE_POINT,
    data
});

const setAllPoints = data => ({
    type: GET_ALL_POINTS,
    data
});

const removeDeletedPoint = id => ({
    type: DELETE_POINT,
    id
});

export const createPoint = createData => async dispatch => {
    const response = await wifiPointAPI.create(createData);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(setNewPoint(response.point));
}

export const updatePoint = (id, updateData) => async dispatch => {
    const response = await wifiPointAPI.update(id, updateData);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(setUpdatedPoint(response.point));
}

export const deletePoint = id => async dispatch => {
    const response = await wifiPointAPI.remove(id);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(removeDeletedPoint(id));
}

export const getAllPoints = () => async dispatch => {
    const response = await wifiPointAPI.getAll();

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(setAllPoints(response.points));
}

export const filterPoints = filterData => async dispatch => {
    const response = await wifiPointAPI.filter(filterData);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(setAllPoints(response.points));
}

