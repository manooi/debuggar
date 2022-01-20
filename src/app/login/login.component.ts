import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  username:string = '';

  ngOnInit(): void {

  }

  login() {
    this.authService.login(this.username).subscribe(success=> {
      if(success) {
        this.router.navigate(['/json-summary']);
      }
    })
  }

}
