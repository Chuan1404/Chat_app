import React, { createContext, useContext, useMemo } from 'react'
import useFirebase from '../hooks/useFirebase'
import { AuthContext } from './AuthProvider'

export const AppContext = createContext()

export default function AppProvider({ children }) {
    const { user: { uid } } = useContext(AuthContext)

    const roomsCondition = useMemo(() => {
        return {
            fielName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid])
    const rooms = useFirebase('rooms', roomsCondition)

    console.log(rooms)
    return (
        <AppContext.Provider value={{ rooms }}>
            {children}
        </AppContext.Provider>
    )
}
