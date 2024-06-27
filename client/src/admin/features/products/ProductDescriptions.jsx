import React from 'react'
import useFetch from '@/hooks/useFetch'
import { FetchProvider } from '@/hooks/useFetchContext'

//components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Conditions } from './components/Conditions'
import { Categories } from './components/Categories'

export default function ProductDescriptions() {
          const fetchConditions = async () => {
                    return await useFetch('/conditions', {})
          }

          const fetchCategories = async () => {
                    return await useFetch('/categories', {})
          }
          return (
                    <Card className="col-span-4">
                              <CardHeader>
                                        <CardTitle>Item Descriptions</CardTitle>
                              </CardHeader>
                              <CardContent>
                                        <Accordion type='multiple' className='grid md:grid-cols-2 gap-x-14'>
                                                  <AccordionItem value="category">
                                                            <AccordionTrigger>
                                                                      Categories
                                                            </AccordionTrigger>
                                                            <AccordionContent>
                                                                      <FetchProvider request={fetchCategories}>
                                                                                <Categories />
                                                                      </FetchProvider>
                                                            </AccordionContent>
                                                  </AccordionItem>
                                                  <AccordionItem value="condition">
                                                            <AccordionTrigger>
                                                                      Conditions
                                                            </AccordionTrigger>
                                                            <AccordionContent>
                                                                      <FetchProvider request={fetchConditions}>
                                                                                <Conditions />
                                                                      </FetchProvider>
                                                            </AccordionContent>
                                                  </AccordionItem>
                                        </Accordion>
                              </CardContent>
                    </Card>
          )
}
