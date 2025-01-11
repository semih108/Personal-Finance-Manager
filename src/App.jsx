import { useState } from "react";
import "./App.css";
import TransactionForm from "./Components/TransactionForm";
import TransactionsList from "./Components/TransactionsList";
import ExpenseChart from "./Components/ExpenseChart";
import TransactionContext from "./Contexts/TransactionContext"
import useTransactions from "./Hooks/useTransactions"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Dashboard from "./Components/dashboard";

function App() {
  const {transactions, setTransactions} = useTransactions();

  return (
    <TransactionContext.Provider value={{transactions, setTransactions}}>
      <div className="row">
        <div className="col-md-6">
          <Dashboard />
          <TransactionForm
            onSave={(transaction) =>
              setTransactions([...transactions, transaction])
            }
          />
          <TransactionsList transactions={transactions} />
        </div>
        <div className="col-md-6">
            <ExpenseChart />
        </div>
      </div>
    </TransactionContext.Provider>
  );
}

export default App;
