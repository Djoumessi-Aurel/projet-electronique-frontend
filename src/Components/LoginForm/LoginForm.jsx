import React, { useState } from 'react'
import "./LoginForm.css"
import axios from "axios"



const initialState = { email: '', motdepasse: ''};
const LoginForm = () => {

 if (localStorage.getItem("token")) window.location = "accueil/";
  const [form, setForm] = useState(initialState);
  const [requestFail, setRequestFail] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "https://projet-electronique-backend-production.up.railway.app/api/auth/login";
    localStorage.clear();

    await axios.post(url, form).then((response) => {
      
      localStorage.setItem("user",JSON.stringify(response.data.result));
      localStorage.setItem("token", response.data.token)
    
      window.location = "accueil/";
    }).catch(error => {
      
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
          <input name="motdepasse" type="password" class='input' placeholder=" " onChange={handleChange}/>
          <label className="placeholder">Mot de passe</label>
      </div>
      <div className="fail">
        {requestFail}
      </div>
      
          <input type="submit" className='loginButton' value="Se Connecter"/>
      
    </form>
 
    
  )
};

export default LoginForm