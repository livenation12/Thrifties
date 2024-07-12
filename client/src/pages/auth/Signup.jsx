import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LockIcon, LockKeyholeIcon, User2Icon, EyeOffIcon, EyeIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { userSignup } from '@/store/features/user/userSlice'
import { useToast } from '@/components/ui/use-toast'
import { statusState } from '@/store/features/utils'

export default function Signup() {
  const { toast } = useToast()
  const signupDefaultValue = {
    username: '',
    password: '',
    cpassword: ''
  }
  const [signupData, setSignupData] = useState(signupDefaultValue)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const { status } = useSelector(state => state.users)
  const dispatch = useDispatch()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const { password, cpassword } = signupData
    if (password === cpassword) {
      dispatch(userSignup(signupData))
    } else {
      toast({
        variant: 'destructive',
        title: "Mismatch!",
        description: "Passwords do not match"
      })
    }
  }
  useEffect(() => {
    if (status === statusState.succeeded) {
      setSignupData(signupDefaultValue)
    }
  }, [status])

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
      <Button type="submit" loading={status === statusState.loading}>Signup</Button>
    </form>
  )
}
