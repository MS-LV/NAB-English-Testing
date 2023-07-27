const configs = {
  serverURL: 'http://localhost:5000',
  get testing() {
    return `${this.serverURL}/testing`
  },
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
  get history() {
    return `${this.serverURL}/history`;
  },

  get dictionary() {
    return `${this.testing}/dictionary`;
  },

  get grammar() {
    return `${this.testing}/grammar`;
  },

  get reading() {
    return `${this.testing}/reading`;
  },

  get listening() {
    return `${this.testing}/listening`;
  },

  get writing() {
    return `${this.testing}/writing`;
  }
};

function getConfig() {
  return configs
}
