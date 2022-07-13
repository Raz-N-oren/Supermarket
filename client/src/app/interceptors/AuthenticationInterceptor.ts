import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor() { }

  // Parameters :
  // request : Represents the request object which is on his way to the server
  // getting the request enables us to manipulate it.
  // next : Maybe we have multiple interceptors... so calling next sends the request
  // to the next interceptor (if exists)
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with our token if available
    let userData: string = sessionStorage.getItem("userData");

    // Logically - token = null ---> false
    // token != null --> true
    // A situation for example : login (no token yet)
    if (userData) {
      let currentUser = JSON.parse(userData);
      let token = currentUser.token;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
