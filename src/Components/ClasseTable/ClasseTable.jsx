import React from 'react'
import { renderToString } from 'react-dom/server'
import { useState } from 'react'
import './ClasseTable.css'
import CreateClasseModal from './CreateClasseModal'
import UpdateClasseModal from './UpdateClasseModal'
import DeleteClasseModal from './DeleteClasseModal'
import { useEffect } from 'react'
import axios from 'axios'

const API = " https://projet-electronique-backend-production.up.railway.app/api/"

const ClasseTable = ()=>{

    const [searchText, setSearchText] = useState("")
    const [TimeTable, setTimeTable] = useState([])
    

    const updateTable = ()=>{
            axios.get(API + 'classe/all')
          .then(function (response) {//console.log(response.data)
            setTimeTable(response.data)
            localStorage.setItem("nbClasses", response.data.length)
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
        return value.nom.toLowerCase().includes(searchText.toLowerCase()) || 
        value.salle.toLowerCase().includes(searchText.toLowerCase())
    })

    const classeTag = TimeTableFiltered
    .map((TimeTable, index) => <tr key={index}>
    <td>{index + 1}</td>
    <td>{TimeTable.nom}</td>
    <td>{TimeTable.salle}</td>
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
                   <th>Nom</th>
                   <th>Salle</th>
                   <th>Actions</th>
                </tr>    
            </thead>

            <tbody>
                {classeTag}
            </tbody>

        </table>

        <CreateClasseModal IsOpen={createModalIsOpen} afterOpen={afterOpenCreateModal} 
        close={closeCreateModal} updateTable={updateTable} />
        
        {selectedIndex > -1 &&   (<UpdateClasseModal IsOpen={updateModalIsOpen} afterOpen={afterOpenUpdateModal} 
        close={closeUpdateModal} updateTable={updateTable} data = {TimeTableFiltered[selectedIndex]} />)}
        {selectedIndex > -1 &&   (<DeleteClasseModal IsOpen={deleteModalIsOpen} afterOpen={afterOpenDeleteModal} 
        close={closeDeleteModal} updateTable={updateTable} data = {TimeTableFiltered[selectedIndex]} />)}

    </div>
    
)

function printContent() {

    const tableContent = TimeTableFiltered
    .map((TimeTable, index) => <tr key={index}>
    <td>{index + 1}</td>
    <td>{TimeTable.nom}</td>
    <td>{TimeTable.salle}</td>
</tr>)

    const toPrint = (<div className="tableau">
        <table>
        <thead>
                <tr>
                   <th>id</th>
                   <th>Nom</th>
                   <th>Salle</th>
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
    a.document.write('<body ><h1>Classes</h1>');
    a.document.write(renderToString(toPrint));
    a.document.write('</body></html>');
    a.document.close();
    a.print();
}


}


export default ClasseTable