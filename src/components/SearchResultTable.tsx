import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Checkbox
} from '@mui/material';

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
  selectedRows: string[];
  onSelectRow: (id: string, checked: boolean) => void;
}

export default function SearchResultTable({
  columns,
  rows,
  defaultRowsPerPage = 10,
  rowsPerPageOptions = [10, 25, 100],
  selectedRows,
  onSelectRow
}: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [orderBy, setOrderBy] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  // ページ変更時にページを0にリセット
  useEffect(() => {
    setPage(0);
  }, [rows]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnId);
  };

  const sortedRows = React.useMemo(() => {
    if (!orderBy) return rows;

    return [...rows].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue === null) return order === 'asc' ? -1 : 1;
      if (bValue === null) return order === 'asc' ? 1 : -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue, 'ja')
          : bValue.localeCompare(aValue, 'ja');
      }

      return order === 'asc'
        ? (aValue < bValue ? -1 : 1)
        : (bValue < aValue ? -1 : 1);
    });
  }, [rows, orderBy, order]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = sortedRows.map(row => row.applicationCode);
      newSelected.forEach(id => onSelectRow(id, true));
    } else {
      sortedRows.forEach(row => onSelectRow(row.applicationCode, false));
    }
  };

  const currentPageRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const isAllCurrentPageSelected = 
    currentPageRows.length > 0 &&
    currentPageRows.every(row => selectedRows.includes(row.applicationCode));

  const isIndeterminate = 
    currentPageRows.some(row => selectedRows.includes(row.applicationCode)) &&
    !isAllCurrentPageSelected;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ backgroundColor: '#fafafa' }}>
                <Checkbox
                  indeterminate={isIndeterminate}
                  checked={isAllCurrentPageSelected}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: '#fafafa'
                  }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column.id)}
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
            {currentPageRows.map((row, index) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.applicationCode}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRows.includes(row.applicationCode)}
                    onChange={(event) => onSelectRow(row.applicationCode, event.target.checked)}
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