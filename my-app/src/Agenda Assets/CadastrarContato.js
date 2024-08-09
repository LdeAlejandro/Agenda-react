import React, { useState } from "react";
import { Link } from "react-router-dom";

const CadastrarContatoWrap = () => {
  const [data, setData] = useState("");

  function onChangeHandle(event) {
    const { name, value } = event.target;

    setData({ [name]: value });

}

  return (
    <div>
        <Link to="/"><button>Home</button></Link>

      <form action="" className="cadastrar-contato">
        <label htmlFor="nome">
          Nome
          <input
            id="nome"
            name="nome"
            type="text"
            onChangeHandle={onChangeHandle}
            required
          />
        </label>

        <label htmlFor="tel">
          Telefone
          <input id="tel" name="tel" type="tel" required />
        </label>

        <label htmlFor="email">
          Email
          <input id="email" name="email" type="email" required />
        </label>
      </form>
    </div>
  );
};

export default function CadastrarContato() {
  return <CadastrarContatoWrap />;
}
