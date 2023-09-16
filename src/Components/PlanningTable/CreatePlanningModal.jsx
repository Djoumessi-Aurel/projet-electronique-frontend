import React from "react";
import Modal from "react-modal";
import axios from 'axios'
import './CreatePlanningModal.css'
import { useState } from "react";
import moment from "moment/moment";
import { jours, API } from '../../static'
import { useDispatch, useSelector } from "react-redux";
import { addPlanning } from "../../features/planning";

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

function getDate(timeString){
    let tab = timeString.split(':')
    return moment({hour: Number(tab[0]), minute: Number(tab[1])}).toDate()
}


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const CreatePlanningModal = ({
  IsOpen,
  afterOpen,
  close
}) => {
  
    const [requestOK, setRequestOK] = useState("") //Le résultat de la requête en cas de réussite
    const [requestFail, setRequestFail] = useState("") //Le résultat de la requête en cas d'échec
    const [jourSemaine, setJourSemaine] = useState(1)
    const [hFin, setHFin] = useState("10:00")
    const [hDebut, setHDebut] = useState("08:00")

    const listeCours = useSelector(state => state.cours.array)
    const [cours, setCours] = useState(listeCours.length? listeCours[0]._id : '')

    const dispatch = useDispatch()

    const createPlanning = (e)=>{e.preventDefault()
        axios.post(API + 'planning/store', {
            jourSemaine: jourSemaine,
            heureDebut: getDate(hDebut),
            heureFin: getDate(hFin),
            cours: cours
          }, {headers: {'Authorization': 'Basic '+ localStorage.getItem('token')}})
          .then(function (response) {
            //console.log(response.data.content);
            dispatch(addPlanning(response.data.content)) //On actualise nos données
            close() //On ferme la boîte de dialogue
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
        <h2>Créer une plage pour un cours</h2>
        
        <form className="createModal">
          <div>
            <label htmlFor="joursemaine">Jour</label>
            <select name="joursemaine" id="joursemaine" value={jourSemaine} onChange={(e)=>setJourSemaine(e.currentTarget.value)}>
                {jours.map((value, index)=>
                    <option key={index} value={index+1}>{value}</option>
                )}
            </select>
          </div>
          <div>
            <label htmlFor="heuredebut">Heure début</label>
            <input type="time" name="heuredebut" id="heuredebut" value={hDebut} onChange={(e)=>setHDebut(e.currentTarget.value)} />
          </div>
          <div>
            <label htmlFor="heurefin">Heure fin</label>
            <input type="time" name="heurefin" id="heurefin" value={hFin} onChange={(e)=>setHFin(e.currentTarget.value)} />
          </div>
          <div>
            <label htmlFor="cours">Cours</label>
            <select name="cours" id="cours" onChange={(e)=>setCours(e.currentTarget.value)}>
                {listeCours.map((value, index)=>
                    <option key={index} value={value._id}>{value.code + ' - ' + value.nom}</option>
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
            <button onClick={createPlanning} >Créer</button>
            <button onClick={close}>Fermer</button>
          </div>
        </form>
      </Modal>
    </div>
  );

};

export default CreatePlanningModal;
