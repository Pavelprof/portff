"use client";

import Link from 'next/link';
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import { useAuthenticatedApi } from "@/hooks/useAuthenticatedApi";
import { useSession } from "next-auth/react";

export default function Positions() {
  const [filters, setFilters] = useState({
    ticker: "",
    isin: "",
    currency_influence: "",
    type_asset: [],
    account: [],
    settlement_currency: [],
  });
  const [positions, setPositions] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const api = useAuthenticatedApi();
  const { data: session, status } = useSession();

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFetchPositions = async () => {
    const params = new URLSearchParams();

    if (filters.settlement_currency.length > 0) params.append('settlement_currency', filters.settlement_currency);
    if (filters.ticker) params.append('ticker', filters.ticker);
    if (filters.isin) params.append('isin', filters.isin);
    if (filters.currency_influence) params.append('currency_influence', filters.currency_influence);
    filters.type_asset.forEach(t => params.append('type_asset', t));
    filters.account.forEach(a => params.append('account', a));
  
    const fetchedPositions = await api.get(`/api/v1/position/?${params.toString()}`);
    setPositions(fetchedPositions.data);
  };

  const accounts = ["1", "2", "3", "4", "5", "6"];
  const settlement_currencies = ["USD", "EUR", "RUB", "BTC"];

  useEffect(() => {
    console.log(status);
    if (status !== "loading") {
      const getPositionAssetTypes = async () => {
        const types = await api.get(
          "/api/v1/position/unique_asset_types/"
        );
        setAssetTypes(Object.entries(types.data));
      };

      getPositionAssetTypes();
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
        <FormControl sx={{ m: 1, width: "25ch" }}>
          <InputLabel id="settlement-currency-label">Settlement currency</InputLabel>
          <Select
            labelId="settlement-currency-label"
            multiple
            value={filters.settlement_currency}
            name="settlement currency"
            label="Settlement currency"
            onChange={handleFilterChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {settlement_currencies.map((settlement_currency) => (
              <MenuItem key={settlement_currency} value={settlement_currency}>
                {settlement_currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="ticker"
          label="Ticker"
          type="text"
          value={filters.ticker}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleFilterChange}
        />
        <TextField
          name="isin"
          label="Isin"
          type="text"
          value={filters.isin}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleFilterChange}
        />
        <TextField
          name="currency_influence"
          label="Currency influence"
          type="text"
          value={filters.currency_influence}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleFilterChange}
        />
        <FormControl sx={{ m: 1, width: "25ch" }}>
          <InputLabel id="type-asset-label">Asset type</InputLabel>
          <Select
            labelId="type-asset-label"
            id="type-asset"
            multiple
            value={filters.type_asset}
            name="type_asset"
            label="Asset type"
            onChange={handleFilterChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={
                      assetTypes.find((type) => type[1] === value)?.[0] ||
                      value
                    }
                  />
                ))}
              </Box>
            )}
          >
            {assetTypes.map((type) => (
              <MenuItem key={type[1]} value={type[1]}>
                {type[0]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
      </Box>
        <Button variant="contained" onClick={handleFetchPositions}>
          Apply
        </Button>
      <ul>
         {positions.map(position => (
        <li key={position.id}>
          <Link href={`/position/${position.id}`}>{position.asset.ticker}</Link>
        </li>
      ))}
    </ul>
    </div>
  );
}