// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'https://localhost:5247/api/auth';  // Your backend API
//   private tokenKey = 'authToken';  // Token storage key

//   constructor(private http: HttpClient) {}

//   // Method to login a user
//   login(username: string, password: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, { username, password });
//   }

//   // Method to register a new user (if needed)
//   register(username: string, email: string, password: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, { username, email, password });
//   }

//   // Store JWT token in localStorage
//   setToken(token: string): void {
//     localStorage.setItem(this.tokenKey, token);
//   }

//   // Get the stored token from localStorage
//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }

//   // Check if the user is logged in (i.e., if there's a valid token)
//   isLoggedIn(): boolean {
//     return !!this.getToken();  // Returns true if token exists, false otherwise
//   }

//   // Logout the user by removing the token
//   logout(): void {
//     localStorage.removeItem(this.tokenKey);
//   }
// }
