import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { AuthInterceptor } from './auth-interceptor.service';
import { Observable, of } from 'rxjs';

describe('AuthInterceptor', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    // Create a spy for AuthService
    const spy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: spy },
      ],
    });

    // Inject the mocked AuthService
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should add Authorization header when token is available', () => {
    // Arrange: Set up a mock token and a mock HTTP request
    const mockToken = 'mock-token';
    authServiceSpy.getToken.and.returnValue(mockToken);

    const mockRequest = new HttpRequest('GET', '/api/test');
    const next: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        // Assert: Check that the Authorization header was added
        expect(req.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
        return of(req as any);  // Return an observable for the mock request
      },
    };

    // Act: Call the interceptor
    AuthInterceptor(mockRequest, next.handle.bind(next));
  });

  it('should not add Authorization header when token is not available', () => {
    // Arrange: No token is returned from AuthService
    authServiceSpy.getToken.and.returnValue(null);

    const mockRequest = new HttpRequest('GET', '/api/test');
    const next: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        // Assert: Check that the Authorization header was not added
        expect(req.headers.has('Authorization')).toBeFalse();
        return of(req as any);  // Return an observable for the mock request
      },
    };

    // Act: Call the interceptor
    AuthInterceptor(mockRequest, next.handle.bind(next));
  });
});
