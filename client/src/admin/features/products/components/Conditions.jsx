
//hooks
import React, { useState } from 'react'
import { useFetchContext } from '@/hooks/useFetchContext'

//components
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@/components/ui/select'

//icons 
import { Check, PenBoxIcon, Trash2Icon, X } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useProducts } from '@/contexts/ProductProvider'
import { addCondition, deleteConditionById, updateConditionsById } from '@/store/features/product/conditionSlice'
import { toast, useToast } from '@/components/ui/use-toast'


export const SelectCondition = ({ onValueChange }) => {
          const { fetchedData } = useFetchContext()
          return (
                    <Select onValueChange={onValueChange}>
                              <SelectTrigger>
                                        <SelectValue placeholder="Condition" />
                              </SelectTrigger>
                              <SelectContent>
                                        <SelectGroup>
                                                  <SelectLabel>Conditions</SelectLabel>
                                                  {fetchedData && fetchedData.map((item, index) => (
                                                            <SelectItem value={item.condition} key={index}>
                                                                      {item.condition}
                                                            </SelectItem>
                                                  ))}
                                        </SelectGroup>
                              </SelectContent>
                    </Select>
          )
}

export const ConditionForm = () => {
          const { toast } = useToast()
          const dispatch = useDispatch()
          const [condition, setCondition] = useState('')
          const handleAddCondition = async (e) => {
                    e.preventDefault()
                    try {
                              const addResponse = await dispatch(addCondition({ condition })).unwrap()
                              if (addResponse) {
                                        setCondition('')
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
                    <form className='flex justify-between' onSubmit={handleAddCondition}>
                              <Input className="w-3/4" value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="Enter new Condition" required />
                              <Button type="submit" disabled={condition.length === 0}>Add</Button>
                    </form>
          )
}

export const Conditions = () => {
          const { toast } = useToast()
          const { conditions } = useProducts()
          const dispatch = useDispatch()
          const [onUpdateCondition, setOnUpdateCondition] = useState(null)
          const [editCondition, setEditCondition] = useState('')
          const handleConditionDelete = async (id) => {
                    const deleteResponse = await dispatch(deleteConditionById(id)).unwrap()
                    if (deleteResponse) {
                              toast({
                                        title: deleteResponse.message
                              })
                    }
          }

          const handleConditionEdit = async (id) => {
                    const updateResponse = await dispatch(updateConditionsById({ id, condition: editCondition })).unwrap()
                    if (updateResponse) {
                              setOnUpdateCondition(null)
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
                                                            <ConditionForm />
                                                  </TableCell>
                                        </TableRow>
                                        {conditions.list && conditions.list.map((item, index) => (
                                                  <TableRow key={index}>
                                                            <TableCell className="flex items-center">
                                                                      {
                                                                                onUpdateCondition === item._id ?
                                                                                          <Input defaultValue={item.condition} onChange={(e) => setEditCondition(e.target.value)} className="w-3/4" />
                                                                                          :
                                                                                          <span className='text-slate-600'> {item.condition}</span>
                                                                      }
                                                                      <span className='absolute space-x-2 right-4 inline-flex'>
                                                                                {
                                                                                          onUpdateCondition === item._id ?
                                                                                                    <>
                                                                                                              <X className='text-destructive hover:text-destructive/60'
                                                                                                                        onClick={() => setOnUpdateCondition(null)} />
                                                                                                              <Check onClick={() => handleConditionEdit(item._id)} className='text-blue-500 hover:text-blue-500/60' />
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                              <PenBoxIcon
                                                                                                                        onClick={() => setOnUpdateCondition(item._id)}
                                                                                                                        className='text-blue-600 hover:text-blue-600/60' />
                                                                                                              <Popover>
                                                                                                                        <PopoverTrigger asChild>
                                                                                                                                  <Trash2Icon className='text-destructive hover:text-destructive/60' />
                                                                                                                        </PopoverTrigger>
                                                                                                                        <PopoverContent className="w-60">
                                                                                                                                  <p className='text-sm'>Are you sure to delete this Condition?</p>
                                                                                                                                  <div className='flex justify-around my-3'>
                                                                                                                                            <Button variant="destructive" onClick={() => handleConditionDelete(item._id)}>Confirm</Button>
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