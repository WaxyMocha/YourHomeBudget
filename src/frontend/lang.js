/*jshint esversion:6*/

/**
  * Contains all strings used in programs
  * @type {Object}
  */
let lang = {
  menu: {
    budget: 'Budget',
    history: 'History',
    preferences: 'Preferences',
  },
  headerBar: {
    incomes: {
      amount: 'Amount',
    },
  },
  incomes: {
    incomes: 'Incomes',
    outcomes: 'Outcomes',
    lastAmount: 'Last Amount',
    leftFromLastMonth: 'Left from last month',
    forms: {
      addIncome: 'Add income',
      addOutcome: 'Add outcome',
      name: 'Name',
      amount: 'Amount',
      category: 'Category',
      description: 'Description'
    },
    categories: {
      other: 'Other',
      dailyExpences: 'Daily expences',
      entertaiment: 'Entertaiment',
      houseAndBills: 'House and bills',
      financeAndInsurance: 'Finance and insurance',
    },
  },
  other: {
    submit: 'Submit',
    save: 'Save',
    cancel: 'Cancel',
    del: 'Delete',
  },
  preferences: {
    preferences: 'Preferences',
    currencySymbol: 'Currency symbol',
    lang: 'Language',
    makeLang: 'Make a translation',
    licenses: {
      licenses: 'Licenses',
      website: 'Website',
      license: 'Licence',
      show: "Show License",
      hide: "Hide",
    },
  },
};

/**
  * @type {Array}
  * Contains categories
  */
let incomesCategories = [
  lang.incomes.categories.other,
  lang.incomes.categories.dailyExpences,
  lang.incomes.categories.entertaiment,
  lang.incomes.categories.houseAndBills,
  lang.incomes.categories.financeAndInsurance
];

/**
  * Changes content of {@link lang} and {@link incomesCategories} based on loaded laguage
  */
function changeLang(data) {
  lang = data;
  incomesCategories = [
    lang.incomes.categories.other,
    lang.incomes.categories.dailyExpences,
    lang.incomes.categories.entertaiment,
    lang.incomes.categories.houseAndBills,
    lang.incomes.categories.financeAndInsurance
  ];
  refreshIncomes();
  generateMainMenu();
}
