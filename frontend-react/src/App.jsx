import { useState, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SpendingChart from "./components/SpendingChart";
import AIInsights from "./components/AIInsights";
import { getTransactions, createTransaction, deleteTransaction } from "./api";
import "./index.css";

// Main application component. Holds all shared state and connects
// all child components together.
function App() {
    const [transactions, setTransactions] = useState([]);

    // Fetch transactions from the API when the app first loads.
    useEffect(() => {
        loadTransactions();
    }, []);

    // Loads all transactions from the backend and updates state.
    async function loadTransactions() {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error("Failed to load transactions:", error);
        }
    }

    // Sends a new transaction to the backend, then refreshes the list.
    async function handleAddTransaction(newTransaction) {
        try {
            await createTransaction(newTransaction);
            loadTransactions();
        } catch (error) {
            console.error("Failed to create transaction:", error);
        }
    }

    // Deletes a transaction by id, then refreshes the list.
    async function handleDeleteTransaction(id) {
        try {
            await deleteTransaction(id);
            loadTransactions();
        } catch (error) {
            console.error("Failed to delete transaction:", error);
        }
    }

    // Calculate totals from the current transactions list.
    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    return (
        <div>
            <Header />
            <main className="main">
                <Dashboard balance={balance} income={income} expenses={expenses} />
                <TransactionForm onAddTransaction={handleAddTransaction} />
                <SpendingChart transactions={transactions} />
                <AIInsights transactions={transactions} />
                <TransactionList
                    transactions={transactions}
                    onDelete={handleDeleteTransaction}
                />
            </main>
        </div>
    );
}

export default App;