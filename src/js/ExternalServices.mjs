export async function getRandomUser() {
  const URL = import.meta.env.VITE_USER_URL;
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error("Failed to fetch random user");
  }

  const data = await response.json();
  return data.results[0];
}

export async function getFantasyName(params = {}) {
  const baseURL = import.meta.env.VITE_FANTASY_URL;

  const query = new URLSearchParams();

  if (params.ancestry) query.append("ancestry", params.ancestry);
  if (params.gender) query.append("gender", params.gender);
  if (params.family) query.append("family", params.family);

  const finalURL =
    query.toString().length > 0 ? `${baseURL}?${query.toString()}` : baseURL;

  const response = await fetch(finalURL);

  if (!response.ok) {
    throw new Error("Failed to fetch fantasy name");
  }

  return response.text();
}
