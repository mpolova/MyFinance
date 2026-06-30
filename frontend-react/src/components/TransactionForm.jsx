import { useState } from "react";

// Form component for adding a new transaction.
// Calls onAddTransaction (passed from parent) when submitted.
function TransactionForm({ onAddTransaction }) {
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const newTransaction = {
            amount: parseFloat(amount),
            type: type,
            category: category,
            description: description
        };

        onAddTransaction(newTransaction);

        // Reset form fields after submission.
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
                    <label className="form__label">Category</label>
                    <input
                        className="form__input"
                        type="text"
                        placeholder="e.g. food, rent, salary"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div className="form__group">
                    <label className="form__label">Description</label>
                    <input
                        className="form__input"
                        type="text"
                        placeholder="Optional description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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