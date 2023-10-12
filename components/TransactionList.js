import React from 'react';

export function TransactionList({ transactions }) {
  return (
    <ul>
      {transactions.map(transaction => (
        <li key={transaction.id}>
          <h3>{transaction.time_transaction}</h3>
        </li>
      ))}
    </ul>
  );
}