import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../services/login-register.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  role = localStorage.getItem('ROLE');
  constructor(private loginRegisterService: LoginRegisterService) { }

  ngOnInit(): void {
  }
  logout() {
    this.loginRegisterService.logout();
  }
}
