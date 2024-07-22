import React, { useState } from 'react';
import {
          flexRender,
          getCoreRowModel,
          getSortedRowModel,
          useReactTable,
          getFilteredRowModel,
          getPaginationRowModel,
} from '@tanstack/react-table';

import {
          Table,
          TableBody,
          TableCell,
          TableHead,
          TableHeader,
          TableRow,
} from '@/components/ui/table';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

/**
 * DataTable component that displays tabular data using the react-table library.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.columns - The columns definition for the table.
 * @param {Array} props.data - The data to be displayed in the table.
 * @param {string} [props.filterCol] - The column key to filter by.
 * @param {boolean} [props.hasPagination=false] - Flag indicating if pagination is enabled.
 * @param {boolean} [props.showSelectedRows=false] - Flag indicating if the number of selected rows should be displayed.
 * @returns {JSX.Element} The DataTable component.
 */
function DataTable({ columns, data, filterCol, hasPagination = false, showSelectedRows = false }) {
          // State variables for react-table
          const [sorting, setSorting] = useState([]);
          const [columnFilters, setColumnFilters] = useState([]);
          const [rowSelection, setRowSelection] = useState({});

          // Create the react-table instance
          const table = useReactTable({
                    data,
                    columns,
                    getCoreRowModel: getCoreRowModel(),
                    getPaginationRowModel: getPaginationRowModel(),
                    onSortingChange: setSorting,
                    onColumnFiltersChange: setColumnFilters,
                    getFilteredRowModel: getFilteredRowModel(),
                    getSortedRowModel: getSortedRowModel(),
                    onRowSelectionChange: setRowSelection,
                    state: {
                              sorting,
                              columnFilters,
                              rowSelection,
                    },
                    initialState: {
                              pagination: {
                                        pageSize: 5, // Set the default page size to 5
                              },
                    },
          });

          return (
                    <>
                              <div className='flex flex-col md:flex-row items-center justify-between'>
                                        {/* Pagination */}
                                        {hasPagination && (
                                                  <div className="flex items-center justify-end space-x-2">
                                                            <Button

                                                                      size="sm"
                                                                      onClick={() => table.setPageIndex(0)}
                                                                      disabled={!table.getCanPreviousPage()}
                                                            >
                                                                      <ChevronsLeft className='size-5' />
                                                            </Button>
                                                            <Button

                                                                      size="sm"
                                                                      onClick={() => table.previousPage()}
                                                                      disabled={!table.getCanPreviousPage()}
                                                            >
                                                                      <ChevronLeft className='size-5' />  Prev
                                                            </Button>
                                                            <Button
                                                                      size="sm"
                                                                      onClick={() => table.nextPage()}
                                                                      disabled={!table.getCanNextPage()}
                                                            >
                                                                      Next  <ChevronRight className='size-5' />
                                                            </Button>
                                                            <Button

                                                                      size="sm"
                                                                      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                                                      disabled={!table.getCanNextPage()}
                                                            >
                                                                      <ChevronsRight className='size-5' />
                                                            </Button>
                                                  </div>
                                        )}
                                        {/* Filter input */}
                                        {filterCol && (

                                                  <Input
                                                            placeholder={`Search or filter...`}
                                                            value={table.getColumn(filterCol)?.getFilterValue() ?? ''}
                                                            onChange={(event) =>
                                                                      table.getColumn(filterCol)?.setFilterValue(event.target.value)
                                                            }
                                                            className="max-w-sm"
                                                  />

                                        )}

                              </div>

                              {/* Table */}
                              <Table className="bg-slate-200 rounded">
                                        <TableHeader>
                                                  {/* Table header */}
                                                  {table.getHeaderGroups().map((headerGroup) => (
                                                            <TableRow key={headerGroup.id}>
                                                                      {headerGroup.headers.map((header) => (
                                                                                <TableHead key={header.id}>
                                                                                          {header.isPlaceholder
                                                                                                    ? null
                                                                                                    : flexRender(
                                                                                                              header.column.columnDef.header,
                                                                                                              header.getContext()
                                                                                                    )}
                                                                                </TableHead>
                                                                      ))}
                                                            </TableRow>
                                                  ))}
                                        </TableHeader>
                                        <TableBody>
                                                  {/* Table body */}
                                                  {table.getRowModel().rows?.length ? (
                                                            table.getRowModel().rows.map((row) => (
                                                                      <TableRow
                                                                                key={row.id}
                                                                                data-state={row.getIsSelected() ? 'selected' : undefined}
                                                                      >
                                                                                {row.getVisibleCells().map((cell) => (
                                                                                          <TableCell key={cell.id}>
                                                                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                                                          </TableCell>
                                                                                ))}
                                                                      </TableRow>
                                                            ))
                                                  ) : (
                                                            <TableRow>
                                                                      <TableCell colSpan={columns.length} className="h-20 text-center">
                                                                                No results.
                                                                      </TableCell>
                                                            </TableRow>
                                                  )}
                                        </TableBody>
                              </Table>
                              {/* Selected rows count */}
                              {showSelectedRows &&
                                        table.getFilteredSelectedRowModel().rows.length > 0 && (
                                                  <div className="my-2 text-sm text-white text-muted-foreground">
                                                            {table.getFilteredSelectedRowModel().rows.length} of{' '}
                                                            {table.getFilteredRowModel().rows.length} row(s) selected.
                                                  </div>
                                        )}

                    </>
          );
}

export default DataTable;
