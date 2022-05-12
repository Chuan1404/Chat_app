import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        user: {}
    },
    reducers: {
        login(state, action) {
            state.isLogin = true;
            state.user = action.payload
            localStorage.setItem('token', JSON.stringify(action.payload))
        },
        logout(state) {
            state.isLogin = false;
            state.user = {}
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice;