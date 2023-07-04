// Core
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'

// Utils
import { client } from '../../utils/apiClient'

export const fetchRankings = createAsyncThunk('rankings/fetchRankings', async () => {
	const response = await client.get('/rankings', { headers: { 'Content-Type': 'application/json' } })
	return response.data.data
})

// TODO: handle file upload / multipart-form-data POST

export const updateRanking = createAsyncThunk('rankings/updateRanking', async (requestBody, { getState }) => {
	const state = getState()
	await client.put(`/rankings/${requestBody.id}`, requestBody, { headers: { Authorization: `Bearer ${state.auth.data}` } })

	return requestBody
})

export const deleteRanking = createAsyncThunk('rankings/deleteRanking', async (id, { getState }) => {
	const state = getState()
	await client.delete(`/rankings/${id}`, { headers: { Authorization: `Bearer ${state.auth.data}`, 'Content-Type': 'application/json' } })

	return id
})

const rankingsAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.name.localeCompare(b.name)
})

export const {
	selectAll: selectAllRankings,
	selectById: selectRankingById
} = rankingsAdapter

const initialState = rankingsAdapter.getInitialState({
	status: 'idle',
	error: null
})

const rankingsSlice = createSlice({
	name: 'rankings',
	initialState,
	reducers: {},
	extraReducers: (builder) => {

	}
})

export default rankingsSlice.reducer