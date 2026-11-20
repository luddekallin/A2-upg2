const activeFilters = {
  minRating: 1,
  maxRating: 5,
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

  const maxLabel = document.createElement("label");
  maxLabel.htmlFor = "max-" + i;

  maxLabel.innerHTML = `<img src="images/Star 5.png" class="star-empty" alt="${i} stjärnor"> <img src="images/Star 2.png" class="star-filled" alt="${i} stjärnor">`;
  maxContainer.appendChild(maxRadio);
  maxContainer.appendChild(maxLabel);
}

minContainer.addEventListener("change", (event) => {
  activeFilters.minRating = Number(event.target.value);
  if (activeFilters.minRating > activeFilters.maxRating) {
    activeFilters.maxRating = activeFilters.minRating;
    document.getElementById("max-" + activeFilters.minRating).checked = true;
  }
  updateFilteredChallenges();
});

maxContainer.addEventListener("change", (event) => {
  activeFilters.maxRating = Number(event.target.value);
  if (activeFilters.maxRating < activeFilters.minRating) {
    activeFilters.minRating = activeFilters.maxRating;
    document.getElementById("min-" + activeFilters.maxRating).checked = true;
  }
  updateFilteredChallenges();
});

// 3. Filtreringsfunktion (kontrollerar stjärnbetyg)
function filterChallenges(challenges) {
  return challenges.filter((challenge) => {
    const matchesRating =
      challenge.rating >= activeFilters.minRating &&
      challenge.rating <= activeFilters.maxRating;

    return matchesRating;
  });
}

// 4. Ta emot all data när challenges.js har hämtat den från API:et
window.addEventListener("challengesLoaded", (event) => {
  allChallenges = event.detail;
  updateFilteredChallenges();
});

//----------------textfilter-------------

const searchInput = document.querySelector(".filter__search-input");

searchInput.addEventListener("input", async (event) => {
  const searchText = event.target.value;
  const filteredChallenges = await search(searchText);

  console.log(filteredChallenges);
});

async function search(searchInput) {
  try {
    const response = await fetch(
      "https://lernia-sjj-assignments.vercel.app/api/challenges",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch resource");
    }

    const data = await response.json();
    const searchChallenge = data.challenges;

    const filteredChallenges = searchChallenge.filter(
      (searchChallenge) =>
        searchChallenge.title
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        searchChallenge.description
          .toLowerCase()
          .includes(searchInput.toLowerCase()),
    );

    return filteredChallenges;
  } catch (error) {
    console.error(error);
  }
}

// 5. Meddelande vid inga matchande challenges
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
// TODO: once the filter block is implemented, filtering by type (via 1st page buttons) should be updated
// const urlParams = new URLSearchParams(window.location.search);
// const challengeType = urlParams.get("challengeType");

// if (challengeType === "online") {
//   document.querySelector("#filter-onsite").checked = false;
// }

// if (challengeType === "onsite") {
//   document.querySelector("#filter-online").checked = false;
// }
