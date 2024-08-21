// Importa React e hooks necessários para gerenciar estado e efeitos colaterais no componente.
// Importa o componente `Link` para navegação entre rotas.
// Importa o arquivo de estilos CSS para o componente.
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/cadastroConfirmado.css"

// Define o componente funcional `CadastrarContatoWrap`.
const CadastrarContatoWrap = () => {
  // Define o estado `formData` para armazenar os dados do formulário. Inicialmente, está vazio.
  const [formData, setFormData] = useState({ nome: "", telefone: "", email: "" });
  
  // Define o estado `register` para controlar a exibição da mensagem de confirmação. Inicialmente é falso.
  const [register, setRegister] = useState(false);

  // Define a URL da API onde os dados do formulário serão enviados.
  const API_URL = "http://localhost:3000/contatos";

  // Função que lida com as mudanças nos campos do formulário.
  const onChangeHandle = (event) => {
    // Obtém o nome e valor do campo que gerou o evento.
    const { name, value } = event.target;

    // Atualiza o estado `formData` com o novo valor do campo.
    setFormData(prevState => ({
      ...prevState,  // Mantém os valores anteriores do estado.
      [name]: value  // Atualiza o campo específico com o novo valor.
    }));
  }

  // Função que lida com o envio do formulário.
  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário (recarregar a página).

    try {
      // Faz uma requisição POST para a API com os dados do formulário.
      const response = await fetch(`${API_URL}`, {
        method: 'POST', // Método HTTP para criar um novo recurso.
        headers: {
          'Content-Type': 'application/json', // Define o tipo de conteúdo da requisição como JSON.
        },
        body: JSON.stringify(formData), // Converte o estado `formData` para JSON e inclui no corpo da requisição.
      });

      // Verifica se a resposta da API é bem-sucedida.
      if (!response.ok) {
        throw new Error('Network response was not ok.'); // Lança um erro se a resposta não for OK.
      }

      // Converte a resposta para JSON e exibe no console.
      const result = await response.json();
      console.log(result);

      // Atualiza o estado `register` para verdadeiro para mostrar a mensagem de confirmação.
      setRegister(true);

      // Define um tempo de espera de 5 segundos antes de esconder a mensagem de confirmação.
      setTimeout(() => {
        setRegister(false);
      }, 5000);
    } catch (err) {
      // Imprime o erro no console se houver um problema com a requisição POST.
      console.error('API POST Request Error: ', err);
    }
  }

  return (
    <div>
      {/* Link para retornar à página inicial */}
      <Link to="/">
        <button>Home</button>
      </Link>

      {/* Formulário para cadastro de contato */}
      <form id="form-cadastro" className="cadastrar-contato" onSubmit={handleSubmit}>
        {/* Campo para nome do contato */}
        <label htmlFor="nome">
          Nome de contato
          <input
            id="nome"
            name="nome"
            type="text"
            pattern="[A-Za-z\s]+" // Permite apenas letras e espaços.
            title="O nome só deve conter letras."
            maxLength="50" // Limita o comprimento do nome a 50 caracteres.
            onKeyUp={onChangeHandle} // Chama `onChangeHandle` ao digitar no campo.
            required // Torna o campo obrigatório.
          />
        </label>

        {/* Campo para telefone */}
        <label htmlFor="tel">
          Telefone
          <input
            id="tel"
            name="telefone"
            type="tel"
            minLength="7" // Define o comprimento mínimo do telefone.
            maxLength="15" // Define o comprimento máximo do telefone.
            pattern="\d+" // Permite apenas números.
            title="Colocar um número de telefone válido."
            onKeyUp={onChangeHandle}
            required
          />
        </label>

        {/* Campo para email */}
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            maxLength="30" // Limita o comprimento do email a 30 caracteres.
            onKeyUp={onChangeHandle}
          />
        </label>

        {/* Botão para enviar o formulário */}
        <button type="submit">Enviar</button>
      </form>

      {/* Mensagem de confirmação exibida após o cadastro */}
      {register && (
        <span id="thank-you-message" className="thank-you-message">Contato Salvo.</span>
      )}
    </div>
  );
};

// Define e exporta o componente `CadastrarContato`, que renderiza `CadastrarContatoWrap`.
export default function CadastrarContato() {
  return <CadastrarContatoWrap />;
}
