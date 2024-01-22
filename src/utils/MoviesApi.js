import { config } from './../constants/config.js';

class MovieApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((err) => {
        return Promise.reject(`Ошибка: ${res.status} ${err.message}`);
      });
    }
  }

  // Get movies
  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._getResponse);
  }
}

const movieApi = new MovieApi(config.movieApiConfig);

export default movieApi;
