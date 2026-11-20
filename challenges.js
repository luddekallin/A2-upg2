import { getChallenges } from "./api.js";
import { createChallengeCard } from "./challengeCard.js";
const challengesContainer = document.querySelector(".challenges__rooms");
window.addEventListener("challengesFiltered", function (event) {
  console.log("Filtrerade challenges:", event.detail);
  challengesContainer.innerHTML = "";
  for (let i = 0; i < event.detail.length; i++) {
    const card = createChallengeCard(event.detail[i]);
    challengesContainer.appendChild(card);
  }
});
const urlParams = new URLSearchParams(window.location.search);
const challengeType = urlParams.get("challengeType");

const initialFilters = {
  online: challengeType !== "onsite",
  onsite: challengeType !== "online",
};

// if (challengeType === "online") {
//   document.querySelector("#filter-onsite").checked = false;
// }

// if (challengeType === "onsite") {
//   document.querySelector("#filter-online").checked = false;
// }

getChallenges().then((challenges) => {
  console.log(challenges);
  //filter by type
  const filtered = challenges.filter((challenge) => {
    const isOnline = challenge.type === "online";
    const isOnsite = challenge.type === "onsite";

    return (
      (isOnline && initialFilters.online) ||
      (isOnsite && initialFilters.onsite)
    );
  });
  window.dispatchEvent(
    new CustomEvent("challengesLoaded", {
      detail: filtered,
    }),
  );
});


