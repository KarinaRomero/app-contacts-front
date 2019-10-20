import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/login';
import { JwtResponse } from '../models/jwt-response';
import { Observable } from 'rxjs';
import { Register } from '../models/register';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = "http://localhost:8080/api/auth/login";
  private registerURL = "http://localhost:8080/api/auth/register";

  constructor(private httpClient:HttpClient) { }

  login(credentials: Login): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(this.loginURL, credentials, httpOptions);
  }

  register(register: Register): Observable<string> {
    return this.httpClient.post<string>(this.registerURL, register, httpOptions);
  }

}
