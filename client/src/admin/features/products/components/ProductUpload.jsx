//hooks
import useFetch from '@/hooks/useFetch'
import { useState, useCallback } from 'react'
import { FetchProvider, useFetchContext } from '@/hooks/useFetchContext';
import { useDropzone } from 'react-dropzone';

//icons
import { MessageCircleWarning, Package, PackageOpen, UploadIcon, ShirtIcon } from 'lucide-react';

//components
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { SelectCategory } from './Categories';
import { SelectCondition } from './Conditions';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DialogTitle } from '@radix-ui/react-dialog';

export const ProductsDropZone = ({ onFilesAdded }) => {
          const onDrop = useCallback((acceptedFiles) => {
                    const imageFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));
                    const filesWithPreviews = imageFiles.map(file => ({
                              file,
                              preview: URL.createObjectURL(file)
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

                              <span className='absolute top-1 text-xs left-2 inline-flex items-center text-destructive/70'>
                                        <MessageCircleWarning className='me-1' /> Note: Image files are only accepted (ex. jpeg, png, jpg)
                              </span>

                              <p className='flex justify-center gap-x-2'>
                                        {
                                                  isDragActive ? <PackageOpen /> : <Package />

                                        }
                                        Drag & Drop files here or click to select product files</p>
                    </div>
          );
};

export const ProductsFilePreview = ({ files, onValueChange }) => {
          const fetchConditions = async () => {
                    return await useFetch('/conditions', {})
          }
          const fetchCategories = async () => {
                    return await useFetch('/categories', {})
          }
          return (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                              {files.length > 0 && (
                                        <>
                                                  {files.map(({ file, preview }, index) => (
                                                            <Card key={index}>
                                                                      <CardHeader>
                                                                                <a href={preview} target='_blank'>
                                                                                          <img
                                                                                                    src={preview}
                                                                                                    alt={file.name}
                                                                                                    className="w-full h-32 object-cover rounded-lg"
                                                                                          />
                                                                                </a>
                                                                                <hr />
                                                                      </CardHeader>
                                                                      <CardContent className="grid grid-cols-2 gap-1">
                                                                                <Input onChange={(e) => onValueChange(e.target.value, "title", index)} className="col-span-2" placeholder="Title" endIcon={<ShirtIcon />} />
                                                                                <div className='col-span-2'>
                                                                                          <FetchProvider request={fetchCategories}>
                                                                                                    <SelectCategory onValueChange={(value) => onValueChange(value, "category", index)} />
                                                                                          </FetchProvider>
                                                                                </div>
                                                                                <div className='col-span-2'>
                                                                                          <FetchProvider request={fetchConditions}>
                                                                                                    <SelectCondition onValueChange={(value) => onValueChange(value, "condition", index)} />
                                                                                          </FetchProvider>
                                                                                </div>

                                                                                <Select onValueChange={(value) => onValueChange(value, "size", index)}>
                                                                                          <SelectTrigger>
                                                                                                    <SelectValue placeholder="Size" />
                                                                                          </SelectTrigger>
                                                                                          <SelectContent>
                                                                                                    <SelectGroup>
                                                                                                              <SelectItem value="Extra Small">Extra Small</SelectItem>
                                                                                                              <SelectItem value="Small">Small</SelectItem>
                                                                                                              <SelectItem value="Medium">Medium</SelectItem>
                                                                                                              <SelectItem value="Large">Large</SelectItem>
                                                                                                              <SelectItem value="Extra Large">Extra Large</SelectItem>
                                                                                                              <SelectItem value="XXL">XXL</SelectItem>
                                                                                                    </SelectGroup>
                                                                                          </SelectContent>
                                                                                </Select>
                                                                                <Select onValueChange={(value) => onValueChange(value, "gender", index)}>
                                                                                          <SelectTrigger>
                                                                                                    <SelectValue placeholder="Gender" />
                                                                                          </SelectTrigger>
                                                                                          <SelectContent>
                                                                                                    <SelectGroup>
                                                                                                              <SelectItem value="Girls">Girls</SelectItem>
                                                                                                              <SelectItem value="Boys">Boys</SelectItem>
                                                                                                              <SelectItem value="Unisex">Unisex</SelectItem>
                                                                                                              <SelectItem value="Men">Men</SelectItem>
                                                                                                              <SelectItem value="Women">Women</SelectItem>
                                                                                                    </SelectGroup>
                                                                                          </SelectContent>
                                                                                </Select>
                                                                                <Input onChange={(e) => onValueChange(e.target.value, "brand", index)} placeholder="Brand" />
                                                                                <Input onChange={(e) => onValueChange(e.target.value, "usage", index)} placeholder="Usage" />
                                                                                <Input onChange={(e) => onValueChange(e.target.value, "materialUsed", index)} placeholder="Material used" />
                                                                                <Input onChange={(e) => onValueChange(e.target.value, "price", index)} name="price" placeholder="Price" type="number" required />
                                                                                <Textarea onChange={(e) => onValueChange(e.target.value, "issue", index)} className="col-span-2" placeholder="Place product issue here" />
                                                                      </CardContent>
                                                            </Card>

                                                  ))}
                                        </>
                              )}
                    </div>
          );
};


export const ProductUpload = () => {
          const [files, setFiles] = useState([]);
          const { refreshFetchedData } = useFetchContext()

          const handleFilesAdded = (newFiles) => {
                    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
          };

          const onValueChange = (value, fieldName, index) => {
                    setFiles((prev) =>
                              prev.map((item, i) =>
                                        i === index ? { ...item, [fieldName]: value } : item
                              )
                    );
          };

          const handleProductFileUpload = async () => {
                    const data = new FormData();
                    files.forEach((item) => {
                              data.append('files', item.file);
                              data.append('products', JSON.stringify(item))
                    });
                    const upload = await useFetch('/products', { body: data, method: "POST" })
                    if (upload) {
                              setFiles([])
                              refreshFetchedData()
                    }
          };
          return (
                    <>
                              <ProductsDropZone onFilesAdded={handleFilesAdded} />
                              <Dialog open={files.length > 0 ? true : false}>
                                        <DialogContent hasClose={false} className="max-h-[700px] min-w-[80%] overflow-auto">
                                                  <DialogHeader>
                                                            <DialogTitle>
                                                                      <div className='inline-flex gap-2'>    <UploadIcon /> <span>Upload Products</span></div>
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
          )

}