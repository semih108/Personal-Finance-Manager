import { useEffect, useContext, useState } from "react";
import TransactionContext from "../Contexts/TransactionContext";

export default function BudgetPlanner() {
    const [aggregate, setAggregate] = useState({ income: 0, expenses: 0, balance: 0 });
    const [monthlyBudget, setMonthlyBudget] = useState(5000); // Default for monthly budget
    const [yearlyBudget, setYearlyBudget] = useState(60000); // Default for yearly budget
    const { transactions } = useContext(TransactionContext);

    useEffect(() => {
        const income = transactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = transactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = income - expenses;

        setAggregate({ income, expenses, balance });
    }, [transactions]);

    const monthlyPercentage = (aggregate.balance / monthlyBudget) * 100;
    const yearlyPercentage = (aggregate.balance / yearlyBudget) * 100;

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h2 className="card-title mb-3">Budget Planner</h2>

                {/* Monthly slider */}
                <div className="mb-4">
                    <label htmlFor="monthly-slider" className="form-label">
                        Monthly Budget: ${monthlyBudget}
                    </label>
                    <input
                        id="monthly-slider"
                        type="range"
                        min="1000"
                        max="20000"
                        step="100"
                        value={monthlyBudget}
                        onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                        className="form-range"
                    />
                    <div
                        style={{
                            position: "relative",
                            height: "20px",
                            borderRadius: "10px",
                            background: "#f5f5f5",
                            border: "1px solid #ccc",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                height: "100%",
                                borderRadius: "10px",
                                background: "lightgreen",
                                width: `${Math.min(Math.abs(monthlyPercentage), 100)}%`,
                                transition: "width 0.3s ease-in-out",
                            }}
                        />
                    </div>
                    <p className="text-muted mt-2" style={{ fontSize: "14px" }}>
                        {Math.abs(monthlyPercentage).toFixed(2)}% of the monthly budget balance used
                    </p>
                </div>

                {/* Yearly slider */}
                <div className="mb-4">
                    <label htmlFor="yearly-slider" className="form-label">
                        Yearly Budget: ${yearlyBudget}
                    </label>
                    <input
                        id="yearly-slider"
                        type="range"
                        min="10000"
                        max="200000"
                        step="500"
                        value={yearlyBudget}
                        onChange={(e) => setYearlyBudget(Number(e.target.value))}
                        className="form-range"
                    />
                    <div
                        style={{
                            position: "relative",
                            height: "20px",
                            borderRadius: "10px",
                            background: "#f5f5f5",
                            border: "1px solid #ccc",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                height: "100%",
                                borderRadius: "10px",
                                background: "lightgreen",
                                width: `${Math.min(Math.abs(yearlyPercentage), 100)}%`,
                                transition: "width 0.3s ease-in-out",
                            }}
                        />
                    </div>
                    <p className="text-muted mt-2" style={{ fontSize: "14px" }}>
                        {Math.abs(yearlyPercentage).toFixed(2)}% of the yearly budget balance used
                    </p>
                </div>
            </div>
        </div>
    );
}
