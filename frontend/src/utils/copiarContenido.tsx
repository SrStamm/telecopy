export const copiarContenido = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Error ao copiar: ", error);
  }
};
