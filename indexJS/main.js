/*jshint esversion: 6 */

let stop = true;
let config = {
  // lastBudget: 'budgets/budget-0/',
};
let profits = [];
let loss = [];
let budget = {
  // id: 0,
  // path: `budgets/budget-0/`,
  // monthsID: [
  //   {
  //     id: 0,
  //     path: `budgets/budget-0/month-0/`,
  //   },
  // ],
  // lastMonthID: 0,
};

let month = {
  // amount: 0,
  // id: 0,
  // name: '',
  // descr: '',
  // profits: '',
  // loss: '',
};

function saveAll() {

  send({
    task: 'save',
    data: { name: 'config', data: config },
    path: '',
    name: 'config.json',
  });

  send({
    task: 'save',
    data: { name: 'budget', data: budget },
    path: budget.path,
    name: 'budget.json',
  });

  send({
    task: 'save',
    data: { name: 'month', data: month },
    path: budget.monthsID[budget.monthsID.length - 1].path,
    name: 'month.json',
  });

  send({
    task: 'save',
    data: { name: 'profits', data: profits },
    path: budget.monthsID[budget.monthsID.length - 1].path,
    name: 'profits.json',
  });

  send({
    task: 'save',
    data: { name: 'loss', data: loss },
    path: budget.monthsID[budget.monthsID.length - 1].path,
    name: 'loss.json',
  });

}

function checkArg(arg) {

  if (arg.task == 'read') {
    let name = arg.data.name;
    let data = arg.data.data;
    if (name == 'budget') {
      budget = data;
    } else if (name == 'month') {
      month = data;
    } else if (name == 'profits') {
      profits = data;
    } else if (name == 'loss') {
      loss = data;
    } else if (name == 'config') {
      config = data;
    } else {
      console.log('invalid name');
    }

    stop = false;
  }
}

function wait() {
  do {
    console.log('xd');
    if (stop == false) {
      stop = true;
      console.log('lol');
      return;
    }
  } while (true);
}

function startup(arg) {

  if (arg == 'config') {
    send({
      task: 'read',
      path: '',
      name: 'config.json',
    });
  } else if (arg == 'budget') {
    send({
      task: 'read',
      path: config.lastBudget,
      name: 'budget.json',
    });
  } else if (arg == 'month') {
    send({
      task: 'read',
      path: budget.monthsID[lastMonthID].path,
      name: 'month.json',
    });
  } else if (arg == 'profits') {
    send({
      task: 'read',
      path: budget.monthsID[lastMonthID].path,
      name: 'profits.json',
    });
  } else if (arg == 'loss') {
    send({
      task: 'read',
      path: budget.monthsID[lastMonthID].path,
      name: 'loss.json',
    });
  }

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
