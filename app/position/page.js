"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useAuthenticatedApi } from "@/hooks/useAuthenticatedApi";
import { useSession } from "next-auth/react";

export default function Positions() {
  const [filters, setFilters] = useState({
    settlement_currency: "",
    ticker: "",
    isin: "",
    currency_influence: [],
    type_asset: [],
    account: [],
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

    if (filters.settlement_currency.length > 0)
      params.append("settlement_currency", filters.settlement_currency);
    if (filters.ticker) params.append("ticker", filters.ticker);
    if (filters.isin) params.append("isin", filters.isin);
    filters.currency_influence.forEach((t) =>
      params.append("currency_influence", t)
    );
    filters.type_asset.forEach((t) => params.append("type_asset", t));
    filters.account.forEach((a) => params.append("account", a));

    const fetchedPositions = await api.get(
      `/api/v1/position/?${params.toString()}`
    );
    setPositions(fetchedPositions.data);
  };

  const accounts = ["1", "2", "3", "4", "5", "6"];
  const settlementCurrencies = ["USD", "EUR", "RUB", "BTC"];
  const currencyInfluence = [
    ["USD", "2"],
    ["EUR", "3"],
    ["RUB", "1"],
  ];
  console.log(currencyInfluence);

  useEffect(() => {
    console.log(status);
    if (status !== "loading") {
      const getPositionAssetTypes = async () => {
        const types = await api.get("/api/v1/position/unique_asset_types/");
        console.log(types.data);
        console.log(Object.entries(types.data));
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
          <InputLabel id="settlement-currency-label">
            Settlement currency
          </InputLabel>
          <Select
            labelId="settlement-currency-label"
            value={filters.settlement_currency}
            name="settlement_currency"
            label="Settlement currency"
            onChange={handleFilterChange}
          >
            {settlementCurrencies.map((settlement_currency) => (
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
        <FormControl sx={{ m: 1, width: "25ch" }}>
          <InputLabel id="currency-influence-label">
            Currency influence
          </InputLabel>
          <Select
            labelId="currency-influence-label"
            id="currency-influence"
            multiple
            value={filters.currency_influence}
            name="currency_influence"
            label="Currency influence"
            onChange={handleFilterChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={
                      currencyInfluence.find(
                        (currency) => currency[1] === value
                      )?.[0] || value
                    }
                  />
                ))}
              </Box>
            )}
          >
            {currencyInfluence.map((currency) => (
              <MenuItem key={currency[1]} value={currency[1]}>
                {currency[0]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
                      assetTypes.find((type) => type[1] === value)?.[0] || value
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Ticker</TableCell>
              <TableCell align="right">Account</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Currency</TableCell>
              <TableCell align="right">Total Value</TableCell>
              <TableCell align="right">Total Value currency</TableCell>
              <TableCell align="right">ISIN</TableCell>
              <TableCell align="right">Asset Name</TableCell>
              <TableCell align="right">Asset Type</TableCell>
              <TableCell align="right">Currency Influence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positions.map((position, index) => (
              <TableRow
                key={position.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">{index + 1}</TableCell>
                <TableCell align="right">{position.asset.ticker}</TableCell>
                <TableCell align="right">{position.account}</TableCell>
                <TableCell align="right">{position.quantity_position}</TableCell>
                <TableCell align="right">{position.asset.price}</TableCell>
                <TableCell align="right">{position.asset.currency}</TableCell>
                <TableCell align="right">{position.total_value}</TableCell>
                <TableCell align="right">{position.total_value_currency}</TableCell>
                <TableCell align="right">{position.asset.isin}</TableCell>
                <TableCell align="right">{position.asset.name_asset}</TableCell>
                <TableCell align="right">{position.asset.type_asset_display}</TableCell>
                <TableCell align="right">{position.asset.currency_influence}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}