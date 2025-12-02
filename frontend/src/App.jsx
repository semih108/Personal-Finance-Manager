import { useState, useRef } from "react";
import "./App.css";
import TransactionForm from "./Components/TransactionForm";
import TransactionsList from "./Components/TransactionsList";
import ExpenseChart from "./Components/ExpenseChart";
import BudgetPlanner from "./Components/Budgetplanner";
import TransactionContext from "./Contexts/TransactionContext"
import useTransactions from "./Hooks/useTransactions"
import Forecast from "./Components/Forecast";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Dashboard from "./Components/dashboard";
import UserProfile from "./Components/UserProfile";
import RecentTransactions from "./components/RecentTransactions";

function App() {
  const {transactions, setTransactions} = useTransactions();
  const recentTransactionsRef = useRef(null);

  const refreshAllData = async () => {
    // Refresh RecentTransactions data
    if (recentTransactionsRef.current?.refreshTransactions) {
      await recentTransactionsRef.current.refreshTransactions();
    }
    // ExpenseChart, BudgetPlanner, and Forecast will auto-update via TransactionContext
  };

  return (
    <TransactionContext.Provider value={{transactions, setTransactions, refreshAllData}}>
      <div className="row">
        <div className="col-md-6">
          <Dashboard />
          <UserProfile />
          <TransactionForm
            onSave={(transaction) => {
              setTransactions([...transactions, transaction]);
              refreshAllData();
            }}
          />
          <RecentTransactions ref={recentTransactionsRef} userId={1} />
        </div>
        <div className="col-md-6">
            <ExpenseChart />
            <BudgetPlanner />
            <Forecast/>
        </div>
      </div>
    </TransactionContext.Provider>
  );
}

export default App;
