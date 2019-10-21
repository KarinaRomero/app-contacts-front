import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Register } from '../models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  register: Register;
  isRegister = false;
  isRegisterFailed = false;
  errorMessage = "";
  isPasswordCorrect = true;
  messagePassword = "Remember your password should contain 6 characters";

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  onSubmit() {
    if (this.form.name == null || this.form.password == null || this.form.username == null || this.form.email == null) {
      this.errorMessage = "You must fill in all fields";
      this.isRegisterFailed = true;
    } else {
      this.errorMessage = " ";
      this.isRegisterFailed = false;
      this.register = new Register(this.form.name, this.form.username, this.form.email, this.form.password);

      this.authService.register(this.register).subscribe(
        data => {
          this.isRegister = true;
          this.isRegisterFailed = false;
        }, error => {
          this.errorMessage = error.error;
          this.isRegisterFailed = true;
        }
      )
    }

  }

  onKey(event: any) {
    if (event.target.value != this.form.password) {
      this.messagePassword = "Password different";
      this.isPasswordCorrect = false;
    } else {
      this.messagePassword = "Password correct";
      this.isPasswordCorrect = true;
    }
    if (this.form.password.length < 6) {
      this.messagePassword = " Should contain 6 characters";
      this.isPasswordCorrect = false;
    }
  }
  cancelOperation() {
    this.router.navigate(['/home']);
  }

}
