export interface User {
  id: string;
  userId: string;
  customerGroup: string;
  roles: string[];
}

export interface LoginResponse {
  userId: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}