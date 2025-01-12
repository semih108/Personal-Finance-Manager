import { useEffect, useRef, useContext, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import TransactionContext from "../Contexts/TransactionContext"
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart() {
    const {transactions} = useContext(TransactionContext);
    const [data, setData] = useState(null);

    useEffect(() => {
        const expensesByCategory = transactions
            .filter((t) => t.type === 'expense')
            .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
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
    }, [transactions]);


    return <div className="card mb-4">
        <div className="card-body">
            <h2 className="card-title mb-3">Expenses breakdown</h2>

           {data == null ? null : <Pie data={data}></Pie>}
        </div>
    </div>;
}