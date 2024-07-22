import React from 'react';
import { staticProductImageUrl } from '@/admin/features/products/data/data';
import { Separator } from '@/components/ui/separator';
const ProductCard = ({ product }) => {

          return (
                    <div className='flex flex-col px-2'>
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
                              <Separator className='my-2' />
                    </div>
          );
};

export default ProductCard;