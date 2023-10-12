'use client'

import React, { useState, useEffect } from 'react';

export async function fetchTransactions() {
  const resp = await fetch(`${process.env.API_BASE_URL}api/v1/transaction/?`, { cache: 'no-store' });
  return resp.json();
};

export default async function Transactions() {
  const transactions = await fetchTransactions();

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