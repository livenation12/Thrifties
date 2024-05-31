import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/useFetch'
import { LockIcon, LockKeyholeIcon, User2Icon, EyeOffIcon, EyeIcon } from 'lucide-react'

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false)

  const signupDefaultValue = {
    username: '',
    password: '',
    cpassword: ''
  }
  const [signupData, setSignupData] = useState(signupDefaultValue)
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const signup = await useFetch('/auth/signup', { body: signupData, method: 'POST' })
    if (signup) {
      setSignupData(signupDefaultValue)
    }
    setIsLoading(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSignupData({ ...signupData, [name]: value })
  }

  const showPassword = () => {
    setIsPasswordShown(!isPasswordShown)
  }


  return (
    <form className='flex flex-col px-10 py-8 gap-5' onSubmit={handleFormSubmit}>
      <Input startIcon={<User2Icon />} value={signupData.username} name="username" placeholder="Enter username" onChange={handleChange} required />
      <Input startIcon={<LockIcon />}
        endIcon={
          isPasswordShown ?
            <EyeOffIcon onClick={showPassword} />
            :
            <EyeIcon onClick={showPassword} />
        }
        type={isPasswordShown ? 'text' : 'password'}
        value={signupData.password} name="password" placeholder="Enter password" onChange={handleChange} required />
      <Input startIcon={<LockKeyholeIcon />}
        type={isPasswordShown ? 'text' : 'password'}
        value={signupData.cpassword} name="cpassword" placeholder="Confirm password" onChange={handleChange} required />
      <Button type="submit" isLoading={isLoading} loadingText="Signing up">Signup</Button>
    </form>
  )
}
