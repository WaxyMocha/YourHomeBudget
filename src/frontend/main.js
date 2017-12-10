/* jshint esversion: 6 */
/**
 * @type {object}
 * @desc Contains configuration (frontend)
 */
let config = {
  lastBudgetID: 0,
  currencySymbol: '$',
};
/**
 * @type {array}
 * @desc Contains informations about incomes (frontend)
 */
let incomes = [];
/**
 * @type {array}
 * @desc Contains informations about outcomes (frontend)
 */
let outcomes = [];
/**
 * @type {object}
 * @desc Contains informations about budget (frontend)
 */
let budget = {
  id: 0,
  place: 'disk',
  monthsID: [{
    amount: 0,
    date: new Date(),
  },
 ],
  lastMonthID: 0,
};

let inOut = 0;
/**
 * @type {object}
 * @desc Contains informations about settlement period (frontend)
 */
let month = {
  amount: 0,
  id: 0,
  name: '',
  descr: '',
};

let editMonth = true;
let historyCheck = false;

/**
 * Saves all informations about budget and config (frontend)
 */
function saveAll() {
  saveConfig();
  saveBudget();
  updateMonth();
}

function saveConfig() {
  send({
    task: 'save',
    data: {
      name: 'config',
      data: config
    },
    path: '',
    name: 'config.json',
  });
}

function saveBudget() {
  send({
    task: 'save',
    data: {
      name: 'budget',
      data: budget
    },
    path: `budgets/budget-${budget.id}/`,
    name: 'budget.json',
  });
}

function lastMth() {
  budget.lastMonthID = budget.monthsID.length - 1;
  loadMonth(budget.monthsID.length - 1);
  historyCheck = false;
  editMonth = true;
}

function checkMonth() {
  if (historyCheck) {
    return;
  } else {
    let lastMonth = new Date((
      budget.monthsID[budget.monthsID.length - 1].date));
    let now = new Date();
    if (now.getMonth() > lastMonth.getMonth()) {
      let leftAmount = month.amount;
      resetMonthToDefault();
      budget.monthsID.push({
        date: new Date(),
      });
      budget.lastMonthID = budget.monthsID.length - 1;
      updateMonth();
      addIncome('income', 'bwlflm', 'bwlflm', leftAmount);
      saveAll();
      updateMonth();
      refreshIncomes();
    }
    saveAll();
    return;
  }
}

function resetMonthToDefault() {
  month = {
    amount: 0,
    id: 0,
    name: '',
    descr: '',
  };
  outcomes = [];
  incomes = [];
  return;
}

function updateMonth() {
  let amount = 0;
  let i;
  for (i = 0; i < incomes.length; i++) {
    amount += Number(incomes[i].amount);
  }
  for (i = 0; i < outcomes.length; i++) {
    amount -= Number(outcomes[i].amount);
  }
  month.amount = amount;
  budget.monthsID[budget.monthsID.length - 1].amount = amount;

  save({
    name: 'month',
    data: month
  }, 'month.json', `budgets/budget-${budget.id}/month-${budget.lastMonthID}/`);

  save({
    name: 'incomes',
    data: incomes
  }, 'incomes.json', `budgets/budget-${budget.id}/month-${budget.lastMonthID}/`);

  save({
    name: 'outcomes',
    data: outcomes
  }, 'outcomes.json', `budgets/budget-${budget.id}/month-${budget.lastMonthID}/`);
}

function monthYear(date) {
  date = new Date(date);
  let dateFormatted = `${date.getMonth() + 1}-${date.getYear() + 1900}`;
  return dateFormatted;
}

/**
 * Checks argument sended from backend (frontend window)
 * @param {object} arg argument from communication channel to check
 */
function checkArg(arg) {

  if (arg == 'start') {
    startup();
  } else if (arg == 'firstStartup') {
    saveAll();
    return;
  } else if (typeof arg == 'object' && arg.task == 'read') {
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
      refreshIncomes();
      inOut++;
      if (inOut >= 2) {
        checkMonth();
        inOut = 0;
      }
    } else if (name == 'outcomes') {
      outcomes = data;
      refreshIncomes();
      inOut++;
      if (inOut >= 2) {
        checkMonth();
        inOut = 0;
      }
    } else if (name == 'config') {
      config = data;
      startup('budget');
    } else if (name == 'lang') {
      changeLang(data);
    } else {
      console.log('invalid name');
    }
  }
}


/**
 * @ignore
 * @param {string} arg Determines what needs to be loaded (called by checkArg) (frontend window)
 */
function startup(arg) {

  if (arg == 'config' || arg == undefined) {
    send({
      task: 'read',
      path: '',
      name: 'config.json',
    });
  } else if (arg == 'budget') {
    send({
      task: 'read',
      path: `budgets/budget-${config.lastBudgetID}/`,
      name: 'budget.json',
    });
  } else if (arg == 'month') {
    send({
      task: 'read',
      path: `budgets/budget-${budget.id}/month-${budget.lastMonthID}/`,
      name: 'month.json',
    });
  } else if (arg == 'incomes') {
    send({
      task: 'read',
      path: `budgets/budget-${budget.id}/month-${budget.lastMonthID}/`,
      name: 'incomes.json',
    });
  } else if (arg == 'outcomes') {
    send({
      task: 'read',
      path: `budgets/budget-${budget.id}/month-${budget.lastMonthID}/`,
      name: 'outcomes.json',
    });
  }

}

function fullDateAndHour(date) {
  date = new Date(date);
  let hr = String('0' + date.getHours()).slice(-2);
  let min = String('0' + date.getMinutes()).slice(-2);
  let sec = String('0' + date.getSeconds()).slice(-2);
  let yr = date.getFullYear();
  let mth = String('0' + String(Number(date.getMonth()) + 1)).slice(-2);
  let day = String('0' + date.getDate()).slice(-2);
  let ret = `${day}-${mth}-${yr} ${hr}:${min}:${sec}`;
  return ret;
}

function loadMonth(id) {
  budget.lastMonthID = id;
  read('month.json', `budgets/budget-${budget.id}/month-${id}/`);
  read('incomes.json', `budgets/budget-${budget.id}/month-${id}/`);
  read('outcomes.json', `budgets/budget-${budget.id}/month-${id}/`);
  if (id != budget.monthsID.length - 1) {
    editMonth = false;
  } else {
    editMonth = true;
  }
}

function showMonth(id) {
  if (id != budget.monthsID.length - 1) {
    historyCheck = true;
  } else {
    historyCheck = false;
  }
  loadMonth(id);
}

function delIncome(type, id) {
  let tempArr = [];
  if (!confirm('Are you shure?')) {
    return;
  }
  if (type == 'income') {

    for (var i = 0; i < incomes.length; i++) {
      if (i != id) {
        tempArr.push(incomes[i]);
      }
    }
    incomes = tempArr;
  } else if (type == 'outcome') {
    for (var i = 0; i < outcomes.length; i++) {
      if (i != id) {
        tempArr.push(outcomes[i]);
      }
    }
    outcomes = tempArr;
  }
  updateMonth();
  saveAll();
  refreshIncomes();
  contextIncomesAmount();
}

/**
 * Add an income or an outcome
 * @param {string} type income or outcome
 * @param {string} name Name / title of income or outcome
 * @param {string} desc Description of income or outcome
 * @param {number} amount Value of income or outcome
 * @param {number} cat Id of category
 * @example <JavaScript>
 * addIncome('income', 'Payment', 'From my employer', 2000, 1);
 */
function addIncome(type, name, desc, amount, cat, canDelete) {
  if (!editMonth) {
    delForm();
    if (type == 'income') {
      incomesCancel = undefined;
      incomesSubmit = undefined;
    } else if (type == 'outcome') {
      outcomesCancel = undefined;
      outcomesSubmit = undefined;
    }
    alert("You can't edit this month");
    return;
  }
  let tmpArr;
  if (type == 'income') {
    tmpArr = incomes;
  } else if (type == 'outcome') {
    tmpArr = outcomes;
  } else {
    console.log('Invalid type');
    return;
  }

  let tmpObj = {
    amount: amount,
    name: name,
    description: desc,
    cat: cat,
    date: new Date(),
    id: (tmpArr.length),
    flags: {
      del: false,
    },
  };
  if (canDelete) {
    tmpObj.flags.del = true;
  }

  tmpArr.push(tmpObj);
  updateMonth();
  refreshIncomes();
}

if ((document.getElementById('')) !== null) {
  send({
    task: ''
  });
}

send('reset');
