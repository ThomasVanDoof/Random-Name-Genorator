export async function getRandomUser() {
  const baseURL = import.meta.env.VITE_USER_URL; 
  const response = await fetch(`${baseURL}api/`);

  if (!response.ok) {
    throw new Error("Failed to fetch random user");
  }

  return response.json();
}

export async function getFantasyName() {
  const baseURL = import.meta.env.VITE_FANTASY_URL;
  const response = await fetch(baseURL);

  if (!response.ok) {
    throw new Error("Failed to fetch fantasy name");
  }

  return response.json();
}
