import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../static'

const initialState = {
    status: 'idle',
    array: [],
  }

export const getAdmin = createAsyncThunk('admin/getAdmin', async () => {
    const response = await axios.get(API + 'admin/all', {headers: {'Authorization': 'Basic '+ localStorage.getItem('token')}})
    return response.data
  })

  const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        addAdmin(state, action){
            state.array.push(action.payload)
          },
        updateAdmin(state, action){
            let index = state.array.findIndex((value) => value._id === action.payload._id)
            if(index !== -1) state.array[index] = action.payload
          },
        deleteAdmin(state, action){
            state.array = state.array.filter((value) => value._id !== action.payload)
          }
    },
    extraReducers: builder => {
      builder
        .addCase(getAdmin.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getAdmin.fulfilled, (state, action) => {
          state.array = action.payload
          state.status = 'loaded'
        })
        .addCase(getAdmin.rejected, (state, action) => {
            state.status = 'idle'
        })
        
    }
  })
  
export const { addAdmin, updateAdmin, deleteAdmin } = adminSlice.actions

export default adminSlice.reducer
