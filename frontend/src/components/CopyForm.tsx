// text area e botón de enviar

import { useState } from "react";
import { saveContent } from "../api/telecopyApi";
import { copiarContenido } from "../utils/copiarContenido.tsx";

function CopyForm() {
  const [content, setContent] = useState("");
  const [id, setId] = useState("");
  const [justCopied, setJustCopied] = useState(false);

  const handleCopy = async () => {
    await copiarContenido(id);
    setJustCopied(true);

    setTimeout(() => {
      setJustCopied(false);
    }, 2000);
  };

  const onSaveContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      console.error("¡No hay nada que enviar!");
      return;
    }

    console.log("Enviando este texto:", content);
    const response = await saveContent(content);

    if (response && response.ok) {
      const responseId = await response.text();

      setId(responseId);
      setContent("");
    } else {
      console.error("Error en la respuesta del servidor");
    }
  };

  return (
    <div className="panel">
      <h2>Formulario</h2>
      <form onSubmit={onSaveContent}>
        <div>
          <label>Contenido:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>

      {id && (
        <div className="result-id">
          <p>ID generado: {id}</p>
          <button
            className={`btn-copy ${justCopied ? "copied" : ""}`}
            onClick={handleCopy}
            title="Copiar ID"
          >
            {justCopied ? "✓" : "⎘"}
          </button>
        </div>
      )}
    </div>
  );
}

export default CopyForm;
