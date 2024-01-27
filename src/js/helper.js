export const getJson = async function (API_URL) {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) throw new Error("Error url");

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};
