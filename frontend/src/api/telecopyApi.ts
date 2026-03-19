const url = import.meta.env.VITE_URL;

export const saveContent = async (text: string) => {
  try {
    const response = await fetch(url + "copy", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: text,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const fetchContent = async (id: string) => {
  try {
    return await fetch(url + id);
  } catch (error) {
    console.error(error);
  }
};
