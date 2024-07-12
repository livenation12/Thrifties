//hooks
import { manageProductColDefs } from './data/columns'
import { ProductUpload } from './components/ProductUpload'
import { useProducts } from '@/contexts/ProductProvider';
import ProductTable from './components/ProductTable';

export default function ManageProducts() {
          const { products } = useProducts()

          return (
                    <div className='space-y-2'>
                              <ProductUpload />
                              <ProductTable data={products} columns={manageProductColDefs} filterCol="title" hasPagination  />
                    </div>

          )
}

