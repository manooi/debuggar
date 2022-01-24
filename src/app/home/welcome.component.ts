import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  // selector: 'app-layout',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  constructor(public authService: AuthService) {}


  debug() {
    // console.log("isloggedIn", this.authService.isLoggedIn);
  }
}
