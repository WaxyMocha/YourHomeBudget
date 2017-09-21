/*jshint esversion: 6 */

let profits = [];
let loss = [];
let budget = {
  ID: 0,
  monthsIDs: [
    { id: 0, path: `budget${buget.id}/` },
  ],
  lastMonthID: 0,
};

let month = {
  amount: 0,
  id: 0,
  name: '',
  descr: '',
  profits: `month${this.id}/`,
  loss: 'loss.json',
};

function saveMonth() {

  send({
    task: 'save',
    data: month,
    path: `budget0/month${month.id}`,
    name: 'month.json',
  });

  send({
    task: 'save',
    data: profits,
    name: month.profits,
    path: '',
  });

  send({
    task: 'save',
    data: loss,
    path: month.loss,
  });

}

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

  let tmpObj = {
    amount: amount,
    name: name,
    description: desc,
    cat: cat,
    id: (tmpArr.length),
    flags: {
      del: false,
    },
  };

  tmpArr.push(tmpObj);
}
