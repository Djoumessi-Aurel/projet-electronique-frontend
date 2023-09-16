import React, { useRef,useState,useEffect } from 'react';
import './TableEnrolment.css';
import { renderToString } from 'react-dom/server'
import Validate from "../../assets/Images/Validate.svg"
import Sprint from "../../assets/Images/Sprint.svg"
import Empreinte from "../../assets/Images/Empreinte.png"
import Search from "../../assets/Images/search.svg"
import Delete from "../../assets/Images/Delete.svg"
import Modifier from "../../assets/Images/Modifier.svg"
import Modal from 'react-modal';
import ReactJsAlert from "reactjs-alert";
import { GrFormClose } from "react-icons/gr";
import axios from 'axios'
import moment from 'moment/moment';
import { API } from '../../static';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEtudiant, updateEtudiant, validateAllStudents, validateOneStudent } from '../../features/etudiant';

const TableEnrolment = () => {

        //Modal 1
        const initialForm = {nom:"", matricule:"",classe:"",id:""}
        const [modalIsOpens1, setIsOpens1] = useState(false);
        const [name, setName] = useState("");
        const [mat, setMat] = useState("");
        const [classe, setClasse] = useState("");
        const formRef = useRef()
        const [searchText, setSearchText] = useState("");
        const [studentID, setId] = useState("")
        const [error, setError] = useState("")
        const [form, setForm] = useState(initialForm)

        const student = useSelector(state => state.etudiant.array)

        const dispatch = useDispatch()

          const updateAll = ()=>{
            const url = API + "etudiant/updateAll"; //valider tout les enrôlements en attente
            axios.put(url, {headers: {'Authorization': 'Basic '+ localStorage.getItem('token')}})
            .then(res => {
                dispatch(validateAllStudents())
            }).catch(err =>{console.log(err)})
            }

            const deleteStudent = async () => {
              try {
                await axios.delete(`${API}etudiant/delete/${studentID}`
                , {headers: {'Authorization': 'Basic '+ localStorage.getItem('token')}}); //supprimer un étudiant
                dispatch(deleteEtudiant(studentID))
                
                setId("")
                closeModal1()
                setError("")
              } catch (err) {
                setError("Une erreur est survenue!")
                console.log(err);
              }
            }

            const updateStudent = (e)=>{
              e.preventDefault()
              const url = `${API}etudiant/update/${studentID}`
              axios.put(url,form, {headers: {'Authorization': 'Basic '+ localStorage.getItem('token')}})
              .then((res)=>{
                dispatch(updateEtudiant(res.data.content))
                closeModal()
                setError("")
              }).catch(err =>{
                setError("une erreur est survenue")
                console.log(err)
              })
            };

            const validateStudent = (id)=>{
              const url = `${API}etudiant/validate/` //Valider un enrôlement
              axios.put(url, {id: id}, {headers: {'Authorization': 'Basic '+ localStorage.getItem('token')}})
              .then((res)=>{
                dispatch(validateOneStudent(id))
                setError("")
              }).catch(err => {
                setError("Une erreur est survenue!")
              })
            }

            const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


        function openModal1(id) {
          setId(id);
            setIsOpens1(true);
        }


        function closeModal1() {
            setIsOpens1(false);
        }

        const customStyles1 = {
            content: {
              top: '40%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              padding: '10px 50px',
              transform: 'translate(-50%, -50%)',
            },
          };
    
          
          //fin modal 1

          //Modal 2
        const [modalIsOpens, setIsOpens] = useState(false);

        //Alert 

        const [status, setStatus] = useState(false);
        const [type, setType] = useState("");
        const [title, setTitle] = useState("");

        function openModal(id) {
            setIsOpens(true);
            setId(id)
            //e.preventDefault();
            const st = student.find(e => e._id==id )
            if(st){
              setForm({nom:st.nom,matricule:st.matricule,classe:st.classe.nom,id:st._id})
            }
        }

        function afterOpenModal() {
            // references are now sync'd and can be accessed.
            subtitle.style.color = '#000';
        }

        function closeModal() {
            setIsOpens(false);
        }

        const customStyles = {
            content: {
              top: '40%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              padding: '10px 50px',
              transform: 'translate(-50%, -50%)',
            },
          };
    
          let subtitle;
          //fin modal 2




        const StudentTable = student
        .filter((value)=>{
            if(searchText === '') return true
            return value.nom.toLowerCase().includes(searchText.toLowerCase())||
            value.matricule.toLowerCase().includes(searchText.toLowerCase())||
            value.classe.nom.toLowerCase().includes(searchText.toLowerCase())
        })
        .map((student, index) => <tr key={student._id}>
            <td>{index + 1}</td>
            <td>{student.matricule}</td>
            <td className='student-name'>{student.nom}</td>
            <td>{student.classe.nom}</td>
            <td>{student.empreinte}</td>
            <td><img src={Empreinte} alt="" /></td>
            <td>{moment(student.dateCreation).format('DD/MM/YYYY à HH:mm:ss')}</td>
            <td><span className={student.statut === true ? "valide" : "attente"}>{student.statut==true ?"Validé":"En attente"}</span></td>
            <td>
                <button onClick={()=>openModal(student._id)} className='button-modifier'><img src={Modifier} alt="modifier" />Modifier</button>
                <button onClick={()=>openModal1(student._id)} className='button-sup'><img src={Delete} alt="delete" />Supprimer</button>
                {!student.statut && <button onClick={()=>validateStudent(student._id)} className='button-val'>Valider</button>}
            </td>
      </tr>
      )

        return(
            <div className='students-div'>
                <div className='TableEnrol-div'>
                    <a className='validate-all' onClick={updateAll} ><img src={Validate} alt="validate" /> Valider tout</a>
                    <a className='sprint' onClick={printContent} ><img src={Sprint} alt="sprint"  /> Imprimer</a>
                    <form action="" className='form-search'>
                        <div className='input-btn'>
                        <img className='search-icon' src={Search} alt="search" />
                        <input className='search-input' type="text" placeholder='Rechercher Etudiant...' value={searchText} onChange = {(e)=>setSearchText(e.currentTarget.value)} />
                        </div>
                        
                    </form>
                    <table className='Table'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Matricule</th>
                                <th>Noms</th>
                                <th>Classes</th>
                                <th>Empreinte digitale</th>
                                <th>Image empreinte</th>
                                <th>Date</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {StudentTable}
                        </tbody>
                    </table>
                </div>
                <div>
                <Modal
                    isOpen={modalIsOpens}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                  <a onClick={closeModal} className="close-btn-modal"><GrFormClose /></a>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Modifier l'étudiant</h2>
                    
                    <form ref={formRef} onSubmit={updateStudent}  className="form-class">
          
                <label className="labelForm" htmlFor="name">Entrer le nouveau nom</label>
                <input className="label-input" id="name" type="text" placeholder="Nouveau nom..." name="nom" value={form.nom} onChange = {handleChange} required/>
                <label className="labelForm" htmlFor="mat">Entrer le nouveau matricule</label>
                <input className="label-input" id="mat" type="text" placeholder="Nouveau matricule..." name="matricule" value={form.matricule} onChange = {handleChange} required/>
                <label className="labelForm" htmlFor="class">Entrer sa nouvelle classe</label>
                <input className="label-input" id="class" type="text" placeholder="Nouvelle classe..." name="classe" value={form.classe} onChange = {handleChange} required/>
                <div className='error'>{error}</div>
                <ReactJsAlert
                    status={status} // true or false
                    type={type} // success, warning, error, info
                    title={title}
                    quotes={true}
                    quote=""
                    Close={() => setStatus(false)}
                />
            <button type='submit' className='btn-btn-primary' style={{borderRadius:5,textAlign:'center', padding:10,color:'white',background:'#939af0'}}>Modifier</button>

        </form>
                </Modal>
            </div>
            <div>
                <Modal
                    isOpen={modalIsOpens1}
                    onRequestClose={closeModal1}
                    style={customStyles1}
                    contentLabel="Example Modal"
                >
                  <a onClick={closeModal1} className="close-btn-modal"><GrFormClose /></a>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Voulez vous vraiment supprimer?</h2>
                            <div className='error'>{error}</div>
                            <div className='Validate-action'>
                                <button className='Validate-oui' onClick={deleteStudent} href="">Oui</button>
                                <button className='Validate-non' onClick={closeModal1} >Non</button>
                            </div>

                </Modal>
            </div>
            </div>
        );

        function printContent() {

          const tableContent = student
          .filter((value)=>{
              if(searchText === '') return true
              return value.nom.toLowerCase().includes(searchText.toLowerCase())||
              value.matricule.toLowerCase().includes(searchText.toLowerCase())||
              value.classe.nom.toLowerCase().includes(searchText.toLowerCase())
          })
          .map((student, index) => <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.matricule}</td>
              <td className='student-name'>{student.nom}</td>
              <td>{student.classe.nom}</td>
              <td>{student.dateCreation}</td>
        </tr>
        )
      
          const toPrint = (<div className="tableau">
              <table>
              <thead>
              <th>Id</th>
              <th>Matricule</th>
              <th>Noms</th>
              <th>Classes</th>
              <th>Date</th>  
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
          a.document.write('<body ><h1>Liste des etudiants</h1>');
          a.document.write(renderToString(toPrint));
          a.document.write('</body></html>');
          a.document.close();
          a.print();
      }
}

export default TableEnrolment