//hooks
import DataTable from '@/components/DataTable'
import { manageProductColDefs } from './data/columns'

import { ProductUpload } from './components/ProductUpload'
import { useProducts } from '@/contexts/ProductProvider';

export default function ManageProducts() {
          const { products } = useProducts()
          if (products.status === 'loading') {
                    return <div>Loading...</div>;
          }

          if (products.status === 'failed') {
                    return <div>Error: {error}</div>;
          }

          return (
                    <div className='space-y-2'>
                              <ProductUpload />
                              <DataTable columns={manageProductColDefs} data={products.list} />

                    </div>

          )
}

