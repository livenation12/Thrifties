import { ChevronLeft, SearchIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

//components
import { ProductUpload } from './components/ProductUpload'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProductList from './components/ProductList'

//hooks
import { useState } from 'react'
import { FetchProvider } from '@/hooks/useFetchContext'
import { Input } from '@/components/ui/input'
import { ArchiveBadge, AvailableBadge, SoldBadge } from './components/ProductStatus'
import useFetch from '@/hooks/useFetch'


export default function ManageProducts() {
          const [filters, setFilters] = useState({
                    searchFilter: '',
                    statusFilter: ''
          })

          const handleFilterChange = (field, value) => {
                    setFilters((prev) => ({
                              ...prev,
                              [field]: value
                    }));
          };

          const fetchProducts = async () => {
                    return await useFetch('/products', {})
          }

          return (
                    <FetchProvider request={fetchProducts}>
                              <div className='grid gap-2'>
                                        <ProductUpload />
                                        <div className='flex flex-col justify-between md:flex-row-reverse gap-2'>
                                                  <Input onChange={(e) => handleFilterChange(e.target.name, e.target.value)} name="searchFilter" startIcon={<SearchIcon />} placeholder="Search products..." className="text-black lg:w-1/4" />
                                                  <div className='flex cursor-pointer gap-2 items-center'>
                                                            <ArchiveBadge onClick={() => handleFilterChange('statusFilter', 'archive')} variant="destructive" className="w-20 h-7 shadow-md" />
                                                            <SoldBadge onClick={() => handleFilterChange('statusFilter', "sold")} className="w-20 h-7 shadow-md" />
                                                            <AvailableBadge onClick={() => handleFilterChange('statusFilter', "available")} className="w-20 h-7 shadow-md" />
                                                  </div>
                                        </div>
                                        <Card>
                                                  <CardHeader>
                                                            <CardTitle>
                                                                      <p className='text-2xl font-semibold'>Product Lists</p>
                                                            </CardTitle>
                                                  </CardHeader>
                                                  <CardContent>
                                                            <ProductList filters="" />
                                                  </CardContent>
                                                  <span className='text-sm my-2 flex justify-end items-center'>See all products <ChevronRight /></span>
                                        </Card>
                              </div>
                    </FetchProvider>

          )
}

