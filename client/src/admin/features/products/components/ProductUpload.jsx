// hooks
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// icons
import { MessageCircleWarning, Package, PackageOpen, UploadIcon, ShirtIcon } from 'lucide-react';

// components
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogTitle } from '@radix-ui/react-dialog';
import { createProduct } from '@/store/features/product/productSlice';
import { productGender } from '../data/data';
import { useProducts } from '@/contexts/ProductProvider';



export const ProductsDropZone = ({ onFilesAdded }) => {
     const onDrop = useCallback((acceptedFiles) => {
          const imageFiles = acceptedFiles.filter((file) => file.type.startsWith('image/'));
          const filesWithPreviews = imageFiles.map((file) => ({
               file,
               preview: URL.createObjectURL(file),
          }));
          onFilesAdded(filesWithPreviews);
     }, [onFilesAdded]);

     const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

     return (
          <div
               {...getRootProps()}
               className={`border-2 relative text-slate-500 border-dashed rounded-lg p-6 text-center shadow-md transition-colors duration-300 cursor-pointer ${isDragActive ? 'bg-gray-200' : 'bg-white'
                    }`}
          >
               <input {...getInputProps()} />

               <span className="absolute top-1 text-xs left-2 inline-flex items-center text-destructive/70">
                    <MessageCircleWarning className="me-1" /> Note: Image files are only accepted (ex. jpeg, png, jpg)
               </span>

               <p className="flex justify-center gap-x-2">
                    {isDragActive ? <PackageOpen /> : <Package />}
                    Drag & Drop files here or click to select product files
               </p>
          </div>
     );
};

export const ProductsFilePreview = ({ files, onValueChange }) => {
     const { categories, conditions } = useProducts()
     return (
          <div className="mt-4 grid lg:grid-cols-3 gap-2">
               {files.length > 0 && (
                    <>
                         {files.map(({ file, preview }, index) => (
                              <Card key={index}>
                                   <CardHeader>
                                        <a href={preview} target="_blank" rel="noopener noreferrer">
                                             <img
                                                  src={preview}
                                                  alt={file.name}
                                                  className="w-full h-32 object-cover rounded-lg"
                                             />
                                        </a>
                                        <hr />
                                   </CardHeader>
                                   <CardContent className="space-y-1">
                                        <Input onChange={(e) => onValueChange(e.target.value, "title", index)} placeholder="Title" endIcon={<ShirtIcon />} />
                                        <select defaultValue="" className='w-full h-10 rounded p-3 bg-white text-sm text-slate-500' onChange={(e) => onValueChange(e.target.value, "category", index)}>
                                             <option value="">--Select category--</option>
                                             {
                                                  categories && categories.list.map((item, index) => (
                                                       <option key={index} value={item.category}>{item.category}</option>
                                                  ))
                                             }
                                        </select>
                                        <select defaultValue="" className='w-full h-10 rounded p-3 bg-white text-sm text-slate-500' onChange={(e) => onValueChange(e.target.value, "condition", index)}>
                                             <option value="">--Select condition--</option>
                                             {
                                                  conditions && conditions.list.map((item, index) => (
                                                       <option key={index} value={item.condition}>{item.condition}</option>
                                                  ))
                                             }
                                        </select>
                                        <select defaultValue="" className='w-full h-10 rounded p-3 bg-white text-sm text-slate-500' onChange={(e) => onValueChange(e.target.value, "gender", index)}>
                                             <option value="">--Select Gender--</option>
                                             {
                                                  productGender && productGender.map((gender, index) => (
                                                       <option key={index} value={gender}>{gender}</option>
                                                  ))
                                             }
                                        </select>                                        
                                        <Input onChange={(e) => onValueChange(e.target.value, "size", index)} placeholder="Size" />
                                        <Input onChange={(e) => onValueChange(e.target.value, "brand", index)} placeholder="Brand" />
                                        <Input onChange={(e) => onValueChange(e.target.value, "usage", index)} placeholder="Usage" />
                                        <Input onChange={(e) => onValueChange(e.target.value, "materialUsed", index)} placeholder="Material used" />
                                        <Input onChange={(e) => onValueChange(e.target.value, "price", index)} name="price" placeholder="Price" type="number" required />
                                        <Textarea onChange={(e) => onValueChange(e.target.value, "issue", index)} placeholder="Place product issue here" />
                                   </CardContent >
                              </Card >
                         ))}
                    </>
               )}
          </div >
     );
};

export const ProductUpload = () => {

     const dispatch = useDispatch()
     const [files, setFiles] = useState([]);
     const handleFilesAdded = (newFiles) => {
          setFiles((prev) => [...prev, ...newFiles]); //add the selected files on dropzone
     };

     const onValueChange = (value, fieldName, index) => {
          setFiles((prev) =>
               prev.map((item, i) => //find the item index
                    i === index ? { ...item, [fieldName]: value } : item //in that index add the changes
               )
          );
     };

     const handleProductFileUpload = async () => {
          const data = new FormData();
          files.forEach((item) => {
               data.append('files', item.file);
               data.append('products', JSON.stringify(item));
          });

          const createdProduct = dispatch(createProduct(data));
          if (createdProduct) {
               setFiles([]);
          }
     };


     return (
          <>
               <ProductsDropZone onFilesAdded={handleFilesAdded} />
               <Dialog open={files.length > 0}>
                    <DialogContent hasClose={false} className="max-h-[700px] min-w-[80%] overflow-auto">
                         <DialogHeader>
                              <DialogTitle>
                                   <div className="inline-flex gap-2">
                                        <UploadIcon /> <span>Upload Products</span>
                                   </div>
                              </DialogTitle>
                         </DialogHeader>
                         <ProductsFilePreview files={files} onValueChange={onValueChange} />
                         <DialogFooter className="flex justify-between gap-2">
                              <Button variant="secondary" onClick={() => setFiles([])}>Close</Button>
                              <Button onClick={handleProductFileUpload}>Upload</Button>
                         </DialogFooter>
                    </DialogContent>
               </Dialog>
          </>
     );
};
