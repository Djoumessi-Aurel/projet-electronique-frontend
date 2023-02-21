import React from 'react';

const PresencesTable = ({tableData, printContent}) => {

    const presencesTag = tableData
    .map((data, index) => <tr key={index}>
    <td>{index + 1}</td>
    <td>{data.etudiant.nom}</td>
    <td>{data.cours.code} <br/> {data.cours.nom}</td>
    <td>{data.date}</td>
    <td>{data.heure}</td>    
</tr>)

    return (
        <div className='tableau'>
        <div className="table-header">
        <header>
            <button onClick={printContent} >Imprimer</button>
            {/* <input type="search" value={searchText} onChange = {(e)=>setSearchText(e.currentTarget.value)} />
            <button>Recherche</button> */}
        </header>
        </div>
        <table>
            <thead>
                <tr>
                   <th>id</th>
                   <th>Etudiant</th>
                   <th>Cours</th>
                   <th>Date</th>
                   <th>Heure</th>
                </tr>    
            </thead>

            <tbody>
                {presencesTag}
            </tbody>

        </table>
        {tableData.length===0 && <h3>Aucun résultat!</h3>}
        </div>
    );

};

export default PresencesTable;