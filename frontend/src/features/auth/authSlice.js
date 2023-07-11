// Core
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Utils
import { client } from '../../utils/apiClient'

export const login = createAsyncThunk('auth/login', async (requestBody) => {
    const response = await client.post('/auth/login', JSON.stringify(requestBody), { headers: { 'Content-Type': 'application/json' } })

    return response.data.data
})

const initialState = {
    status: 'idle',
    data: '',
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            state.data = action.payload
        },
        logout: (state) => {
            state.data = ''
            document.cookie = "elo-ranker_session=''; Max-Age=0;"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
                document.cookie = `elo-ranker_session=${action.payload}; Max-Age=${60 * 60 * 31 * 24}; SameSite=None; Secure`
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { setAuthData, logout } = authSlice.actions

export default authSlice.reducer
