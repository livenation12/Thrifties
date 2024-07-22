
import { useAuth } from '@/hooks/useAuth';
import logo from './../../assets/logo.png'
import { Separator } from '@/components/ui/separator';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Link, NavLink, useNavigate, useParams, } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, LogOutIcon, ShoppingCart, User } from 'lucide-react';
import { useProducts } from '@/contexts/ProductProvider';
import { Button } from '@/components/ui/button';
import { statusState } from '@/store/features/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useCallback } from 'react';

/**
 * BaseNav component renders the navigation bar at the top of the page.
 * It displays the log,o categories, user dropdown, and authentication links.
 *
 * @return {JSX.Element} The rendered navigation bar.
 */
export default function BaseNav() {
          // Extract necessary data and functions from React hooks
          const param = useParams()
          const [activeTab, setActiveTab] = useLocalStorage('activeAuthTab', 'login')
          const navigate = useNavigate()
          const { categories } = useProducts()
          const { userData, logout } = useAuth()

          // Define callback functions for handling user authentication and logout
          const handleAuthClick = useCallback((active) => {
                    setActiveTab(active)
                    navigate('/auth')
          }, [navigate, setActiveTab])

          const handleLogoutClick = useCallback(() => {
                    logout()
          }, [logout])

          /**
           * Render the category navigation bar.
           * If categories are loading, display a skeleton loader.
           * Otherwise, render a list of categories with links to their respective pages.
           * If there are more than 4 categories, display a dropdown menu with the remaining categories.
           *
           * @return {JSX.Element} The rendered category navigation bar.
           */
          const renderCategoryNav = useCallback(() => {
                    if (categories.status === statusState.loading) {
                              return <Skeleton className="h-5 w-48" />
                    }

                    const categoriesList = categories.list
                              .slice(0, 4)
                              .map((item, index) => (
                                        <NavLink key={index} to={`${item.category.toLowerCase()}`}>
                                                  <li className={param.category === item.category.toLowerCase() ? 'underline' : ''}>
                                                            {item.category}
                                                  </li>
                                        </NavLink>
                              ))

                    const moreCategories = categories.list
                              .slice(4)
                              .map((item, index) => (
                                        <DropdownMenuItem key={index}>{item.category}</DropdownMenuItem>
                              ))

                    return (
                              <ul className='gap-x-5 lg:gap-x-8 category-nav md:flex justify-center items-center w-1/5 lg:w-1/3 hidden'>
                                        <NavLink to="new" className="new-link">
                                                  <li>New</li>
                                        </NavLink>
                                        {categoriesList}
                                        {moreCategories.length > 0 && (
                                                  <>
                                                            <DropdownMenu>
                                                                      <DropdownMenuTrigger asChild>
                                                                                <li>More <ChevronDown className='inline w-4' /></li>
                                                                      </DropdownMenuTrigger>
                                                                      <DropdownMenuContent>
                                                                                <DropdownMenuLabel>Other categories</DropdownMenuLabel>
                                                                                <DropdownMenuSeparator />
                                                                                {moreCategories}
                                                                      </DropdownMenuContent>
                                                            </DropdownMenu>
                                                  </>
                                        )}
                              </ul>
                    )
          }, [categories, param])

          /**
           * Render the user dropdown menu.
           * If the user is logged in, display their avatar and a dropdown menu with profile and logout options.
           * If the user is not logged in, display signup and login links.
           *
           * @return {JSX.Element} The rendered user dropdown menu.
           */
          const renderUserDropdown = useCallback(() => {
                    if (userData) {
                              return (
                                        <DropdownMenu>
                                                  <DropdownMenuTrigger>
                                                            <Avatar>
                                                                      <AvatarImage />
                                                                      <AvatarFallback className="text-slate-600 text-xl">
                                                                                {userData.charAt(0).toUpperCase()}
                                                                      </AvatarFallback>
                                                            </Avatar>
                                                  </DropdownMenuTrigger>
                                                  <DropdownMenuContent>
                                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>
                                                                      <User className='mr-2 h-4 w-4' />
                                                                      Profile
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={handleLogoutClick}>
                                                                      <LogOutIcon className='mr-2 h-4 w-4' />
                                                                      Logout
                                                            </DropdownMenuItem>
                                                  </DropdownMenuContent>
                                        </DropdownMenu>
                              )
                    }

                    return (
                              <>
                                        <span className='auth-link' onClick={() => handleAuthClick('signup')}>Signup</span>
                                        <Separator orientation="vertical" className="text-black" />
                                        <span className='auth-link' onClick={() => handleAuthClick('login')}>Login</span>
                              </>
                    )
          }, [handleAuthClick, handleLogoutClick, userData])

          return (
                    <>
                              <nav className='sticky top-0 bg-slate-50 z-20'>
                                        <div className='flex justify-between items-center w-full container py-1'>
                                                  <Link to="/">
                                                            <span className='inline-flex items-center gap-1 max-w-36'>
                                                                      <img src={logo} alt="" className="object-cover w-14" />
                                                                      Coralds Thrifts Ilo.
                                                            </span>
                                                  </Link>
                                                  {renderCategoryNav()}
                                                  <div className='mx-10 space-x-3 text-xs md:flex items-center hidden'>
                                                            {renderUserDropdown()}
                                                  </div>
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

