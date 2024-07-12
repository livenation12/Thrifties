import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import Login from './Login'
import Signup from './Signup'
import useLocalStorage from '@/hooks/useLocalStorage'
import logo from './../../assets/logo.png'


export default function Auth() {
        const [activeTab, setActiveTab] = useLocalStorage('activeAuthTab', 'login')
        return (
                <div className='min-h-[100vh] flex flex-col bg-slate-200'>
                        <div className='z-50 h-[100px] w-full sticky top-0 bg-slate-500 px-20 flex items-center space-x-2'>
                                <img src={logo} alt="" className="object-cover h-full rounded" />
                        </div>
                        <div className='h-[480px] container grid lg:grid-cols-2 justify-center items-center'>
                                <div className='hidden lg:flex justify-center items-center'>

                                        <img src={logo} alt="" className="object-cover h-72 rounded mx-3" />
                                        <span className='opacity-35 text-xl'>Selected and affordable thrifts store</span>
                                </div>
                                <Tabs defaultValue={activeTab} className='relative flex flex-col justify-center bg-slate-400 rounded pt-2 px-2 min-h-[400px] w-[550px]'>
                                        <TabsList className="absolute top-0 left-0 right-0 m-1 bg-slate-200">
                                                <TabsTrigger value="login" className="w-1/2" onClick={() => setActiveTab('login')} >
                                                        Login
                                                </TabsTrigger>
                                                <TabsTrigger value="signup" className="w-1/2" onClick={() => setActiveTab('signup')} >
                                                        Signup
                                                </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value='login'>
                                                <Login />
                                        </TabsContent>
                                        <TabsContent value='signup'>
                                                <Signup />
                                        </TabsContent>
                                </Tabs>
                        </div>
                </div>

        )
}
