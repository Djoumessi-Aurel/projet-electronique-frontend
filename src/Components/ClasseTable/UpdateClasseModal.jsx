import React, { useState } from "react"
import Modal from "react-modal"
import './CreateClasseModal.css'
import { useDispatch, useSelector } from "react-redux";
import { operationBegan, updateClass } from "../../features/classes";

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

const UpdateClasseModal = ({
  IsOpen,
  afterOpen,
  close, data
}) => {
  
    const [requestOK, setRequestOK] = useState("") //Le résultat de la requête en cas de réussite
    const [nom, setNom] = useState(data.nom)
    const [salle, setSalle] = useState(data.salle)

    const dispatch = useDispatch()
    const requestFail = useSelector(state => state.classes.requestFail)
    const operationCompleted = useSelector(state => state.classes.operationCompleted)

    if(operationCompleted) {close(); dispatch(operationBegan())}

    const updateClasse = (e)=>{e.preventDefault()
        dispatch(updateClass({id: data._id, nom, salle}))
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
        <h2>Modifier une classe</h2>
        
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
            <button onClick={updateClasse} >Modifier</button>
            <button onClick={close}>Fermer</button>
          </div>
        </form>
      </Modal>
    </div>
  );

};

export default UpdateClasseModal;
