import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Component({
  templateUrl: './whale-alert.component.html',
  styleUrls: ['./whale-alert.component.scss'],
})
export class WhaleAlertComponent implements OnInit, OnDestroy {
  data: any = [];
  secondsCounter = interval(5 * 1000); // every 15 sec
  sub!: Subscription;
  cursor!: string;

  constructor(private http: HttpClient) {}
  ngOnDestroy(): void {
    console.log('destroyed');
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.secondsCounter
      .pipe(concatMap(() => this.sendRequestService()))
      .subscribe((data) => console.log('data', data));
  }

  sendRequestService() {
    return this.http.get(
      'https://api.whale-alert.io/v1/transactions?api_key=hY28mT3owin0onDrw86hm0YXgI3OhJO9',
      {
        // headers: {
        //   'X-WA-API-KEY': 'hY28mT3owin0onDrw86hm0YXgI3OhJO9',
        // },
      }
    );
  }

  sendRequest() {}
}
