import DataTable from "@/components/DataTable";
import { availableProductsColDef } from "./data/columns";
import { useProducts } from "@/contexts/ProductProvider";


export default function SoldProducts() {
  const { products } = useProducts()
  const soldProducts = products.list.filter(product => product.status === "Sold")
  return (
    <DataTable columns={availableProductsColDef} data={soldProducts} />
  )
}
