import React, { useEffect } from 'react'
import './App.css';
import { Home, Enrol, Course, Class, Admin, Planning, Presence, Index, Login } from './Routes'
import { Routes, Route} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getClasses } from './features/classes';
import { getCours } from './features/cours';
import { getPlanning } from './features/planning';
import { getAdmin } from './features/admin';
import { getEtudiant } from './features/etudiant';


function App() {
  
  const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getClasses())
        dispatch(getCours())
        dispatch(getPlanning())
        dispatch(getAdmin())
        dispatch(getEtudiant())
    }, [])


  return (
    <div className="App">
      <div>
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
      <footer>
        &copy; igea 2023
      </footer>
    </div>
  );
}

export default App;
