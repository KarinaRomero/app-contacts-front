import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  login:any;

  constructor(private tokenStorageService:TokenStorageService) { }

  ngOnInit() {
    this.login = {
      token: this.tokenStorageService.getToken(),
      username: this.tokenStorageService.getUsername(),
      authorities: this.tokenStorageService.getAutorities()
    }
  }

  logout() {
    this.tokenStorageService.logout();
    window.location.reload();
  }

}
