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
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  onSubmit() {
    console.log(this.form);

    this.register = new Register(this.form.name, this.form.username, this.form.email, this.form.password);

    this.authService.register(this.register).subscribe(
      data => {
        console.log(data);
        this.isRegister = true;
        this.isRegisterFailed = false;
      }, error => {
        console.log(error);
        this.errorMessage = error.error.errorMessage;
        this.isRegisterFailed = true;
      }
    )
  }

  cancelOperation() {
    this.router.navigate(['/home']);
  }

}
