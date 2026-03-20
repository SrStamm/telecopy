// Display que mostra o hash generado ou contenido retornado

import { useState } from "react";
import { fetchContent } from "../api/telecopyApi";
import { copiarContenido } from "../utils/copiarContenido.tsx";

function ResultDisplay() {
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  const [justCopied, setJustCopied] = useState(false);

  const handleCopy = async () => {
    await copiarContenido(content);
    setJustCopied(true);

    setTimeout(() => {
      setJustCopied(false);
    }, 2000);
  };

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
    <div className="panel">
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

      {content && (
        <div className="result-content">
          {content}
          <button
            className={`btn-copy ${justCopied ? "copied" : ""}`}
            onClick={handleCopy}
            title="Copiar contenido"
          >
            {justCopied ? "✓" : "⎘"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;
