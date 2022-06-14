const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject("Ошибка");
};

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this.headers = headers;
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this.headers.authorization,
      },
    }).then(handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this.headers.authorization,
      },
    }).then(handleResponse);
  }

  changeUserInfo(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then(handleResponse);
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(handleResponse);
  }

  newCard(value) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(value),
    }).then(handleResponse);
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(handleResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    }).then(handleResponse);
  }

  disLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(handleResponse);
  }
}
