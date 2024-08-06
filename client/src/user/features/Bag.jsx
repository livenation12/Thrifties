import { useProducts } from '@/contexts/ProductProvider';
import React, { useCallback, useState } from 'react';
import { ProductTemplate } from './ProductViewer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2Icon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToTotal, removeFromBag, removeToTotal } from '@/store/features/product/bagSlice';
import { toast } from '@/components/ui/use-toast';

export default function Bag() {
          const { bag } = useProducts();
          const { userData } = useAuth();
          const dispatch = useDispatch();
          const [deletingItemId, setDeletingItemId] = useState(null);
          const handleRemoveItemFromBag = async (productId, price) => {
                    console.log(productId);

                    try {
                              setDeletingItemId(productId);
                              setTimeout(async () => {
                                        const deletedItem = await dispatch(removeFromBag(productId)).unwrap();
                                        if (deletedItem) {
                                                  dispatch(removeToTotal(price));
                                        }
                              }, 500); // Match this timeout to your animation duration
                    } catch (error) {
                              toast({
                                        title: error,
                              });
                    }
          };
          console.log(bag.list);



          const handleCheckboxChange = (event, price,) => {

                    if (event.target.checked) {
                              dispatch(addToTotal(price));
                    } else {
                              dispatch(removeToTotal(price));
                    }
          };


          const renderCheckoutItems = useCallback(() => {
                    const checkedoutItems = bag.list.filter((item) => bag.checkoutItemIds.includes(item._id));
                    if (bag.checkoutItemIds.length > 0 || checkedoutItems.length > 0) {
                              return (<p>
                                        Please checkout your items!
                              </p>)
                    }
                    return ;
          }, [bag.checkoutItemIds])

          const renderProductTemplates = useCallback(() => {
                    if (!userData) {
                              return <div className="flex flex-col justify-center items-center gap-y-5 mt-10">
                                        <ShoppingBag className="size-28" />
                                        <p>
                                                  You need to login to view your bag.{' '}
                                                  <Link to={'/auth'} className="italic underline text-blue-600">
                                                            Click me to login
                                                  </Link>
                                        </p>

                              </div>
                    }
                    if (bag.list.length === 0) {
                              return <p className='text-lg text-muted-foreground italic opacity-85 self-center my-10'>Your bag is empty! Start shopping and checkout amazing and affordable thrifts</p>;
                    }
                    return bag.list.map((item, index) => (
                              <div
                                        key={index}
                                        className={`grid lg:grid-flow-row lg:grid-cols-2 overflow-hidden hover:shadow-lg justify-items-center relative ${deletingItemId === item._id ? 'animate-fadeOut' : ''}`}
                              >
                                        <div className='absolute bottom-3 right-3 space-x-3'>
                                                  <Button
                                                            size="sm"
                                                            className="text-destructive hover:text-destructive/90"
                                                            variant="outline"
                                                            onClick={() => handleRemoveItemFromBag(item._id, item.productId.price)}
                                                  >
                                                            <Trash2Icon />
                                                  </Button>
                                        </div>
                                        <input onChange={(e) => handleCheckboxChange(e, item.productId.price, item._id)} type="checkbox" className="size-5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 absolute left-10 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                        <ProductTemplate key={item.productId._id} product={item.productId} />
                              </div>
                    ));
          }, [bag.list.length, deletingItemId]);

          return (
                    <div className="container min-h-[70vh] flex flex-col gap-y-5 px-28 py-5">
                              {renderProductTemplates()}
                              {bag.list.length > 0 && <div className='flex items-center gap-x-5 py-3 px-3 text-white bg-yellow-600 sticky bottom-0'>
                                        <Button variant="secondary">Checkout</Button>
                                        <p>Total: ₱ {bag.totalCheckout}</p>
                              </div>}
                              {renderCheckoutItems()}
                    </div>

          );
}
