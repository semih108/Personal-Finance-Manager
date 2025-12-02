import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const RecentTransactions = forwardRef(({ userId = 1 }, ref) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/transactions/${userId}`);
      setTransactions(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [userId]);

  useImperativeHandle(ref, () => ({
    refreshTransactions: fetchTransactions
  }));

  if (loading) {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title mb-3">Recent Transactions</h3>
          <p>Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title mb-3">Recent Transactions</h3>
          <p className="text-danger">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h3 className="card-title mb-3">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={transaction.id || index}>
                    <td>{transaction.description || transaction.merchant || 'N/A'}</td>
                    <td>
                      <span className="badge bg-secondary">
                        {transaction.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td>{transaction.date || 'N/A'}</td>
                    <td className={transaction.amount >= 0 ? 'text-success' : 'text-danger'}>
                      ${Math.abs(transaction.amount || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
});

RecentTransactions.displayName = 'RecentTransactions';

export default RecentTransactions;