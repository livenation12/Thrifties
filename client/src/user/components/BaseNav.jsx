
import { useAuth } from '@/hooks/useAuth';
import logo from './../../assets/logo.png'
import { Separator } from '@/components/ui/separator';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, LogOutIcon, ShoppingCart, User } from 'lucide-react';
import { useProducts } from '@/contexts/ProductProvider';
import { Button } from '@/components/ui/button';


export default function BaseNav() {
          const [activeTab, setActiveTab] = useLocalStorage('activeAuthTab', 'login')
          const navigate = useNavigate()
          const { categories } = useProducts()
          const { userData, logout } = useAuth()

          const handleAuthClick = (active) => {
                    setActiveTab(active)
                    navigate('/auth')
          }
          const handleLogoutClick = () => {
                    console.log('clicked');
                    logout()
          }
          return (
                    <>
                              <nav className='sticky top-0 bg-slate-50 z-20'>
                                        <div className='flex justify-between items-center w-full container py-1'>
                                                  <span className='inline-flex items-center gap-1 max-w-36'>
                                                            <img src={logo} alt="" className="object-cover w-14" />
                                                            Coralds Thrifts Ilo.
                                                  </span>
                                                  {/* for medium to larger screens */}
                                                  <ul className='gap-x-5 lg:gap-x-8 category-nav md:flex justify-center items-center w-1/5 lg:w-1/3 hidden'>
                                                            <li>New</li>
                                                            {categories.list.slice(0, 4).map((category, index) => (

                                                                      <li key={index}>{category.category}</li>
                                                            ))}
                                                            {
                                                                      categories.list.length > 4 &&
                                                                      (
                                                                                <DropdownMenu>
                                                                                          <DropdownMenuTrigger asChild>
                                                                                                    <li className=''>More <ChevronDown className='inline w-4' /></li>
                                                                                          </DropdownMenuTrigger>
                                                                                          <DropdownMenuContent>
                                                                                                    <DropdownMenuLabel>
                                                                                                              Other categories
                                                                                                    </DropdownMenuLabel>
                                                                                                    <DropdownMenuSeparator />
                                                                                                    {categories.list.slice(4).map((item, index) => (
                                                                                                              <DropdownMenuItem key={index}>
                                                                                                                        {item.category}
                                                                                                              </DropdownMenuItem>
                                                                                                    ))
                                                                                                    }
                                                                                          </DropdownMenuContent>
                                                                                </DropdownMenu>
                                                                      )
                                                            }
                                                  </ul>
                                                  {/* for medium to larger screens */}
                                                  <div className='mx-10 space-x-3 text-xs md:flex items-center hidden'>
                                                            {userData ?
                                                                      <DropdownMenu>
                                                                                <DropdownMenuTrigger>
                                                                                          <Avatar>
                                                                                                    <AvatarImage />
                                                                                                    <AvatarFallback className="text-slate-600 text-xl">P</AvatarFallback>
                                                                                          </Avatar>
                                                                                </DropdownMenuTrigger>
                                                                                <DropdownMenuContent>
                                                                                          <DropdownMenuLabel>
                                                                                                    My Account
                                                                                          </DropdownMenuLabel>
                                                                                          <DropdownMenuSeparator />
                                                                                          <DropdownMenuItem>
                                                                                                    <User className='mr-2 h-4 w-4' />
                                                                                                    Profile
                                                                                          </DropdownMenuItem>
                                                                                          <DropdownMenuItem onClick={handleLogoutClick} >
                                                                                                    <LogOutIcon className='mr-2 h-4 w-4' />
                                                                                                    Logout
                                                                                          </DropdownMenuItem>
                                                                                </DropdownMenuContent>
                                                                      </DropdownMenu>
                                                                      :
                                                                      <>
                                                                                <span className='auth-link' onClick={() => handleAuthClick('signup')}>Signup</span>
                                                                                <Separator orientation="vertical" className="text-black" />
                                                                                <span className='auth-link' onClick={() => handleAuthClick('login')}>Login</span>
                                                                      </>
                                                            }
                                                  </div>
                                                  {/* shown for smaller screens */}
                                                  <div className='md:hidden me-5 inline-flex justfiy-center items-center gap-x-3'>
                                                            <DropdownMenu>
                                                                      <DropdownMenuTrigger className='text-sm inline-flex items-center gap-x-1'>
                                                                                <span>Products</span> <ChevronDown className='size-3' />
                                                                      </DropdownMenuTrigger>
                                                                      <DropdownMenuContent className="text-xs">
                                                                                {categories.list.map((item, index) => (
                                                                                          <DropdownMenuItem key={index}>
                                                                                                    {item.category}
                                                                                          </DropdownMenuItem>
                                                                                ))}
                                                                      </DropdownMenuContent>
                                                            </DropdownMenu>
                                                            <Button variant="ghost" size="icon" className="rounded-full space-x-1">
                                                                      <User className='size-4' /><ChevronDown className='size-3' />
                                                            </Button>
                                                  </div>
                                        </div>

                              </nav>

                    </>
          )
}

