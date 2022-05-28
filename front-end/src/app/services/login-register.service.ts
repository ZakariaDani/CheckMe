import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  private token = '';
  private jwtToken$ = new BehaviorSubject<string>(this.token);
  private API_URL = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {
    const fetchedToken = localStorage.getItem('act');
    if (fetchedToken) {
      this.token = fetchedToken;
      this.jwtToken$.next(this.token);
    }
  }

  get jwtUserToken(): Observable<string> {
    return this.jwtToken$.asObservable();
  }

  register(user: any) {
    return this.http.post(`${this.API_URL}/auth/register`, user).subscribe(
      () => {
        this.toast
          .success('Register successful, please logIn...', '', {
            timeOut: 700,
            positionClass: 'toast-top-center',
          })
          .onHidden.subscribe(() => {
            this.router.navigateByUrl('/').then();
          });
      },
      () => {
        this.toast.error('User already exists !', '', { timeOut: 1000 });
      }
    );
  }

  login(loginUser: any) {
    this.http
      .post(`${this.API_URL}/auth/login`, loginUser)

      .subscribe(
        //@ts-ignore
        (res: { token: string }) => {
          this.token = res.token;
          if (this.token) {
            this.toast
              .success('Login successful, Working on it...', '', {
                timeOut: 700,
                positionClass: 'toast-top-center',
              })
              .onHidden.subscribe(() => {
                this.jwtToken$.next(this.token);
                const decryptedResponse: any = jwt_decode(res['token']);
                localStorage.setItem('ROLE', decryptedResponse.role);
                console.log(decryptedResponse);
                localStorage.setItem('act', this.token);
                this.router.navigateByUrl('/').then();
              });
          }
        },
        (err: HttpErrorResponse) => {
          this.toast.error('Authentification failed!', '', { timeOut: 1000 });
        }
      );
  }
}
