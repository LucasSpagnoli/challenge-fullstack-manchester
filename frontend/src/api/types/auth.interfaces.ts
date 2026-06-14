export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
 
export interface LoginPayload {
  email: string;
  password: string;
}
 
export interface AuthUser {
  userId: number;
  name: string;
}
 
export interface LoginResponse {
  accessToken: string;
  name: string;
  userId: number;
}
 
export interface RegisterResponse {
  accessToken: string;
  newUser: {
    id: number;
    name: string;
    email: string;
    password: string;
  };
}

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}