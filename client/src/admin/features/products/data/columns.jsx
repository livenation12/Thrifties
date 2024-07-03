import { Button } from "@/components/ui/button"
import { ArrowUpDown, Clipboard, SquareGanttChart, ArchiveIcon, ViewIcon, EyeIcon, Ellipsis, HandCoins, EllipsisVertical } from "lucide-react"
import {
          DropdownMenu,
          DropdownMenuContent,
          DropdownMenuItem,
          DropdownMenuLabel,
          DropdownMenuSeparator,
          DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"



import { Link } from "react-router-dom"
import { staticProductImageUrl } from "./data"
import useFetch from "@/hooks/useFetch"
import { StatusBadge } from "../components/ProductStatus"

const selectRowColumn = {
          id: 'select',
          header: ({ table }) => {
                    const tableData = table.getRowModel().rows
                    if (tableData.length === 0) {
                              return ""
                    }
                    const handleSelectedRowsClick = async (data) => {
                              const productIds = data.map(({ _id }) => _id);

                              const updateStatus = await useFetch('/products/status', {
                                        method: "PUT",
                                        body: {
                                                  updateIds: productIds,
                                                  status: "Sold"
                                        }
                              });

                              if (updateStatus) {
                                        alert("Yes");
                              } else {
                                        alert("No");
                              }
                    }


                    //get selected rows data
                    const selectedRows = table.getSelectedRowModel().rows;
                    const selectedRowsData = selectedRows.map(row => row.original);
                    return (

                              <div className="flex w-14 items-center gap-x-3">
                                        <Checkbox
                                                  checked={
                                                            //check if rows are selected
                                                            table.getIsAllPageRowsSelected() ||
                                                            (table.getIsSomePageRowsSelected() && "indeterminate")
                                                  }
                                                  onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                                                  aria-label="Select all"
                                        />
                                        {
                                                  (table.getIsAllPageRowsSelected() ||
                                                            (table.getIsSomePageRowsSelected() && "indeterminate")) &&

                                                  <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                      <Button variant="ghost" size="sm">
                                                                                <EllipsisVertical size={18} />
                                                                      </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                      <DropdownMenuLabel>
                                                                                Mark as
                                                                      </DropdownMenuLabel>
                                                                      <DropdownMenuSeparator />
                                                                      <DropdownMenuItem
                                                                                onClick={() => handleSelectedRowsClick(selectedRowsData)}
                                                                      >
                                                                                Sold
                                                                      </DropdownMenuItem>
                                                                      <DropdownMenuItem>
                                                                                Archive
                                                                      </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                  </DropdownMenu>

                                        }
                              </div>
                    )
          },
          cell: ({ row }) => (
                    <Checkbox
                              checked={row.getIsSelected()}
                              onCheckedChange={(value) => row.toggleSelected(!!value)}
                              aria-label="Select row"
                    />
          ),
          enableSorting: false,
          enableHiding: false,
}

const productBaseColDef = [
          {
                    accessorKey: 'title',
                    header: ({ table }) => {
                              const tableData = table.getRowModel().rows
                              if (tableData.length > 0) {
                                        return "Products"
                              }
                              return ""
                    },
                    cell: ({ row }) => {
                              const product = row.original
                              return (

                                        <article className="flex justify-between items-center">
                                                  <div className="flex gap-x-2">
                                                            <figure className="min-w-32 min-h-24 max-w-32 max-h-24 rounded relative overflow-hidden">
                                                                      <img
                                                                                className="object-cover w-full h-full"
                                                                                src={`${staticProductImageUrl}/${product.file.filename}`}
                                                                                alt={product.title}
                                                                      />
                                                                      <StatusBadge status={product.status} className="absolute top-0 left-0" />
                                                            </figure>
                                                            <div className="flex flex-col gap-y-1 text-muted-foreground text-xs">
                                                                      <header className="font-semibold text-black text-sm truncate md:overflow-visible md:max-w-none max-w-[200px]">
                                                                                {product.title}
                                                                      </header>
                                                                      <span>{product.category}</span>
                                                                      <span>{product.condition}</span>

                                                                      <span className="text-red-500 font-semibold text-sm mx-1">₱ {product.price}</span>
                                                            </div>
                                                  </div>
                                                  <div>
                                                            <Button variant="ghost">
                                                                      <HandCoins />
                                                            </Button>
                                                            <Button variant="ghost" onClick={() => confirm()}>
                                                                      <ArchiveIcon />
                                                            </Button>

                                                            <DropdownMenu>
                                                                      <DropdownMenuTrigger asChild>
                                                                                <Button variant="ghost">
                                                                                          <Ellipsis />
                                                                                </Button>
                                                                      </DropdownMenuTrigger>
                                                                      <DropdownMenuContent align="end">
                                                                                <DropdownMenuLabel>
                                                                                          Actions
                                                                                </DropdownMenuLabel>
                                                                                <DropdownMenuSeparator />

                                                                                <Link to={`/admin/products/${product._id}`}>
                                                                                          <DropdownMenuItem>
                                                                                                    View full details
                                                                                          </DropdownMenuItem>
                                                                                </Link>
                                                                                <DropdownMenuItem>
                                                                                          View full details
                                                                                </DropdownMenuItem>
                                                                      </DropdownMenuContent>
                                                            </DropdownMenu>
                                                  </div>
                                        </article>

                              )
                    }
          },
]


export const availableProductsColDef = [
          { ...selectRowColumn },
          ...productBaseColDef,

]

export const manageProductColDefs = [
          { ...selectRowColumn },
          {
                    accessorKey: 'title',
                    header: 'Products',
                    cell: ({ row }) => {
                              const product = row.original
                              return (

                                        <article className="flex justify-between items-center">
                                                  <div className="flex gap-x-2">
                                                            <figure className="min-w-32 min-h-24 max-w-32 max-h-24 rounded overflow-hidden">
                                                                      <img
                                                                                className="object-cover w-full h-full"
                                                                                src={`${staticProductImageUrl}/${product.file.filename}`}
                                                                                alt={product.title}
                                                                      />
                                                            </figure>
                                                            <div className="flex flex-col gap-y-1 text-muted-foreground text-xs">
                                                                      <header className="font-semibold text-black text-sm truncate md:overflow-visible md:max-w-none max-w-[200px]">
                                                                                {product.title}
                                                                      </header>
                                                                      <span>{product.category}</span>
                                                                      <span>{product.condition}</span>
                                                                      <span className="text-red-500 font-semibold text-sm mx-1">₱ {product.price}</span>
                                                            </div>
                                                  </div>
                                                  <div>
                                                            <Button variant="ghost" onClick={() => confirm()}>
                                                                      <ArchiveIcon />
                                                            </Button>

                                                            <DropdownMenu>
                                                                      <DropdownMenuTrigger asChild>
                                                                                <Button variant="ghost">
                                                                                          <Ellipsis />
                                                                                </Button>
                                                                      </DropdownMenuTrigger>
                                                                      <DropdownMenuContent align="end">
                                                                                <DropdownMenuLabel>
                                                                                          Actions
                                                                                </DropdownMenuLabel>
                                                                                <DropdownMenuSeparator />

                                                                                <Link to={`/admin/products/${product._id}`}>
                                                                                          <DropdownMenuItem>
                                                                                                    View full details
                                                                                          </DropdownMenuItem>
                                                                                </Link>
                                                                                <DropdownMenuItem>
                                                                                          View full details
                                                                                </DropdownMenuItem>
                                                                      </DropdownMenuContent>
                                                            </DropdownMenu>
                                                  </div>
                                        </article>

                              )
                    }
          },
]

