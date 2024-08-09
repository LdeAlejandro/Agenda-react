import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/cadastroConfirmado.css"

const CadastrarContatoWrap = () => {
  const [formData, setFormData] = useState({nome:"", telefone: "", email: ""});
  const [register, setRegister] = useState(false);

  const API_URL = "http://localhost:3000/contatos";
  

const onChangeHandle = (event) => {
  
  const { name, value } = event.target;

  setFormData(prevState => {
    return {
      ...prevState,
      [name]: value
    };
  });
}


 
const handleSubmit = async (event) => {
    event.preventDefault();

  try {
    const response =  await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const result = await response.json();
    console.log(result);

    setRegister(true);

    setTimeout(() => {
      setRegister(false);
    }, 5000);
   
   

  } catch (err) {
    console.error('API POST Request Error: ', err);
  }
 }


  return (
    <div>
        <Link to="/"><button>Home</button></Link>

      <form id="form-cadastro" className="cadastrar-contato" onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome de contato
          <input
            id="nome"
            name="nome"
            type="text"
            pattern="[A-Za-z\s]+"
            title="O nome só deve conter letras. "
            maxLength="50"
            onKeyUp={onChangeHandle}
            required
          />
        </label>

        <label htmlFor="tel">
          Telefone
          <input id="tel" name="telefone" type="tel"  minLength="7" maxLength="15" pattern="\d+"
        title="Colocar um número de telefone válido." onKeyUp={onChangeHandle} required/>
        </label>

        <label htmlFor="email">
          Email
          <input id="email" name="email" type="email" maxLength="30" onKeyUp={onChangeHandle} />
        </label>
        <button type="submit">Enviar</button>
      </form>
      {register && (
        <span id ="thank-you-message" class="thank-you-message">Contato Salvo.</span>
        )}
    </div>
  );
};

export default function CadastrarContato() {
  return <CadastrarContatoWrap />;
}
