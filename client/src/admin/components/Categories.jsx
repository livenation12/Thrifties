
//hooks
import useFetch from '@/hooks/useFetch'
import React, { useState } from 'react'
import { useCategory } from '@/hooks/useCategory'

//components
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@/components/ui/select'

//icons 
import { Check, PenBoxIcon, Trash2Icon, X } from 'lucide-react'


export const SelectCategory = () => {
  const { categoryList } = useCategory()
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
        </SelectGroup>
        {categoryList && categoryList.map((item, index) => (
          <SelectItem value={item.category} key={index}>
            {item.category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export const CategoryForm = () => {
  const [category, setCategory] = useState('')
  const { refreshCategoryList } = useCategory()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddCategory = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    const addCategory = await useFetch('/categories', { body: { category: category, addedBy: 'Dakoy' }, method: 'POST' })
    if (addCategory) {
      refreshCategoryList()
      setCategory('')
      setIsLoading(false)
    }
  }

  return (
    <form className='flex justify-between' onSubmit={handleAddCategory}>
      <Input className="w-3/4" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter new category" required />
      <Button type="submit" isLoading={isLoading} loadingText="Adding">Add</Button>
    </form>

  )
}

export const Categories = () => {
  const { categoryList, refreshCategoryList } = useCategory()
  const [onUpdateCategory, setOnUpdateCategory] = useState(null)
  const [editCategory, setEditCategory] = useState('')

  //delete
  const handleCategoryDelete = async (id) => {
    const deleteCategory = await useFetch(`/categories/${id}`, { method: 'DELETE' })
    if (deleteCategory) {
      refreshCategoryList()
    }
  }
  //update
  const handleCategoryEdit = async (id) => {
    const updateCategory = await useFetch(`/categories/${id}`, { body: { category: editCategory }, method: 'PATCH' })
    if (updateCategory) {
      refreshCategoryList()
      setOnUpdateCategory(null)
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
        {categoryList && categoryList.map((item, index) => (
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