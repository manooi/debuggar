import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  username: string = '';

  ngOnInit(): void {}

  login() {
    this.authService.login(this.username).subscribe(
      (success) => {
        if (success) {
          this.router.navigate(['/json-summary']);
        }
      },
      (error) => {
        console.log('error is', error);
        // Swal.fire({
        //   title: 'Incorrect UserName!',
        //   text: 'Please try again',
        //   icon: 'error',
        //   confirmButtonText: 'ok',
        // });

        // Swal.fire({
        //   title: 'No connection',
        //   text: 'Please try again',
        //   icon: 'error',
        //   confirmButtonText: 'ok',
        // });
      }
    );
  }
}
