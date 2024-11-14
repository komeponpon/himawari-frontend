import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

// カラム定義の型
export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  sortable?: boolean;
}

interface Props {
  columns: Column[];
  rows: any[];
  defaultRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  selectedRows?: string[];
  onSelectRow?: (id: string, checked: boolean) => void;
}

export default function SearchResultTable({ 
  columns, 
  rows,
  defaultRowsPerPage = 10,
  rowsPerPageOptions = [10, 25, 100],
  selectedRows = [],
  onSelectRow
}: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [orderBy, setOrderBy] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = React.useMemo(() => {
    if (!orderBy) return rows;

    return [...rows].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue === null) return 1;
      if (bValue === null) return -1;

      if (order === 'desc') {
        return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
      }
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    });
  }, [rows, order, orderBy]);

  return (
    <Paper 
      sx={{ 
        width: '100%', 
        overflow: 'hidden',
        boxShadow: 'none',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '8px'
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="search results table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ backgroundColor: '#fafafa' }}>
                <Checkbox
                  indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                  checked={rows.length > 0 && selectedRows.length === rows.length}
                  onChange={(event) => {
                    if (onSelectRow) {
                      rows.forEach(row => {
                        onSelectRow(row.applicationCode, event.target.checked);
                      });
                    }
                  }}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ 
                    minWidth: column.minWidth,
                    backgroundColor: '#fafafa',
                    fontWeight: 600
                  }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow 
                  hover 
                  role="checkbox" 
                  tabIndex={-1} 
                  key={index}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04) !important'
                    }
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(row.applicationCode)}
                      onChange={(event) => {
                        if (onSelectRow) {
                          onSelectRow(row.applicationCode, event.target.checked);
                        }
                      }}
                    />
                  </TableCell>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="表示件数"
      />
    </Paper>
  );
}