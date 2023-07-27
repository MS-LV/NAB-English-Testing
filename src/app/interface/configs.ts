export interface ConfigsInterface {
  serverURL: string;
  auth: string;
  loginURL: string;
  registryURL: string;
  refreshURL: string;
  dictionary: string;
  everyday: string;
  testing: string;
  isAuthorized:string,
  history: string;
  grammar: string;
  reading: string;
  listening: string;
  writing: string;
}

export interface UserInfo {
  id: string;
  name: string;
  surename: string;
  userLevel: string;
  role: string;
  email: string;
}
