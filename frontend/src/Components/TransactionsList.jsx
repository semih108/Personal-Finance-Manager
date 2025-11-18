import { useState } from "react";

function TransactionsList(props) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h3 className="card-title mb3">Recent Transactions</h3>
        <ul className="list-group">
          {props.transactions.map((transaction, index) => {
            return (
              <li key={index} className="list-group-item">
                <span
                  className={`badge ${
                    transaction.type == "income" ? "bg-success" : "bg-danger"
                  } me-2`}
                >
                  {transaction.description} - {transaction.amount} -{" "}
                  {transaction.category} - {transaction.type}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TransactionsList;
