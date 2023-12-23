import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export function UniversalTable({ data, columns }) {
  
  // Processing of nested directories
  function flattenObject(obj, parentKey = '', result = {}) {
    for (const [key, value] of Object.entries(obj)) {
      const newKey = parentKey ? `${parentKey} ${key}` : key;
  
      if (typeof value === 'object' && value !== null && !(value instanceof Array)) {
        flattenObject(value, newKey, result);
      } else {
        result[newKey] = value;
      }
    }
  
    return result;
  }

  const flattenedData = data.map(item => flattenObject(item));

  // Processing of function call without "columns"
  let dynamicColumns = columns;
  if (!dynamicColumns && flattenedData && flattenedData.length > 0) {
    dynamicColumns = Object.keys(flattenedData[0]).map((key) => ({
      id: key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      align: "right",
    }));
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {dynamicColumns &&
              dynamicColumns.map((column) => (
                <TableCell key={column.id} align={column.align || "right"}>
                  {column.label}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {flattenedData &&
            flattenedData.map((row, index) => (
              <TableRow
                key={row.id || index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {dynamicColumns &&
                  dynamicColumns.map((column) => (
                    <TableCell key={column.id} align={column.align || "right"}>
                      {column.format
                        ? column.format(row[column.id])
                        : typeof row[column.id] === "object"
                        ? JSON.stringify(row[column.id])
                        : row[column.id]}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
