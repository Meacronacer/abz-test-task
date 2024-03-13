import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: [],
    isLoading: false,
    currentPage: 1,
    totalPage: null,
    newUser: 0
}


const users = createSlice({
    name: 'usersSlice',
    initialState: initialState,
    reducers: {
        setData: (state, action) => {
            state.data.push(...action.payload.users)
            state.totalPage = action.payload.total_pages
        },
        cleanData: (state) => {
            state.data = []
            state.currentPage = 1
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setNewUser: (state, action) => {
            state.newUser += action.payload
        }
    }
})

export const { setData, cleanData, setLoading, setCurrentPage, setNewUser } = users.actions
export default users.reducer
