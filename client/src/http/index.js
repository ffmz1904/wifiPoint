import axios from "axios";

const apiUrl = 'http://localhost:4000/';  // dev
// const apiUrl = 'http://52.59.245.147/';  // prod

const $host = axios.create({
    baseURL: apiUrl
});

const $authHost = axios.create({
    baseURL: apiUrl
});

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}
