import DataTable from "@/components/DataTable";
import { TableSkeleton } from '@/components/Skeleton';
import { statusState } from "@/store/features/utils";

export default function ProductTable({ data, ...props }) {

          if (data.list?.length > 0) {
                    return <DataTable data={data.list} {...props} />
          } else if (data.status === statusState.failed) {
                    return <span className="text-destructive-500">Failed to fetch products</span>
          } else if (data.status === statusState.loading) {
                    return <TableSkeleton />
          } else {
                    return (
                              <div className='w-full h-full p-5 text-lg'>
                                        No products listed
                              </div>
                    )
          }


}
