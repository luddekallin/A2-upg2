import { loadChallenges } from "../scripts/api.js";
import { createChallengeCard } from "../challengeCard/challengeCard.js";

const challengesContainer = document.querySelector(".challenges__rooms");

window.addEventListener("challengesFiltered", function (event) {
  console.log("Filtrerade challenges:", event.detail);
  challengesContainer.innerHTML = "";
  for (let i = 0; i < event.detail.length; i++) {
    const card = createChallengeCard(event.detail[i]);
    challengesContainer.appendChild(card);
  }
});

loadChallenges().then((challenges) => {
  console.log(challenges);

  window.dispatchEvent(
    new CustomEvent("challengesLoaded", {
      detail: challenges,
    }),
  );
});
