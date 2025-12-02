import { useState } from "react";

function TransactionForm(props) {

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [merchant, setMerchant] = useState("");
  const [type, setType] = useState("expense");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddTransaction = async () => {
    setLoading(true);
    setError(null);

    try {
      const transactionData = {
        description: description,
        amount: Number(amount),
        category: category,
        merchant: merchant,
        type: type,
        date: new Date().toISOString(),
      };

      // Call the API to create the transaction
      const response = await fetch("http://localhost:8000/transactions/1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        // Call the parent's onSave callback with the created transaction
        props.onSave(result.transaction);
        
        // Reset form
        setDescription("");
        setAmount(0);
        setCategory("");
        setMerchant("");
        setType("expense");
      } else {
        setError(result.error || "Failed to create transaction");
      }
    } catch (err) {
      setError(err.message || "An error occurred while creating the transaction");
      console.error("Transaction creation error:", err);
    } finally {
      setLoading(false);
    }
  };

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
          <label className="form-label">Merchant</label>
          <input
            type="text"
            id="merchant"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
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

        <button
          onClick={handleAddTransaction}
          disabled={loading}
          className="btn btn-outline-dark"
        >
          {loading ? "Adding..." : "Add Transaction"}
        </button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
}

export default TransactionForm;
