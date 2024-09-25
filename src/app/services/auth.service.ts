import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import {jwtDecode}  from 'jwt-decode'; // Make sure this import is correctly handled

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7136/api/auth'; // Base URL, use `/login` and `/register` as needed
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any // This helps determine if code runs in browser or SSR
  ) {
    const storedUser = isPlatformBrowser(platformId)
      ? localStorage.getItem('currentUser')
      : null;

    this.currentUserSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  /**
   * Login user and store their token and details in localStorage.
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      map((response) => {
        if (response && response.token) {
          const decodedToken: any = jwtDecode(response.token);  // Deconpde the JWT
          console.log('Decoded token:', decodedToken);

          // Extract user details from the decoded token (ensure your JWT contains UserId and sub fields)
          const user = {
            userId: decodedToken.UserId || decodedToken.userId || decodedToken.id,   // Ensure you're extracting the correct user ID field
            username: decodedToken.sub,    // 'sub' usually contains the username or user identifier
            token: response.token
          };

          // Store the entire user object in localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);

          return user;
        }
        return null;
      })
    );
  }

  /**
   * Register user and store their token and details in localStorage.
   */
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, email, password }).pipe(
      map((response) => {
        if (response && response.token) {
          const decodedToken: any = jwtDecode(response.token);  // Decode the JWT
  
          // Extract user details from the decoded token
          const user = {
            userId: decodedToken.UserId || decodedToken.userId || decodedToken.id,   // Ensure the correct user ID field is extracted
            username: decodedToken.sub,
            token: response.token
          };
  
          // Store the entire user object in localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
  
          return user;
        }
        return null;
      })
    );
  }

  /**
   * Logs out the user, clears localStorage and BehaviorSubject.
   */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }
  }

  /**
   * Checks if the user is authenticated (token exists).
   */
  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!this.getToken(); // Return true if there's a token
    }
    return false;
  }

  /**
   * Retrieves the token of the current user.
   */
  getToken(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.token : null;
  }

  /**
   * Checks if a user is logged in (checks localStorage for user data).
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  /**
   * Retrieves the userId of the current user from localStorage.
   */
  getUserId(): number {
    const storedUser = localStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user ? user.userId : 0;
  }

  /**
   * Retrieves the username of the current user from localStorage.
   */
  // AuthService.ts
getUsername(): string | null {
  const currentUser = this.currentUserValue;
  return currentUser ? currentUser.username : null;  // Get username from currentUser
}

}
