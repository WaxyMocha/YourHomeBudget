/*jshint esversion: 6 */

let profits = [];
let loss = [];
let budget = {
  id: 0,
  path: `budgets/budget-0/`,
  monthsID: [
    {
      id: 0,
      path: `budgets/budget-0/month-0/`,
    },
  ],
  lastMonthID: 0,
};

let month = {
  amount: 0,
  id: 0,
  name: '',
  descr: '',
  profits: '',
  loss: '',
};

function saveMonth() {

  send({
    task: 'save',
    data: budget,
    path: budget.path,
    name: 'budget.json',
  });

  send({
    task: 'save',
    data: month,
    path: budget.monthsID[budget.monthsID.length - 1].path,
    name: 'month.json',
  });

  send({
    task: 'save',
    data: profits,
    path: budget.monthsID[budget.monthsID.length - 1].path,
    name: 'profits.json',
  });

  send({
    task: 'save',
    data: loss,
    path: budget.monthsID[budget.monthsID.length - 1].path,
    name: 'loss.json',
  });

}

function checkArg(arg) {
  console.log(arg);
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
