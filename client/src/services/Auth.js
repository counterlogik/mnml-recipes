import history from "./History";
import auth0 from "auth0-js";

export default class Auth {
  requestedScopes = "openid profile interact:recipes";

  auth0 = new auth0.WebAuth({
    // the following three lines MUST be updated
    domain: "addisonstaples.auth0.com",
    audience: "http://localhost:3000/api",
    clientID: "RnqF0LGY8FG3Hyq4Bfqhu4IUDgRbSPzj",
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: this.requestedScopes
  });

  userProfile;

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
          if (profile) {
            this.userProfile = profile;
          } else {
            this.userProfile = { sub: "auth0|anonymous_user" };
            console.log(err);
          }

          this.setSession(authResult);
          history.replace("/dashboard");
        });
      } else if (err) {
        history.replace("/dashboard");
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    const scopes = authResult.scope || this.requestedScopes || "";

    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("user_id", this.userProfile.sub);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("scopes", JSON.stringify(scopes));

    // navigate to the dashboard route
    history.replace("/dashboard");
  }

  getAccessToken() {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    return accessToken;
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    // Clear access token, ID token, and expiration from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("scopes");
    this.userProfile = null;

    // navigate to the dashboard route
    history.replace("/dashboard");
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  userHasScopes(scopes) {
    const grantedScopes = JSON.parse(localStorage.getItem("scopes")).split(" ");
    return scopes.every(scope => grantedScopes.includes(scope));
  }
}
