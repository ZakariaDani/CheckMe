import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginRegisterService } from '../services/login-register.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private loginRegisterService: LoginRegisterService) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    console.log(loginForm.value);
    const loginUser = loginForm.value;
    this.loginRegisterService.login(loginUser);
    loginForm.reset();
  }
}
