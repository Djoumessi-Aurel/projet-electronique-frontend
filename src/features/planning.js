import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../static'

const initialState = {
    status: 'idle',
    array: [],
  }

export const getPlanning = createAsyncThunk('planning/getPlanning', async () => {
    const response = await axios.get(API + 'planning/', {headers: {'Authorization': 'Basic '+ localStorage.getItem('token')}})
    return response.data
  })

  const planningSlice = createSlice({
    name: 'planning',
    initialState,
    reducers: {
        addPlanning(state, action){
            state.array.push(action.payload)
          },
        updatePlanning(state, action){
            let index = state.array.findIndex((value) => value._id === action.payload._id)
            if(index !== -1) state.array[index] = action.payload
          },
        deletePlanning(state, action){
            state.array = state.array.filter((value) => value._id !== action.payload)
          }
    },
    extraReducers: builder => {
      builder
        .addCase(getPlanning.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getPlanning.fulfilled, (state, action) => {
          state.array = action.payload
          state.status = 'loaded'
        })
        .addCase(getPlanning.rejected, (state, action) => {
            state.status = 'idle'
        })
        
    }
  })
  
export const { addPlanning, updatePlanning, deletePlanning } = planningSlice.actions

export default planningSlice.reducer
