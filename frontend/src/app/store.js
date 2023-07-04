import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import rankingsReducer from '../features/rankings/rankingsSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		rankings: rankingsReducer
	}
})
