import { MAIN_API_URL } from "./constants";


class MainApi {
    constructor() {
        this.baseUrl = MAIN_API_URL;
        this.baseUrl = 'http://localhost:3001';
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

        try {
            return res.json().then((res) => {
                return Promise.reject(res);
            })
        }
        catch {
            return Promise.reject({ message: `Что-то пошло не так:( Ошибка с кодом: ${res.status}` });
        }

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

    getMovies() {
        return this._request('/movies', {
            method: 'GET',
            headers: this._makeHeaders()
        })
    }

    postMovie({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId }) {
        console.log('api request: ', { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId });
        return this._request('/movies', {
            method: 'POST',
            body: JSON.stringify({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId }),
            headers: this._makeHeaders()
        });
    }

    deleteMovie({ movieId }) {
        console.log('movieID', movieId);
        return this._request(`/movies/${movieId}`, {
            method: 'DELETE',
            headers: this._makeHeaders()
        });
    }
}

export const mainApi = new MainApi();