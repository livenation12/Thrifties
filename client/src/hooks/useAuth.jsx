import React, { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from './useLocalStorage'

const AuthContext = createContext()

export function AuthProvider({ children }) {
        const navigate = useNavigate()
        const [userData, setUserData] = useLocalStorage('userData', null)

        const login = async (data) => {
                setUserData(data)
                navigate('/')
        }

        const logout = () => {
                setUserData(null)
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