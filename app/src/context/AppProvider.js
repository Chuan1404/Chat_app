import React, { createContext, useContext, useMemo, useState } from 'react'
import useFirebase from '../hooks/useFirebase'
import { AuthContext } from './AuthProvider'

export const AppContext = createContext()

export default function AppProvider({ children }) {
    const { user: { uid } } = useContext(AuthContext)
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
    const [isInviteMember, setIsInviteMember] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState('')

    const roomsCondition = useMemo(() => {
        return {
            fielName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid])
    const rooms = useFirebase('rooms', roomsCondition)
    const selectedRoom = useMemo(
        () => rooms.find(room => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId]
    )
    const userCondition = useMemo(() => {
        return {
            fielName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members
        }
    }, [selectedRoom.members])
    const members = useFirebase('users', userCondition)
    return (
        <AppContext.Provider value={{
            rooms,
            members,
            isAddRoomVisible,
            setIsAddRoomVisible,
            selectedRoomId,
            setSelectedRoomId,
            selectedRoom,
            isInviteMember,
            setIsInviteMember
        }}>
            {children}
        </AppContext.Provider>
    )
}
