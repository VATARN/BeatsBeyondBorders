import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        userSelected: "None",
        genreSelected: "None",
        searchString: ""
    },
    reducers: {
        setUserSelected: (state, action) => {
            state.userSelected = action.payload;
        },
    },
})

export const { setUserSelected } = appSlice.actions

export default appSlice.reducer