/*jshint esversion: 6 */
/**
 * @ignore
 */
const menuButton = document.getElementById('menuButton'),
      mainMenu = document.getElementById('mainMenu'),
      contextButtons = document.getElementById('contextButtons'),
      mask = document.getElementById('mask'),
      balanceContent = document.getElementById('balanceContent'),
      floatingFrame = document.getElementById('floatingFrame');

/**
 * @ignore
 */
let incomesSubmit,
    incomesCancel,
    incomesButton,
    outcomesButton;

menuButton.addEventListener('click', menuPos);

/**
  * Changes position of menu on the left
  */
function menuPos() {
  if (mainMenu.style.left == '0px') {
    mask.style.pointerEvents = 'none';
    mainMenu.style.left = '-100vw';
    menuButton.classList.remove("fa-arrow-left");
    menuButton.classList.add("fa-bars");
    mask.style.backdropFilter = 'none';

  } else {
    mainMenu.style.left = '0px';
    mask.style.pointerEvents = 'all';
    menuButton.classList.remove("fa-bars");
    menuButton.classList.add("fa-arrow-left");
    mask.style.backdropFilter = 'blur(5px)';
  }
}
mask.addEventListener('click', () => {
  mask.style.pointerEvents = 'none';
  mainMenu.style.left = '-100vw';
  menuButton.classList.remove("fa-arrow-left");
  menuButton.classList.add("fa-bars");
  mask.style.backdropFilter = 'none';
});

/**
  * Generates form used for adding Incomes
  */
function generateIncomesForm() {
    let cont = `<section class="defaultForm" id="incomesForm"><h2>${lang.incomes.forms.addIncome}</h2>`;
    cont += `<p id="incomesFormName">${lang.incomes.forms.name}</p><input type="text" id="incomesFormNameInput">`;
    cont += `<p id="incomesFormAmount">${lang.incomes.forms.amount}</p><input type="number" id="incomesFormAmountInput" name="" value="0">`;
    cont += `<p id="incomesFormDesc">${lang.incomes.forms.description}</p><input name="name" id="incomesFormDescInput" rows="8" cols="80"></input>`;
    cont +=`<button id="incomesFormCancel">${lang.other.cancel}</button><button id="incomesFormSubmit">${lang.other.submit}</button></section>`;
    floatingFrame.innerHTML = cont;
    incomesSubmit = document.getElementById('incomesFormSubmit');

    incomesSubmit.addEventListener('click', () => {
      let name = document.getElementById('incomesFormNameInput').value;
      let amount = Number(document.getElementById('incomesFormAmountInput').value);
      let description = document.getElementById('incomesFormDescInput').value;
      if (amount != "" && name != "") {
        addIncome('income', name, description, amount, 'none', true);
      } else {
        console.log(' continue');
      }

    });

    incomesCancel = document.getElementById('incomesFormCancel');
    incomesCancel.addEventListener('click', () => {
      delForm();
      incomesCancel = undefined;
      incomesSubmit = undefined;
    });
}

/**
  * Hides form
  */
function delForm() {
  floatingFrame.innerHTML = '';
}

/**
  * Generates form used for adding Outcomes
  */
function generateOutcomesForm() {
    let cont = `<section class="defaultForm" id="outcomesForm"><h2>${lang.incomes.forms.addOutcome}</h2>`;
    cont += `<p id="outcomesFormName"> ${lang.incomes.forms.name}</p><input type="text" id="outcomesFormNameInput">`;
    cont += `<p id="outcomesFormAmount">${lang.incomes.forms.amount}</p><input type="number" id="outcomesFormAmountInput" name="" value="0">`;
    cont += `<p id="outcomesFormCategory">${lang.incomes.forms.category}</p><select id="outcomesFormCategoryInput" default="4" ><option value="0">${lang.incomes.categories.other}</option><option value="1">${lang.incomes.categories.dailyExpences}</option><option value="2">${lang.incomes.categories.entertaiment}</option><option value="3">${lang.incomes.categories.houseAndBills}</option><option value="4">${lang.incomes.categories.financeAndInsurance}</option></select>`;
    cont += `<p id="outcomesFormDesc">${lang.incomes.forms.description}</p><input name="name" id="outcomesFormDescInput" rows="8" cols="80"></input>`;
    cont += `<button id="outcomesFormCancel">${lang.other.cancel}</button><button id="outcomesFormSubmit">${lang.other.submit}</button></section>`;
    floatingFrame.innerHTML = cont;
    outcomesSubmit = document.getElementById('outcomesFormSubmit');

    outcomesSubmit.addEventListener('click', () => {
      let name = document.getElementById('outcomesFormNameInput').value;
      let amount = Number(document.getElementById('outcomesFormAmountInput').value);
      let category = document.getElementById('outcomesFormCategoryInput').value;
      let description = document.getElementById('outcomesFormDescInput').value;
      if (amount != "" && name != "" && category != "") {
        addIncome('outcome', name, description, amount, category, true);
      } else {
        console.log('continue');
      }

    });

    outcomesCancel = document.getElementById('outcomesFormCancel');
    outcomesCancel.addEventListener('click', () => {
      delForm();
      outcomesCancel = undefined;
      outcomesSubmit = undefined;
    });
}

/**
  * Generates buttons on app bar
  * @param {string} scheme determines which buttons needs be displayed: 'incomes',
  */
function generateContextButtons(scheme) {
  contextButtons.innerHTML = '';
  if (scheme == 'incomes') {
    contextButtons.innerHTML = '<button id="incomesButton" class="headerBarButton ripple fa  fa-usd"><b>+</b></button><button id="outcomesButton" class="headerBarButton fa fa-usd ripple"><b>-</b></button><div>';
    contextButtons.insertAdjacentHTML('afterend', '<div id="incomesAmount"></div>');
    contextButtons.insertAdjacentHTML('afterend', '<div id="date"></div>');

    incomesButton = document.getElementById('incomesButton');
    outcomesButton = document.getElementById('outcomesButton');

    incomesButton.addEventListener('click', function (e) {
      if (floatingFrame.innerHTML == '') {
        generateIncomesForm();
      } else if (floatingFrame.innerHTML != '' && !(document.getElementById('incomesForm'))) {
        delForm();
        generateIncomesForm();
      } else if (floatingFrame.innerHTML != '' && (document.getElementById('incomesForm'))) {
        delForm();
      }
    });

    outcomesButton.addEventListener('click', function (e) {
      if (floatingFrame.innerHTML == '') {
        generateOutcomesForm();
      } else if (floatingFrame.innerHTML != '' && !(document.getElementById('outcomesForm'))) {
        delForm();
        generateOutcomesForm();
      } else if (floatingFrame.innerHTML != '' && (document.getElementById('outcomesForm'))) {
        delForm();
      }
    });
  }
}

/**
 * Displays month amount on app bar
 */
function contextIncomesAmount() {
  let amount = month.amount;
  document.getElementById('incomesAmount').innerHTML = `${lang.headerBar.incomes.amount}: ${amount.toFixed(2)} ${config.currencySymbol}`;
}

/**
 * Displays months date on appbar
 */
function contextIncomesDate() {
  let date = new Date(budget.monthsID[budget.lastMonthID].date);
  let dateFormatted = monthYear(date);
  document.getElementById('date').innerHTML = dateFormatted;
}

/**
 * Generates history of months
 */
function generateHistory() {
  let history = budget.monthsID;
  balanceContent.innerHTML = '';
  for (let i = 0; i < history.length; i++) {
    balanceContent.insertAdjacentHTML('afterbegin', `<button class="income ripple" onclick="showMonth(${i})"> <h1> ${monthYear(history[i].date)}</h1><br><p>${history[i].amount.toFixed(2)}</p></button>`);
  }
}

/**
 * Generates content of left side manu
 */
function generateMainMenu() {
  mainMenu.innerHTML = '';
  let buttons = [
    {
      name: lang.menu.budget,
      action: 'lastMth()',
    },
    {
      name: lang.menu.history,
      action: 'generateHistory()',
    },
    {
      name: lang.menu.preferences,
      action: 'generatePreferences()',
    }
  ];

  for (var i = 0; i < buttons.length; i++) {
    mainMenu.insertAdjacentHTML('beforeend', `<button class="mainMenuItem ripple" onclick="${buttons[i].action}; menuPos()">${buttons[i].name}</button>`);
  }
}

/**
 * Generates content of preferences
 */
function generatePreferences() {
  balanceContent.innerHTML = '';
  balanceContent.insertAdjacentHTML(
    'beforeend',
    `<h1>${lang.preferences.preferences}</h1>`
   );
}

/**
 * Updates content of budget view
 */
function refreshIncomes() {
  balanceContent.innerHTML = '';
  let i = 0;
  if (incomes.length > 0) {

    for (i = 0; i < incomes.length; i++) {
      let cont = `<section class="income" id="income${i}"><h1>${incomes[i].name}</h1>  <p>${incomes[i].amount.toFixed(2)}${config.currencySymbol}</p>`;
      if (incomes[i].description) {
        cont += '<br>';
      }
      cont += `<p>${incomes[i].description}</p>`;
      if (incomes[i].date) {
        cont += `<br><p>${fullDateAndHour(incomes[i].date)}</p>`;
      }
      if (incomes[i].flags.del && editMonth) {
        cont += `<br><button onclick="delIncome('income', ${i})"> ${lang.other.del}</button>`;
      }
      cont += '</section>';

      if (incomes[i].description == 'bwlflm' && incomes[i].name == 'bwlflm') {
        cont = `<section class="income" id="income${i}"><h1>${lang.incomes.lastAmount}</h1>  <p>${incomes[i].amount.toFixed(2)}${config.currencySymbol}</p><br><p>${lang.incomes.leftFromLastMonth}</p></section>`;
      }
      balanceContent.insertAdjacentHTML('afterbegin', cont);
      cont = '';
    }

    balanceContent.insertAdjacentHTML('afterbegin', `<div style="margin: 0 auto"><h1>${lang.incomes.incomes}</h1></div>`);
  }

  if (outcomes.length > 0) {
    for (i = 0; i < outcomes.length; i++) {
      let cont = `<section class="income" id="outcome${i}"><h1>${outcomes[i].name}</h1>  <p>${outcomes[i].amount.toFixed(2)}${config.currencySymbol}</p>`;
      if (outcomes[i].description) {
        cont += '<br>';
      }
      cont += `<p>${outcomes[i].description}</p>`;
      if (outcomes[i].date) {
        cont += `<br><p>${fullDateAndHour(outcomes[i].date)}</p>`;
      }
      if (!isNaN(Number(outcomes[i].cat))) {
        cont += `<br><p>${incomesCategories[Number(outcomes[i].cat)]}</p>`;
      } else {
        cont += `<br><p>${outcomes[i].cat}</p>`;
      }
      if (outcomes[i].flags.del && editMonth) {
        cont += `<br><button onclick="delIncome('outcome', ${i})"> ${lang.other.del}</button>`;
      }
      cont += '</section>';
      balanceContent.insertAdjacentHTML('afterbegin', cont);
      cont = '';
    }
    balanceContent.insertAdjacentHTML('afterbegin', `<div><h1>${lang.incomes.outcomes}</h1></div>`);
  }
  updateMonth();
  contextIncomesAmount();
  contextIncomesDate();
}

generateContextButtons('incomes');
generateMainMenu();
