import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5247/api/auth';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const isBrowser = typeof window !== 'undefined';

    // Only initialize localStorage-related logic if running in the browser
    if (isBrowser) {
      const storedUser = localStorage.getItem('currentUser');
      this.currentUserSubject = new BehaviorSubject<any>(
        storedUser ? JSON.parse(storedUser) : null
      );
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(null);
    }

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // Method to login a user
  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map((user) => {
          // Only use localStorage if it's in the browser
          if (typeof window !== 'undefined' && user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  // Method to register a new user (if needed)
  register(username: string, email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register`, { username, email, password })
      .pipe(
        map((user) => {
          // If registration is successful, store user details and token in local storage
          if (typeof window !== 'undefined' && user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  // Logout the user by removing the token
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
