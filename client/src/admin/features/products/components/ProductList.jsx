
//hooks
import React, { useEffect, useState } from 'react'
import { useFetchContext } from '@/hooks/useFetchContext'

//components
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerDescription, DrawerFooter } from '@/components/ui/drawer'
import { SquareGanttChart, Edit2Icon, ArchiveIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'
import useFetch from '@/hooks/useFetch'
import { StatusBadge } from './ProductStatus'

export default function ProductList({ filters }) {
   const { fetchedData } = useFetchContext()
   const [activeDrawer, setActiveDrawer] = useState('')
   const [productData, setProductData] = useState(fetchedData)
   useEffect(() => {
      setProductData(fetchedData)
   }, [fetchedData, filters])

   return (
      <div className='grid sm:grid-cols-3 lg:grid-cols-5 gap-2'>
         {
            productData.length > 0 &&
            productData.map((product, index) => (
               <div key={index} className='h-56 rounded bg-slate-200 relative group shadow-md'>
                  <img className='h-[65%] w-full rounded-t object-cover' src={`http://localhost:8000/images/products/${product.file.filename}`} alt="" />
                  <StatusBadge status={product.status} className="absolute top-1 left-1" />
                  <div className='flex flex-col gap-y-1 text-xs p-2 text-muted-foreground'>
                     <span className='font-semibold text-black'>{product.title}</span>
                     <span>{product.size}</span>
                     <span className='text-[#ff8881] tracking-widest'>₱{product.price}.00</span>
                     <div className='absolute gap-y-1 top-3 right-2 hidden group-hover:flex group-hover:flex-col bg-slate-200 p-2 rounded shadow-md'>
                        <Drawer >
                           <DrawerTrigger asChild>
                              <Edit2Icon onClick={() => setActiveDrawer('edit')} className='text-blue-400 hover:text-blue-400/70' />
                           </DrawerTrigger>
                           <DrawerTrigger asChild>
                              <SquareGanttChart onClick={() => setActiveDrawer('details')} className='text-gray-500 hover:text-gray-500/70' />
                           </DrawerTrigger>
                           <DrawerContent>
                              <div className='mx-auto w-full max-w-5xl mb-3 grid grid-cols-2 gap-2 relative'>
                                 <Button variant="destructive" size="sm" className='absolute right-2 top-3 inline-flex gap-x-2'><ArchiveIcon /> Archive</Button>
                                 <DrawerHeader className="col-span-2">
                                    <DrawerTitle>Update Product</DrawerTitle>
                                    <DrawerDescription>Set your corrected product details</DrawerDescription>
                                 </DrawerHeader>
                                 <img className='h-80 w-full rounded object-cover' src={`http://localhost:8000/images/products/${product.file.filename}`} alt={product.file.filename} />
                                 {
                                    activeDrawer === 'edit' ?
                                       <ProductForm initialValue={product} />
                                       :
                                       <ProductDetailsView product={product} />
                                 }
                              </div>
                           </DrawerContent>

                        </Drawer>
                     </div>
                  </div>
               </div>
            ))
         }
      </div>


   )
}
export const ProductDetailsView = ({ product }) => {
   return (
      <div>
         <img src="" alt="" />
      </div>
   )
}

const ProductForm = ({ initialValue }) => {
   const [updateData, setUpdateData] = useState(initialValue)
   const { refreshFetchedData } = useFetchContext()
   const onValueChange = (value, fieldName) => {
      setUpdateData((prev) => (
         {
            ...prev,
            [fieldName]: value
         }
      ))
   }

   const handleProductUpdate = async (e, id) => {
      e.preventDefault()
      const updateProduct = await useFetch(`/products/${id}`, {
         method: "PATCH",
         body: updateData,
      })
      if (updateProduct) {
         refreshFetchedData()
      }
   }
   return (
      <form onSubmit={(event) => handleProductUpdate(event, initialValue._id)} className='space-y-2'>
         <Input defaultValue={initialValue.title} onChange={(e) => onValueChange(e.target.value, "title")} placeholder="Title" />
         <Input defaultValue={initialValue.brand} onChange={(e) => onValueChange(e.target.value, "brand")} placeholder="Brand" />
         <Input defaultValue={initialValue.usage} onChange={(e) => onValueChange(e.target.value, "usage")} placeholder="Usage" />
         <Input defaultValue={initialValue.materialUsed} onChange={(e) => onValueChange(e.target.value, "materialUsed")} placeholder="Material used" />
         <Input startIcon="₱" defaultValue={initialValue.price} onChange={(e) => onValueChange(e.target.value, "price")} name="price" placeholder="Price" type="number" required />
         <Textarea defaultValue={initialValue.issue} onChange={(e) => onValueChange(e.target.value, "issue")} className="col-span-2 text-xs" placeholder="Place product issue here" />
         <Button type="submit" className='w-full'>Update</Button>
      </form>
   )
}