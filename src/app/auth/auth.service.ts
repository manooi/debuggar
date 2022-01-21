import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl!: string;
  private readonly JWT_TOKEN = 'token';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string): Observable<any> {
    return this.http
      .post('http://localhost:5000/login', { Username: username })
      .pipe(
        tap((token: any) => this.doLoginUser(token.token)),
        mapTo(true),
        catchError((error: HttpErrorResponse) => {
          console.log('error.auth', error);
          if (error?.status === 401) {
            Swal.fire({
              title: 'Incorrect UserName!',
              text: 'Please try again',
              icon: 'error',
              confirmButtonText: 'ok',
            });
          }
          return throwError(error);
        })
      );
  }

  private doLoginUser(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);
    this.storeToken(token);
  }

  private removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  private storeToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  logout() {
    this.removeToken();
    this.router.navigate(['/']);
  }

  // login(username:string) {
  //   return this.http.post("http://localhost:5000/login", {Username: username}).subscribe({next: (data:any)=> {
  //     console.log("sub", data);
  //     this.setTokenToLocalStorage(data.token);
  //     this.setPayloadToLocalStorage(jwtDecode<JwtPayload>(data.token));
  //     this.router.navigateByUrl(this.redirectUrl);
  //   }, error: (error)=> {
  //     console.log("400/500");
  //   }})
  // }

  // setPayloadToLocalStorage(decoded: any) {
  //   localStorage.setItem("role", decoded.role);
  // }

  // setTokenToLocalStorage(token:string) {
  //   localStorage.setItem("token", token);
  // }

  // validateToken(token:string) {
  //   return this.http.post("http://localhost:5000/ValidateToken", {token:token});
  // }
}
