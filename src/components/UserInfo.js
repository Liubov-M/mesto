export default class UserInfo {
  constructor({ userNameSelector, userActivitySelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userActivity = document.querySelector(userActivitySelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }
  getUserInfo() {
    return {
      username: this._userName.textContent,
      job: this._userActivity.textContent,
    }
  }
  setUserInfo({ username, job, avatar }) {
    this._userName.textContent = username;
    this._userActivity.textContent = job;
    this._userAvatar.src = avatar;
  }
}