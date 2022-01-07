import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { Subject } from 'rxjs';
import {
  aggregateData,
  sleep,
  sortByAmountRequest,
} from 'src/app/shared/util/util';

@Component({
  templateUrl: './json-aggregate.component.html',
  styleUrls: ['./json-aggregate.component.scss'],
})
export class JsonAggregateComponent implements OnInit {
  groupProps: any = [];
  sumProps: any = [];
  selectedGroupProps: any;
  selectedSumProps: any;

  inputSubject: Subject<string> = new Subject<string>();
  inputAction$ = this.inputSubject.asObservable();

  constructor(private clipboardApi: ClipboardService) {}

  copyResult() {
    this.clipboardApi.copyFromContent(JSON.stringify(this.result, null, 2));
  }

  jsonInput: string = '';
  jsonOutput: any;
  result: any;
  msgs: any;
  isJsonValid: boolean = true;
  isChecked: boolean = false;

  ngOnInit(): void {
    this.getDropdownItems();
  }

  getDropdownItems() {
    this.inputAction$.subscribe((x) => {
      // console.log('sub');
      if (x && x.length > 0) {
        let parse = JSON.parse(x);
        this.jsonOutput = parse;
        // console.log(parse);
        let groupKeys = Object.keys(parse[0]);
        // console.log(keys);
        let values = Object.values(parse[0]);
        let index = values
          .map((v, index) => ({
            index: index,
            check: +Number(v) >= 0,
          }))
          .filter((i) => i.check)
          .map((i) => i.index);

        let sumKeys: any = [];
        index.forEach((i) => sumKeys.push(groupKeys[i]));
        // console.log(sumKeys);
        this.groupProps = groupKeys.map((x: any) => ({ name: x }));
        this.sumProps = sumKeys.map((x: any) => ({ name: x }));
        // console.log('this.props', this.groupProps);
      }
    });
  }

  inputChanges(value: any) {
    if (this.IsJsonString(value)) {
      this.inputSubject.next(value);
      this.isJsonValid = true;
      // console.log('valid changes', value);
    } else {
      this.isJsonValid = false;
    }
  }

  calculate() {
    if (this.isJsonValid) {
      // console.log('calculated');
      this.result = aggregateData(
        this.jsonOutput,
        {
          identifier: this.selectedGroupProps,
          aggregater: this.selectedSumProps,
        },
        false,
        (result: any) => sortByAmountRequest(result, false)
      );
      // console.log(this.selectedGroupProps);
      // console.log(this.selectedSumProps);
      // console.log('result is ', this.result);
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
    this.groupProps = '';
    this.jsonOutput = '';
    this.result = [{}];
    this.isChecked = false;
  }
}
