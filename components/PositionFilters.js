import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";

export function PositionFilters({
  filters,
  handleFilterChange,
  currencySettlement,
  currencyInfluence,
  assetTypes,
  accounts,
  structures,
}) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        margin: 1
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
          id="settlement-currency"
          value={filters.settlement_currency}
          name="settlement_currency"
          label="Settlement currency"
          onChange={handleFilterChange}
        >
          {currencySettlement.map((currency) => (
            <MenuItem key={currency[1]} value={currency[1]}>
              {currency[0]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
      <FormControl sx={{ m: 1, width: "25ch" }}>
        <InputLabel id="structure-label">
          Structure
        </InputLabel>
        <Select
          labelId="structure-label"
          id="structure"
          value={filters.structure}
          name="structure"
          label="Structure"
          onChange={handleFilterChange}
        >
          {structures.map((structure) => (
            <MenuItem key={structure[1]} value={structure[1]}>
              {structure[0]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
