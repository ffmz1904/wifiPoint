import {$host, $authHost} from './index';

export const create = async (createData) => {
    try {
        const {data} = await $authHost.post('api/wifi', createData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const update = async (id, updateData) => {
    try {
        const {data} = await $authHost.put(`api/wifi/${id}`, updateData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const remove = async (id) => {
    try {
        const {data} = await $authHost.delete(`api/wifi/${id}`);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const getAll = async () => {
    try {
        const {data} = await $host.get('api/wifi');
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const filter = async filterData => {
    try {
        const {data} = await $host.post('api/wifi/filter', filterData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};
