import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';

const TOKEN_HEADER_KEY = 'Autorization';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor {

  constructor(private tokenStorageService: TokenStorageService) { }

  intercept(request: HttpRequest<any>, httpHandler:HttpHandler) {
    let authRequest = request;
    const token = this.tokenStorageService.getToken();
    if(token != null) {
      authRequest = request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer '+token)});
    }
    return httpHandler.handle(authRequest);
  }
}

export const httpInterceptorProviders =[
  {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
]
