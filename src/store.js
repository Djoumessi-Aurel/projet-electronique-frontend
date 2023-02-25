import { configureStore } from '@reduxjs/toolkit'
import classesReducer from './features/classes'
import coursReducer from './features/cours'
import planningReducer from './features/planning'

export const store = configureStore({
  reducer: {
    classes: classesReducer,
    cours: coursReducer,
    planning: planningReducer,
  }
})