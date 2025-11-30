document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = `Last Modified: ${document.lastModified}`;

import { getRandomUser, getFantasyName } from "./ExternalServices.mjs";

