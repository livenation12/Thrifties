import { Skeleton } from "./ui/skeleton"
import React from "react";
export const TableSkeleton = () => (
          <div className="flex flex-col gap-2 w-full">
                    {Array.from({ length: 7 }).map((_, index) => (
                              <React.Fragment key={index}>
                                        <div className="self-end h-10 w-1/4">
                                                  <Skeleton />
                                        </div>
                                        <Skeleton className="h-10 w-full" />
                                        <div className="items-center flex flex-row justify-center">
                                                  <Skeleton className="rounded-full h-10 w-12 mx-3" />
                                                  <Skeleton className="w-full h-12" />
                                        </div>
                              </React.Fragment>
                    ))}
                    <div className="self-end flex w-1/4 gap-x-2">
                              {Array.from({ length: 4 }).map((_, index) => (
                                        <Skeleton className="h-8 w-1/4" key={index} />
                              ))}
                    </div>
          </div>
);

export const CarouselSkeleton = () => {
          return (
                    <div className="grid grid-flow-col grid-rows-10 md:grid-cols-2 lg:grid-cols-3 h-[300px] gap-y-2 gap-x-3">
                              <Skeleton className="row-span-8" />
                              <Skeleton className="row-span-1 w-1/2" />
                              <Skeleton className="row-span-1 w-4/6" />
                              <Skeleton className="row-span-8" />
                              <Skeleton className="row-span-1 w-2/3" />
                              <Skeleton className="row-span-1 w-3/5" />
                              <Skeleton className="row-span-8" />
                              <Skeleton className="row-span-1 w-2/5" />
                              <Skeleton className="row-span-1" />

                    </div>
          )
}

export const ProductSkeleton = () => {
          return (
                    <div className="h-full space-y-2">
                              <Skeleton className='h-2/5' />
                              <div className="space-y-1">
                                        <Skeleton className='h-3 w-1/3' />
                                        <Skeleton className='h-3 w-1/2' />
                                        <Skeleton className='h-3 w-1/6' />
                              </div>
                    </div>
          )
}

export const ProductListSkeleton = ({ rows = 1 }) => {
          return (
                    <div className="products-wrapper">
                              {Array.from({ length: rows * 5 }).map((_, index) => (
                                        <ProductSkeleton key={index} />
                              ))}
                    </div>
          )
}