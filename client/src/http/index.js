import axios from "axios";

// const apiUrl = 'http://localhost:8000/';  // dev
const apiUrl = 'https://localhost:46177/';  // heroku

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
