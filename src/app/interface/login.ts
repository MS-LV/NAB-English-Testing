export interface AuthorizationMessage {
  statusCode?: number;
  message: string;
  errors?: string[];
  status?: string;
}

export interface LoginControls {
  email: string;
  password: string;
}

export interface RegistrationControls {
  name: string;
  surename: string;
  email: string;
  password: string;
}
