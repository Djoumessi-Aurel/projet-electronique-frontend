import React, { useEffect } from 'react'
import './App.css';
import { Home, Enrol, Course, Class, Admin, Planning, Presence, Index, Login } from './Routes'
import { Routes, Route} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getClasses } from './features/classes';
import { getCours } from './features/cours';
import { getPlanning } from './features/planning';


function App() {
  
  const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getClasses())
        dispatch(getCours())
        dispatch(getPlanning())
    }, [])


  return (
    <div className="App">
      <Routes>
        <Route path='/' element ={<Index/>}/>
        <Route path='/login' element ={<Login/>}/>
        <Route path='/accueil' element={<Home/>}/>
        <Route path='/etudiant' element = {<Enrol/>}/>
        <Route path='/classe' element = {<Class/>}/>
        <Route path='/cours' element = {<Course/>}/>
        <Route path='/admin' element = {<Admin/>}/>
        <Route path='/planning' element = {<Planning/>}/>
        <Route path='/présence' element = {<Presence/>}/>
      </Routes>
    </div>
  );
}

export default App;
