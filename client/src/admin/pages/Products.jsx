//hooks
import React, { useState } from 'react'
import useFetch from '@/hooks/useFetch'
import { FetchProvider } from '@/hooks/useFetchContext'

//components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Conditions, SelectCondition } from '../components/Conditions'
import { Categories, SelectCategory } from '../components/Categories'

export default function Products() {

        return (
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
                                                <CardTitle>Products Descriptions</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                                <Accordion type='single' collapsible>
                                                        <AccordionItem value="category">
                                                                <AccordionTrigger>
                                                                        Categories
                                                                </AccordionTrigger>
                                                                <AccordionContent>
                                                                        <FetchProvider url="categories">
                                                                                <Categories />
                                                                        </FetchProvider>
                                                                </AccordionContent>
                                                        </AccordionItem>
                                                        <AccordionItem value="condition">
                                                                <AccordionTrigger>
                                                                        Conditions
                                                                </AccordionTrigger>
                                                                <AccordionContent>
                                                                        <FetchProvider url="conditions">
                                                                                <Conditions />
                                                                        </FetchProvider>
                                                                </AccordionContent>
                                                        </AccordionItem>

                                                </Accordion>

                                        </CardContent>
                                </Card>
                        </div>
                </div>
        )
}


const ProductForm = () => {
        const [inputData, setInputData] = useState({})
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
        const onValueChange = (value, field) => {
                setInputData((prev) => ({
                        ...prev, [field]: value
                }))
        }

        return (
                <form className='flex flex-col space-y-2' onSubmit={handleProductAdd}>
                        <FetchProvider url='categories'>
                                <SelectCategory onValueChange={(value) => onValueChange(value, 'category')} />
                        </FetchProvider>
                        <FetchProvider url='conditions'>
                                <SelectCondition onValueChange={(value) => onValueChange(value, 'condition')} />
                        </FetchProvider>
                        <Input type="file" onChange={handleFileChange} multiple />
                        <Button type="submit" className="self-end">Add</Button>
                </form>
        )
}