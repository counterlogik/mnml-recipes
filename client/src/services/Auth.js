export default class Auth {
  // authenticate a user (save token string in localStorage)
  static authenticateUser(token) {
    localStorage.setItem("access_token", token);
  }

  // store user id (save user id in localStorage)
  static storeUserId(id) {
    localStorage.setItem("user_id", id);
  }

  // check if user is authenticated (is a token saved in localStorage)
  static isUserAuthenticated() {
    return localStorage.getItem("access_token") !== null;
  }

  // unauthenticate a user (removes token from localStorage)
  static deauthenticateUser() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
  }

  // get a token value
  static getToken() {
    return localStorage.getItem("access_token");
  }
}
