const expenses = [];

const inputNode = document.querySelector(".js-expense-input");
const buttonNode = document.querySelector(".js-button");

buttonNode.addEventListener("click", function () {
  const expense = inputNode.value;
  
  expenses.push(expense);
});