import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";

  export function PositionList({positions,}){
    return (
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
            {positions.map((positions, index) => (
              <TableRow
                key={positions.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">{index + 1}</TableCell>
                <TableCell align="right">{positions.asset.ticker}</TableCell>
                <TableCell align="right">{positions.account}</TableCell>
                <TableCell align="right">{positions.quantity_position}</TableCell>
                <TableCell align="right">{positions.price.toLocaleString('en-EN')}</TableCell>
                <TableCell align="right">{positions.price_currency}</TableCell>
                <TableCell align="right">{positions.position_value.toLocaleString('en-EN')}</TableCell>
                <TableCell align="right">{positions.position_value_currency}</TableCell>
                <TableCell align="right">{positions.asset.isin}</TableCell>
                <TableCell align="right">{positions.asset.name_asset}</TableCell>
                <TableCell align="right">{positions.asset.type_asset_display}</TableCell>
                <TableCell align="right">{positions.asset.currency_influence}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }