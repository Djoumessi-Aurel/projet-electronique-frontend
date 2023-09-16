import React, { useState } from "react"
import Modal from "react-modal"
import axios from 'axios'
import './CreateClasseModal.css'
import { useDispatch } from "react-redux";
import { addClass } from "../../features/classes";
import { API } from "../../static";

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


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const CreateClasseModal = ({
  IsOpen,
  afterOpen,
  close
}) => {
  
    const [requestOK, setRequestOK] = useState("") //Le résultat de la requête en cas de réussite
    const [requestFail, setRequestFail] = useState("") //Le résultat de la requête en cas d'échec
    const [nom, setNom] = useState('')
    const [salle, setSalle] = useState('')

    const dispatch = useDispatch()

    const createClasse = (e)=>{e.preventDefault()
        axios.post(API + 'classe/store', {
            nom, salle
          }, {headers: {'Authorization': 'Basic '+ localStorage.getItem('token')}})
          .then(function (response) {
            // console.log(response);
            dispatch(addClass(response.data.content))
            close() //On ferme la boîte de dialogue
            setRequestFail('')
          })
          .catch(function (error) {
            setRequestFail(error.response.data.message)
          });
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
        <h2>Créer une classe</h2>
        
        <form className="createModal">
          <div>
            <label htmlFor="nom">Nom</label>
            <input type="text" name="nom" id="nom" value={nom} onChange={(e)=>setNom(e.currentTarget.value)} />
          </div>
          <div>
            <label htmlFor="salle">Salle</label>
            <input type="text" name="salle" id="salle" value={salle} onChange={(e)=>setSalle(e.currentTarget.value)} />
          </div>
          <div className="ok">
            {requestOK}
          </div>
          <div className="fail">
            {requestFail}
          </div>
          <div>
            <button onClick={createClasse} >Créer</button>
            <button onClick={close}>Fermer</button>
          </div>
        </form>
      </Modal>
    </div>
  );

};

export default CreateClasseModal;
