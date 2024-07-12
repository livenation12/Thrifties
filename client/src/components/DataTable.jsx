import React, { useState } from 'react';
import {
          flexRender,
          getCoreRowModel,
          getSortedRowModel,
          useReactTable,
          getFilteredRowModel,
          getPaginationRowModel,

} from "@tanstack/react-table";

import {
          Table,
          TableBody,
          TableCell,
          TableHead,
          TableHeader,
          TableRow,
} from "@/components/ui/table";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

function DataTable({ columns, data, filterCol, hasPagination, showSelectedRows }) {
          const [sorting, setSorting] = useState([])
          const [columnFilters, setColumnFilters] = useState([])
          const [rowSelection, setRowSelection] = useState({})
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
                              rowSelection
                    }
          });

          return (
                    <>
                              {
                                        filterCol &&
                                        <div className="flex items-center my-2 justify-end">
                                                  <Input
                                                            placeholder={`Search or filter...`}
                                                            value={(table.getColumn(filterCol)?.getFilterValue()) ?? ""}
                                                            onChange={(event) =>
                                                                      table.getColumn(filterCol)?.setFilterValue(event.target.value)
                                                            }
                                                            className="max-w-sm"
                                                  />
                                        </div>
                              }
                              <Table className="bg-slate-200 rounded">
                                        <TableHeader>
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
                                                  {table.getRowModel().rows?.length ? (
                                                            table.getRowModel().rows.map((row) => (
                                                                      <TableRow
                                                                                key={row.id}
                                                                                data-state={row.getIsSelected() ? "selected" : undefined}
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
                              {showSelectedRows  && table.getFilteredSelectedRowModel().rows.length > 0 &&
                                        <div className="my-2 text-sm text-white text-muted-foreground">
                                                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                                  {table.getFilteredRowModel().rows.length} row(s) selected.
                                        </div>}
                              {hasPagination &&
                                        <div className="flex items-center justify-end space-x-2">
                                                  <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => table.firstPage()}
                                                            disabled={!table.getCanPreviousPage()}
                                                  >
                                                            <ChevronsLeft />
                                                  </Button>
                                                  <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => table.previousPage()}
                                                            disabled={!table.getCanPreviousPage()}
                                                  >
                                                            <ChevronLeft />
                                                  </Button>
                                                  <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => table.nextPage()}
                                                            disabled={!table.getCanNextPage()}
                                                  >
                                                            <ChevronRight />
                                                  </Button>
                                                  <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => table.lastPage()}
                                                            disabled={!table.getCanNextPage()}
                                                  >
                                                            <ChevronsRight />
                                                  </Button>
                                        </div>
                              }
                    </>
          );
}

export default DataTable;
