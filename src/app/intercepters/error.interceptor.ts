import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 && err.url !== 'http://localhost:5000/login') {
          // auto logout if 401 response returned from api
          this.spinner.hide();
          this.authService.logout();
          this.alert();
        }
        const error = err.error?.message || err.statusText;
        return throwError(error);
      })
    );
  }

  alert() {
    Swal.fire({
      title: 'Unauthorized 401',
      text: "You've been kicked out",
      icon: 'error',
      imageUrl: '/assets/cat-cute.gif',
      confirmButtonText: 'Ok',
    });
  }
}
