import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.scss'],
})
export class SendRequestComponent implements OnInit {
  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {}
  api: string = 'http://localhost:5000/api/';
  token: string = '';
  response: any = {};
  isLoad: boolean = false;

  sendRequest() {
    const headers = {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    };
    this.spinner.show();
    this.http
      .get(this.api + 'values', headers)
      .pipe(delay(500))
      .subscribe((res) => {
        this.response = res;
        this.spinner.hide();
      });
  }

  getToken() {
    this.token = localStorage.getItem('token') || '';
  }
  clearToken() {
    this.token = '';
    this.response = {};
  }
}
