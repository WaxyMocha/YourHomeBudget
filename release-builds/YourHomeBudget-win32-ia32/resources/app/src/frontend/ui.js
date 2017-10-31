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
let incomesSubmit,
    incomesCancel,
    incomesButton,
    outcomesButton;

menuButton.addEventListener('click', (e) => {
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
});

mask.addEventListener('click', () => {
  mask.style.pointerEvents = 'none';
  mainMenu.style.left = '-100vw';
  menuButton.classList.remove("fa-arrow-left");
  menuButton.classList.add("fa-bars");
  mask.style.backdropFilter = 'none';
});

function generateIncomesForm() {
    floatingFrame.innerHTML = '<section class="defaultForm" id="incomesForm"><h2>Add income</h2><p id="incomesFormName">Name</p><input type="text" id="incomesFormNameInput"><p id="incomesFormAmount">Amount</p><input type="number" id="incomesFormAmountInput" name="" value=""><p id="incomesFormDesc">Description</p><input name="name" id="incomesFormDescInput" rows="8" cols="80"></input><button id="incomesFormCancel">Cancel</button><button id="incomesFormSubmit">Submit</button></section>';

    incomesSubmit = document.getElementById('incomesFormSubmit');

    incomesSubmit.addEventListener('click', () => {
      let name = document.getElementById('incomesFormNameInput').value;
      let amount = Number(document.getElementById('incomesFormAmountInput').value);
      let description = document.getElementById('incomesFormDescInput').value;
      if (amount != "" && name != "" && description != "") {
        addIncome('income', name, description, amount, 'none');
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

function delForm() {
  floatingFrame.innerHTML = '';
}

function generateOutcomesForm() {
    floatingFrame.innerHTML = '<section class="defaultForm" id="outcomesForm"><h2>Add outcome</h2><p id="outcomesFormName">Name</p><input type="text" id="outcomesFormNameInput"><p id="outcomesFormAmount">Amount</p><input type="number" id="outcomesFormAmountInput" name="" value=""><p id="outcomesFormCategory">Category</p><select id="outcomesFormCategoryInput"><option value="Other">Other</option><option value="Daily expenses">Daily expenses</option><option value="Entertainment">Entertainment</option><option value="House and bills">House and bills</option><option value="Finance and insurance">Finance and insurance</option></select><p id="outcomesFormDesc">Description</p><input name="name" id="outcomesFormDescInput" rows="8" cols="80"></input><button id="outcomesFormCancel">Cancel</button><button id="outcomesFormSubmit">Submit</button></section>';
    outcomesSubmit = document.getElementById('outcomesFormSubmit');

    outcomesSubmit.addEventListener('click', () => {
      let name = document.getElementById('outcomesFormNameInput').value;
      let amount = Number(document.getElementById('outcomesFormAmountInput').value);
      let category = document.getElementById('outcomesFormCategoryInput').value;
      let description = document.getElementById('outcomesFormDescInput').value;
      if (amount != "" && name != "" && category != "" && description != "") {
        addIncome('outcome', name, description, amount, category);
      } else {
        console.log(' continue');
      }

    });

    outcomesCancel = document.getElementById('outcomesFormCancel');
    outcomesCancel.addEventListener('click', () => {
      delForm();
      outcomesCancel = undefined;
      outcomesSubmit = undefined;
    });
}

function generateContextButtons(scheme) {
  if (scheme == 'incomes') {
    contextButtons.innerHTML = '<button id="incomesButton" class="headerBarButton fa  fa-usd"><b>+</b></button><button id="outcomesButton" class="headerBarButton fa fa-usd"><b>-</b></button><div>';
    contextButtons.insertAdjacentHTML('afterend', '<div id="incomesAmount"></div>');

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

function contextIncomesAmount() {
  let amount = month.amount;
  document.getElementById('incomesAmount').innerHTML = `Amount: ${amount}`;
}

function refreshIncomes() {
  balanceContent.innerHTML = '';
  let i = 0;
  if (incomes.length > 0) {

    for (i = 0; i < incomes.length; i++) {
      balanceContent.insertAdjacentHTML('afterbegin', `<section class="income" id="income${i}"><h1>${incomes[i].name}</h1>  <p>${incomes[i].amount}</p><br><p>${incomes[i].description}</p></section>`);
    }

    balanceContent.insertAdjacentHTML('afterbegin', '<div style="margin: 0 auto"><h1>Incomes</h1></div>');
  }

  if (outcomes.length > 0) {
    for (i = 0; i < outcomes.length; i++) {
      balanceContent.insertAdjacentHTML('afterbegin', `<section class="income" id="outcome${i}"><h1>${outcomes[i].name}</h1>  <p>${outcomes[i].amount}</p><br><p>${outcomes[i].cat}</p><br><p>${outcomes[i].description}</p></section>`);
    }

    balanceContent.insertAdjacentHTML('afterbegin', '<div style="margin: 0 auto"><h1>Outcomes</h1></div>');
  }
  contextIncomesAmount();
}

generateContextButtons('incomes');
