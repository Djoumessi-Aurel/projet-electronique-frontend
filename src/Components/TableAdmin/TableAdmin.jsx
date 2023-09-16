import React, { useState,useRef, useEffect } from 'react';
import './TableAdmin.css';
import { renderToString } from 'react-dom/server'
import Validate from "../../assets/Images/Validate.svg"
import Sprint from "../../assets/Images/Sprint.svg"
import Search from "../../assets/Images/search.svg"
import Delete from "../../assets/Images/Delete.svg"
import Modifier from "../../assets/Images/Modifier.svg"
import Modal from 'react-modal';
import ReactJsAlert from "reactjs-alert";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import { API } from '../../static';
import { useDispatch, useSelector } from 'react-redux';
import { addAdmin, deleteAdmin, updateAdmin } from '../../features/admin';

const TableAdmin = () => {

    //Modal 1
    const initialForm = {nom:"",email:"",tel:"",role:"",motdepasse:"",id:""}
    const [modalIsOpens1, setIsOpens1] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [adminId, setAdminId] = useState("");
    const [errors, setError] = useState("");
    const [status, setStatus] = useState(false);
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [isSuperAdmin, setSuperAdmin]=useState(false);
    const [form, setForm] = useState(initialForm);
    const [formData, setFormData] = useState({nom:"",email:"",tel:"",role:"admin",motdepasse:""});
    const [requestOK, setRequestOK] = useState("") //Le résultat de la requête en cas de réussite
    const [requestFail, setRequestFail] = useState("");
    const [disable, setDisable] = useState(false);
    const [searchText, setSearchText] = useState("");

    const tab = useSelector(state => state.admin.array)

    const dispatch = useDispatch()
    

    function openModal1(id) {
        setAdminId(id)
        setIsOpens1(true);
    }

    const openCreateModal = () => {
        
        if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role =='superadmin'){
            setCreateModal(true);
            setRequestFail("")
        }
    };
    const closeCreateModal = () => {setCreateModal(false)};


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

    function openModal(id) {
        setAdminId(id);
        setIsOpens(true);
        const user = JSON.parse(localStorage.getItem('user'));
        if(user && user._id==id){
            setRequestFail("");
            const ad = tab.find((admin) => admin._id == id);
            if(ad){
                setForm({nom:ad.nom,email:ad.email,tel:ad.tel,role:ad.role,motdepasse:"",id:id})
            }
        } else {
            setDisable(true);
            setRequestFail("Vous n'avez pas le droit !")
            setForm(initialForm);
        }
        
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = `${API}admin/update/`;
    
    await axios.put(url, form, {headers: {'Authorization': 'Basic '+ localStorage.getItem('token')}}
        ).then((response) => {
        setRequestFail("")
        if (adminId == JSON.parse(localStorage.getItem("user"))._id){
            localStorage.setItem("user", JSON.stringify(response.data.content))
        }
        dispatch(updateAdmin(response.data.content))
        closeModal()
    }).catch(error => {
      setError(error);
      setRequestFail(error.response.data.message)

    })
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const removeAdmin = async () => {
    const url = `${API}admin/destroy/${adminId}`;
    
    await axios.delete(url, {headers: {'Authorization': 'Basic '+ localStorage.getItem('token')}})
    .then((response) => {
        console.log(response)
        dispatch(deleteAdmin(adminId))
        setRequestFail("")
        closeModal1()
    }).catch(error => {
      setError(error);
      setRequestFail(error.response.data.message)
      
    })
  }


  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });


  const handleCreateAdmin = async (e) => {
    e.preventDefault();
  
    const url = `${API}admin/store`;
    
    await axios.post(url, formData, {headers: {'Authorization': 'Basic '+ localStorage.getItem('token')}}
        ).then((response) => {
        dispatch(addAdmin(response.data.content))
        setRequestFail("")
        closeCreateModal()
    }).catch(error => {
      setError(error);
      setRequestFail(error.response.data.message)
    })
  };


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
          width: '45%',
        },
      };

      let subtitle;
      //fin modal 2

const formRef = useRef()


  useEffect(() =>{
    if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).role == "superadmin"){
        setSuperAdmin(true); 
    }
  }, []);


  const AdminTable = tab
  .filter((value)=>{
      if(searchText === '') return true
      return value.nom.toLowerCase().includes(searchText.toLowerCase())
  })
  .map((tab, index) => <tr key={tab._id}>
  <td>{index + 1}</td>
  <td className='tableAdmin-name'>{tab.nom}</td>
  <td>{tab.email}</td>
  <td>{tab.tel}</td>
  <td>{tab.role}</td>
  <td>
      {(isSuperAdmin || JSON.parse(localStorage.getItem("user"))._id === tab._id) && <button onClick={() => openModal(tab._id)} className='button-modifier'><img src={Modifier} alt="modifier" />Modifier</button>}
      {isSuperAdmin && <button onClick={() => openModal1(tab._id)} className='button-sup'><img src={Delete} alt="delete" />Supprimer</button>}
  </td>
</tr>
)

        return(
            <div className='TableAdmin-div'>
                <div className='tableAdmin-div'>
    
                    {isSuperAdmin && <a className='validate-all' onClick={openCreateModal}><img src={Validate} alt="validate" /> Créer admin</a>}
                    <a className='sprint' onClick={printContent} ><img src={Sprint} alt="sprint" /> Imprimer</a>
                    <form action="" className='form-search'>
                        <div className='input-btn'>
                        <img className='search-icon' src={Search} alt="search" />
                        <input className='search-input' type="text" placeholder='Rechercher Admin...' value={searchText} onChange = {(e)=>setSearchText(e.currentTarget.value)} />
                        </div>
                        
                    </form>
                    <table className='Table-TableAdmin'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Téléphone</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {AdminTable}
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
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Modifier l'administrateur</h2>
                    
                    <form ref={formRef} onSubmit={handleSubmit}  className="form-class">
          
                <label className="labelForm"  htmlFor="name">Entrer le nouveau nom</label>
                <input className="label-input" id="name" type="text" placeholder="Nom..." name="nom" value={form.nom} onChange={handleChange} required/>
                <label className="labelForm" htmlFor="email">Entrer l'email</label>
                <input className="label-input" id="email" type="email" placeholder="Email..." name="email" value={form.email} onChange={handleChange} required/>
                <label className="labelForm" htmlFor="motdepasse">Mot de Passe</label>
                <input className="label-input" id="motdepasse" type="password" placeholder="mot de passe" name="motdepasse" onChange={handleChange} required/>
                <label className="labelForm" htmlFor="tel">Entrer son numéro de téléphone</label>
                <input className="label-input" id="tel" type="text" placeholder="Téléphone..." name="tel" value={form.tel} onChange={handleChange} required/>
                <label className="labelForm" htmlFor="role">role</label>
                <select id="role" name="role" value={form.role} onChange={handleChange} disabled={!(isSuperAdmin && form.role!=="superadmin")} >
                <option value="admin">Admin</option>
                <option value="superadmin">Super admin</option>
                </select>
                 
                <div className="ok">
                     {requestOK}
                </div>
                <div className="fail">
                    {requestFail}
                </div>


                <ReactJsAlert
                    status={status} // true or false
                    type={type} // success, warning, error, info
                    title={title}
                    quotes={true}
                    quote=""
                    Close={() => setStatus(false)}
                />
            <input disabled = {disable} type="submit" value="Modifier"/>

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
                            <div className="ok">
                            {requestOK}
                            </div>
                            <div className="fail">
                                {requestFail}
                            </div>
                        
                                <div className='Validate-action'>
                                    
                                    <button onClick={removeAdmin} className='btn-btn-primary' style={{borderRadius:5,textAlign:'center', padding:10,color:'white',background:'#939af0'}}>oui</button>
                                    <button className='Validate-non' onClick={closeModal1}>Non</button>
                                </div>

                    </Modal>
                </div>


                <div>
                <Modal
                    isOpen={createModal}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeCreateModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                  <a onClick={closeModal} className="close-btn-modal"><GrFormClose /></a>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Créer un admin</h2>
                    
                    <form ref={formRef} onSubmit={handleCreateAdmin}  className="form-class">
          
                <label className="labelForm"  htmlFor="name">Nom</label>
                <input className="label-input" id="name" type="text" placeholder="Nom..." name="nom"  onChange={handleInputChange} required/>
                <label className="labelForm" htmlFor="email">Email</label>
                <input className="label-input" id="email" type="email" placeholder="Email..." name="email" onChange={handleInputChange} required/>
                <label className="labelForm" htmlFor="motdepasse">Mot de Passe</label>
                <input className="label-input" id="motdepasse" type="password" placeholder="mot de passe" name="motdepasse" onChange={handleInputChange} required/>
                <label className="labelForm" htmlFor="tel">Numéro de téléphone</label>
                <input className="label-input" id="tel" type="text" placeholder="Téléphone..." name="tel"  onChange={handleInputChange} />
                <label className="labelForm" htmlFor="role">role</label>
                <select id="role" name="role"  onChange={handleInputChange} >
                <option value="admin">Admin</option>
                <option value="superadmin">Super admin</option>
                </select>
                 
                <div className="ok">
                     {requestOK}
                </div>
                <div className="fail">
                    {requestFail}
                </div>


                <ReactJsAlert
                    status={status} // true or false
                    type={type} // success, warning, error, info
                    title={title}
                    quotes={true}
                    quote=""
                    Close={() => setStatus(false)}
                />
            <input  type="submit" value="Ajouter"/>

        </form>
                </Modal>
                </div>


            </div>
        );
    

    function printContent() {

        const tableContent = tab
        .filter((value)=>{
            if(searchText === '') return true
            return value.nom.toLowerCase().includes(searchText.toLowerCase())
        })
        .map((tab, index) => <tr key={tab._id}>
            <td>{index + 1}</td>
            <td className='tableAdmin-name'>{tab.nom}</td>
            <td>{tab.email}</td>
            <td>{tab.tel}</td>
            <td>{tab.role}</td>
    </tr>)
    
        const toPrint = (<div className="tableau">
            <table>
            <thead>
                <tr>
                <th>Id</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Role</th>
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
        a.document.write('<body ><h1>Liste des administrateurs</h1>');
        a.document.write(renderToString(toPrint));
        a.document.write('</body></html>');
        a.document.close();
        a.print();
    }
}
    
    
    

export default TableAdmin