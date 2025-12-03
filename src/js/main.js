document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = `Last Modified: ${document.lastModified}`;

import { getRandomUser, getFantasyName } from "./ExternalServices.mjs";

const generateBtn = document.getElementById("generate-name-btn");
const display = document.getElementById("random-name-display");

async function generateName() {
  display.textContent = "Generating name...";

  try {
    const realUser = await getRandomUser();
    const fantasy = await getFantasyName();

    const fullRealName = `${realUser.name.first} ${realUser.name.last}`;

    const fantasyName = fantasy.trim();

    display.textContent = `Real: ${fullRealName} | Fantasy: ${fantasyName}`;
  } catch (error) {
    console.error("Error generating name:", error);
    display.textContent = "Failed to load names. Try again.";
  }
}

generateBtn.addEventListener("click", generateName);

generateName();
