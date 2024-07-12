import { soldProductsColDef } from "./data/columns";
import { useProducts } from "@/contexts/ProductProvider";
import ProductTable from "./components/ProductTable";


export default function SoldProducts() {
  const { products } = useProducts()
  const soldProducts = {
    list: products.list.filter(product => product.status === "Sold"),
    status: products.status
  }
  return (
    <ProductTable columns={soldProductsColDef} data={soldProducts} />
  )
}
