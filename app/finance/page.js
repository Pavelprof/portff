"use client";

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import { fetchTransactions, fetchTransactionTypes } from "@/services/services";
import { useAuthenticatedApi } from "@/hooks/useAuthenticatedApi";
import { useSession } from "next-auth/react";

export default function Transactions() {
  const [filters, setFilters] = useState({
    time_transaction_after: "",
    time_transaction_before: "",
    account: [],
    type_transaction: [],
  });
  const [transactions, setTransactions] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const api = useAuthenticatedApi();
  const { data: session, status } = useSession();

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFetchTransactions = async () => {
    const params = new URLSearchParams();

    if (filters.time_transaction_after) params.append('time_transaction_after', filters.time_transaction_after);
    if (filters.time_transaction_before) params.append('time_transaction_before', filters.time_transaction_before);
    filters.account.forEach(a => params.append('account', a));
    filters.type_transaction.forEach(t => params.append('type_transaction', t));
  
    const fetchedTransactions = await api.get(`/api/v1/transaction/?${params.toString()}`);
    setTransactions(fetchedTransactions.data);
  };

  const accounts = ["1", "2", "3", "4", "5", "6"];

  useEffect(() => {
    console.log(status);
    if (status !== "loading") {
      const getTransactionTypes = async () => {
        const types = await api.get(
          "/api/v1/transaction/unique_transaction_types/"
        );
        setTransactionTypes(Object.entries(types.data));
      };

      getTransactionTypes();
    }
  }, [status]);

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="time_transaction_after"
          label="After Date"
          type="datetime-local"
          value={filters.time_transaction_after}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleFilterChange}
        />
        <TextField
          name="time_transaction_before"
          label="Before Date"
          type="datetime-local"
          value={filters.time_transaction_before}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleFilterChange}
        />
        <FormControl sx={{ m: 1, width: "25ch" }}>
          <InputLabel id="account-label">Account</InputLabel>
          <Select
            labelId="account-label"
            multiple
            value={filters.account}
            name="account"
            label="Account"
            onChange={handleFilterChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {accounts.map((account) => (
              <MenuItem key={account} value={account}>
                {account}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }}>
          <InputLabel id="type-transaction-label">Transaction Type</InputLabel>
          <Select
            labelId="type-transaction-label"
            id="type-transaction"
            multiple
            value={filters.type_transaction}
            name="type_transaction"
            label="Transaction Type"
            onChange={handleFilterChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={
                      transactionTypes.find((type) => type[1] === value)?.[0] ||
                      value
                    }
                  />
                ))}
              </Box>
            )}
          >
            {transactionTypes.map((type) => (
              <MenuItem key={type[1]} value={type[1]}>
                {type[0]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleFetchTransactions}>
          Fetch Transactions
        </Button>
      </Box>

      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <h3>{transaction.time_transaction}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
