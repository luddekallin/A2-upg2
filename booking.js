const modal = document.querySelector(".room-booking-modal");
const closeButton = document.querySelector(".room-booking-modal__close");
const roomTitle = document.querySelector("#header__chosen__room");
const formRoomTitle = document.querySelector(".title-room");
const bookingForm = document.querySelector(".booking-form");
const thankYou = document.querySelector(".thank-you");
const participantsSelect = document.querySelector(".booking-form__participants");

let selectedChallengeId = null;
const challengesMap = new Map();

// Hämtar alla challenges från API:t
async function loadChallenges() {
  try {
    const response = await fetch(
      "https://lernia-sjj-assignments.vercel.app/api/challenges",
    );

    if (!response.ok) {
      throw new Error(
        `HTTP-fel vid hämtning av challenges: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    const challengesFromApi = Array.isArray(data)
      ? data
      : (data.challenges ?? []);

    console.log("Challenges:", challengesFromApi);

    for (const challenge of challengesFromApi) {
      challengesMap.set(challenge.id, {
        title: challenge.title,
        minParticipants: challenge.minParticipants,
        maxParticipants: challenge.maxParticipants,
      });
    }
  } catch (error) {
    console.error("Kunde inte ladda challenges från API:t:", error);
  }
}

// Öppnar bokningsmodalen och fyller i valt rum
function openBooking(challengeId) {
  if (!modal) return;

  const numericId = Number(challengeId);
  if (!numericId) return;

  selectedChallengeId = numericId;
  const chosenRoom = challengesMap.get(selectedChallengeId);

  if (chosenRoom) {
    if (roomTitle) {
      roomTitle.textContent = chosenRoom.title;
    }

    if (formRoomTitle) {
      formRoomTitle.textContent = `Book this room "${chosenRoom.title}"`;
    }

    if (participantsSelect) {
      participantsSelect.innerHTML = "";
      const min = chosenRoom.minParticipants ?? 1;
      const max = chosenRoom.maxParticipants ?? 4;

      for (let count = min; count <= max; count++) {
        const option = document.createElement("option");
        option.value = String(count);
        option.textContent = `${count} ${count === 1 ? "participant" : "participants"}`;
        participantsSelect.appendChild(option);
      }
    }

    console.log("Valt rum:", chosenRoom);
  }

  bookingForm?.reset();
  bookingForm?.classList.remove("hidden");
  thankYou?.classList.add("hidden");
  modal.classList.add("room-booking-modal--active");
}

// Stänger modalen
function closeBooking() {
  modal?.classList.remove("room-booking-modal--active");
}

// Initierar sidan och öppnar ev. rum från URL (?challenge=...)
async function initBooking() {
  await loadChallenges();

  const params = new URLSearchParams(window.location.search);
  const challengeIdFromUrl = params.get("challenge");

  if (challengeIdFromUrl && modal) {
    openBooking(challengeIdFromUrl);
  }
}

initBooking();

// Event delegation för dynamiska och statiska bokningsknappar
document.addEventListener("click", (event) => {
  const button = event.target.closest(".challenges__card__btn");
  if (!button) return;

  if (modal) {
    event.preventDefault();
    openBooking(button.dataset.id);
  }
});

// Stänger modalen via stängknappen
closeButton?.addEventListener("click", closeBooking);

// Stänger modalen om man klickar utanför innehållet
modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeBooking();
  }
});

// Hanterar formulärskick
bookingForm?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.querySelector("#name")?.value ?? "";
  const email = document.querySelector("#email")?.value ?? "";
  const time = document.querySelector(".booking-form__times")?.value ?? "";
  const participants =
    document.querySelector(".booking-form__participants")?.value ?? "";

  console.log("Bokning inskickad", {
    challengeId: selectedChallengeId,
    name,
    email,
    time,
    participants,
  });

  bookingForm.classList.add("hidden");
  thankYou?.classList.remove("hidden");
});