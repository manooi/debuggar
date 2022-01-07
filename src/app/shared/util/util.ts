export const aggregateMonth = (array: any) => {
  // months
  let months = [
    {
      month: 12,
      month_name: 'December',
      hasData: false,
    },
    {
      month: 11,
      month_name: 'November',
      hasData: false,
    },
    {
      month: 10,
      month_name: 'October',
      hasData: false,
    },
    {
      month: 9,
      month_name: 'September',
      hasData: false,
    },
    {
      month: 8,
      month_name: 'August',
      hasData: false,
    },
    {
      month: 7,
      month_name: 'July',
      hasData: false,
    },
    {
      month: 6,
      month_name: 'June',
      hasData: false,
    },
    {
      month: 5,
      month_name: 'May',
      hasData: false,
    },
    {
      month: 4,
      month_name: 'April',
      hasData: false,
    },
    {
      month: 3,
      month_name: 'March',
      hasData: false,
    },
    {
      month: 2,
      month_name: 'February',
      hasData: false,
    },
    {
      month: 1,
      month_name: 'January',
      hasData: false,
    },
  ];

  let availableMonths: any = [];

  // get availbleMonths, remove duplicate
  array.reduce((res: any, value: any): any => {
    if (!res[value.month]) {
      res[value.month] = value;
      availableMonths.push(res[value.month]);
    }
    return res;
  }, {});

  // add hasData attribute
  availableMonths = availableMonths.map((result: any) => {
    return {
      month: result.month,
      month_name: result.month_name,
      hasData: true,
    };
  });

  // add remaing month, flag false
  return months
    .map((month) => {
      let hasData = false;
      let toReturn = {};
      availableMonths.forEach((elm: any) => {
        if (elm.month === month.month) {
          hasData = true;
          toReturn = elm;
        }
      });
      if (hasData) {
        return toReturn;
      }
      return month;
    })
    .sort((a: any, b: any) => a.month - b.month);
};

export const calculatAmountBySteps = (
  request_amount: number,
  steps = [
    { step: 0, description: 'first75k', amount: 75000, rate: 0.126 },
    { step: 1, description: 'next300k', amount: 300000, rate: 0.039 },
    { step: 2, description: 'next625k', amount: 625000, rate: 0.021 },
    { step: 3, description: 'above1M', amount: 1000000, rate: 0.0155 },
  ]
) => {
  let residue = request_amount; // 1,234,567
  let thb = 0;
  let last_step = -1;

  while (residue > 0) {
    steps.forEach((st) => {
      if (residue >= st.amount) {
        thb += st.amount * st.rate;
        residue -= st.amount;
        last_step = st.step;
      }
    });

    // stuck at last_step = -1
    if (residue > 0 && last_step === -1) {
      thb += steps[last_step + 1].rate * residue;
      residue -= residue;
    }
    // at least at step 0
    else {
      thb += steps[last_step + 1].rate * residue;
      residue -= residue;
    }
  }
  return thb;
};

export const roundTo = (n: any, digits: any) => {
  var negative = false;
  if (digits === undefined) {
    digits = 0;
  }
  if (n < 0) {
    negative = true;
    n = n * -1;
  }
  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  n = (Math.round(n) / multiplicator).toFixed(digits);
  if (negative) {
    n = (n * -1).toFixed(digits);
  }
  return n;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export interface params {
  identifier: any;
  aggregater: any;
}

export const aggregateData = (
  data: Array<any>,
  params: params,
  keepNull: boolean = true,
  callback: any = null
) => {
  let result: any = [];

  // If no params specified, return empty or original data
  if (
    !data ||
    !params ||
    !params.identifier ||
    params.identifier.length === 0
  ) {
    return params.identifier.length === 0 ? data : result;
  }
  // let params = {
  //   identifier: [{ name: "project_name" }, { name: "rec_date" }],
  //   aggregater: [{ name: "sum_amt_request" }],
  // };

  data.reduce((prev, cur): any => {
    let uniqueIdentifier: string = '';
    params.identifier.forEach((elm: any) => {
      uniqueIdentifier += cur[elm.name];
    });

    let uniqueIdentifierSetZero = params.aggregater.map((data: any) => ({
      [data.name]: 0,
    }));

    // console.log("unit", uniqueIdentifierSetZero);

    if (!prev[uniqueIdentifier]) {
      // Replaced by below 'Set Zero'
      // prev[uniqueIdentifier] = {
      //   ...cur,
      //   // ...{ sum_amt_request: 0 },
      //   // ...{ uniqueIdentifier: uniqueIdentifier },
      // };

      // Set Zero
      uniqueIdentifierSetZero.forEach((id: any, index: number) => {
        let key = Object.keys(id)[0];
        if (index === 0) {
          prev[uniqueIdentifier] = { ...cur, [key]: 0 };
        } else {
          prev[uniqueIdentifier][key] = 0;
        }
      });
      result.push(prev[uniqueIdentifier]);
    }

    // Replaced by below 'Sum++'
    // prev[uniqueIdentifier].sum_amt_request += +cur.sum_amt_request;

    // Sum ++
    params.aggregater.forEach((agg: any) => {
      // console.log("agg.name", agg.name);
      prev[uniqueIdentifier][agg.name] += +cur[agg.name];
    });
    return prev;
  }, {});

  // Set null

  let keepProp = [
    ...params.identifier.map((id: any) => id.name),
    ...params.aggregater.map((agg: any) => agg.name),
  ];
  // console.log(keepProp);

  let nullProp = [];
  if (data && data.length > 0) {
    nullProp = Object.keys(data[0]).filter(
      (dt) => keepProp.findIndex((item) => item === dt) === -1
    );
    // console.log(nullProp);
    nullProp.forEach((prop) => {
      result.forEach((res: any) => {
        if (keepNull) {
          res[prop] = null;
        } else {
          delete res[prop];
        }
      });
    });
  }

  return callback ? callback(result) : result;
};

export const sortByAmountRequest = (data: any, asc: boolean = true) => {
  return asc
    ? data.sort((a: any, b: any) => a.sum_amt_request - b.sum_amt_request)
    : data.sort((a: any, b: any) => b.sum_amt_request - a.sum_amt_request);
};
