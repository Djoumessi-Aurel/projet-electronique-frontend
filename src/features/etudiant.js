import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../static'

const initialState = {
    status: 'idle',
    array: [],
  }

export const getEtudiant = createAsyncThunk('etudiant/getEtudiant', async () => {
    const response = await axios.get(API + 'etudiant/', {headers: {'Authorization': 'Basic '+ localStorage.getItem('token')}})
    return response.data.etudiantList
  })

  const etudiantSlice = createSlice({
    name: 'etudiant',
    initialState,
    reducers: {
        addEtudiant(state, action){
            state.array.push(action.payload)
          },
        updateEtudiant(state, action){
            let index = state.array.findIndex((value) => value._id === action.payload._id)
            if(index !== -1) state.array[index] = action.payload
          },
        validateAllStudents(state, action){
            for(let etudiant of state.array){
                if(etudiant.statut===false) etudiant.statut = true
            }
          },
        validateOneStudent(state, action){ //ici le payload c'est l'id de l'étudiant
            let index = state.array.findIndex((value) => value._id === action.payload)
            if(index !== -1) state.array[index].statut = true
          },
        deleteEtudiant(state, action){
            state.array = state.array.filter((value) => value._id !== action.payload)
          }
    },
    extraReducers: builder => {
      builder
        .addCase(getEtudiant.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getEtudiant.fulfilled, (state, action) => {
          state.array = action.payload
          state.status = 'loaded'
        })
        .addCase(getEtudiant.rejected, (state, action) => {
            state.status = 'idle'
        })
        
    }
  })
  
export const { addEtudiant, updateEtudiant, validateAllStudents, validateOneStudent, deleteEtudiant } = etudiantSlice.actions

export default etudiantSlice.reducer
