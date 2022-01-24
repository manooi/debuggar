let data = [
  { project_name: "A", sum_amt_request: 100, kiki: 25, rec_date: "2021-12-11" },
  { project_name: "A", sum_amt_request: 50, kiki: 25, rec_date: "2021-12-11" },
  { project_name: "A", sum_amt_request: 250, kiki: 25, rec_date: "2021-12-10" },
  { project_name: "B", sum_amt_request: 50, kiki: 25, rec_date: "2021-12-09" },
  { project_name: "B", sum_amt_request: 70, kiki: 25, rec_date: "2021-12-08" },
];

// let data = require("./testdata.json");

import { aggregateData, filterByAmountRequest } from "./util";

let result = aggregateData(
  data,
  {
    identifier: [
      { name: "project_name" },
      { name: "rec_date" },
      // { name: "project_uuid" },
    ],
    aggregater: [{ name: "sum_amt_request" }],
  },
  (result) => filterByAmountRequest(result, false)
);

console.log(result);
console.log(result.length);
