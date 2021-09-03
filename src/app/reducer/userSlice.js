import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userName: null,
    userEmail: null,
    userPhoto: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveUser: (state, action) => {
            state.userName = action.payload.userName
            state.userEmail = action.payload.userEmail
            state.userPhoto = action.payload.userPhoto
        },
        setUserLogOutState: (state) => {
            state.userName = null
            state.userEmail = null
            state.userPhoto = null
        }
    }
});

export const { setActiveUser, setUserLogOutState } = userSlice.actions

export const selectUserName = state => state.user.userName
export const selectUserEmail = state => state.user.userEmail
export const selectUserPhoto = state => state.user.userPhoto

export default userSlice.reducer