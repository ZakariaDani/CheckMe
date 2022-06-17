import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private loginRegisterService: LoginRegisterService) { }

  ngOnInit(): void {
  }
  logout() {
    this.loginRegisterService.logout();
  }
  isManufacturer() {
    return localStorage.getItem('ROLE')=='MANIFACTURER';
  }
}
