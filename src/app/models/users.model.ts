export interface User {
  userId: number;
  username: string;
  email?: string;
}

export interface LoginComponent {
    username: string;
    password: string;
  }
  export interface RegisterUser {
    username: string;
    email: string;
    password: string;
    confirmPassword: string; // For confirming the password during registration
  }
  