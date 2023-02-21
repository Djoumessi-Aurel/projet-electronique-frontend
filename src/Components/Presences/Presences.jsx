import React, { useState, useEffect } from "react"
import "./Presences.css";
import axios from "axios";
import moment from "moment/moment";
import PresencesTable from "./PresencesTable"
import { renderToString } from 'react-dom/server'

const API = " https://projet-electronique-backend-production.up.railway.app/api/";

const Presences = () => {
  const [classeId, setClasseId] = useState();
  const [coursId, setCoursId] = useState();
  const [dateDebut, setDateDebut] = useState();
  const [dateFin, setDateFin] = useState(moment().format("YYYY-MM-DD"));
  const [listeClasses, setListeClasses] = useState([]);
  const [listeCours, setListeCours] = useState([]);
  const [allCours, setAllCours] = useState(false);
  const [allDates, setAllDates] = useState(false);
  const [TimeTable, setTimeTable] = useState([]);

  const [rechercheEnCours, setRechercheEnCours] = useState(false);

  const getPresences = (e)=>{e.preventDefault()

    setRechercheEnCours(true)

    let data = { classeId: document.querySelector("#classe").value };
    if (!allCours) data.coursId = document.querySelector("#cours").value;
    if (!allDates) {
      data.dateDebut = dateDebut;
      data.dateFin = dateFin;
    }
    // console.log(data);

    axios.post(API + 'presence/', data)
      .then(function (response) {
        // console.log(response.data);
        setTimeTable(response.data) //On actualise nos données
        setRechercheEnCours(false)
      })
      .catch(function (error) {
        setRechercheEnCours(false)
        alert(error.message)
      });
    // console.log(jourSemaine, getDate(hDebut), getDate(hFin), cours)
  }

  useEffect(() => {
    axios
      .get(API + 'cours/all')
      .then(function(response) {
        setListeCours(response.data);
        // setCoursId(response.data[0]._id) //Ceci n'est pas bon
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(API + "classe/all")
      .then(function(response) {
        setListeClasses(response.data);
        setClasseId(response.data[0]._id); //Car la première classe du tableau est le premier élément du select
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);


  return (
    <div id="presences-body">
      <div className="entete">
        <div>
          <label htmlFor="classe">Classe: </label>
          <select
            name="classe"
            id="classe"
            onChange={(e) => setClasseId(e.currentTarget.value)}
          >
            {listeClasses.map((value, index) => (
              <option value={value._id} key={index} >{value.nom}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cours">Cours: </label>
          {!allCours && 
          <select
          disabled={allCours}
          name="cours"
          id="cours"
          onChange={(e) => setCoursId(e.currentTarget.value)}
        >
          {listeCours
            .filter((value) => {
              return value.classe._id === classeId;
            })
            .map((value, index) => (
              <option value={value._id} key={index}>
                {value.code + " - " + value.nom}
              </option>
            ))}
        </select>}
          <span>
            <input
              type="checkbox"
              name="allcours"
              id="allcours"
              value={allCours}
              onClick={(e) => {
                setAllCours(e.currentTarget.checked);
              }}
            />
            <label htmlFor="allcours">Tous les cours</label>
          </span>
        </div>
        <div className="ligne">
          {!allDates && (
            <div className="ligne">
              <div>
                <label htmlFor="datedebut">Du: </label>
                <input
                  disabled={allDates}
                  type="date"
                  name="datedebut"
                  id="datedebut"
                  value={dateDebut}
                  onChange={(e) => setDateDebut(e.currentTarget.value)}
                />
              </div>
              <div>
                <label htmlFor="datefin">Au: </label>
                <input
                  disabled={allDates}
                  type="date"
                  name="datefin"
                  id="datefin"
                  value={dateFin}
                  onChange={(e) => setDateFin(e.currentTarget.value)}
                />
              </div>
            </div>
          )}
          <span>
            <input
              type="checkbox"
              name="alldates"
              id="alldates"
              value={allCours}
              onClick={(e) => {
                setAllDates(e.currentTarget.checked);
              }}
            />
            <label htmlFor="alldates">Toutes les dates</label>
          </span>
        </div>
        <div className="ligne">
            <button onClick={getPresences} >Rechercher</button>
        </div>
      </div>
      <div className="corps">
      {
        rechercheEnCours ? <h3>Recherche en cours. Patientez svp...</h3> : 
        <PresencesTable tableData={TimeTable} printContent={printContent} />
      }
      </div>
    </div>
  );


  function printContent() {
    
    const toPrint = document.querySelector('table').outerHTML
    
    let classeSelect = document.querySelector('#classe')
    let classe = classeSelect.options[classeSelect.selectedIndex].text
    let coursSelect = document.querySelector('#cours')
    let cours = coursSelect ? coursSelect.options[coursSelect.selectedIndex].text : ''
    let element = <div>
      <h2>Liste des présences, classe de {classe}</h2>
      {!allCours && <h4>Cours de {cours}</h4>}
      {!allDates && <h4>Du {dateDebut? moment(dateDebut).format('DD/MM/YYYY') : '   ---   '} au {moment(dateFin).format('DD/MM/YYYY')}</h4>}
    </div>

    let a = window.open('', '', 'height=650, width=900');
    let head = document.querySelector("head").outerHTML
    a.document.write('<html>');
    a.document.write(head);
    a.document.write('<body>');
    a.document.write(renderToString(element));
    a.document.write(toPrint);
    a.document.write('</body></html>');
    a.document.close();
    a.print();
}

};

export default Presences;
