import React, { Component } from 'react'
import './ClassTable.css'

export class ClassTable extends Component {
  render() {
    const classes = [
        {
            id: 1,
            nom: "4GI",
            salle: "B11"
        },
        {
            id: 2,
            nom: "4GELE",
            salle: "B14"
        }
    ]

    const classTag = classes.map((classe) => <tr>
    <td>{classe.id}</td>
    <td>{classe.nom}</td>
    <td>{classe.salle}</td>
    <td>
        <button>modifier</button> <br></br>
        <button>supprimer</button>
    </td>
</tr>)
    return (
        <div className="tableau">
            <header>
                <button>Valider</button>
                <button>Imprimer</button>
                <input type="search"/>
                <button>Recherche</button>
            </header>
            <table>
                <thead>
                    <tr>
                       <th>id</th>
                       <th>Noms</th>
                       <th>Salle</th>
                       <th>Actions</th>
                    </tr>    
                </thead>

                <tbody>
                    {classTag}
                </tbody>

            </table>
        </div>
    )
  }
}

export default ClassTable