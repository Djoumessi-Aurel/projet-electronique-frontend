import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// const API = " https://projet-electronique-backend-production.up.railway.app/api/"
const API = " http://localhost:8080/api/"

const initialState = {
    status: 'idle',
    array: [],
    requestFail: '',
    operationCompleted: false  //Indique si l'opération s'est bien terminée (si c'est le cas on peut fermer la boîte de dialogue)
  }

export const getClasses = createAsyncThunk('classes/getClasses', async () => {
    const response = await axios.get(API + 'classe/all')
    return response.data
  })

export const addClass = createAsyncThunk('classes/addClass', async (classe) => {
    const {nom, salle} = classe
    const response = await axios.post(API + 'classe/store', {nom, salle})
    return response.data.content
    })

export const updateClass = createAsyncThunk('classes/updateClass', async (classe) => {
    const {id, nom, salle} = classe
    const response = await axios.put(API + 'classe/update', {id, nom, salle})
    return response.data.content
    })

export const deleteClass = createAsyncThunk('classes/deleteClass', async (id) => {
    await axios.delete(API + 'classe/delete/' + id)
    return id
    })

  const classesSlice = createSlice({
    name: 'classes',
    initialState,
    reducers: {
        operationCompleted(state, action) {
            state.operationCompleted = true
        },
        operationBegan(state, action) {
            state.operationCompleted = false
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
          state.requestFail = ''
        })
        .addCase(getClasses.rejected, (state, action) => {
            state.status = 'idle'
            state.requestFail = action.error.message
          })
        .addCase(addClass.fulfilled, (state, action) => {
          state.array.push(action.payload)
          state.requestFail = ''
        })
        .addCase(addClass.rejected, (state, action) => {
            state.requestFail = action.error.message
        })
        .addCase(updateClass.fulfilled, (state, action) => {
          let index = state.array.findIndex((value) => value._id === action.payload._id)
          if(index !== -1) state.array[index] = action.payload
          state.requestFail = ''
        })
        .addCase(updateClass.rejected, (state, action) => {
            state.requestFail = action.error.message
        })
        .addCase(deleteClass.fulfilled, (state, action) => {
          state.array = state.array.filter((value) => value._id !== action.payload)
          state.requestFail = ''
        })
        .addCase(deleteClass.rejected, (state, action) => {
            state.requestFail = action.error.message
        })
    }
  })
  
export const { operationCompleted, operationBegan } = classesSlice.actions

export default classesSlice.reducer
