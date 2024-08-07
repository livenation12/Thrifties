
//hooks
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//components
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@/components/ui/select'

//icons 
import { Check, PenBoxIcon, Trash2Icon, X } from 'lucide-react'
import { useProducts } from '@/contexts/ProductProvider'
import { addCategory, deleteCategoryById, updateCategoryById } from '@/store/features/product/categorySlice'
import { useToast } from '@/components/ui/use-toast'


export const SelectCategory = ({ onValueChange }) => {
          const { categories, status, error } = useSelector(state => state.categories)
          return (
                    <Select onValueChange={onValueChange}>
                              <SelectTrigger>
                                        <SelectValue placeholder="Category" />
                              </SelectTrigger>
                              <SelectContent>
                                        <SelectGroup>
                                                  <SelectLabel>Categories</SelectLabel>
                                                  {categories && categories.map((item, index) => (
                                                            <SelectItem value={item.category} key={index}>
                                                                      {item.category}
                                                            </SelectItem>
                                                  ))}
                                        </SelectGroup>
                              </SelectContent>
                    </Select>
          )
}
const CategoryForm = () => {
          const { toast } = useToast()
          const dispatch = useDispatch()
          const [category, setCategory] = useState('')
          const handleAddCategory = async (e) => {
                    e.preventDefault()
                    try {
                              const addResponse = await dispatch(addCategory({ category })).unwrap()
                              if (addResponse) {
                                        setCategory('')
                                        toast({
                                                  title: addResponse.message
                                        })
                              }

                    } catch (error) {
                              toast({
                                        title: error
                              })
                    }
          }

          return (
                    <form className='flex justify-between' onSubmit={handleAddCategory}>
                              <Input className="w-3/4" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter new category" required />
                              <Button type="submit" disabled={category.length === 0}>Add</Button>
                    </form>

          )
}


export const Categories = () => {
          const { toast } = useToast()
          const dispatch = useDispatch()
          const { categories } = useProducts()
          const [onUpdateCategory, setOnUpdateCategory] = useState(null)
          const [editCategory, setEditCategory] = useState('')
          const handleCategoryDelete = async (id) => {
                    try {
                              const updateResponse = await dispatch(deleteCategoryById(id)).unwrap()
                              if (updateResponse) {
                                        toast({
                                                  title: updateResponse.message
                                        })
                              }
                    } catch (error) {
                              toast({
                                        title: error
                              })
                    }
          }

          const handleCategoryEdit = async (id) => {
                    const updateResponse = await dispatch(updateCategoryById({ id, category: editCategory })).unwrap()
                    if (updateResponse) {
                              setOnUpdateCategory(null)
                              toast({
                                        title: updateResponse.message
                              })
                    }
          }
          return (

                    <Table className="overflow-auto">
                              <TableBody>
                                        <TableRow>
                                                  <TableCell>
                                                            <CategoryForm />
                                                  </TableCell>
                                        </TableRow>
                                        {categories.list && categories.list.map(item => (
                                                  <TableRow key={item._id}>
                                                            <TableCell className="flex items-center">
                                                                      {
                                                                                onUpdateCategory === item._id ?
                                                                                          <Input defaultValue={item.category} onChange={(e) => setEditCategory(e.target.value)} className="w-3/4" />
                                                                                          :
                                                                                          <span className='text-slate-600'> {item.category}</span>
                                                                      }
                                                                      <span className='absolute space-x-2 right-4 inline-flex'>
                                                                                {
                                                                                          onUpdateCategory === item._id ?
                                                                                                    <>
                                                                                                              <X className='text-destructive hover:text-destructive/60'
                                                                                                                        onClick={() => setOnUpdateCategory(null)} />
                                                                                                              <Check onClick={() => handleCategoryEdit(item._id)} className='text-blue-500 hover:text-blue-500/60' />
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                              <PenBoxIcon
                                                                                                                        onClick={() => setOnUpdateCategory(item._id)}
                                                                                                                        className='text-blue-600 hover:text-blue-600/60' />
                                                                                                              <Popover>
                                                                                                                        <PopoverTrigger asChild>
                                                                                                                                  <Trash2Icon className='text-destructive hover:text-destructive/60' />
                                                                                                                        </PopoverTrigger>
                                                                                                                        <PopoverContent className="w-60">
                                                                                                                                  <p className='text-sm'>Are you sure to delete this category?</p>
                                                                                                                                  <div className='flex justify-around my-3'>
                                                                                                                                            <Button variant="destructive" onClick={() => handleCategoryDelete(item._id)}>Confirm</Button>
                                                                                                                                            <PopoverClose asChild>
                                                                                                                                                      <Button>Cancel</Button>
                                                                                                                                            </PopoverClose>
                                                                                                                                  </div>
                                                                                                                        </PopoverContent>
                                                                                                              </Popover>
                                                                                                    </>
                                                                                }
                                                                      </span>
                                                            </TableCell>
                                                  </TableRow>
                                        ))}
                              </TableBody>
                    </Table>

          )
}