export default class UserInfo {
  constructor(profileName, profileJob, profileAvatar) {
    this._userName = profileName;
    this._userJob = profileJob;
    this._userAvatar = profileAvatar;
  }
  getUserId() {
    return this._userIdData;
  }
  setUserAva() {
    this._userAvatar.src = this._userAvatarData;
  }
  getUserInf() {
    const userInfo = {
      name: this._userNameData,
      about: this._userJobData,
    };
    return userInfo;
  }

  setUserId(id) {
    this._userIdData = id;
  }
  setUserInfo(data) {
    this._userAvatarData = data.avatar;
    this._userNameData = data.name;
    this._userJobData = data.about;

    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
  }
}
