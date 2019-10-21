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
    if (this.form.username == null || this.form.password == null) {
      this.errorMessage = "You must fill in all fields";
      this.isLoginFailed = true;
    } else {
      this.errorMessage = "";
      this.isLoginFailed = false;
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
          this.errorMessage = "Oh! an error has appeared, please check your information";
          this.isLoginFailed = true;
        }
      );
    }
  }

  reloadPage() {
    window.location.reload();
  }

  cancelOperation() {
    this.router.navigate(['/home']);
  }

}
