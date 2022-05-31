export default class UserInfo {
  constructor(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    };
    this._userInfo = userInfo;
    return userInfo;
  }
  setUserInfo(user) {
    this._userName.textContent = user.name;
    this._userJob.textContent = user.job;
  }
}
