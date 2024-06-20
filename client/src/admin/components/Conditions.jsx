
//hooks
import useFetch from '@/hooks/useFetch'
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
          const [condition, setCondition] = useState('')
          const { refreshFetchedData } = useFetchContext()
          const [isLoading, setIsLoading] = useState(false)

          const handleAddCondition = async (e) => {
                    setIsLoading(true)
                    e.preventDefault()
                    const addCondition = await useFetch('/conditions', { body: { condition: condition, addedBy: 'Dakoy' }, method: 'POST' })
                    if (addCondition) {
                              refreshFetchedData()
                              setCondition('')
                              setIsLoading(false)
                    }
          }
          return (
                    <form className='flex justify-between' onSubmit={handleAddCondition}>
                              <Input className="w-3/4" value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="Enter new Condition" required />
                              <Button type="submit" isLoading={isLoading} loadingText="Adding">Add</Button>
                    </form>
          )
}

export const Conditions = () => {
          const { fetchedData, refreshFetchedData } = useFetchContext()
          const [onUpdateCondition, setOnUpdateCondition] = useState(null)
          const [editCondition, setEditCondition] = useState('')

          //delete
          const handleConditionDelete = async (id) => {
                    const deleteCondition = await useFetch(`/conditions/${id}`, { method: 'DELETE' })
                    if (deleteCondition) {
                              refreshFetchedData()
                    }
          }
          //update
          const handleConditionEdit = async (id) => {
                    const updateCondition = await useFetch(`/conditions/${id}`, { body: { condition: editCondition }, method: 'PATCH' })
                    if (updateCondition) {
                              refreshFetchedData()
                              setOnUpdateCondition(null)
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
                                        {fetchedData && fetchedData.map((item, index) => (
                                                  <TableRow key={item._id}>
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