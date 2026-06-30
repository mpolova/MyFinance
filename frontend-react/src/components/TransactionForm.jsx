import { useState } from "react";
import { categorizeTransaction } from "../api";

// Form component for adding a new transaction.
// Calls onAddTransaction (passed from parent) when submitted.
function TransactionForm({ onAddTransaction }) {
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [categorizing, setCategorizing] = useState(false);

    // Calls AI to suggest a category based on description.
    async function handleDescriptionBlur() {
        if (!description || category) return;
        setCategorizing(true);
        try {
            const data = await categorizeTransaction(description);
            setCategory(data.category);
        } catch (error) {
            console.error("Failed to categorize:", error);
        }
        setCategorizing(false);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newTransaction = {
            amount: parseFloat(amount),
            type: type,
            category: category,
            description: description
        };

        onAddTransaction(newTransaction);

        setAmount("");
        setType("income");
        setCategory("");
        setDescription("");
    }

    return (
        <section className="form-section">
            <h3 className="form-section__title">Add Transaction</h3>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form__group">
                    <label className="form__label">Amount (€)</label>
                    <input
                        className="form__input"
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="form__group">
                    <label className="form__label">Type</label>
                    <select
                        className="form__input"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className="form__group">
                    <label className="form__label">
                        Description
                        {categorizing && <span style={{color: "#6366f1", marginLeft: 8, fontSize: 11}}>AI categorizing...</span>}
                    </label>
                    <input
                        className="form__input"
                        type="text"
                        placeholder="e.g. McDonald's lunch, Monthly salary"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={handleDescriptionBlur}
                    />
                </div>
                <div className="form__group">
                    <label className="form__label">
                        Category
                        {categorizing && <span style={{color: "#6366f1", marginLeft: 8, fontSize: 11}}>suggested by AI ✨</span>}
                    </label>
                    <input
                        className="form__input"
                        type="text"
                        placeholder="e.g. food, rent, salary"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <button className="form__button" type="submit">
                    Add Transaction
                </button>
            </form>
        </section>
    );
}

export default TransactionForm;