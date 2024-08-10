import React, { useState} from 'react';
import { Link, useLocation} from "react-router-dom";
import "../styles/cadastroConfirmado.css"



const EditarContatoApp = () => {
const location = useLocation();
const data = location.state;
console.log(data);

const [formData, setFormData] = useState({nome:"", telefone: "", email: ""});
  const [register, setRegister] = useState(false);

  const API_URL = `http://localhost:3000/contatos/${data.id}`;
  

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
      method: 'PATCH',
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
      EditarContato:
      <div>
        <Link to="/">
          <button>Home</button>
        </Link>

        <form
          id="form-cadastro"
          className="cadastrar-contato"
         onSubmit={handleSubmit}
        >
          <label htmlFor="nome">
            Nome de contato
            <input
              id="nome"
              name="nome"
              type="text"
              pattern="[A-Za-z\s]+"
              title="O nome só deve conter letras. "
              maxLength="50"
              defaultValue={data.nome}
              onKeyUp={onChangeHandle}
              required
            />
          </label>

          <label htmlFor="tel">
            Telefone
            <input
              id="tel"
              name="telefone"
              type="tel"
              minLength="7"
              maxLength="15"
              pattern="\d+"
              title="Colocar um número de telefone válido."
              defaultValue={data.telefone}
              onKeyUp={onChangeHandle}
              required
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              maxLength="30"
              defaultValue={data.email}
              onKeyUp={onChangeHandle}
            />
          </label>
          <button type="submit">Enviar</button>
        </form>
         {register && (
          <span id="thank-you-message" class="thank-you-message">
            Contato Atualizado!
          </span>
        )} 
      </div>
      <Link to="/">
        <button>Cancel</button>
      </Link>
    </div>
  );
};
export default function EditarContato() {
  return <EditarContatoApp />;
}
