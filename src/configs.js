const configs = {
  serverURL: 'http://localhost:5000',
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
  get everyday() {
    return `${this.serverURL}/question/dictionary`;
  },
  get testing() {
    return `${this.serverURL}/question/testing`;
  },

  get history() {
    return `${this.serverURL}/history`
  }
};

function getConfig() {
  return configs
}
