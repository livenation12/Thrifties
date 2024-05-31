
import './App.css'
import { useAuth } from './hooks/useAuth'
import UMartLogo from './assets/logo.png'
import { Separator } from './components/ui/separator';
import useLocalStorage from './hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './components/ui/dropdown-menu';
import { LogOutIcon, Search, User } from 'lucide-react';
import { Input } from './components/ui/input';
function App() {
  const [activeTab, setActiveTab] = useLocalStorage('activeAuthTab', 'login')
  const navigate = useNavigate()
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
    <div className='min-h-[100vh] flex flex-col bg-slate-200 max-w-[100vw]'>
      <div className='z-50 h-[100px] flex w-full sticky top-0 bg-slate-500 py-3'>
        <div className='container flex justify-between items-center h-full'>
          <img src={UMartLogo} alt="" className="object-cover h-36 mb-3" />
          <Input startIcon={<Search />} placeholder='Search...' />
          <div className='mx-10 space-x-3 text-xs flex items-center h-4'>
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
              <><span className='hover:text-white cursor-pointer' onClick={() => handleAuthClick('signup')}>Signup</span>
                <Separator orientation="vertical" />
                <span className='hover:text-white cursor-pointer' onClick={() => handleAuthClick('login')}>Login</span></>
            }
          </div>
        </div>
      </div>
      <div className='container space-y-3 mt-2 text-slate-500'>
        <span className='font-medium '>Categories</span>
        <Separator className="bg-slate-300" orientation="horizontal" />
        <span className='font-medium'>Products</span>
        <Separator className="bg-slate-300" orientation="horizontal" />
        <span className='font-medium'>Deals</span>
        <Separator className="bg-slate-300" orientation="horizontal" />
      </div>
    </div>
  )
}

export default App
