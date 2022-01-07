import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  props: any = [];
  selectedProps: any;
  inputSubject: Subject<string> = new Subject<string>();
  inputAction$ = this.inputSubject.asObservable();

  constructor() {
    // this.props = [
    //   { name: 'New York', code: 'NY' },
    //   { name: 'Rome', code: 'RM' },
    //   { name: 'London', code: 'LDN' },
    //   { name: 'Istanbul', code: 'IST' },
    //   { name: 'Paris', code: 'PRS' },
    // ];
  }

  jsonInput: string = '';
  jsonOutput: any;
  result: number = 0;

  ngOnInit(): void {
    this.inputAction$.subscribe((x) => {
      if (x && x.length > 0) {
        let parse = JSON.parse(x);
        this.jsonOutput = parse;
        // console.log(parse);
        let keys = Object.keys(parse[0]);
        // console.log(keys);
        this.props = keys.map((x: any) => ({ name: x }));
        // this.props = this.props.filter((x: any) => Number(x));
      }
    });
  }

  inputChanges(value: any) {
    if (this.IsJsonString(value)) {
      this.inputSubject.next(value);
    }
  }

  calculate() {
    this.result = 0;
    // console.log(this.selectedProps);
    let keys = this.selectedProps.name;
    // console.log(this.selectedProps);
    // console.log('jsonOutput', this.jsonOutput);
    let result = this.jsonOutput.reduce(
      (prev: any, cur: any) => prev + +cur[keys],
      0
    );
    this.result = Number(result) ? result : 'NaN';
  }

  IsJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
