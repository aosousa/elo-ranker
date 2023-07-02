// Core
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

// Utils
import { client } from '../../utils/apiClient';

export const fetchRankings = createAsyncThunk('')