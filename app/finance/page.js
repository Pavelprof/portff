'use client'

import React, { useState, useEffect } from 'react';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  async function fetchTransactions() {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_PORTF_URL}api/v1/transaction/?`, { cache: 'no-store' });
    const data = await resp.json();
    console.log(data)
    return data;
  };

  useEffect(() => {
    async function getTransactions() {
      const fetchedTransactions = await fetchTransactions();
      setTransactions(fetchedTransactions);
    }

    getTransactions();
  }, []);

  return (
    <ul>
      { transactions.map(transaction => (
        <li key={transaction.id}>
          <h3>{transaction.time_transaction}</h3>
        </li>
      ))}
    </ul>
  );
}