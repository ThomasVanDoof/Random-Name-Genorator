export async function getRandomUser() {
  const URL = import.meta.env.VITE_USER_URL;
  // append a small cache-buster to avoid proxy/server caching returning the same user
  const finalURL = URL + (URL.includes("?") ? "&" : "?") + "_cb=" + Date.now();
  console.debug("getRandomUser: fetching", finalURL);

  const response = await fetch(finalURL);

  if (!response.ok) {
    console.error("getRandomUser: fetch failed", response.status, response.statusText);
    throw new Error("Failed to fetch random user");
  }

  const data = await response.json();
  console.debug("getRandomUser: got", data);
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
  // append cache-buster
  const finalURLWithCB = finalURL + (finalURL.includes("?") ? "&" : "?") + "_cb=" + Date.now();
  console.debug("getFantasyName: fetching", finalURLWithCB);

  const response = await fetch(finalURLWithCB);

  if (!response.ok) {
    console.error("getFantasyName: fetch failed", response.status, response.statusText);
    throw new Error("Failed to fetch fantasy name");
  }

  const text = await response.text();
  console.debug("getFantasyName: got", text);
  return text;
}
