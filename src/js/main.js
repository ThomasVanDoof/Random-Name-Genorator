import { getRandomUser, getFantasyName } from "./ExternalServices.mjs";

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = `Last Modified: ${document.lastModified}`;
const generateBtn = document.getElementById("generate-name-btn");
const display = document.getElementById("random-name-display");

const categorySelect = document.getElementById("name-category");
const genderSelect = document.getElementById("name-gender");

const fantasyFilters = document.getElementById("fantasy-filters");
const fantasyAncestry = document.getElementById("fantasy-ancestry");
const fantasyGender = document.getElementById("fantasy-gender");
const fantasyFamily = document.getElementById("fantasy-family");

const favBtn = document.getElementById("favorite-btn");
const favList = document.getElementById("favorites-list");
const clearFavsBtn = document.getElementById("clear-favorites-btn");

const LAST_VISIT_KEY = "rng-last-visit";
const FAVORITES_KEY = "rng-favorites";
const LAST_NAME_KEY = "rng-last-name";

function rememberVisit() {
    const now = new Date().toLocaleString();
    localStorage.setItem(LAST_VISIT_KEY, now);
}

(function showLastVisit() {
    const last = localStorage.getItem(LAST_VISIT_KEY);
    if (last) {
        console.log("Welcome back! Last visit:", last);
    }
    rememberVisit();
})();

function updateFilterVisibility() {
    if (categorySelect.value === "fantasy") {
        fantasyFilters.style.display = "block";
    } else {
        fantasyFilters.style.display = "none";
    }
}

categorySelect.addEventListener("change", updateFilterVisibility);
updateFilterVisibility();

async function generateName() {
    display.textContent = "Generating name...";
    favBtn.disabled = true;

    const category = categorySelect.value;

    try {
        let generatedName = "";

        if (category === "real") {
            const user = await getRandomUser();

            const selectedGender = genderSelect.value;
            if (selectedGender !== "any" && user.gender !== selectedGender) {
                return generateName();
            }

            generatedName = `${user.name.first} ${user.name.last}`;
        }

        else if (category === "fantasy") {
            const params = {};

            params.ancestry = fantasyAncestry.value;
            params.gender = fantasyGender.value === "any" ? undefined : fantasyGender.value;
            // select uses values: "none" and "t" — only send "t" when user selected Yes
            params.family = fantasyFamily.value === "t" ? "t" : undefined;

            const name = await getFantasyName(params);
            generatedName = name.trim();
        }

        else {
            const user = await getRandomUser();
            const fantasy = await getFantasyName();

            generatedName = `${user.name.first} ${user.name.last} | ${fantasy.trim()}`;
        }

        display.textContent = generatedName;

        localStorage.setItem(LAST_NAME_KEY, generatedName);

        favBtn.disabled = false;

    } catch (error) {
        console.error("Error generating name:", error);
        display.textContent = "Failed to load names. Try again.";
    }
}

generateBtn.addEventListener("click", generateName);

(function loadLastName() {
    const last = localStorage.getItem(LAST_NAME_KEY);
    if (last) {
        display.textContent = last;
        favBtn.disabled = false;
    }
})();

function loadFavorites() {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

function saveFavorites(list) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

function renderFavorites() {
    const favorites = loadFavorites();
    favList.innerHTML = "";

    favorites.forEach((name, index) => {
        const li = document.createElement("li");
        li.textContent = name;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click", () => {
            favorites.splice(index, 1);
            saveFavorites(favorites);
            renderFavorites();
        });

        li.appendChild(removeBtn);
        favList.appendChild(li);
    });
}

favBtn.addEventListener("click", () => {
    const name = display.textContent;
    if (!name || name.includes("Generating")) return;

    const favorites = loadFavorites();

    if (favorites.length >= 10) {
        alert("You can only store 10 favorites.");
        return;
    }

    favorites.push(name);
    saveFavorites(favorites);
    renderFavorites();
});

clearFavsBtn.addEventListener("click", () => {
    localStorage.removeItem(FAVORITES_KEY);
    renderFavorites();
});

renderFavorites();
