import { Spin } from 'antd';
import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';



export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { pathname } = useLocation()

    useEffect(() => {
        setIsLoading(true)

        let unsubscribed = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName, email, uid, photoURL
                })
                setIsLoading(false)
                navigate('/')
                return;
            }
            setIsLoading(false)
            navigate('/login')
        })

        return () => {
            unsubscribed()
        }
    }, [pathname])



    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    )
}
