import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});
  async function handleSearch() {
    if (input === "") {
      alert("Preencha algum CEP");
      return;
    }

    try {
      const response = await api.get(`${input}/json/`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Erro ao buscar o CEP.\n" + "Digite um CEP válido.");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">BUSCADOR DE CEP</h1>
      <div className="container-input">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn-search" onClick={handleSearch}>
          <FiSearch />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2> CEP: {cep.cep}</h2>
          <span>
            <strong>Rua:</strong>
            {cep.logradouro}
          </span>
          <span>
            <strong>Complemento:</strong>
            {cep.complemento}
          </span>
          <span>
            <strong>Bairro:</strong>
            {cep.bairro}
          </span>
          <span>
            <strong>Cidade:</strong>
            {cep.localidade}
          </span>
          <span>
            <strong>Estado:</strong>
            {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
