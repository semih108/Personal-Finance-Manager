import { useEffect, useContext, useState } from "react";
import TransactionContext from "../Contexts/TransactionContext";

function Forecast() {
  const { transactions } = useContext(TransactionContext);
  const [filteredTransactions, setFilteredTransactions] = useState({});
  const [averageMonthlyExpensed, setAverageMonthlyExpensed] = useState(0);


  // Filter und Aggregation der Transaktionen
  useEffect(() => {
    const filtered = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        const month = new Date(t.date).getMonth();
        acc[month] = (acc[month] || 0) + t.amount;
        return acc;
      }, {});
    setFilteredTransactions(filtered);
  }, [transactions]);

  // Berechnung der durchschnittlichen monatlichen Ausgaben
  useEffect(() => {
    const monthlyExpenses = Object.values(filteredTransactions);
    if (monthlyExpenses.length > 0) {
      const average =
        monthlyExpenses.reduce((acc, t) => acc + t, 0) / monthlyExpenses.length;
      setAverageMonthlyExpensed(average);
    } else {
      setAverageMonthlyExpensed(0);
    }
  }, [filteredTransactions]);

  return (
    <div className="card mb-4">
      <div className="card-body">
      <h2 className="card-title mb-3">Expense Forecast</h2>
      <p>Number of Expense Months: {Object.keys(filteredTransactions).length}</p>
      <p>Estimated Expenses for Next Month: {averageMonthlyExpensed.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Forecast;
