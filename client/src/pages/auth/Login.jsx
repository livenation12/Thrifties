import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { userLogin } from '@/store/features/user/userSlice'
import { statusState } from '@/store/features/utils'
import { EyeIcon, EyeOffIcon, LockIcon, User2Icon } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Login() {
  const defaultLoginValue = {
    username: '',
    password: ''
  }
  const [loginData, setLoginData] = useState(defaultLoginValue)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const { status, user } = useSelector(state => state.users)
  console.log(user);
  const dispatch = useDispatch()
  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(userLogin(loginData))
  }

  useEffect(() => {
    if (status === statusState.succeeded) {
      setLoginData(defaultLoginValue)
    }
  }, [status])

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
      <Button type="submit" loading={status === statusState.loading}>Login</Button>
    </form>
  )
}
