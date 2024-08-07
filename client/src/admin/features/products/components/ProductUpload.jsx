// hooks
import { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// icons
import { MessageCircleWarning, Package, PackageOpen, UploadIcon, ShirtIcon } from 'lucide-react';

// components
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogTitle } from '@radix-ui/react-dialog';
import { createProduct } from '@/store/features/product/productSlice';
import { productGender } from '../data/data';
import { useProducts } from '@/contexts/ProductProvider';
import { useToast } from '@/components/ui/use-toast';



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
     const RequiredField = useRef()
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
                                   <CardHeader className="flex justify-center items-center">
                                        <a href={preview} target="_blank" rel="noopener noreferrer">
                                             <img
                                                  src={preview}
                                                  alt={file.name}
                                                  className="h-32 object-cover rounded-lg"
                                             />
                                        </a>
                                        <hr />
                                   </CardHeader>
                                   <CardContent className="space-y-1">
                                        <div className='relative'>
                                             <span className='text-destructive absolute -left-1 transform -translate-x-full top-1/2 -translate-y-1/2 text-2xl'>*</span>
                                             <Input onChange={(e) => onValueChange(e.target.value, "title", index)} placeholder="Title" endIcon={<ShirtIcon />} />
                                        </div>
                                        <div className='relative'>
                                             <span className='text-destructive absolute -left-1 transform -translate-x-full top-1/2 -translate-y-1/2 text-2xl'>*</span>
                                             <select defaultValue="" className='w-full h-10 rounded p-3 bg-white text-sm text-slate-500' onChange={(e) => onValueChange(e.target.value, "category", index)}>
                                                  <option value="">--Select category--</option>
                                                  {
                                                       categories && categories.list.map((item, index) => (
                                                            <option key={index} value={item.category}>{item.category}</option>
                                                       ))
                                                  }
                                             </select>
                                        </div>
                                        <div className='relative'>
                                             <span className='text-destructive absolute -left-1 transform -translate-x-full top-1/2 -translate-y-1/2 text-2xl'>*</span>
                                             <select defaultValue="" className='w-full h-10 rounded p-3 bg-white text-sm text-slate-500' onChange={(e) => onValueChange(e.target.value, "condition", index)}>
                                                  <option value="">--Select condition--</option>
                                                  {
                                                       conditions && conditions.list.map((item, index) => (
                                                            <option key={index} value={item.condition}>{item.condition}</option>
                                                       ))
                                                  }
                                             </select>
                                        </div>
                                        <select defaultValue="" className='w-full h-10 rounded p-3 bg-white text-sm text-slate-500' onChange={(e) => onValueChange(e.target.value, "gender", index)}>
                                             <option value="">--Select Gender--</option>
                                             {
                                                  productGender && productGender.map((gender, index) => (
                                                       <option key={index} value={gender}>{gender}</option>
                                                  ))
                                             }
                                        </select>
                                        <div className='relative'>
                                             <span className='text-destructive absolute -left-1 transform -translate-x-full top-1/2 -translate-y-1/2 text-2xl'>*</span>
                                             <Input onChange={(e) => onValueChange(e.target.value, "size", index)} placeholder="Size" />
                                        </div>
                                        <Input onChange={(e) => onValueChange(e.target.value, "brand", index)} placeholder="Brand" />
                                        <Input onChange={(e) => onValueChange(e.target.value, "materialUsed", index)} placeholder="Material used" />
                                        <div className='relative'>
                                             <span className='text-destructive absolute -left-1 transform -translate-x-full top-1/2 -translate-y-1/2 text-2xl'>*</span>
                                             <Input onChange={(e) => onValueChange(e.target.value, "price", index)} name="price" placeholder="Price" type="number" required />
                                        </div>
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
     const { toast } = useToast()
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

     const handleProductFileUpload = async (e) => {
          e.preventDefault()
          let isValid = true;
          console.log(files);
          files.forEach((item) => {
               if (!item.category || !item.condition || !item.price || !item.title || !item.size) {
                    isValid = false;
               }
          });

          if (!isValid) {
               toast({
                    title: "Validation Error",
                    description: "Please fill in all required fields (category, condition, gender, price).",
                    variant: "destructive",
               });
               return;
          }
          const data = new FormData();
          files.forEach((item) => {
               data.append('files', item.file);
               data.append('products', JSON.stringify(item));
          });

          const createdProduct = dispatch(createProduct(data));
          if (createdProduct) {
               setFiles([]);
               toast({
                    title: "Uploaded successfully"
               })
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
                              <DialogDescription className="italic">Only supported files are allowed to be uploaded. ex(jpg, jpeg, png)</DialogDescription>
                         </DialogHeader>
                         <form onSubmit={handleProductFileUpload}>
                              <ProductsFilePreview files={files} onValueChange={onValueChange} />
                              <DialogFooter className="flex justify-between gap-2">
                                   <Button variant="secondary" type="button" onClick={() => setFiles([])}>Close</Button>
                                   <Button type="submit">Upload</Button>
                              </DialogFooter>
                         </form>
                    </DialogContent>
               </Dialog>
          </>
     );
};
