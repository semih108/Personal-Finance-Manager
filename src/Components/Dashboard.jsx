import { useEffect, useContext, useState } from "react"
import TransactionContext from "../Contexts/TransactionContext"

export default function Dashboard() {
    const [aggregate, setAggregate] = useState({income: 0, expenses: 0});
    const {transactions} = useContext(TransactionContext);

    useEffect(() => {
        const income = transactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = transactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        setAggregate({income: income, expenses: expenses});
    }, [transactions]);

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h2 className="card-title mb-3">Overview</h2>
                <p>Income: $ {aggregate.income}</p>
                <p>Expenses: $ {aggregate.expenses}</p>
                <p>Balance: $ {aggregate.income - aggregate.expenses}</p>
            </div>
        </div>
    );
}