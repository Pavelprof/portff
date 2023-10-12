import React from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@mui/material';

const TransactionFilters = ({
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    selectedAccount,
    setSelectedAccount,
    selectedType,
    setSelectedType,
    asset,
    setAsset,
    handleApplyFilters,
}) => (
    <Box marginBottom={3}>
        <TextField
            className="filter-item"
            label="From Date"
            type="date"
            style={{ marginRight: '10px' }}
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            InputLabelProps={{
                shrink: true,
            }}
        />
        <TextField
            className="filter-item"
            label="To Date"
            type="date"
            style={{ marginRight: '10px' }}
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            InputLabelProps={{
                shrink: true,
            }}
        />
        <FormControl className="form-control filter-item" style={{ minWidth: '150px', marginRight: '10px' }}>
            <InputLabel>Accounts</InputLabel>
            <Select
                multiple
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                label="Accounts"
            >
                <MenuItem value={1}>Account 1</MenuItem>
                <MenuItem value={2}>Account 2</MenuItem>
                <MenuItem value={3}>Account 3</MenuItem>
                <MenuItem value={4}>Account 4</MenuItem>
                <MenuItem value={5}>Account 5</MenuItem>
                <MenuItem value={6}>Account 6</MenuItem>
            </Select>
        </FormControl>
        <FormControl className="form-control filter-item" style={{ minWidth: '200px', marginRight: '10px' }}>
            <InputLabel>Type Transaction</InputLabel>
            <Select
                multiple
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                label="Type Transaction"
            >
                <MenuItem value={1}>BUY</MenuItem>
                <MenuItem value={2}>SELL</MenuItem>
                <MenuItem value={3}>FUND</MenuItem>
                <MenuItem value={4}>PROFIT</MenuItem>
                <MenuItem value={5}>FEE</MenuItem>
                <MenuItem value={6}>TAX</MenuItem>
                <MenuItem value={7}>WITHDRAWAL</MenuItem>
            </Select>
        </FormControl>
        <TextField
            className="filter-item"
            id="asset-input"
            label="Asset"
            value={asset}
            onChange={e => setAsset(e.target.value)}
        />
        <Button color="primary" onClick={handleApplyFilters} style={{ marginLeft: '10px' }}>
            Apply Filters
        </Button>
    </Box>
);

export default TransactionFilters;
