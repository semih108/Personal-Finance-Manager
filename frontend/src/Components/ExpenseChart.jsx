import { useEffect, useRef, useContext, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import TransactionContext from "../Contexts/TransactionContext"
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart() {
    const {transactions} = useContext(TransactionContext);
    const [data, setData] = useState(null);
    // EDIT_1: fetch transactions from API and store locally
    const [apiTransactions, setApiTransactions] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/transactions/1");
                const json = await res.json();
                setApiTransactions(Array.isArray(json) ? json : []);
            } catch (e) {
                console.error("Failed to fetch transactions from API", e);
                setApiTransactions([]);
            }
        };
        load();
    }, []);

    // EDIT_2: compute category totals using API data (fallback to context)
    useEffect(() => {
        const source = (apiTransactions && apiTransactions.length > 0) ? apiTransactions : (transactions || []);
        const expensesByCategory = source
            .filter((t) => Number(t.amount) < 0)
            .reduce((acc, t) => {
                const cat = t.category || "Uncategorized";
                const val = Math.abs(Number(t.amount) || 0);
                acc[cat] = (acc[cat] || 0) + val;
                return acc;
            }, {});

        setData({
            labels: Object.keys(expensesByCategory),
            datasets: [
                {
                    data: Object.values(expensesByCategory),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                    ],
                },
            ],
        });
    }, [apiTransactions, transactions]);

    return <div className="card mb-4">
        <div className="card-body">
            <h2 className="card-title mb-3">Expense Breakdown</h2>
            <h6>Expenses by Category</h6>

           {data == null ? null : <Pie data={data}></Pie>}
        </div>
    </div>;
}