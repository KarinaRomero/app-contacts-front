import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLogged = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private login: Login;

  constructor(private router: Router, private authService: AuthService, private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.isLogged = true;
      this.roles = this.tokenStorageService.getAutorities();
    }
  }

  onSubmit() {
    console.log(this.form);
    this.login = new Login(this.form.username, this.form.password);
    this.authService.login(this.login).subscribe(data => {
      this.tokenStorageService.saveToken(data.token);
      this.tokenStorageService.saveUsername(data.username);
      this.tokenStorageService.saveAuthorities(data.authorities);

      this.isLogged = true;
      this.isLoginFailed = false;
      this.roles = this.tokenStorageService.getAutorities();
      this.reloadPage();
    },
      error => {
        console.log(error);
        this.errorMessage = error.error.errorMessage;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  cancelOperation() {
    this.router.navigate(['/home']);
  }

}
