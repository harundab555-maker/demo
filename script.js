let income = parseFloat(localStorage.getItem("monthlyIncome")) || 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("income-input").value = income || '';
  updateSummary();
  renderExpenses();
});

function setIncome() {
  const incomeInput = parseFloat(document.getElementById("income-input").value);
  if (isNaN(incomeInput) || incomeInput <= 0) {
    alert("กรุณากรอกรายรับที่ถูกต้อง");
    return;
  }
  income = incomeInput;
  localStorage.setItem("monthlyIncome", income);
  updateSummary();
}

function addExpense() {
  const name = document.getElementById("expense-name").value.trim();
  const amount = parseFloat(document.getElementById("expense-amount").value);

  if (!name || isNaN(amount) || amount <= 0) {
    alert("กรุณากรอกข้อมูลรายการให้ครบถ้วน");
    return;
  }

  const today = new Date();
  const date = today.toLocaleDateString("th-TH");

  expenses.push({ name, amount, date });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  document.getElementById("expense-name").value = "";
  document.getElementById("expense-amount").value = "";

  renderExpenses();
  updateSummary();
}

function renderExpenses() {
  const list = document.getElementById("expense-list");
  list.innerHTML = "";

  const thisMonth = new Date().getMonth();

  expenses
    .filter(e => new Date(e.date).getMonth() === thisMonth)
    .forEach((e) => {
      const li = document.createElement("li");
      li.textContent = `${e.date} - ${e.name}: ${e.amount.toFixed(2)}฿`;
      list.appendChild(li);
    });
}

function updateSummary() {
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const saving = income * 0.2;
  const dailyBudget = (income - saving) / daysInMonth;
  const totalSpent = expenses
    .filter(e => new Date(e.date).getMonth() === new Date().getMonth())
    .reduce((sum, e) => sum + e.amount, 0);

  document.getElementById("monthly-income").textContent = income.toFixed(2);
  document.getElementById("daily-budget").textContent = dailyBudget.toFixed(2);
  document.getElementById("yearly-saving").textContent = (saving * 12).toFixed(2);
  document.getElementById("total-spent").textContent = totalSpent.toFixed(2);
}