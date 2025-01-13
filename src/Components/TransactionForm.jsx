import { useState } from "react";

function TransactionForm(props) {
  const [transaction, setTransaction] = useState("");
  const handleClick = () => {
    setTransaction("hello from click");
  };

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Add Transaction</h2>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Amount ($)</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control"
          />
        </div>
        <div>
          <label className="form-label">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            name="type"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-select"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <h1>{transaction}</h1>
        <button
          onClick={(e) => {
            handleClick,
              props.onSave({
                description: description,
                amount: Number(amount),
                category: category,
                type: type,
                date:new Date().toISOString(),
              });
          }}
          className="btn btn-outline-dark"
        >
          Add Transaction
        </button>
      </div>
    </div>
  );
}

export default TransactionForm;
