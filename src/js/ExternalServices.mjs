export async function getRandomUser() {
  const URL = import.meta.env.VITE_USER_URL;
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error("Failed to fetch random user");
  }

  const data = await response.json();
  return data.results[0];
}

export async function getFantasyName() {
  const URL = import.meta.env.VITE_FANTASY_URL;
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error("Failed to fetch fantasy name");
  }

  return response.text();
}

