import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import useFetch from '@/hooks/useFetch'
import { EyeIcon, EyeOffIcon, LockIcon, User2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function Login() {
  const { login } = useAuth()
  const { toast } = useToast()
  const defaultLoginValue = {
    username: '',
    password: ''
  }
  const [loginData, setLoginData] = useState(defaultLoginValue)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const { status, data, error } = await useFetch('/users/login', {
        body: loginData,
        method: "POST"
      })
      toast({
        title: status ? "Logged in" : "Failed",
        variant: !status ? "destructive" : "",
        description: error || data.message
      })
      if (data) {
        login(data.data)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  const showPassword = () => {
    setIsPasswordShown(!isPasswordShown)
  }

  return (
    <form className='flex flex-col px-10 py-8 gap-3' onSubmit={handleLogin}>
      <Input startIcon={<User2Icon />} name="username" value={loginData.username} onChange={handleChange} placeholder="Enter username" />
      <Input className="group" startIcon={<LockIcon />}
        endIcon={
          isPasswordShown ?
            <EyeOffIcon className='hidden group-hover:inline' onClick={showPassword} />
            :
            <EyeIcon className='hidden group-hover:inline' onClick={showPassword} />
        }
        type={isPasswordShown ? 'text' : 'password'}
        name="password" value={loginData.password} onChange={handleChange} placeholder="Enter password" />
      <Button type="submit" loading={isLoading}>Login</Button>
    </form>
  )
}
