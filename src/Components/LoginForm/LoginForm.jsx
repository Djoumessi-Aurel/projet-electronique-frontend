import React, { useState } from 'react'
import "./LoginForm.css"
import axios from "axios"
import { API } from '../../static';
import { useNavigate } from 'react-router-dom';


const initialState = { email: '', motdepasse: ''};
const LoginForm = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState(initialState);
  const [requestFail, setRequestFail] = useState("");
  const [sending, setSending] = useState(false);



  const handleSubmit = async (e) => { setRequestFail(''); setSending(true);
    e.preventDefault();

    const url = API + "auth/login";
    localStorage.clear();

    await axios.post(url, form).then((response) => {
      
      localStorage.setItem("user",JSON.stringify(response.data.result));
      localStorage.setItem("token", response.data.token)
    
      navigate("/accueil")
    }).catch(error => {
      setSending(false);
      setRequestFail("Identifiants invalides")
    })


  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    
    <form className='cover' method='post' onSubmit={handleSubmit} >
      <h1>Connexion</h1>
      <div className='input-group'>
          <input name="email" type="text" className="input" placeholder=" " onChange={handleChange} />
          <label className="placeholder"> Email</label>
      </div>
      <div className='input-group'>
          <input name="motdepasse" type="password" className='input' placeholder=" " onChange={handleChange}/>
          <label className="placeholder">Mot de passe</label>
      </div>
      <div className="fail">
        {requestFail}
      </div>
      {
        sending && <div style={{color: 'blue', fontWeight: 500}}>Connexion... Patientez svp.</div>
      }
      
          <input type="submit" className='loginButton' value="Se Connecter"/>
      
    </form>
 
    
  )
};

export default LoginForm