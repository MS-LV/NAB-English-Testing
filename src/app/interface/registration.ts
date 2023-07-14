export interface AuthorizationData {
  accessToken: string;
  refreshToken: string;
  status: {
    level: string;
    role:string;
  }
  user: {
    id: string;
    email: string;
    name: string;
    surename: string;
  }
}
