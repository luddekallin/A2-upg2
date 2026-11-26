const urlParams = new URLSearchParams(window.location.search);
const initialType = urlParams.get("challengeType");

const activeFilters = {
  minRating: 0,
  maxRating: 5,
  tag: [],
  searchText: "",
  includeOnline: initialType === "onsite" ? false : true,
  includeOnsite: initialType === "online" ? false : true,
};

// Här sparas alla original-challenges när de hämtats från API:et
let allChallenges = [];

// 2. Logik för "By rating" (Skapar stjärnor och lyssnar på klick)
const minContainer = document.getElementById("min-stars");
const maxContainer = document.getElementById("max-stars");

for (let i = 5; i >= 1; i--) {
  // Skapar radioknapp + bildetikett för MIN-betyg
  const minRadio = document.createElement("input");
  minRadio.type = "radio";
  minRadio.name = "minRating";
  minRadio.id = "min-" + i;
  minRadio.value = i;

  const minLabel = document.createElement("label");
  minLabel.htmlFor = "min-" + i;
  minLabel.innerHTML = `<img src="images/Star 5.png" class="star-empty" alt="${i} stjärnor"> <img src="images/Star 2.png" class="star-filled" alt="${i} stjärnor">`;
  minContainer.appendChild(minRadio);
  minContainer.appendChild(minLabel);

  // Skapar radioknapp + bildetikett för MAX-betyg
  const maxRadio = document.createElement("input");
  maxRadio.type = "radio";
  maxRadio.name = "maxRating";
  maxRadio.id = "max-" + i;
  maxRadio.value = i;
  if (i === 5) maxRadio.checked = true;

  const maxLabel = document.createElement("label");
  maxLabel.htmlFor = "max-" + i;

  maxLabel.innerHTML = `<img src="images/Star 5.png" class="star-empty" alt="${i} stjärnor"> <img src="images/Star 2.png" class="star-filled" alt="${i} stjärnor">`;
  maxContainer.appendChild(maxRadio);
  maxContainer.appendChild(maxLabel);
}

minContainer.addEventListener("click", (event) => {
  if (event.target.type !== "radio") return;

  const clickedValue = Number(event.target.value);

  if (activeFilters.minRating === clickedValue) {
    event.target.checked = false;
    activeFilters.minRating = 0;
  } else {
    activeFilters.minRating = clickedValue;

    if (activeFilters.minRating > activeFilters.maxRating) {
      activeFilters.maxRating = activeFilters.minRating;
      document.getElementById("max-" + activeFilters.minRating).checked = true;
    }
  }

  updateFilteredChallenges();
});

maxContainer.addEventListener("click", (event) => {
  if (event.target.type !== "radio") return;

  const clickedValue = Number(event.target.value);

  if (activeFilters.maxRating === clickedValue) {
    event.target.checked = false;
    activeFilters.maxRating = 5;
  } else {
    activeFilters.maxRating = clickedValue;

    if (activeFilters.maxRating < activeFilters.minRating) {
      activeFilters.minRating = activeFilters.maxRating;
      document.getElementById("min-" + activeFilters.maxRating).checked = true;
    }
  }
  updateFilteredChallenges();
});

// Logik för "By type" (Kryssrutor)
const onlineCheckbox = document.getElementById("filter-online");
const onsiteCheckbox = document.getElementById("filter-onsite");

if (onlineCheckbox && onsiteCheckbox) {
  onlineCheckbox.checked = activeFilters.includeOnline;
  onsiteCheckbox.checked = activeFilters.includeOnsite;

  onlineCheckbox.addEventListener("change", (event) => {
    activeFilters.includeOnline = event.target.checked;
    updateFilteredChallenges();
  });

  onsiteCheckbox.addEventListener("change", (event) => {
    activeFilters.includeOnsite = event.target.checked;
    updateFilteredChallenges();
  });
}

// 3. Filtreringsfunktion (kontrollerar stjärnbetyg och by type)
export function filterChallenges(challenges) {
  console.log(activeFilters);
  return challenges.filter((challenge) => {
    const matchesRating =
      challenge.rating >= activeFilters.minRating &&
      challenge.rating <= activeFilters.maxRating;

    const matchesType =
      (!activeFilters.includeOnline && !activeFilters.includeOnsite) ||
      (challenge.type === "online" && activeFilters.includeOnline) ||
      (challenge.type === "onsite" && activeFilters.includeOnsite);

    const matchesTag =
      activeFilters.tag.length === 0 ||
      activeFilters.tag.every((tag) => challenge.labels.includes(tag));
    const searchText = activeFilters.searchText.toLowerCase();
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchText) ||
      challenge.description.toLowerCase().includes(searchText);

    return matchesRating && matchesType && matchesTag && matchesSearch;
  });
}

// 4.  Kör filtreringen och skicka ut resultatet till challenges.js. Meddelande vid inga matchande challenges
const noMatchesMessage = document.getElementById("no-matches-message");

function updateFilteredChallenges() {
  const filteredList = filterChallenges(allChallenges);

  if (noMatchesMessage) {
    if (filteredList.length === 0) {
      noMatchesMessage.classList.remove("hidden");
    } else {
      noMatchesMessage.classList.add("hidden");
    }
  }
  window.dispatchEvent(
    new CustomEvent("challengesFiltered", {
      detail: filteredList,
    }),
  );
}

// 5. Ta emot all data när challenges.js har hämtat den från API:et
window.addEventListener("challengesLoaded", (event) => {
  allChallenges = event.detail;
  updateFilteredChallenges();
});

//----------------textfilter-------------

const searchInput = document.querySelector(".filter__search-input");
searchInput.addEventListener("input", (event) => {
  activeFilters.searchText = event.target.value.trim();
  updateFilteredChallenges();
});

//--------tag filter----------

//hämtar taggar från html
const tagBtns = document.querySelectorAll("div.filter__tags > button");

//skapar eventlistener för varje tag knapp
for (let i = 0; i < tagBtns.length; i++) {
  tagBtns[i].addEventListener("click", () => {
    if (tagBtns[i].classList.contains("filter__tag-btn--active")) {
      tagBtns[i].classList.remove("filter__tag-btn--active");
      removeItem(tagBtns[i].innerHTML.toLowerCase());
      updateFilteredChallenges();
    } else {
      tagBtns[i].classList.add("filter__tag-btn--active");
      activeFilters.tag.push(tagBtns[i].innerHTML.toLowerCase());
      updateFilteredChallenges();
    }
  });
}

//function för att hitta och ta bort tag från activeFilters
function removeItem(itemToRemove) {
  const index = activeFilters.tag.indexOf(itemToRemove);
  activeFilters.tag.splice(index, 1);
}

// TODO: once the filter block is implemented, filtering by type (via 1st page buttons) should be updated
// const urlParams = new URLSearchParams(window.location.search);
// const challengeType = urlParams.get("challengeType");

// if (challengeType === "online") {
//   document.querySelector("#filter-onsite").checked = false;
// }

// if (challengeType === "onsite") {
//   document.querySelector("#filter-online").checked = false;
// }

const filterBtnContainer = document.getElementById("filterButton");
const filterBlockContainer = document.getElementById("filterBlock");
const filterBtnCloseContainer = document.getElementById("closeButton");

filterBtnContainer.addEventListener("click", (event) => {
  filterBtnContainer.classList.add("hidden");
  filterBlockContainer.classList.remove("hidden");
});

filterBtnCloseContainer.addEventListener("click", (event) => {
  filterBlockContainer.classList.add("hidden");
  filterBtnContainer.classList.remove("hidden");
});
