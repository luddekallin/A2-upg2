const modal = document.querySelector(".room-booking-modal");
const closeButton = document.querySelector(".room-booking-modal__close");
const roomTitle = document.querySelector("#header__chosen__room");
const formRoomTitle = document.querySelector(".title-room");
const bookingForm = document.querySelector(".booking-form");
const thankYou = document.querySelector(".thank-you");
const participantsSelect = document.querySelector(".booking-form__participants");

// Steg 1-element
const step1Container = document.querySelector('[data-step="1"]');
const dateInput = document.querySelector("#date");
const searchTimesBtn = document.querySelector(".confirm-booking-btn");
const availableTimesContainer = document.querySelector(".available-times-container");
const timesSelect = document.querySelector(".booking-form__times");

let selectedChallengeId = null;
let selectedDate = "";
const challengesMap = new Map();


// Hjälpfunktion för att styra vilket steg som visas
function showStep(stepNumber) {
  if (step1Container) {
    step1Container.classList.toggle("hidden", stepNumber !== 1);
  }
  bookingForm?.classList.toggle("hidden", stepNumber !== 2);
  thankYou?.classList.toggle("hidden", stepNumber !== 3);
}

// Fyller tider i både steg 1 (knappar) och steg 2 (<select>)
function populateTimes(times) {
  if (timesSelect) {
    timesSelect.innerHTML = "";
    for (const time of times) {
      const option = document.createElement("option");
      option.value = time;
      option.textContent = time;
      timesSelect.appendChild(option);
    }
  }

  if (availableTimesContainer) {
    availableTimesContainer.innerHTML = "";
    for (const time of times) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "available-time-btn";
      btn.textContent = time;
      btn.addEventListener("click", () => {
        if (timesSelect) {
          timesSelect.value = time;
        }
        showStep(2);
      });
      availableTimesContainer.appendChild(btn);
    }
  }
}

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
  selectedDate = "";
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
  if (dateInput) dateInput.value = "";
  if (availableTimesContainer) availableTimesContainer.innerHTML = "";
  showStep(1);
  modal.classList.add("room-booking-modal--active");
}

// Stänger modalen
function closeBooking() {
  modal?.classList.remove("room-booking-modal--active");
  showStep(1);
}

// Steg 1 -> sök tider och gå vidare till steg 2 (eller välj tid)
searchTimesBtn?.addEventListener("click", async () => {

  const chosenDate = dateInput?.value ?? "";

  if (!chosenDate) {
    dateInput?.reportValidity();

    if (availableTimesContainer) {
      availableTimesContainer.textContent =
        "Please select a date first.";
    }
    return;
  }
  // Sparar valt datum
  selectedDate = chosenDate;

  try {

    // Hämtar lediga tider för valt rum
    const response = await fetch(
      `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${selectedDate}&challenge=${selectedChallengeId}`
    );

    if (!response.ok) {
      throw new Error("Kunde inte hämta tider.");
    }

    const availableTimes = await response.json();

    console.log("Available times:", availableTimes);

    // Fyller knapparna och select-menyn med tider
    populateTimes(availableTimes.slots);

    // Gå vidare till steg 2
    showStep(2);

  } catch (error) {

    console.error(error);

    if (availableTimesContainer) {
      availableTimesContainer.textContent =
        "Could not load available times.";
    }
  }
});

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

// Hanterar formulärskick (Steg 2 -> Steg 3)
bookingForm?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.querySelector("#name")?.value ?? "";
  const email = document.querySelector("#email")?.value ?? "";
  const time = timesSelect?.value ?? "";
  const participants = participantsSelect?.value ?? "";

  console.log("Bokning inskickad", {
    challengeId: selectedChallengeId,
    date: selectedDate,
    name,
    email,
    time,
    participants,
  });

  showStep(3);
});