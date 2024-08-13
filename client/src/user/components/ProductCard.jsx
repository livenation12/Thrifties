import React from 'react';
import { staticProductImageUrl } from '@/admin/features/products/data/data';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => {
          const titleLink = product.title.split(' ').join('-').toLowerCase();

          return (
                    <div className='flex flex-col px-2'>
                              <Link to={titleLink} state={{ product }} className='hover:shadow-xl relative'>
                                        <div className='absolute bg-yellow-300 top-1 -right-2 text-xs px-2 text-muted-foreground py-1'>{product.totalPercentDiscount}% off</div>
                                        <img
                                                  className="object-cover h-auto w-full aspect-square"
                                                  src={`${staticProductImageUrl}/${product.file.filename}`}
                                                  alt={product.title}
                                        />
                                        <div className='mx-4 my-2 truncate'>
                                                  <p className='my-1'>{product.title}</p>
                                                  <span className='text-xs text-muted-foreground'>{product.condition} | {product.size}</span>
                                                  <p className='text-sm text-yellow-600'><span className='line-through text-xs text-muted-foreground me-2'>₱ {product.previousPrice}</span>₱ {product.price}</p>
                                        </div>
                                        <Separator />
                              </Link>
                    </div>
          );
};

export default ProductCard;