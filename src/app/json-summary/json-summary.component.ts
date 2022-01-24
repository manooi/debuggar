import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { sleep } from 'src/app/shared/util/util';

@Component({
  // selector: 'app-json-summary',
  templateUrl: './json-summary.component.html',
  styleUrls: ['./json-summary.component.scss'],
})
export class JsonSummaryComponent implements OnInit {
  props: any = [];
  selectedProps: any;
  inputSubject: Subject<string> = new Subject<string>();
  inputAction$ = this.inputSubject.asObservable();

  constructor() {}
  jsonInput: string = '';
  jsonOutput: any;
  result: number = 0;
  msgs: any;
  isJsonValid: boolean = true;
  isChecked: boolean = false;

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
      this.isJsonValid = true;
    } else {
      this.isJsonValid = false;
    }
  }

  calculate() {
    if (this.isJsonValid) {
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
  }

  check() {
    if (this.isJsonValid) {
      this.msgs = [
        {
          severity: 'success',
          summary: 'Success',
          detail: 'Your JSON is validated',
        },
      ];
      sleep(700).then(() => (this.msgs = []));
    } else {
      this.msgs = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid JSON, acceptable format: [{"name": "sirawit"}]',
        },
      ];
    }
    this.isChecked = true;
  }

  IsJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  debug() {
    // console.log(this.props);
    console.log(this.isJsonValid);
  }

  clear() {
    this.jsonInput = '';
    this.props = '';
    this.jsonOutput = '';
    this.result = 0;
    this.isChecked = false;
  }
}
