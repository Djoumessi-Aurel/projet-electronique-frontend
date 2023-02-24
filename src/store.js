import { configureStore } from '@reduxjs/toolkit'
import classesReducer from './features/classes'

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    classes: classesReducer,
  }
})