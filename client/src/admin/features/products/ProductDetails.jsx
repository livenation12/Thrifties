import useFetch from "@/hooks/useFetch"
import { Link, useLoaderData, useNavigate } from "react-router-dom"
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
                    <>
                              <Button variant="ghost" onClick={() => navigate(-1)} className="my-2">
                                        <ChevronLeft />
                              </Button>
                              <article className="flex justify-between items-center text-slate-100">
                                        <div className="flex gap-2">
                                                  <figure className="max-w-md rounded overflow-hidden relative">
                                                            <img src={`${staticProductImageUrl}/${product.file.filename}`} className="object-cover rounded shadow-md w-full h-full" alt="" />
                                                            <StatusBadge status={product.status} className="absolute top-3 left-3 h-8" />
                                                  </figure>
                                                  <div className="flex flex-col m-3">
                                                            <header className="text-2xl font-semibold">
                                                                      {product.title}
                                                            </header>
                                                            <span className="">{product.category}</span>
                                                            <span className="text-green-200">{product.condition}</span>
                                                            <span className="">{product.size}</span>
                                                            <span className="">₱ {product.price}</span>
                                                            <span>{product.issues}</span>
                                                            <div className="self-end space-x-2">
                                                                      <Button>Archive</Button>
                                                                      <Button>Sold</Button>
                                                            </div>
                                                  </div>
                                        </div>
                              </article>
                    </>
          )
}
