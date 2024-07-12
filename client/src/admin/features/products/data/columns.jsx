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
import { productStatus, staticProductImageUrl } from "./data"
import { StatusBadge } from "../components/ProductStatus"
import { useDispatch } from "react-redux"
import { updateProductStatus } from "@/store/features/product/productSlice"
const selectRowColumn = {
          id: 'select',
          header: ({ table }) => {
                    const tableData = table.getRowModel().rows
                    if (tableData.length === 0) {
                              return ""
                    }

                    const dispatch = useDispatch()
                    const handleSelectedRowsClick = (selectedRows) => {
                              const productIds = selectedRows.map(({ _id }) => _id);
                              const payload = {
                                        updateIds: productIds,
                                        status: "Sold"
                              }
                              dispatch(updateProductStatus(payload))
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
                              const dispatch = useDispatch()
                              const handleChangeStatus = (ids, status) => {
                                        const payload = {
                                                  updateIds: ids,
                                                  status
                                        }
                                        dispatch(updateProductStatus(payload))
                              }

                              return (
                                        <article className="flex justify-between items-center">
                                                  <div className="flex gap-x-2">
                                                            <figure className="min-w-32 min-h-24 max-w-32 max-h-24 rounded relative overflow-hidden">
                                                                      <img
                                                                                className="object-cover w-full h-full"
                                                                                src={`${staticProductImageUrl}/${product.file.filename}`}
                                                                                alt={product.title}
                                                                      />
                                                                      <StatusBadge status={product.status} className="absolute top-1 left-0" />
                                                            </figure>
                                                            <div className="flex flex-col gap-y-1 text-xs">
                                                                      <header className="font-semibold text-black text-sm truncate md:overflow-visible md:max-w-none max-w-[200px]">
                                                                                {product.title}
                                                                      </header>
                                                                 
                                                                      <span className="text-[0.83rem]">{product.category}</span>
                                                                      <span className="text-muted-foreground">{product.condition} | {product.size}</span>

                                                                      <span className="text-red-500 font-semibold text-sm mx-1">₱ {product.price}</span>
                                                            </div>
                                                  </div>
                                                  <div>
                                                            {product.status === productStatus.available &&
                                                                      <Button variant="ghost" onClick={() => handleChangeStatus([product._id], productStatus.sold)}>
                                                                                <HandCoins />
                                                                      </Button>
                                                            }
                                                            {product.status === productStatus.available && <Button variant="ghost" onClick={() => handleChangeStatus([product._id], productStatus.archive)}>
                                                                      <ArchiveIcon />
                                                            </Button>}

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
                                                                      </DropdownMenuContent>
                                                            </DropdownMenu>
                                                  </div>
                                        </article >

                              )
                    }
          },
]


export const availableProductsColDef = [
          { ...selectRowColumn },
          ...productBaseColDef,

]

export const soldProductsColDef = [
          ...productBaseColDef
]

export const manageProductColDefs = [
          ...productBaseColDef,
]

