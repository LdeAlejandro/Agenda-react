// Importa React e hooks necessários para gerenciar estado e navegação na aplicação.
// Importa o componente `Link` e o hook `useNavigate` do react-router-dom para navegação.
import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";

// Define o componente funcional `FetchContatos`.
export function FetchContatos({}) {

    // Define o estado `data` para armazenar os contatos recebidos da API.
    const [data, setData] = useState([]);

    // Define o estado `updateContatos` para controlar atualizações de dados.
    const [updateContatos, setUpdateContatos] = useState(false);

    // Define o estado `filteredData` para armazenar contatos filtrados com base em uma busca.
    const [filteredData, setFilteredData] = useState([]);

    // Inicializa o hook `useNavigate` para realizar navegação programática.
    const navigate = useNavigate();

    // Define a URL da API onde os dados dos contatos serão buscados.
    const API_URL = "http://localhost:3000/contatos";

    // Usa o hook `useEffect` para buscar dados dos contatos da API quando `updateContatos` muda.
    useEffect(() => {
        // Função assíncrona para buscar contatos da API.
        const fetchContacts = async () => {
          try {
            const response = await fetch(API_URL); // Faz uma requisição GET para a API.
            const resp = await response.json(); // Converte a resposta para JSON.
            setData(resp); // Atualiza o estado `data` com os dados recebidos.
            setFilteredData(resp); // Atualiza o estado `filteredData` com os dados recebidos.
          } catch (err) {
            // Imprime o erro no console se houver um problema com a requisição.
            console.error('Api Request contatos Error: ', err);
          }
        };
    
        fetchContacts(); // Chama a função para buscar dados.
      }, [updateContatos]) // Reexecuta o efeito quando `updateContatos` muda.

    // Função assíncrona para excluir um contato pelo ID.
    const deleteContact = async (id) => {
        try {
          await fetch(`${API_URL}/${id}`, {
            method: 'DELETE', // Método HTTP para excluir um recurso.
            headers: {
              'Content-Type': 'application/json', // Define o tipo de conteúdo da requisição como JSON.
            },
          });

          // Atualiza o estado `updateContatos` para forçar a reatualização dos contatos.
          setUpdateContatos(prev => !prev);
        } catch (err) {
          // Imprime o erro no console se houver um problema com a requisição DELETE.
          console.error('Api Request Delete Error: ', err);
        }   
      }

    // Função para lidar com o clique no botão de exclusão de um contato.
    function handleClick(id){
        // Solicita confirmação do usuário antes de excluir o contato.
        const apagarConfirmacao = window.confirm("¿Tem certeza de que deseja apagar este contato?");
        if (apagarConfirmacao === true){
            deleteContact(id); // Chama a função `deleteContact` se o usuário confirmar.
        }
    }

    // Função para filtrar os dados dos contatos com base em uma string de filtro.
    function filterAndUpdateData(filter){
      return data.filter(contato =>
        Object.values(contato).some(value =>
            value.toLowerCase().includes(filter.toLowerCase())
        )
    );
    }

    // Função para lidar com mudanças na caixa de pesquisa e atualizar os dados filtrados.
    function handleOnChange(event){
      const entries = event.target.value; // Obtém o valor do campo de pesquisa.
      setFilteredData(filterAndUpdateData(entries)); // Atualiza o estado `filteredData` com os dados filtrados.
      console.log(filteredData); // Imprime os dados filtrados no console (útil para depuração).
    }

    // Renderiza a lista de contatos e o campo de pesquisa.
    return (
        <div>
            {/* Campo de pesquisa para filtrar contatos */}
            <input type="text" onChange={handleOnChange}/>
            
            {/* Mapeia e exibe a lista de contatos filtrados */}
            {filteredData.map(contato => (
                <li key={contato.id}>
                    <h3>{contato.nome}</h3>
                    <p>{contato.telefone}</p>
                    <p>{contato.email}</p>
                    {/* Botão para navegar para a página de edição com os dados do contato */}
                    <button onClick={() => navigate("/editarcontato", { state: contato })}>Editar</button>
                    {/* Botão para excluir o contato */}
                    <button value={contato.id} onClick={() => handleClick(contato.id)}>Apagar</button>
                </li>
            ))}
        </div>
    );
}
