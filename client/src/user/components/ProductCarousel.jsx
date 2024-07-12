import React from 'react'
import {
          Carousel,
          CarouselContent,
          CarouselItem,
          CarouselNext,
          CarouselPrevious,
} from "@/components/ui/carousel"
import { staticProductImageUrl } from '@/admin/features/products/data/data';


export default function ProductCarousel({ products, ...props }) {
          return (
                    <Carousel {...props}>
                              <CarouselContent className="-ml-1">
                                        {products.map((product, index) => (
                                                  <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                                            <div className='px-2'>
                                                                      <img
                                                                                className="object-cover h-auto w-full aspect-square"
                                                                                src={`${staticProductImageUrl}/${product.file.filename}`}
                                                                                alt={product.title}
                                                                      />
                                                            </div>
                                                            <div className='mx-4'>
                                                                      <p className='my-1'>{product.title}</p>
                                                                      <span className='text-xs text-muted-foreground'>{product.condition} | {product.size}</span>
                                                                      <p className=' text-sm text-yellow-600'>₱ {product.price}</p>
                                                            </div>
                                                  </CarouselItem>
                                        ))}
                              </CarouselContent>
                              <CarouselPrevious />
                              <CarouselNext />
                    </Carousel>
          )
}
