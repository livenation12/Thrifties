import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import useFetch from '@/hooks/useFetch'
import { EyeIcon, EyeOffIcon, LockIcon, User2Icon } from 'lucide-react'
import React, { useState } from 'react'

export default function Login() {
  const defaultLoginValue = {
    username: '',
    password: ''
  }
  const [loginData, setLoginData] = useState(defaultLoginValue)
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const { login } = useAuth()

  const handleLogin = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    const loginResult = await useFetch('/auth/login', { body: loginData, method: 'POST' })
    if (loginResult) {
      setLoginData(defaultLoginValue)
      login(loginResult.data)
    }
    setIsLoading(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  const showPassword = () => {
    setIsPasswordShown(!isPasswordShown)
  }

  return (
    <form className='flex flex-col px-10 py-8 gap-6' onSubmit={handleLogin}>
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
      <Button type="submit" isLoading={isLoading} loadingText="Logging in">Login</Button>
    </form>
  )
}
