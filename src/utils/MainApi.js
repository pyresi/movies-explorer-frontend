class MainApi {
    constructor() {
        this.baseUrl = 'https://api.pyresi.movies.nomoredomainsicu.ru';
    }

    _makeHeaders() {
        return {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    }

    _request(endPoint, options) {
        return fetch(`${this.baseUrl}${endPoint}`, options).then(
            this._checkResponse
        );
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    registerUser(name, email, password) {
        return this._request(`/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        });
    }

    loginUser(email, password) {
        return this._request(`/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
    }

    verifyUser() {
        return this._request(`/users/me`, {
            method: 'GET',
            headers: this._makeHeaders(),
        });
    }

    getUserInfo() {
        return this._request(`/users/me`, {
            headers: this._makeHeaders()
        });
    }

    patchuserInfo(name, email) {
        return this._request(`/users/me`, {
            method: 'PATCH',
            body: JSON.stringify({
                email: email,
                name: name,
            }),
            headers: this._makeHeaders()
        });
    }
}

export const mainApi = new MainApi();