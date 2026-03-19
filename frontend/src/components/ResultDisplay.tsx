// Display que mostra o hash generado ou contenido retornado

import { useState } from "react";
import { fetchContent } from "../api/telecopyApi";

function ResultDisplay() {
  const [id, setId] = useState("");
  const [content, setContent] = useState("");

  const onSearchContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetchContent(id);

    if (response && response.ok) {
      const responseText = await response.text();
      setContent(responseText);
      setId("");
    } else {
      console.error("Error en la respuesta del servidor");
    }
  };

  return (
    <div>
      <h2>Content</h2>
      <form onSubmit={onSearchContent}>
        <div>
          <label>Ingrese o ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          ></input>
        </div>
        <button type="submit">Procurar</button>
      </form>

      <div>{content}</div>
    </div>
  );
}

export default ResultDisplay;
