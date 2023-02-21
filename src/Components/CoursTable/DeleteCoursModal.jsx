import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from 'axios'
import './CreateCoursModal.css'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const API = " https://projet-electronique-backend-production.up.railway.app/api/"
const listeSemestres = [1, 2]

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const DeleteCoursModal = ({
  IsOpen,
  afterOpen,
  close, updateTable, data
}) => {
  
    const [requestOK, setRequestOK] = useState("") //Le résultat de la requête en cas de réussite
    const [requestFail, setRequestFail] = useState("") //Le résultat de la requête en cas d'échec
    const [code, setCode] = useState(data.code)
    const [nom, setNom] = useState(data.nom)
    const [classeId, setClasseId] = useState(data.classe._id)
    const [listeClasses, setListeClasses] = useState([])
    const [semestre, setSemestre] = useState(data.semestre)
    
    useEffect(()=>{
        axios.get(API + 'classe/all')
      .then(function (response) {
        setListeClasses(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
    }, [])

    const deleteCours = (e)=>{e.preventDefault()
        axios.delete(API + 'cours/delete/' + data._id)
          .then(function (response) {
            // console.log(response);
            updateTable() //On actualise nos données
            close() //On ferme la boîte de dialogue
            setCode(''); setNom('');
            setRequestFail('')
          })
          .catch(function (error) {
            setRequestFail(error.message)
          });
        // console.log(jourSemaine, getDate(hDebut), getDate(hFin), cours)
      }

  return (
    <div>
      <Modal
        isOpen={IsOpen}
        onAfterOpen={afterOpen}
        onRequestClose={close}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="red">Voulez-vous vraiment supprimer ce cours?</h2>
        
        <form className="createModal">
          <div>
            <label htmlFor="code">Code</label>
            <input type="text" name="code" id="code" value={code} onChange={(e)=>setCode(e.currentTarget.value)} disabled />
          </div>
          <div>
            <label htmlFor="nom">Nom</label>
            <input type="text" name="nom" id="nom" value={nom} onChange={(e)=>setNom(e.currentTarget.value)} disabled />
          </div>
          <div>
            <label htmlFor="classe">Classe</label>
            <select name="classe" id="classe" value={classeId} onChange={(e)=>setClasseId(e.currentTarget.value)} disabled>
                {listeClasses.map((value, index)=>
                    <option key={index} value={value._id}>{value.nom}</option>
                )}
            </select>
          </div>
          <div>
            <label htmlFor="semestre">Semestre</label>
            <select name="semestre" id="semestre" value={semestre} onChange={(e)=>setSemestre(e.currentTarget.value)} disabled>
                {listeSemestres.map((value, index)=>
                    <option key={index} value={value}>{value}</option>
                )}
            </select>
          </div>
          <div className="ok">
            {requestOK}
          </div>
          <div className="fail">
            {requestFail}
          </div>
          <div>
            <button onClick={deleteCours} >Supprimer</button>
            <button onClick={close}>Fermer</button>
          </div>
        </form>
      </Modal>
    </div>
  );

};

export default DeleteCoursModal;
