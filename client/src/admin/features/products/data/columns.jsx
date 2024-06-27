import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
export const availableProductsColDef = [
          {
                    accessorKey: 'price',
                    header: 'Price'
          },
          {
                    accessorKey: 'title',
                    header: 'Title'
          },
          {
                    accessorKey: 'category',
                    header: ({ column }) => {
                              return (
                                        <Button
                                                  variant="ghost"
                                                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                        >
                                                  Category
                                                  <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                              )
                    },
          },
          {
                    id: 'select',
                    header: ({ table }) => (

                              <Checkbox
                                        checked={
                                                  table.getIsAllPageRowsSelected() ||
                                                  (table.getIsSomePageRowsSelected() && "indeterminate")
                                        }
                                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                                        aria-label="Select all"
                              />

                    ),
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

]