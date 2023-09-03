const configs = {
  serverURL: 'http://192.168.88.24:5000',
  // serverURL: 'https://testing-anglish-dcd9dbbba372.herokuapp.com',
  get auth() {
    return `${this.serverURL}/auth`;
  },
  get serverConfig() {
    return `${this.serverURL}/configs`;
  },
  get loginURL() {
    return `${this.auth}/login`;
  },
  get registryURL() {
    return `${this.auth}/registration`;
  },
  get deleteUser() {
    return `${this.auth}/delete`
  },
  get refreshURL() {
    return `${this.auth}/refresh`;
  },
  get isAuthorized() {
    return `${this.auth}/authorized`
  },
  get everyday() {
    return `${this.serverURL}/question/dictionary`;
  },
  get testing() {
    return `${this.serverURL}/testing`;
  },
  get history() {
    return `${this.serverURL}/history`
  },
  get upload() {
    return `${this.serverURL}/upload`;
  },
  get users() {
    return `${this.serverURL}/users`;
  }
};

function getConfig() {
  return configs
}
