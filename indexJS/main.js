/*jshint esversion: 6 */

let stop = true;
let config = {
  // lastBudget: 'budgets/budget-0/',
};
let incomes = [];
let outcomes = [];
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
  // incomes: '',
  // outcomes: '',
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
    data: { name: 'incomes', data: incomes },
    path: budget.monthsID[budget.monthsID.length - 1].path,
    name: 'incomes.json',
  });

  send({
    task: 'save',
    data: { name: 'outcomes', data: outcomes },
    path: budget.monthsID[budget.monthsID.length - 1].path,
    name: 'outcomes.json',
  });

}

function checkArg(arg) {

  if (arg.task == 'read') {
    let name = arg.data.name;
    let data = arg.data.data;
    if (name == 'budget') {
      budget = data;
      startup('month');
    } else if (name == 'month') {
      month = data;
      startup('incomes');
      startup('outcomes');
    } else if (name == 'incomes') {
      incomes = data;
    } else if (name == 'outcomes') {
      outcomes = data;
    } else if (name == 'config') {
      config = data;
      startup('budget');
    } else {
      console.log('invalid name');
    }

    stop = false;
  }
}

function startup(arg) {

  if (arg == 'config' || typeof arg == 'undefined') {
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
      path: budget.monthsID[budget.lastMonthID].path,
      name: 'month.json',
    });
  } else if (arg == 'incomes') {
    send({
      task: 'read',
      path: budget.monthsID[budget.lastMonthID].path,
      name: 'incomes.json',
    });
  } else if (arg == 'outcomes') {
    send({
      task: 'read',
      path: budget.monthsID[budget.lastMonthID].path,
      name: 'outcomes.json',
    });
  }

}

function addIncome(incomeType, name, desc, amount, cat) {
  let tmpArr;
  if (incomeType == 'profit') {
    tmpArr = incomes;
  } else if (incomeType == 'outcomes') {
    tmpArr = outcomes;
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
