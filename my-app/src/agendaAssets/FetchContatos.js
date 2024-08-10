import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";


export function FetchContatos({}) {

    const [data, setData] = useState([]);
    const [updateContatos, setUpdateContatos] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    const navigate = useNavigate();

    const API_URL = "http://localhost:3000/contatos";


    useEffect(() => {
        const fetchContacts = async () => {
          try {
            const response = await fetch(API_URL);
            const resp = await response.json();
            setData(resp);
            setFilteredData(resp);
          } catch (err) {
            console.error('Api Request contatos Error: ', err);
          }
        };
    
        fetchContacts();
      }, [updateContatos])

    const deleteContact = async (id) => {
        try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          setUpdateContatos(prev => !prev);
        } catch (err) {
      console.error('Api Request Delete Error: ', err);
    }   
      }

  


function handleClick(id){
    const apagarConfirmacao = window.confirm("¿Tem certeza de que deseja apagar este contato?");
    if (apagarConfirmacao === true){
        deleteContact(id);
        
    }
   
}

function filterAndUpdateData(filter){
  return data.filter(contato =>
    Object.values(contato).some(value =>
        value.toLowerCase().includes(filter.toLowerCase())
    )
);
}

function handleOnChange(event){
  const entries = event.target.value;
  setFilteredData(filterAndUpdateData(entries));
  console.log(filteredData);
}

  return  (
    <div>
    <input type="text" onChange={handleOnChange}/>
    
    {filteredData.map(contato => (
    <li key={contato.id}>
        <h3>{contato.nome}</h3>
        <p>{contato.telefone}</p>
        <p>{contato.email}</p>
        <button onClick={ () => navigate("/editarcontato", {state: contato})}>Editar</button> <button value={contato.id} onClick={() => handleClick(contato.id)}>Apagar</button>
    </li>
))}
</div>
)
}

