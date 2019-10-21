import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/login';
import { JwtResponse } from '../models/jwt-response';
import { Observable } from 'rxjs';
import { Register } from '../models/register';
import { TokenStorageService } from '../auth/token-storage.service';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactURL = 'http://localhost:8080/api/contacts/user/';



  constructor(private tokenStorageService:TokenStorageService, private httpClient:HttpClient) { }

  getContacts(): Observable<Contact[]> {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.tokenStorageService.getToken()
      })
    };
    return this.httpClient.get<Contact[]>(this.contactURL+this.tokenStorageService.getUsername(), httpOptions);
  }

  delete(id:number){
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.tokenStorageService.getToken()
      })
    };
    console.log(id);
    return this.httpClient.delete(this.contactURL+id, httpOptions);
  }

  update(id:number, contact:Contact): Observable<Contact> {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.tokenStorageService.getToken()
      })
    };

    console.log(contact.age, contact.idContact, contact.nickName, contact.phoneNumber);
    console.log(JSON.stringify({contact}));
    return this.httpClient.put<Contact>(this.contactURL+id, {"idContact": contact.idContact,
    "name": contact.name,
    "age": contact.age,
    "phoneNumber": contact.phoneNumber,
    "nickName": contact.nickName}, httpOptions);
  }

  create(contact:Contact): Observable<Contact> {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.tokenStorageService.getToken()
      })
    };
    return this.httpClient.post<Contact>(this.contactURL, {"idContact": contact.idContact,
    "name": contact.name,
    "age": contact.age,
    "phoneNumber": contact.phoneNumber,
    "nickName": contact.nickName,
    "user":{"username":this.tokenStorageService.getUsername()}}, httpOptions);
  }
}
