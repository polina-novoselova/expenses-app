const CURRENCY = "руб.";
const STATUS_IN_LIMIT = "Доступно";
const STATUS_OUT_OF_LIMIT = "Превышен на";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "expenses-metrics__status_red";
const CHANGE_LIMIT_POPUP_OPEN = "js-popup-open";

const inputNode = document.querySelector(".js-expense-adder__input");
const buttonNode = document.querySelector(".js-expense-adder__button");
const historyNode = document.querySelector(".js-expenses-history__list-wrap");
const sumNode = document.querySelector(".js-expenses-metrics__sum");
const limitNode = document.querySelector(".js-expenses-metrics__limit");
const statusNode = document.querySelector(".js-expenses-metrics__status");
const resetNode = document.querySelector(".js-expense-reset-btn");
const categoryNode = document.querySelector(".js-expenses-category");
const changeLimitPopUpBtnOpenNode = document.querySelector(".js-change-limit-popup-btn-open");
const changeLimitPopupNode = document.querySelector(".change-limit-popup");
const changeLimitPopupCloseBtnNode = document.querySelector(".js-popup-btn-close");
const changeLimitBtnNode = document.querySelector(".js-popup-btn-change-limit");
const inputNewLimitNode = document.querySelector(".js-input-new-limit");
const delLastExpenseNode = document.querySelector(".js-btn-last-expense");
const topUpMoneyNode = document.querySelector(".js-top-up");

let expenses = [];
let limit = 10000;

init(expenses);

buttonNode.addEventListener("click", function () {
  const expense = getExpenseFromUser();

  if (!expense) {
    return;
  }

  trackExpense(expense);

  render(expenses);
});

inputNode.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    buttonNode.click();
  } else if (event.key === "-" || event.key === "e") {
    event.preventDefault();
  }
});

function init(expenses) {
  limitNode.innerText = limit;
  statusNode.innerText = STATUS_IN_LIMIT;
  sumNode.innerText = calculateExpenses(expenses);
};

function trackExpense(expense) {
  const category = categoryNode.value;
  
  expenses.push({ expense, category });
};

function getExpenseFromUser() {
  if (!inputNode.value) {
    return null;
  }

  const expense = parseInt(inputNode.value);

  if (categoryNode.value === topUpMoneyNode.value) {
    clearinput();
    return -expense;
  }

  clearinput();

  return expense;
};

function clearinput() {
  inputNode.value = "";
};

function calculateExpenses(expenses) {
  let sum = 0;

  expenses.forEach((element) => {
    sum += element.expense;
  });

  return sum;
};

function render(expenses) {
  const sum = calculateExpenses(expenses);

  renderHistory(expenses);
  renderSum(sum);
  renderStatus(sum);
};

function renderHistory(expenses) {
  let expensesListHTML = "";

  expenses.forEach((element) => {
    const expenseTopUp = (element.category === topUpMoneyNode.value) ? '+' : '';
    expensesListHTML += `<li class="expenses-history__item">${element.category}: ${expenseTopUp}${Math.abs(element.expense)} ${CURRENCY}</li>`;
  });

  historyNode.innerHTML = `<ol class="expenses-history__list">${expensesListHTML}</ol>`;
};

function renderSum(sum) {
  sumNode.innerText = sum;
};

function renderStatus(sum) {
  const total = calculateExpenses(expenses);

  if (sum <= limit) {
    statusNode.innerText = `${STATUS_IN_LIMIT} (${limit - total} ${CURRENCY})`;

    statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - total} ${CURRENCY})`;

    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
};

const resetBtnHandler = () => {
  expenses = [];
  render(expenses);
};

resetNode.addEventListener("click", resetBtnHandler);

changeLimitPopUpBtnOpenNode.addEventListener("click", popupChangeLimitOpen);

function popupChangeLimitOpen() {
  changeLimitPopupNode.classList.add(CHANGE_LIMIT_POPUP_OPEN);
};

changeLimitPopupCloseBtnNode.addEventListener("click", popupChangeLimitClose);

function popupChangeLimitClose() {
  changeLimitPopupNode.classList.remove(CHANGE_LIMIT_POPUP_OPEN);
};

changeLimitBtnNode.addEventListener("click", getLimitFromUser);

inputNewLimitNode.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    changeLimitBtnNode.click();
  } if (event.key === "-" || event.key === "e") {
    event.preventDefault();
  }
});

function getLimitFromUser() {
  if (!inputNewLimitNode.value) {
    limit = limit;
  } else {
    limit = parseInt(inputNewLimitNode.value);

    limitNode.innerText = limit;

    popupChangeLimitClose();

    render(expenses);
  }
};

delLastExpenseNode.addEventListener("click", delLastExpense);

function delLastExpense() {
  expenses.pop();

  render(expenses);
};