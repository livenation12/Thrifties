import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LockIcon, LockKeyholeIcon, User2Icon, EyeOffIcon, EyeIcon } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import useFetch from '@/hooks/useFetch'
export default function Signup() {
  const { toast } = useToast()
  const signupDefaultValue = {
    username: '',
    password: '',
    cpassword: ''
  }
  const [signupData, setSignupData] = useState(signupDefaultValue)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      const { status, data, error } = useFetch('users/signup', { body: signupData, method: "POST" })
      toast({
        title: status ? "Signed up!" : "Failed",
        variant: !status ? "destructive" : "",
        description: error || data.error
      })
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target
    setSignupData({ ...signupData, [name]: value })
  }

  const showPassword = () => {
    setIsPasswordShown(!isPasswordShown)
  }


  return (
    <form className='flex flex-col px-10 py-8 gap-3' onSubmit={handleFormSubmit}>
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
      <Button type="submit" loading={isLoading}>Signup</Button>
    </form>
  )
}
