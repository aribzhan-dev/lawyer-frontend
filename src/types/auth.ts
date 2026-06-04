export interface Token {
  access_token: string;
  token_type: string;
}

export interface AdminUser {
  id: number;
  email: string;
  is_active: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
