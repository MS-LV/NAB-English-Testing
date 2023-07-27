const configs = {
  serverURL: 'http://192.168.88.24:5000',
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