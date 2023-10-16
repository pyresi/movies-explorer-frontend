export function validateEmail(email) {
    return new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);
}

export function validatePassword(password) {
    return true;
}

export function validateName(name) {
    return new RegExp(/^([a-zA-z0-9\- а-яА-я]){3,30}$/).test(name);
}
