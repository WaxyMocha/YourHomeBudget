/*jshint esversion: 6 */

function addIncome(incomeType, name, desc, amount, cat) {
  let tmpArr;
  if (incomeType == 'profit') {
    tmpArr = profits;
  } else if (incomeType == 'loss') {
    tmpArr = loss;
  } else {
    console.log('Invalid incomeType');
    return;
  }

  let tmpObj = {};
}

let profits = [];
let loss = [];
let budget = {
  ID: 0,
  monthsIDs: [
    { id: 0, path: 'path' },
  ],
  lastMonthID: 0,
};

let month = {
  amount: 0,
  id: 0,
  name: '',
  descr: '',
  profits: 'path',
  loss: 'path',
};
