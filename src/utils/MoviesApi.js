class MoviesApi {
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    call() {
        return fetch(`https://api.nomoreparties.co/beatfilm-movies`,
            { 'Content-Type': 'application/json', }
        ).then(this._checkResponse)
    }
}

export const moviesApi = new MoviesApi();