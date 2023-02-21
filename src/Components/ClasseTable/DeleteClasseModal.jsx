import React, { useState } from "react"
import Modal from "react-modal"
import axios from 'axios'
import './CreateClasseModal.css'

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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const DeleteClasseModal = ({
  IsOpen,
  afterOpen,
  close, updateTable, data
}) => {
  
    const [requestOK, setRequestOK] = useState("") //Le résultat de la requête en cas de réussite
    const [requestFail, setRequestFail] = useState("") //Le résultat de la requête en cas d'échec
    const [nom, setNom] = useState(data.nom)
    const [salle, setSalle] = useState(data.salle)

    const deleteClasse = (e)=>{e.preventDefault()
        axios.delete(API + 'classe/delete/' + data._id)
          .then(function (response) {
            // console.log(response);
            updateTable() //On actualise nos données
            close() //On ferme la boîte de dialogue
            setRequestFail('')
          })
          .catch(function (error) {
            setRequestFail(error.message)
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
        <h2 className="red">Voulez-vous vraiment supprimer cette classe?</h2>
        
        <form className="createModal">
          <div>
            <label htmlFor="nom">Nom</label>
            <input type="text" name="nom" id="nom" value={nom} onChange={(e)=>setNom(e.currentTarget.value)} disabled />
          </div>
          <div>
            <label htmlFor="salle">Salle</label>
            <input type="text" name="salle" id="salle" value={salle} onChange={(e)=>setSalle(e.currentTarget.value)} disabled />
          </div>
          <div className="ok">
            {requestOK}
          </div>
          <div className="fail">
            {requestFail}
          </div>
          <div>
            <button onClick={deleteClasse} >Supprimer</button>
            <button onClick={close}>Fermer</button>
          </div>
        </form>
      </Modal>
    </div>
  );

};

export default DeleteClasseModal;
