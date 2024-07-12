import useFetch from "@/hooks/useFetch"
import { useLoaderData, useNavigate } from "react-router-dom"
import { staticProductImageUrl } from "./data/data"
import { StatusBadge } from "./components/ProductStatus"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const productDetailsLoader = async ({ params }) => {
          return await useFetch(`/products/${params.productId}`, {})

}
export default function ProductDetails() {
          const product = useLoaderData()
          const navigate = useNavigate()
          return (
                    <div className="size-full max-h-[80vh] relative">
                              <Button variant="ghost" onClick={() => navigate(-1)} className="my-2 text-black">
                                        <ChevronLeft />
                              </Button>
                              <article className="flex text-slate-100 relative px-10 size-full">
                                        <figure className="max-w-md rounded overflow-hidden relative size-full">
                                                  <img src={`${staticProductImageUrl}/${product.file.filename}`} className="object-cover size-full rounded shadow-md" alt="" />
                                                  <StatusBadge status={product.status} className="absolute top-3 right-3 h-8" />
                                        </figure>
                                        <div className="flex flex-col text-base gap-y-2 px-5 size-full">
                                                  <div className="self-end space-x-2">
                                                            {product.status !== "Archive" && <Button variant="destructive">Archive</Button>}
                                                            {product.status === "Available" && <Button className="bg-yellow-500">Sold</Button>}
                                                  </div>
                                                  <header className="text-4xl font-semibold mb-3">
                                                            {product.title}
                                                  </header>
                                                  <div className="grid grid-cols-6">
                                                            <span>Category: </span> <span className="col-span-5">{product.category}</span>
                                                            <span>Condition: </span><span className="col-span-5"> {product.condition}</span>
                                                            <span>Size:</span> <span className="col-span-5">{product.size}</span>
                                                            <span>Price:  </span><span className="col-span-5">₱ {product.price}</span>
                                                            <span>Issues:</span> <span className="col-span-5">
                                                                      {product.issues ? product.issues : "None"}
                                                            </span>
                                                  </div>
                                        </div>
                              </article>
                    </div>

          )
}
