//hooks
import React, { useState } from 'react'
import useFetch from '@/hooks/useFetch'
import { CategoryProvider, useCategory } from '@/hooks/useCategory'

//components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Categories } from '../components/Categories'
import { Input } from '@/components/ui/input'
import { SelectContent, SelectLabel, SelectTrigger, Select, SelectGroup, SelectValue, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function Products() {

        return (
                <CategoryProvider>
                        <div className='grid lg:grid-cols-2 gap-3'>
                                <div>
                                        <Card>
                                                <CardHeader>
                                                        <CardTitle>
                                                                Products
                                                        </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                        <ProductForm />
                                                </CardContent>
                                        </Card>
                                </div>
                                <div>
                                        <Card>
                                                <CardHeader>
                                                        <CardTitle>Lists</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                        <Accordion type='single' collapsible>
                                                                <AccordionItem value="category">
                                                                        <AccordionTrigger>
                                                                                Categories
                                                                        </AccordionTrigger>
                                                                        <AccordionContent>
                                                                                <Categories />
                                                                        </AccordionContent>
                                                                </AccordionItem>
                                                                <AccordionItem value="condition">
                                                                        <AccordionTrigger>
                                                                                Conditions
                                                                        </AccordionTrigger>
                                                                        <AccordionContent>
                                                                                <Categories />
                                                                        </AccordionContent>
                                                                </AccordionItem>

                                                        </Accordion>

                                                </CardContent>
                                        </Card>
                                </div>
                        </div>
                </CategoryProvider>
        )
}


const ProductForm = () => {
        const [category, setCategory] = useState('')
        const { categoryList } = useCategory()
        const [productFiles, setProductFiles] = useState([])

        const handleProductAdd = async () => {
                const formData = new FormData()
                formData.append('category', category)
                productFiles.forEach((file) => {
                        formData.append('files', file)
                })
                const addProduct = await useFetch('/')
        }

        const handleFileChange = (e) => {
                setProductFiles(Array.from(e.target.files))
        }

        return (
                <form className='flex flex-col space-y-2' onSubmit={handleProductAdd}>
                        <Select onValueChange={(value) => setCategory(value)}>
                                <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectGroup>
                                                <SelectLabel>
                                                        Categories
                                                </SelectLabel>
                                                <SelectItem value=" ">--Select Category--</SelectItem>
                                                {
                                                        categoryList.map((item, index) => (
                                                                <SelectItem key={index} value={item.category}>{item.category}</SelectItem>
                                                        ))
                                                }
                                        </SelectGroup>
                                </SelectContent>
                        </Select>
                        <Input type="file" onChange={handleFileChange} multiple />
                        <Button type="submit" className="self-end">Add</Button>
                </form>
        )
}