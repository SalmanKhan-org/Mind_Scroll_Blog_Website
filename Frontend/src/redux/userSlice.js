import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        user: null,
        loading:false
    },
    reducers: {

        setUser: (state, action) => {
            state.isLoggedIn = true,
            state.user = action.payload;
        },
        removeUser: (state, action) => {
            state.isLoggedIn = false,
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser,setLoading } = userSlice.actions

export default userSlice.reducer