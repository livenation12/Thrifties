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
import { Dialog, DialogTitle, DialogDescription, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { staticProductImageUrl } from '@/admin/features/products/data/data';
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

          const handleCheckboxChange = (event, price, itemIds) => {
                    if (event.target.checked) {
                              dispatch(addToTotal({ price, itemIds }));
                    } else {
                              dispatch(removeToTotal({ price, itemIds }));
                    }
          };


          const renderCheckoutItems = useCallback(() => {
                    const checkedoutItems = bag.list.filter((item) => bag.checkoutItemIds.includes(item._id)).map(item => item.productId);
                    if (bag.checkoutItemIds.length === 0 || checkedoutItems.length === 0) {
                              return (<p className='text-muted-foreground'>
                                        Please select item/s first
                              </p>)
                    }
                    return (
                              <>

                                        <DialogDescription>
                                                  Please fill all the required information for pickup details
                                                  <span className='block text-yellow-600 text-xs'>Note: Only available payment method is available</span>
                                        </DialogDescription>
                                        <div className="flex min-w-full h-28 overflow-x-auto space-x-4 p-4">
                                                  {checkedoutItems.map((item) => (
                                                            <img
                                                                      key={item._id}
                                                                      className="object-cover max-h-[300px] h-full aspect-square"
                                                                      src={`${staticProductImageUrl}/${item.file.filename}`}
                                                                      alt={item.title}
                                                            />
                                                  ))}
                                        </div>
                                        <p className='text-yellow-800 underline'>Total: ₱ {bag.totalCheckout}</p>
                                        <form className='space-y-2'>
                                                  <div>
                                                            <label htmlFor="pickupDate">Date and time</label>
                                                            <Input id="pickupDate" name="pickupDate" type="date" required />
                                                  </div>
                                                  <div>
                                                            <label htmlFor="pickupTime">Time (HH-MM-AM)</label>
                                                            <Input id="pickupTime" name="pickupTime" type="time" required />
                                                  </div>
                                                  <div>
                                                            <label htmlFor="paymentMethod">Payment Method</label>
                                                            <Select id="paymentMethod" name="paymentMethod">
                                                                      <SelectTrigger>
                                                                                <SelectValue placeholder="Select a fruit" />
                                                                      </SelectTrigger>
                                                                      <SelectContent>
                                                                                <SelectGroup>
                                                                                          <SelectLabel>Methods</SelectLabel>
                                                                                          <SelectItem value="Cash">Cash</SelectItem>
                                                                                          <SelectItem value="Gcash">Gcash</SelectItem>
                                                                                </SelectGroup>
                                                                      </SelectContent>
                                                            </Select>
                                                  </div>
                                                  <div>
                                                            <Button type="submit" className="float-end">Submit</Button>
                                                  </div>
                                        </form>
                              </>
                    )
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
                    <div className="min-h-[70vh] flex flex-col gap-y-5 md:px-10 lg:px-28 py-5">
                              {renderProductTemplates()}
                              {bag.list.length > 0 &&
                                        <div className='flex flex-wrap gap-y-2 items-center gap-x-5 py-3 px-3 text-white bg-yellow-600 sticky bottom-0'>
                                                  <Dialog>
                                                            <DialogTrigger asChild>
                                                                      <Button variant="secondary">Pickup Orders</Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="">
                                                                      <DialogTitle>Pickup Orders</DialogTitle>
                                                                      {renderCheckoutItems()}
                                                            </DialogContent>
                                                  </Dialog>
                                                  <div className='inline-flex gap-x-2 flex-wrap text-black'>
                                                            <span>Total: ₱ {bag.totalCheckout}</span>
                                                            <Separator orientation="vertical" />
                                                            <span># Items: {bag.checkoutItemIds.length}</span>
                                                  </div>
                                        </div>}
                    </div>

          );
}
