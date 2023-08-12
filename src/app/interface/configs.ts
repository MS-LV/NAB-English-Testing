export interface ConfigsInterface {
  serverURL: string;
  auth: string;
  loginURL: string;
  registryURL: string;
  dictionary: string;
  everyday: string;
  testing: string;
  isAuthorized: string,
  history: string;
  deleteUser: string;
  serverConfig: string;
  upload: string;
  users: string;
}

export interface IUserInfo {
  id: string;
  name: string;
  surename: string;
  userLevel: string;
  role: string;
  email: string;
}

export interface IServerConfig {
  _id?: string;
  isExam: boolean;
}
