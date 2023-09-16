import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../static'

const initialState = {
    status: 'idle',
    array: [],
  }

export const getClasses = createAsyncThunk('classes/getClasses', async () => {
    const response = await axios.get(API + 'classe/all', {headers: {'Authorization': 'Basic '+ localStorage.getItem('token')}})
    return response.data
  })

  const classesSlice = createSlice({
    name: 'classes',
    initialState,
    reducers: {
        addClass(state, action){
            state.array.push(action.payload)
          },
        updateClass(state, action){
            let index = state.array.findIndex((value) => value._id === action.payload._id)
            if(index !== -1) state.array[index] = action.payload
          },
        deleteClass(state, action){
            state.array = state.array.filter((value) => value._id !== action.payload)
          }
    },
    extraReducers: builder => {
      builder
        .addCase(getClasses.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getClasses.fulfilled, (state, action) => {
          state.array = action.payload
          state.status = 'loaded'
        })
        .addCase(getClasses.rejected, (state, action) => {
            state.status = 'idle'
        })
        
    }
  })
  
export const { addClass, updateClass, deleteClass } = classesSlice.actions

export default classesSlice.reducer
