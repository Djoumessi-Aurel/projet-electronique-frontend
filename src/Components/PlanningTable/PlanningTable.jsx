import React from 'react'
import { renderToString } from 'react-dom/server'
import { useState } from 'react'
import './PlanningTable.css'
import CreatePlanningModal from './CreatePlanningModal'
import UpdatePlanningModal from './UpdatePlanningModal'
import DeletePlanningModal from './DeletePlanningModal'
import { useEffect } from 'react'
import axios from 'axios'

const API = " https://projet-electronique-backend-production.up.railway.app/api/"
const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

const PlanningTable = ()=>{

    const [searchText, setSearchText] = useState("")
    const [TimeTable, setTimeTable] = useState([])
    

    const updateTable = ()=>{
            axios.get(API + 'planning/')
          .then(function (response) {//console.log(response.data)
            setTimeTable(response.data)
          })
          .catch(function (error) {
            console.log(error);
          })
        
    }

    useEffect(()=>{
        updateTable()
    }, [])

    const TimeTableFiltered = TimeTable
    .filter((value)=>{
        if(searchText === '') return true
        return jours[value.jourSemaine - 1].toLowerCase().includes(searchText.toLowerCase()) || 
        value.cours.code.toLowerCase().includes(searchText.toLowerCase()) || 
        value.cours.nom.toLowerCase().includes(searchText.toLowerCase())
    })

    const planningTag = TimeTableFiltered
    .map((TimeTable, index) => <tr key={index}>
    <td>{index + 1}</td>
    <td>{jours[TimeTable.jourSemaine - 1]}</td>
    <td>{TimeTable.hDebut}</td>
    <td>{TimeTable.hFin}</td>
    <td>{TimeTable.cours.code} <br/> {TimeTable.cours.nom}</td>
    <td>
        <button onClick={()=>{setSelectedIndex(index); openUpdateModal();}} >modifier</button> <br></br>
        <button onClick={()=>{setSelectedIndex(index); openDeleteModal();}} >supprimer</button>
    </td>
</tr>)

const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
const [selectedIndex, setSelectedIndex] = useState(-1)

    const openCreateModal = ()=> {
        setCreateModalIsOpen(true);
    }
    const openUpdateModal = ()=> {
        setUpdateModalIsOpen(true);
    }
    const openDeleteModal = ()=> {
        setDeleteModalIsOpen(true);
    }
  
    const afterOpenCreateModal = ()=> {
      // references are now sync'd and can be accessed.
    }
    const afterOpenUpdateModal = ()=> {
        // references are now sync'd and can be accessed.
      }
    const afterOpenDeleteModal = ()=> {
    // references are now sync'd and can be accessed.
    }
  
    const closeCreateModal = ()=> {
        setCreateModalIsOpen(false);
    }
    const closeUpdateModal = ()=> {
        setUpdateModalIsOpen(false); setSelectedIndex(-1);
    }
    const closeDeleteModal = ()=> {
        setDeleteModalIsOpen(false); setSelectedIndex(-1);
    }


return (
    <div className="tableau">
        <div className="table-header">
        <button onClick={openCreateModal} >Ajouter</button>
        <header>
            <button onClick={printContent} >Imprimer</button>
            <input type="search" value={searchText} onChange = {(e)=>setSearchText(e.currentTarget.value)} />
            <button>Recherche</button>
        </header>
        </div>
        <table>
            <thead>
                <tr>
                   <th>id</th>
                   <th>JourSemaine</th>
                   <th>HeureDebut</th>
                   <th>HeureFin</th>
                   <th>UE</th>
                   <th>Actions</th>
                </tr>    
            </thead>

            <tbody>
                {planningTag}
            </tbody>

        </table>

        <CreatePlanningModal IsOpen={createModalIsOpen} afterOpen={afterOpenCreateModal} 
        close={closeCreateModal} updateTable={updateTable} />
        
        {selectedIndex > -1 &&   (<UpdatePlanningModal IsOpen={updateModalIsOpen} afterOpen={afterOpenUpdateModal} 
        close={closeUpdateModal} updateTable={updateTable} data = {TimeTableFiltered[selectedIndex]} />)}
        {selectedIndex > -1 &&   (<DeletePlanningModal IsOpen={deleteModalIsOpen} afterOpen={afterOpenDeleteModal} 
        close={closeDeleteModal} updateTable={updateTable} data = {TimeTableFiltered[selectedIndex]} />)}

    </div>
    
)

function printContent() {

    const tableContent = TimeTableFiltered
    .map((TimeTable, index) => <tr key={index}>
    <td>{index + 1}</td>
    <td>{jours[TimeTable.jourSemaine - 1]}</td>
    <td>{TimeTable.hDebut}</td>
    <td>{TimeTable.hFin}</td>
    <td>{TimeTable.cours.code} <br/> {TimeTable.cours.nom}</td>
</tr>)

    const toPrint = (<div className="tableau">
        <table>
        <thead>
            <tr>
               <th>id</th>
               <th>JourSemaine</th>
               <th>HeureDebut</th>
               <th>HeureFin</th>
               <th>codeUE</th>
            </tr>    
        </thead>

        <tbody>
            {tableContent}
        </tbody>

    </table>
    </div>)


    let a = window.open('', '', 'height=650, width=900');
    let head = document.querySelector("head").outerHTML
    a.document.write('<html>');
    a.document.write(head);
    a.document.write('<body ><h1>Planning des cours</h1>');
    a.document.write(renderToString(toPrint));
    a.document.write('</body></html>');
    a.document.close();
    a.print();
}


}


export default PlanningTable