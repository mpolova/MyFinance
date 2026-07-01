import { useState, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SpendingChart from "./components/SpendingChart";
import AIInsights from "./components/AIInsights";
import { getTransactions, createTransaction, deleteTransaction } from "./api";
import "./index.css";

function App() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadTransactions();
    }, []);

    async function loadTransactions() {
        setLoading(true);
        setError(null);
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            setError("Failed to connect to the server. Make sure the backend is running.");
            console.error("Failed to load transactions:", error);
        }
        setLoading(false);
    }

    async function handleAddTransaction(newTransaction) {
        try {
            await createTransaction(newTransaction);
            loadTransactions();
        } catch (error) {
            console.error("Failed to create transaction:", error);
        }
    }

    async function handleDeleteTransaction(id) {
        try {
            await deleteTransaction(id);
            loadTransactions();
        } catch (error) {
            console.error("Failed to delete transaction:", error);
        }
    }

    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    if (loading) {
        return (
            <div>
                <Header />
                <div className="loading-state">
                    <p>Loading your finances...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header />
                <div className="error-state">
                    <p>⚠️ {error}</p>
                </div>
            </div>
        );
    }

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