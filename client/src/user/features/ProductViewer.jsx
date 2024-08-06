import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { staticProductImageUrl } from '@/admin/features/products/data/data';
import { Button } from '@/components/ui/button';
import { ShoppingBasket, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useDispatch } from 'react-redux';
import { addToBag } from '@/store/features/product/bagSlice';
import { useProducts } from '@/contexts/ProductProvider';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useToast } from '@/components/ui/use-toast';


export const ProductTemplate = ({ product }) => {

          return (
                    <>
                              <div className='relative'>
                                        <img
                                                  className="object-cover max-h-[300px] h-full aspect-square"
                                                  src={`${staticProductImageUrl}/${product.file.filename}`}
                                                  alt={product.title}
                                        />
                                        {
                                                  product.totalPercentDiscount > 0 && <div className='absolute bg-yellow-300 top-1 -right-2 text-xs px-2 text-muted-foreground py-1'>{product.totalPercentDiscount}% off</div>
                                        }
                              </div>

                              <div className='flex flex-col w-full my-10 mx-10 gap-y-3 text-sm text-muted-foreground px-5'>
                                        <p className='font-semibold text-3xl text-black'>{product.title}</p>
                                        <div className='ms-2 space-y-2'>
                                                  <span className=''>{product.condition} | {product.size}</span>
                                                  <p className=''>{product.intendedFor}</p>
                                                  <p className=''>{product.brand}</p>
                                                  <p className=''>{product.materialUsed}</p>
                                                  <p className='text-lg text-yellow-600'>₱ {product.price}</p>
                                                  <p className=''>{product.issue}</p>
                                        </div>
                              </div>
                    </>
          )
}

export default function ProductViewer() {
          const { toast } = useToast()
          const { state: { product } } = useLocation();
          const location = useLocation();
          const navigate = useNavigate();
          const [isExiting, setIsExiting] = useState(false);
          const dispatch = useDispatch()
          const { bag } = useProducts();
          const [userData] = useLocalStorage('userData', null)
          const handleGoToParent = () => {
                    // Start the exit transition
                    setIsExiting(true);
                    // Navigate after a delay to allow the transition to complete
                    setTimeout(() => {
                              // Split the current path and remove the last segment
                              const currentPath = location.pathname;
                              const parentPath = currentPath.split('/').slice(0, -1).join('/');
                              navigate(parentPath);
                    }, 500); // Delay must match the CSS transition duration
          };
          const addToUserBag = async (productId) => {
                    try {
                              if (!userData) {
                                        navigate('/auth')
                                        toast({
                                                  title: 'Please login first',
                                        })
                                        return;
                              }
                              const payload = {
                                        userId: userData.userId,
                                        productId
                              }
                              const addToUserBagResponse = await dispatch(addToBag(payload)).unwrap();
                              if (addToUserBagResponse) {
                                        toast({
                                                  title: addToUserBagResponse.message
                                        })
                              }
                    } catch (error) {
                              toast({
                                        variant: 'destructive',
                                        title: error
                              })
                    }
          }

          return (
                    <>
                              <div
                                        className={`grid grid-cols-2 h-[300px] justify-items-center shadow-lg mt-4 relative transition-opacity duration-500 ${isExiting ? 'animate-fadeOut' : ''}`}
                              >
                                        <div className="absolute bottom-5 right-10 w-28">
                                                  <Button onClick={() => addToUserBag(product._id)} size='sm' className="bg-yellow-600 rounded-full hover:bg-yellow-600/80">
                                                            <ShoppingBasket className='me-2' /> Add
                                                  </Button>

                                        </div>
                                        <Button variant='ghost' onClick={handleGoToParent} size='sm' className='absolute top-2 right-2'>
                                                  <X className='size-5' />
                                        </Button>
                                        <ProductTemplate product={product} />
                              </div>
                              <Separator className="my-5" />
                    </>
          );
}
