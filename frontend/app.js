// Base URL of the FastAPI backend.
const API_URL = "http://127.0.0.1:8000";

// DOM element references. Cached here to avoid repeated lookups.
const totalBalanceEl = document.getElementById("total-balance");
const totalIncomeEl = document.getElementById("total-income");
const totalExpensesEl = document.getElementById("total-expenses");
const transactionsList = document.getElementById("transactions-list");
const transactionForm = document.getElementById("transaction-form");

// Fetches all transactions from the API and renders them on the page.
async function loadTransactions() {
    try {
        const response = await fetch(`${API_URL}/transactions`);
        const transactions = await response.json();
        renderTransactions(transactions);
        updateDashboard(transactions);
    } catch (error) {
        console.error("Failed to load transactions:", error);
    }
}

// Renders the transaction list in the DOM.
function renderTransactions(transactions) {
    transactionsList.innerHTML = "";

    if (transactions.length === 0) {
        transactionsList.innerHTML = `
            <p class="empty-state">No transactions yet. Add one above.</p>
        `;
        return;
    }

    transactions.forEach(transaction => {
        const item = document.createElement("li");
        item.classList.add("transaction-item");
        item.innerHTML = `
            <div class="transaction-item__icon">${getEmoji(transaction.category)}</div>
            <div class="transaction-item__info">
                <p class="transaction-item__description">${transaction.description || transaction.category}</p>
                <p class="transaction-item__category">${transaction.category} · ${formatDate(transaction.date)}</p>
            </div>
            <span class="transaction-item__amount transaction-item__amount--${transaction.type}">
                ${transaction.type === "income" ? "+" : "-"}€${transaction.amount.toFixed(2)}
            </span>
            <button class="transaction-item__delete" onclick="deleteTransaction(${transaction.id})">×</button>
        `;
        transactionsList.appendChild(item);
    });
}

// Calculates and updates the dashboard balance, income and expense totals.
function updateDashboard(transactions) {
    const income = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    totalBalanceEl.textContent = `€${balance.toFixed(2)}`;
    totalIncomeEl.textContent = `€${income.toFixed(2)}`;
    totalExpensesEl.textContent = `€${expenses.toFixed(2)}`;
}

// Sends a POST request to create a new transaction.
async function createTransaction(data) {
    try {
        const response = await fetch(`${API_URL}/transactions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            loadTransactions();
        }
    } catch (error) {
        console.error("Failed to create transaction:", error);
    }
}

// Sends a DELETE request to remove a transaction by id.
async function deleteTransaction(id) {
    try {
        const response = await fetch(`${API_URL}/transactions/${id}`, {
            method: "DELETE"
        });
        if (response.ok) {
            loadTransactions();
        }
    } catch (error) {
        console.error("Failed to delete transaction:", error);
    }
}

// Handles form submission. Reads input values and calls createTransaction.
transactionForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const data = {
        amount: parseFloat(document.getElementById("amount").value),
        type: document.getElementById("type").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value
    };

    await createTransaction(data);
    transactionForm.reset();
});

// Returns an emoji based on the transaction category.
function getEmoji(category) {
    const emojis = {
        food: "🍽️",
        groceries: "🛒",
        restaurant: "🍜",
        coffee: "☕",
        rent: "🏠",
        housing: "🏡",
        utilities: "💡",
        transport: "🚇",
        car: "🚗",
        fuel: "⛽",
        salary: "💰",
        freelance: "💻",
        bonus: "🎁",
        investment: "📈",
        entertainment: "🎬",
        cinema: "🎥",
        music: "🎵",
        gaming: "🎮",
        shopping: "🛍️",
        clothes: "👗",
        electronics: "📱",
        health: "💊",
        gym: "💪",
        pharmacy: "🏥",
        travel: "✈️",
        hotel: "🏨",
        education: "📚",
        subscriptions: "📡",
        savings: "🏦",
        insurance: "🛡️",
        gifts: "🎀",
        pets: "🐾",
        sport: "⚽"
    };
    return emojis[category.toLowerCase()] || "💳";
}

// Formats an ISO date string to a readable format.
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-DE", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

// Load transactions when the page first opens.
loadTransactions();