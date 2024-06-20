

//hooks
import React from 'react'
import { useFetchContext } from '@/hooks/useFetchContext'

//components
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerDescription, DrawerFooter } from '@/components/ui/drawer'
import { ArchiveIcon, Edit2Icon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ProductList() {
          const { fetchedData } = useFetchContext()
          return (
                    <div className='grid md:grid-cols-5 gap-2'>

                              {
                                        fetchedData.length > 0 &&
                                        fetchedData.map((item, index) => (
                                                  <div key={index} className='h-52 rounded bg-slate-200 relative group'>

                                                            <img className='h-[70%] w-full rounded-t object-cover' src={`http://localhost:8000/images/products/${item.file.filename}`} alt="" />
                                                            <div className='flex flex-col text-xs p-2 text-muted-foreground'>
                                                                      <span>{item.size}</span>
                                                                      <span className='text-[#ff8881] tracking-widest'>₱{item.price}.00</span>

                                                                      <div className='text-black absolute gap-y-3 top-3 right-2 hidden group-hover:flex group-hover:flex-col bg-slate-200 p-2 rounded'>
                                                                                <Drawer >
                                                                                          <DrawerTrigger asChild>
                                                                                                    <Edit2Icon className='text-blue-400 hover:text-blue-400/70' />
                                                                                          </DrawerTrigger>
                                                                                          <form action="">
                                                                                                    <DrawerContent>

                                                                                                              <div className='mx-auto w-full max-w-5xl mb-3 grid grid-cols-2 gap-2'>

                                                                                                                        <DrawerHeader className="col-span-2">
                                                                                                                                  <DrawerTitle>Update Product</DrawerTitle>
                                                                                                                                  <DrawerDescription>Set your corrected product details</DrawerDescription>
                                                                                                                        </DrawerHeader>
                                                                                                                        <img className='h-80 w-full rounded object-cover' src={`http://localhost:8000/images/products/${item.file.filename}`} alt="" />

                                                                                                                        <div className='space-y-2'>
                                                                                                                                  <Input onChange={(e) => onValueChange(e.target.value, "brand", index)} placeholder="Brand" />
                                                                                                                                  <Input onChange={(e) => onValueChange(e.target.value, "usage", index)} placeholder="Usage" />
                                                                                                                                  <Input onChange={(e) => onValueChange(e.target.value, "materialUsed", index)} placeholder="Material used" />
                                                                                                                                  <Input onChange={(e) => onValueChange(e.target.value, "price", index)} name="price" placeholder="Price" type="number" required />
                                                                                                                                  <Textarea onChange={(e) => onValueChange(e.target.value, "issue", index)} className="col-span-2" placeholder="Place product issue here" />
                                                                                                                                  <DrawerFooter>
                                                                                                                                            <Button>Update</Button>
                                                                                                                                  </DrawerFooter>
                                                                                                                        </div>

                                                                                                              </div>
                                                                                                    </DrawerContent>
                                                                                          </form>
                                                                                </Drawer>
                                                                                <ArchiveIcon className='text-red-400 hover:text-red-400/70' />
                                                                      </div>
                                                            </div>
                                                  </div>
                                        ))
                              }
                    </div>
          )
}
