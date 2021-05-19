export const inputValidation = (type, value) => {
    return validationTypes[type](value);
};

const validationTypes = {
    'email': (email) => {
        let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(email).toLowerCase());
    },
    'password': (password) =>  {
        return password.length > 4 && password.length < 20;
    },
    'string': (string) => {
        return string.length > 2;
    }
}
