export default class UserInfo {
  constructor({ userNameSelector, userActivitySelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userActivity = document.querySelector(userActivitySelector);
  }
  getUserInfo() {
    return {
      username: this._userName.textContent,
      job: this._userActivity.textContent,
    }
  }
  setUserInfo(data) {
    this._userName.textContent = data.username;
    this._userActivity.textContent = data.job;
  }
}