import React from 'react'
import { ArrowUpDown, Clipboard, SquareGanttChart, ArchiveIcon, ViewIcon, EyeIcon, Ellipsis, HandCoins, EllipsisVertical, RefreshCcw } from "lucide-react"
import {
          DropdownMenu,
          DropdownMenuContent,
          DropdownMenuGroup,
          DropdownMenuItem,
          DropdownMenuLabel,
          DropdownMenuPortal,
          DropdownMenuSeparator,
          DropdownMenuSub,
          DropdownMenuSubTrigger,
          DropdownMenuTrigger,
          DropdownMenuSubContent
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Button } from '@/components/ui/button'
import { updateProductStatus, applyDiscount } from "@/store/features/product/productSlice"
import { discountTypes, productStatus } from '../data/data'
export default function TableEllipsisDropdown({ table }) {
          const [percentageCount, setPercentageCount] = useState(0)
          const tableData = table.getRowModel().rows
          if (tableData.length === 0) {
                    return ""
          }

          const dispatch = useDispatch()

          //get selected rows data
          const selectedRows = table.getSelectedRowModel().rows;
          const selectedRowsData = selectedRows.map(row => row.original);


          const handleUpdateProductStatus = (status) => {
                    const productIds = selectedRowsData.map(({ _id }) => _id);
                    const payload = {
                              updateIds: productIds,
                              status
                    }
                    dispatch(updateProductStatus(payload))
          }

          const handleApplyDiscount = (e, discountValue, discountType) => {
                    e.preventDefault()
                    const productIds = selectedRowsData.map(({ _id }) => _id);
                    const payload = {
                              discountedProductIds: productIds,
                              discountValue: discountValue[0],
                              discountType
                    }
                    console.log(payload);
                    dispatch(applyDiscount(payload))
          }
          return (
                    <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                                  <EllipsisVertical size={18} />
                                        </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                        <DropdownMenuLabel className="italic">Mark as</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                                  <DropdownMenuGroup>
                                                            <DropdownMenuItem
                                                                      onClick={() => handleUpdateProductStatus(productStatus.sold.text)}
                                                                      className='space-x-2'
                                                            >
                                                                      <HandCoins className="size-4" /> <span className="self-end">Sold</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                      onClick={() => handleUpdateProductStatus(productStatus.archive.text)}
                                                                      className='space-x-2'
                                                            >
                                                                      <ArchiveIcon className="size-4" /> <span className="self-end">Archive</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className='space-x-2'>
                                                                      <RefreshCcw className="size-4" /> <span className="self-end">Restore</span>
                                                            </DropdownMenuItem>
                                                  </DropdownMenuGroup>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel className="italic">Discount</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                                  <DropdownMenuSub>
                                                            <DropdownMenuSubTrigger>Percent</DropdownMenuSubTrigger>
                                                            <DropdownMenuPortal>
                                                                      <DropdownMenuSubContent className="w-[300px] h-[200px] z-50 bg-slate-50 p-3">
                                                                                <div className="text-sm mx-3">Apply
                                                                                          <input type="number" max={99} min={0} maxLength={2} className="w-20 mx-2 border-none bg-transparent" value={percentageCount} onChange={(e) => handleDiscountChange(e.target.value)} />
                                                                                          % discount
                                                                                </div>
                                                                                <form onSubmit={(e) => handleApplyDiscount(e, percentageCount, discountTypes.percentage)} className="flex justify-evenly flex-col size-full gap-y-5 p-3">
                                                                                          <Slider
                                                                                                    onValueChange={(value) => setPercentageCount(value)}
                                                                                                    defaultValue={[percentageCount]}
                                                                                                    max={99}
                                                                                                    step={5}
                                                                                          />
                                                                                          <Button size="sm" type="submit" loading={""}>Apply</Button>
                                                                                </form>
                                                                      </DropdownMenuSubContent>
                                                            </DropdownMenuPortal>
                                                  </DropdownMenuSub>
                                        </DropdownMenuGroup>
                              </DropdownMenuContent>
                    </DropdownMenu>
          )
}
