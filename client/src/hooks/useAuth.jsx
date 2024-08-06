import React, { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from './useLocalStorage'
import { useDispatch } from 'react-redux'
import { clearBag } from '@/store/features/product/bagSlice'

const AuthContext = createContext()

export function AuthProvider({ children }) {
        const navigate = useNavigate()
        const [userData, setUserData] = useLocalStorage('userData', null)
        const dispatch = useDispatch()
        const login = async (data) => {
                setUserData(data)
                navigate('/')
        }

        const logout = () => {
                setUserData(null)
                dispatch(clearBag())
        }

        const accumulatedData = useMemo(() => ({
                login, logout, userData
        }), [userData])

        return <AuthContext.Provider value={accumulatedData}>
                {children}
        </AuthContext.Provider>
}

export const useAuth = () => {
        return useContext(AuthContext)
}