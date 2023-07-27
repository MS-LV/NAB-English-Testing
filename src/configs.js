const configs = {
  serverURL: 'https://testing-anglish-dcd9dbbba372.herokuapp.com/',
  get auth() {
    return `${this.serverURL}/auth`;
  },
  get loginURL() {
    return `${this.auth}/login`;
  },
  get registryURL() {
    return `${this.auth}/registration`;
  },
  get refreshURL() {
    return `${this.auth}/refresh`;
  },
  get isAuthorized() {
    return `${this.auth}/authorized`
  },
  get dictionary() {
    return `${this.serverURL}/question/dictionary`;
  },
  get testing() {
    return `${this.serverURL}/question/testing`;
  }
};

function getConfig() {
  return configs
}
