// Core
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'

// Types
import { Ranking } from '../../types/Ranking'

// Utils
import { client } from '../../utils/apiClient'

export const fetchRankings = createAsyncThunk('rankings/fetchRankings', async () => {
  const response = await client.get('/rankings', { headers: { 'Content-Type': 'application/json' } })
  return response.data.data
})

export const createRanking = createAsyncThunk('rankings/createRanking', async (requestBody: FormData, { getState }) => {
  const state: any = getState()
  const response = await client.post('/rankings', requestBody, { headers: { Authorization: `Bearer ${state.auth.data}` } })
  return response.data.data
})

export const updateRanking = createAsyncThunk('rankings/updateRanking', async (requestBody: { id: number; name: string; ranking: string }, { getState }) => {
  const state: any = getState()

  await client.put(`/rankings/${requestBody.id}`, JSON.stringify(requestBody), { headers: { Authorization: `Bearer ${state.auth.data}`, 'Content-Type': 'application/json' } })

  return requestBody
})

export const deleteRanking = createAsyncThunk('rankings/deleteRanking', async (id: number, { getState }) => {
  const state: any = getState()
  await client.delete(`/rankings/${id}`, { headers: { Authorization: `Bearer ${state.auth.data}`, 'Content-Type': 'application/json' } })

  return id
})

const rankingsAdapter = createEntityAdapter({
  sortComparer: (a: Ranking, b: Ranking) => a.name.localeCompare(b.name)
})

export const { selectAll: selectAllRankings, selectById: selectRankingById } = rankingsAdapter.getSelectors((state: any) => state.rankings)

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
        state.status = 'loading'
      })
      .addCase(fetchRankings.fulfilled, (state, action) => {
        state.status = 'succeeded'
        rankingsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchRankings.rejected, (state, action: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createRanking.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createRanking.fulfilled, (state, action: any) => {
        state.status = 'succeeded'
        rankingsAdapter.addOne(state, action.payload)
      })
      .addCase(createRanking.rejected, (state, action: any) => {
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
      .addCase(updateRanking.rejected, (state, action: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteRanking.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteRanking.fulfilled, (state, action: any) => {
        state.status = 'succeeded'
        rankingsAdapter.removeOne(state, action.payload)
      })
      .addCase(deleteRanking.rejected, (state, action: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default rankingsSlice.reducer
