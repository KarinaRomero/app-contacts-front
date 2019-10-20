import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-contacts';
  authority:string;
  private roles: string[];
  username:string;
  constructor(private tokenStorageService: TokenStorageService, private router:Router) { }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.roles = this.tokenStorageService.getAutorities();
      this.username = this.tokenStorageService.getUsername();
      this.roles.every(role => {
        if (role == 'ROLE_USER') {
          this.authority = "user";
          this.router.navigate(['/user']);
          return true;
        }
      });
    }
  }
}
