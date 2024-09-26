import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  //AuthService to access the stored token
  const authService = inject(AuthService);
  
  // Gets  JWT token from the AuthService (stored in localStorage)
  const authToken = authService.getToken();

  // If there's a token, clone the request and add the Authorization header
  if (authToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}` // Attach the token as a Bearer token
      }
    });
    return next(clonedRequest); // Forward the modified request
  }

  // If no token exists, forward the original request without modification
  return next(req);
};
