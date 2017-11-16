/* jshint esversion: 6 */
/**
 * @type {object}
 * @desc Contains configuration (frontend)
 */
let config = {
  lastBudgetID: 0,
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
  monthsID: [
    {
      date: '10.2017',
    },
  ],
  lastMonthID: 0,
};

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
    data: { name: 'config', data: config },
    path: '',
    name: 'config.json',
  });
}

function saveBudget() {
  send({
    task: 'save',
    data: { name: 'budget', data: budget },
    path: `budgets/budget-${budget.id}/`,
    name: 'budget.json',
  });
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

  save({ name: 'month', data: month }, 'month.json', `budgets/budget-${budget.id}/month-${budget.lastMonthID}/`);

  save({ name: 'incomes', data: incomes }, 'incomes.json', `budgets/budget-${budget.id}/month-${budget.lastMonthID}/`);

  save({ name: 'outcomes', data: outcomes }, 'outcomes.json', `budgets/budget-${budget.id}/month-${budget.lastMonthID}/`);
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
    } else if (name == 'outcomes') {
      outcomes = data;
      refreshIncomes();
    } else if (name == 'config') {
      config = data;
      startup('budget');
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
function addIncome(type, name, desc, amount, cat) {
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
    id: (tmpArr.length),
    flags: {
      del: false,
    },
  };

  tmpArr.push(tmpObj);
  updateMonth();
  refreshIncomes();
}

if ((document.getElementById('')) !== null) {
  send({ task: '' });
}

send('reset');
