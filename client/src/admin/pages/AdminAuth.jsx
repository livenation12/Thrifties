import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import UMartLogo from './../../assets/logo-dark.png'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon, HandshakeIcon, LockKeyholeOpenIcon } from 'lucide-react'
import { useState } from 'react'
import useFetch from '@/hooks/useFetch'
import { useNavigate } from 'react-router-dom'

export default function AdminAuth() {
        const navigate = useNavigate()
        const [loginData, setLoginData] = useState({
                email: '',
                password: ''
        })
        const [showPassword, setShowPassword] = useState(false)
        const handleShowPassword = () => {
                setShowPassword(!showPassword)
        }

        const handleSubmit = async (e) => {
                e.preventDefault()
                const response = await useFetch('/admin/auth/login', { body: loginData, method: 'POST' })
                if (response) {
                        navigate('/admin')
                }
        }

        const handleLoginChange = (e) => {
                const { name, value } = e.target
                setLoginData({ ...loginData, [name]: value })
        }
        return (
                <div className='min-h-[100vh] bg-slate-500 flex flex-col justify-center items-center'>
                        <Card className="w-[500px] bg-slate-300">
                                <CardHeader>
                                        <CardTitle className="flex items-center">

                                                <img src={UMartLogo} alt="" className="object-cover h-56 w-56" />
                                                <p className='text-5xl mt-3'>Admin</p>
                                        </CardTitle>
                                </CardHeader>
                                <form onSubmit={handleSubmit} method="post">
                                        <CardContent className="space-y-3">

                                                <Input onChange={handleLoginChange}
                                                        startIcon={<HandshakeIcon />}
                                                        placeholder="Email"
                                                        name="email" />
                                                <Input onChange={handleLoginChange}
                                                        startIcon={<LockKeyholeOpenIcon />}
                                                        endIcon={showPassword ? <EyeOffIcon className='hidden group-hover:inline' onClick={handleShowPassword} /> : <EyeIcon onClick={handleShowPassword} className='hidden group-hover:inline' />}
                                                        type={showPassword ? 'text' : 'password'}
                                                        className="group"
                                                        placeholder="Password"
                                                        name="password" />

                                        </CardContent>
                                        <CardFooter>
                                                <Button className="w-full">Login</Button>
                                        </CardFooter>
                                </form>
                        </Card>
                </div>
        )
}
