import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Colors for each category segment in the chart.
const COLORS = [
    "#6366f1", "#f59e0b", "#10b981", "#ef4444",
    "#8b5cf6", "#ec4899", "#14b8a6", "#3b82f6"
];

// Transforms transactions into the format Recharts expects.
// Groups expenses by category and sums their amounts.
function getChartData(transactions) {
    const expensesByCategory = {};

    transactions
        .filter((t) => t.type === "expense")
        .forEach((t) => {
            expensesByCategory[t.category] =
                (expensesByCategory[t.category] || 0) + t.amount;
        });

    return Object.entries(expensesByCategory).map(([name, value]) => ({
        name,
        value
    }));
}

// Pie chart showing spending breakdown by category.
function SpendingChart({ transactions }) {
    const data = getChartData(transactions);

    if (data.length === 0) {
        return (
            <section className="chart-section">
                <h3 className="chart-section__title">Spending by Category</h3>
                <p className="empty-state">No expenses yet to display.</p>
            </section>
        );
    }

    return (
        <section className="chart-section">
            <h3 className="chart-section__title">Spending by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </section>
    );
}

export default SpendingChart;