const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const addExpense = document.getElementById("addExpense");
const expenseList = document.getElementById("expenseList");
const tipText = document.getElementById("tipText");
const themeToggle = document.getElementById("themeToggle");
const totalAmount = document.getElementById("totalAmount");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Random tips
const tips = [
    "Save 20% of your income every month.",
    "Cook at home to save on food expenses.",
    "Track every expense to avoid overspending.",
    "Avoid unnecessary subscriptions.",
    "Set a monthly budget and stick to it."
];

function showTip() {
    tipText.textContent = tips[Math.floor(Math.random() * tips.length)];
}

function updateTotal() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalAmount.textContent = total.toFixed(2);
}

function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((exp, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${exp.desc} - ₹${exp.amount} (${exp.category}) 
            <button class="delete-btn" onclick="deleteExpense(${index})">❌</button>
        `;
        expenseList.appendChild(li);
    });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateTotal();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenses();
}

addExpense.addEventListener("click", () => {
    if (desc.value && amount.value) {
        expenses.push({
            desc: desc.value,
            amount: parseFloat(amount.value),
            category: category.value
        });
        desc.value = "";
        amount.value = "";
        renderExpenses();
    }
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Init
renderExpenses();
showTip();
