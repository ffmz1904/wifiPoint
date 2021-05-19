import {$host, $authHost} from './index';

export const registration = async (registrationData) => {
    try {
        const {data} = await $host.post('api/auth/register', registrationData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const login = async (loginData) => {
    try {
        const {data} = await $host.post('api/auth/login', loginData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const check = async () => {
    try {
        const {data} = await $authHost.post('api/auth/check');
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};
