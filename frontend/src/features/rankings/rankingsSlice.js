// Core
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'

// Utils
import { client } from '../../utils/apiClient'

export const fetchRankings = createAsyncThunk('rankings/fetchRankings', async () => {
	const response = await client.get('/rankings', { headers: { 'Content-Type': 'application/json' } })
	return response.data.data
})

export const createRanking = createAsyncThunk('rankings/createRanking', async (requestBody, { getState }) => {
	const state = getState()
	const response = await client.post('/rankings', requestBody, { headers: { Authorization: `Bearer ${state.auth.data}` } })
	return response.data.data
})

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

export const { selectAll: selectAllRankings, selectById: selectRankingById } = rankingsAdapter.getSelectors((state) => state.rankings)

const initialState = rankingsAdapter.getInitialState({
	status: 'idle',
	error: null
})

const rankingsSlice = createSlice({
	name: 'rankings',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRankings.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchRankings.fulfilled, (state, action) => {
				state.status = 'succeeded';
				rankingsAdapter.setAll(state, action.payload);
			})
			.addCase(fetchRankings.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createRanking.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(createRanking.fulfilled, (state, action) => {
				state.status = 'succeeded'
				rankingsAdapter.addOne(state, action.payload)
			})
			.addCase(createRanking.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(updateRanking.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(updateRanking.fulfilled, (state, { payload }) => {
				state.status = 'succeeded'

				const { id, ...changes } = payload

				rankingsAdapter.updateOne(state, { id, changes })
			})
			.addCase(updateRanking.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(deleteRanking.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(deleteRanking.fulfilled, (state, action) => {
				state.status = 'succeeded'
				rankingsAdapter.removeOne(state, action.payload)
			})
			.addCase(deleteRanking.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	}
})

export default rankingsSlice.reducer