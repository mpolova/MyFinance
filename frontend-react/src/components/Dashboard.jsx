// Dashboard component. Shows balance, income and expense totals.
function Dashboard({ balance, income, expenses }) {
    return (
        <section className="dashboard">
            <div className="dashboard__card dashboard__card--balance">
                <p className="dashboard__label">Total Balance</p>
                <h2 className="dashboard__amount">€{balance.toFixed(2)}</h2>
            </div>
            <div className="dashboard__card dashboard__card--income">
                <p className="dashboard__label">Total Income</p>
                <h2 className="dashboard__amount">€{income.toFixed(2)}</h2>
            </div>
            <div className="dashboard__card dashboard__card--expense">
                <p className="dashboard__label">Total Expenses</p>
                <h2 className="dashboard__amount">€{expenses.toFixed(2)}</h2>
            </div>
        </section>
    );
}

export default Dashboard;