import { Skeleton } from "./ui/skeleton"

export const TableSkeleton = () => {
          return (
                    <div className="flex flex-col gap-2 w-full">
                              <Skeleton className="self-end h-10 w-1/4" />
                              <Skeleton className="h-10 w-full" />
                              <div className="items-center flex flex-row justfiy-center">
                                        <Skeleton className="rounded-full h-10 w-12 mx-3" />
                                        <Skeleton className="w-full h-12" />
                              </div>
                              <div className="items-center flex flex-row justfiy-center">
                                        <Skeleton className="rounded-full h-10 w-12 mx-3" />
                                        <Skeleton className="w-full h-12" />
                              </div>
                              <div className="items-center flex flex-row justfiy-center">
                                        <Skeleton className="rounded-full h-10 w-12 mx-3" />
                                        <Skeleton className="w-full h-12" />
                              </div>
                              <div className="items-center flex flex-row justfiy-center">
                                        <Skeleton className="rounded-full h-10 w-12 mx-3" />
                                        <Skeleton className="w-full h-12" />
                              </div>
                              <div className="items-center flex flex-row justfiy-center">
                                        <Skeleton className="rounded-full h-10 w-12 mx-3" />
                                        <Skeleton className="w-full h-12" />
                              </div>
                              <div className="items-center flex flex-row justfiy-center">
                                        <Skeleton className="rounded-full h-10 w-12 mx-3" />
                                        <Skeleton className="w-full h-12" />
                              </div>
                              <div className="self-end flex w-1/4 gap-x-2">
                                        <Skeleton className="h-8 w-1/4" />
                                        <Skeleton className="h-8 w-1/4" />
                                        <Skeleton className="h-8 w-1/4" />
                                        <Skeleton className="h-8 w-1/4" />

                              </div>
                    </div>
          )
}

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