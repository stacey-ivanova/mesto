const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject("Ошибка");
};

export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.headers.authorization,
      },
    }).then(handleResponse);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.headers.authorization,
      },
    }).then(handleResponse);
  }

  changeUserInfo(user) {
    return fetch(`${this.baseUrl}/users/me`, {
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
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(handleResponse);
  }

  newCard(value) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    }).then(handleResponse);
  }
  deleteCard(cardId) {
    fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.headers.authorization,
        "Content-Type": "application/json",
      },
    }).then(handleResponse);
  }

  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this.headers.authorization,
        "Content-Type": "application/json",
      },
    }).then(handleResponse);
  }

  disLikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.headers.authorization,
        "Content-Type": "application/json",
      },
    }).then(handleResponse);
  }
}
