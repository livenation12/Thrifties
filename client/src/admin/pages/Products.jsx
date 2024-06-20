//hooks
import { FetchProvider } from '@/hooks/useFetchContext'

//components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Conditions } from '../components/Conditions'
import { Categories } from '../components/Categories'

import ProductList from '../components/ProductList'
import { ProductUpload } from '../components/ProductUpload'
export default function Products() {

        return (
                <div className='grid lg:grid-cols-2 gap-3'>
                        <FetchProvider url="products">
                                <div className='lg:col-span-2'>
                                        <ProductUpload />
                                </div>
                                <div>
                                        <Card>
                                                <CardHeader>
                                                        <CardTitle>Item Descriptions</CardTitle>
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
                                <div className='col-span-2'>
                                        <p className='text-center text-2xl'>Product Lists</p>
                                        <ProductList />
                                </div>
                        </FetchProvider>
                </div>
        )
}
