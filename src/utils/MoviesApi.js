import { MOVIE_API_URL } from "./constants";

class MoviesApi {
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    call() {
        return fetch(MOVIE_API_URL,
            { 'Content-Type': 'application/json', }
        ).then(this._checkResponse)
    }
}

export const moviesApi = new MoviesApi();