// text area e botón de enviar

import { useState } from "react";
import { saveContent } from "../api/telecopyApi";

function CopyForm() {
  const [content, setContent] = useState("");
  const [id, setId] = useState("");

  const onSaveContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      console.error("¡No hay nada que enviar!");
      return;
    }

    console.log("Enviando este texto:", content); // Verifica que NO sea undefined
    const response = await saveContent(content);

    if (response && response.ok) {
      const responseId = await response.text();

      setId(responseId);
      setContent(""); // Limpiar el área después de enviar
    } else {
      console.error("Error en la respuesta del servidor");
    }
  };

  const copiarContenido = async () => {
    try {
      await navigator.clipboard.writeText(id);
    } catch (error) {
      console.error("Error ao copiar: ", error);
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
          <button onClick={copiarContenido()}>Copiar</button>
        </div>
      )}
    </div>
  );
}

export default CopyForm;
