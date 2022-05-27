import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginRegisterService } from '../services/login-register.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor(private loginRegisterService: LoginRegisterService) { }

  ngOnInit(): void {
  }

  registration(registrationForm: NgForm) {
    if (registrationForm.invalid) {
      return;
    }
    console.log(registrationForm.value);
    const registerUser = registrationForm.value;
    this.loginRegisterService.register(registerUser);
    registrationForm.reset();
  }
  
}
