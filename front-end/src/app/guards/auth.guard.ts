import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { LoginRegisterService } from '../services/login-register.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginRegisterService: LoginRegisterService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.loginRegisterService.jwtUserToken.pipe(map((result)=>!!result), tap((result)=> {
      if(!result) {
        this.router.navigateByUrl('/login').then();
        return result;
      }
      return result;
    }));
  }
}