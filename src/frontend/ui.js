/*jshint esversion: 6 */
/**
 * @ignore
 */
const menuButton = document.getElementById('menuButton'),
      mainMenu = document.getElementById('mainMenu'),
      contextButtons = document.getElementById('contextButtons'),
      maska = document.getElementById('maska'),
      balanceContent = document.getElementById('balanceContent'),
      floatingFrame = document.getElementById('floatingFrame');
let incomesSubmit,
    incomesCancel,
    incomesButton,
    outcomesButton;

menuButton.addEventListener('click', (e) => {
  if (mainMenu.style.left == '0px') {
    maska.style.pointerEvents = 'none';
    mainMenu.style.left = '-100vw';
    menuButton.classList.remove("fa-arrow-left");
    menuButton.classList.add("fa-bars");
    maska.style.backdropFilter = 'none';

  } else {
    mainMenu.style.left = '0px';
    maska.style.pointerEvents = 'all';
    menuButton.classList.remove("fa-bars");
    menuButton.classList.add("fa-arrow-left");
    maska.style.backdropFilter = 'blur(5px)';
  }
});

maska.addEventListener('click', () => {
  maska.style.pointerEvents = 'none';
  mainMenu.style.left = '-100vw';
  menuButton.classList.remove("fa-arrow-left");
  menuButton.classList.add("fa-bars");
  maska.style.backdropFilter = 'none';
})

function generateIncomesForm() {
    floatingFrame.innerHTML = '<section class="defaultForm" id="incomesForm"><p id="incomesFormName">Name</p><input type="text" id="incomesFormNameInput"><p id="incomesFormAmount">Amount</p><input type="number" id="incomesFormAmountInput" name="" value=""><p id="incomesFormDesc">Description</p><textarea name="name" id="incomesFormDescInput" rows="8" cols="80"></textarea><button id="incomesFormSubmit">Submit</button><button id="incomesFormCancel">Cancel</button></section>';
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
    floatingFrame.innerHTML = '<section class="defaultForm" id="outcomesForm"><p id="outcomesFormName">Name</p><input type="text" id="outcomesFormNameInput"><p id="outcomesFormAmount">Amount</p><input type="number" id="outcomesFormAmountInput" name="" value=""><p id="outcomesFormCategory">Category</p><input type="text" id="outcomesFormCategoryInput"><p id="outcomesFormDesc">Description</p><textarea name="name" id="outcomesFormDescInput" rows="8" cols="80"></textarea><button id="outcomesFormSubmit">Submit</button><button id="outcomesFormCancel">Cancel</button></section>';
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
    contextButtons.innerHTML = '<button id="incomesButton" class="headerBarButton fa  fa-usd"><b>+</b></button><button id="outcomesButton" class="headerBarButton fa fa-usd"><b>-</b></button>';

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

function refreshIncomes() {
  for (var i = 0; i < incomes.length; i++) {
    balanceContent.insertAdjacentHTML('afterbegin', `<section class="income" id="income${i}"><h1>${incomes[i].name}</h1>  <p>${incomes[i].amount}</p><br><p>${incomes[i].description}</p></section>`);
  }
}

generateContextButtons('incomes');
