/* jshint esversion: 6 */
/**
 * @type {object}
 * @desc Contains configuration (frontend)
 */
let config = {
  lastBudget: 'budgets/budget-0/',
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
  path: `budgets/budget-0/`,
  monthsID: [
    {
      id: 0,
      path: `budgets/budget-0/month-0/`,
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
  incomes: '',
  outcomes: '',
};

/**
 * Saves all informations about budget and config (frontend)
 */
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

/**
 * Checks argument sended from backend (frontend window)
 * @param {object} arg argument to check
 */
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

  if (incomeType == 'income') {
    incomes = tmpArr;
  } else if (incomeType == 'outcome') {
    outcomes = tmpArr;
  } else {
    console.log('Invalid incomeType');
    return;
  }
}

if ((document.getElementById('')) !== null) {
  send({ task: '' });
}
