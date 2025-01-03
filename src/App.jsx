import { useState } from "react";
import "./App.css";
import TransactionForm from "./Components/TransactionForm";
import TransactionsList from "./Components/TransactionsList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [transactions, setTransaction] = useState([]);

  return (
    <div className="row">
      <div className="col-md-6">
        <h2 className="mb-3">Overview ToDo:</h2>

        <div className="card mb-4">
          <div className="card-body">
            <p>Income: </p>
            <p>Expenses: </p>
            <p>Balance: </p>
          </div>
        </div>
        <TransactionForm
          onSave={(transaction) =>
            setTransaction([...transactions, transaction])
          }
        />
        <TransactionsList transactions={transactions} />
      </div>
    </div>
  );
}

export default App;
