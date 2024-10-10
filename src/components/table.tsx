import React, { Key, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Input,
  Select,
  Button,
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  onRowClick?: (row: T) => void;
  onSort?: (field: keyof T) => void;
  onSearch?: (searchTerm: string) => void;
  onFilter?: (filterValue: string) => void;
  filterOptions?: string[];
  actions?: DataTableAction<T>[];
}

interface DataTableColumn<T> {
  header: string;
  field: keyof T;
  sortable?: boolean;
}

interface DataTableAction<T> {
  label: string;
  onClick: (row: T) => void;
  colorScheme?: string;
}

function DataTable<T extends object>({
  data,
  columns,
  onRowClick,
  onSort,
  onSearch,
  onFilter,
  filterOptions,
  actions,
}: DataTableProps<T>) {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState<string | null>(null);

  const handleSort = (field: keyof T) => {
    if (onSort) {
      onSort(field);
    }
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };


  return (
    <Box p={4} rounded="md" shadow="sm" overflowX="auto">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th
                  key={column.field as Key}
                  onClick={() => column.sortable && handleSort(column.field)}
                >
                  {column.header}{' '}
                  {sortField === column.field && (
                    <Box as="span" ml={1}>
                      {sortDirection === 'asc' ? (
                        <ChevronUpIcon />
                      ) : (
                        <ChevronDownIcon />
                      )}
                    </Box>
                  )}
                </Th>
              ))}
              {actions && <Th>Actions</Th>}
            </Tr>
          </Thead>
          <Tbody>
            
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DataTable;
