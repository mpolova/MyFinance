// Maps transaction categories to emojis for display.
const emojis = {
    food: "🍽️", groceries: "🛒", restaurant: "🍜", coffee: "☕",
    rent: "🏠", housing: "🏡", utilities: "💡",
    transport: "🚇", car: "🚗", fuel: "⛽",
    salary: "💰", freelance: "💻", bonus: "🎁", investment: "📈",
    entertainment: "🎬", cinema: "🎥", music: "🎵", gaming: "🎮",
    shopping: "🛍️", clothes: "👗", electronics: "📱",
    health: "💊", gym: "💪", pharmacy: "🏥",
    travel: "✈️", hotel: "🏨", education: "📚",
    subscriptions: "📡", savings: "🏦", insurance: "🛡️",
    gifts: "🎀", pets: "🐾", sport: "⚽"
};

// Returns an emoji for a given category, with a default fallback.
function getEmoji(category) {
    return emojis[category.toLowerCase()] || "💳";
}

// Formats an ISO date string into a readable format.
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-DE", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

// Displays the list of transactions.
// Receives transactions array and onDelete function from parent.
function TransactionList({ transactions, onDelete }) {
    return (
        <section className="transactions-section">
            <h3 className="transactions-section__title">Transactions</h3>

            {transactions.length === 0 ? (
                <p className="empty-state">No transactions yet. Add one above.</p>
            ) : (
                <ul className="transactions-list">
                    {transactions.map((transaction) => (
                        <li className="transaction-item" key={transaction.id}>
                            <div className="transaction-item__icon">
                                {getEmoji(transaction.category)}
                            </div>
                            <div className="transaction-item__info">
                                <p className="transaction-item__description">
                                    {transaction.description || transaction.category}
                                </p>
                                <p className="transaction-item__category">
                                    {transaction.category} · {formatDate(transaction.date)}
                                </p>
                            </div>
                            <span
                                className={`transaction-item__amount transaction-item__amount--${transaction.type}`}
                            >
                                {transaction.type === "income" ? "+" : "-"}€{transaction.amount.toFixed(2)}
                            </span>
                            <button
                                className="transaction-item__delete"
                                onClick={() => onDelete(transaction.id)}
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default TransactionList;