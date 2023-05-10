const LIMIT = 10000;
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = "доступен";
const STATUS_OUT_OF_LIMIT = "превышен";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red"

const inputNode = document.querySelector(".js-expense-input");
const buttonNode = document.querySelector(".js-button");
const historyNode = document.querySelector(".js-history");
const sumNode = document.querySelector(".js-sum");
const limitNode = document.querySelector(".js-limit");
const statusNode = document.querySelector(".js-status");

const expenses = [];

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
};

function trackExpense(expense) {
  expenses.push(expense);
};

function getExpenseFromUser() {
  if (!inputNode.value) {
    return null;
  }

  const expense = parseInt(inputNode.value);

  clearinput();

  return expense;
};

function clearinput() {
  inputNode.value = "";
};

function calculateExpenses(expenses) {
  let sum = 0;

  expenses.forEach((element) => {
    sum += element;
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
    expensesListHTML += `<li>${element} ${CURRENCY}</li>`;
  });

  historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
};

function renderSum(sum) {
  sumNode.innerText = sum;
};

function renderStatus(sum) {
  if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
    
    statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
  } else {
    statusNode.innerText = STATUS_OUT_OF_LIMIT;

    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
};
