const LIMIT = 10000;
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = "доступен";
const STATUS_OUT_OF_LIMIT = "превышен";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "expenses-metrics__status_red";

const inputNode = document.querySelector(".js-expense-adder__input");
const buttonNode = document.querySelector(".js-expense-adder__button");
const historyNode = document.querySelector(".js-expenses-history__list-wrap");
const sumNode = document.querySelector(".js-expenses-metrics__sum");
const limitNode = document.querySelector(".js-expenses-metrics__limit");
const statusNode = document.querySelector(".js-expenses-metrics__status");
const resetNode = document.querySelector(".js-expense-reset-btn");
const categoryNode = document.querySelector(".js-expenses-category");

let expenses = [];

init(expenses);

buttonNode.addEventListener("click", function () {
  const expense = getExpenseFromUser();

  if (!expense) {
    return;
  }

  trackExpense(expense);

  render(expenses);
});

function init(expenses) {
  limitNode.innerText = LIMIT;
  statusNode.innerText = STATUS_IN_LIMIT;
  sumNode.innerText = calculateExpenses(expenses);
}

function trackExpense(expense) {
  const category = categoryNode.value;
  expenses.push({ expense, category });
}

function getExpenseFromUser() {
  if (!inputNode.value) {
    return null;
  }

  const expense = parseInt(inputNode.value);

  clearinput();

  return expense;
}

function clearinput() {
  inputNode.value = "";
}

function calculateExpenses(expenses) {
  let sum = 0;

  expenses.forEach((element) => {
    sum += element.expense;
  });

  return sum;
}

function render(expenses) {
  const sum = calculateExpenses(expenses);

  renderHistory(expenses);
  renderSum(sum);
  renderStatus(sum);
}

function renderHistory(expenses) {
  let expensesListHTML = "";

  expenses.forEach((element) => {
    expensesListHTML += `<li class="expenses-history__item">${element.category}: ${element.expense} ${CURRENCY}</li>`;
  });

  historyNode.innerHTML = `<ol class="expenses-history__list">${expensesListHTML}</ol>`;
}

function renderSum(sum) {
  sumNode.innerText = sum;
}

function renderStatus(sum) {
  const total = calculateExpenses(expenses);

  if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;

    statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - total} руб.)`;

    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
}

const resetBtnHandler = () => {
  expenses = [];
  render(expenses);
};

resetNode.addEventListener("click", resetBtnHandler);
