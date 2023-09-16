import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../static'

const initialState = {
    status: 'idle',
    array: [],
  }

export const getCours = createAsyncThunk('cours/getCours', async () => {
    const response = await axios.get(API + 'cours/all', {headers: {'Authorization': 'Basic '+ localStorage.getItem('token')}})
    return response.data
  })

  const coursSlice = createSlice({
    name: 'cours',
    initialState,
    reducers: {
        addCours(state, action){
            state.array.push(action.payload)
          },
        updateCours(state, action){
            let index = state.array.findIndex((value) => value._id === action.payload._id)
            if(index !== -1) state.array[index] = action.payload
          },
        deleteCours(state, action){
            state.array = state.array.filter((value) => value._id !== action.payload)
          }
    },
    extraReducers: builder => {
      builder
        .addCase(getCours.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getCours.fulfilled, (state, action) => {
          state.array = action.payload
          state.status = 'loaded'
        })
        .addCase(getCours.rejected, (state, action) => {
            state.status = 'idle'
        })
        
    }
  })
  
export const { addCours, updateCours, deleteCours } = coursSlice.actions

export default coursSlice.reducer
