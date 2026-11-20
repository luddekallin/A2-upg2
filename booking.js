const roomButtons = document.querySelectorAll(".popular-rooms__room__btn");
const modal = document.querySelector(".room-booking-modal");
const closeButton = document.querySelector(".room-booking-modal__close");
let clickedId = null;
let valtRum = null;
let selectedDate = ""
let selectedTime = ""

console.log("roomButtons", roomButtons);
console.log("modal", modal);
console.log("closeButton", closeButton);

roomButtons.forEach((button) => {
  button.addEventListener("click", () => {
    clickedId = Number(button.dataset.roomId);
    valtRum = challengesMap.get(clickedId);

    console.log("Valt rum:", valtRum?.title, "id:", clickedId);
    modal.classList.add("room-booking-modal--active");
  });
});

closeButton.addEventListener("click", () => {
  modal.classList.remove("room-booking-modal--active");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("room-booking-modal--active");
  }
});

const challengesMap = new Map();

for (const challenge of challengesFromApi) {
  challengesMap.set(challenge.id, {
    title: challenge.title,
    minParticipants: challenge.minParticipants,
    maxParticipants: challenge.maxParticipants,
  });
}

console.log(valtRum?.title);

const confirmBookingBtn = document.querySelector(".confirm-booking-btn");
const roomBookingDate = document.querySelector(".room-booking-modal__date");
const modalContent = document.querySelector(".room-booking-modal__content");

confirmBookingBtn.addEventListener("click", async function () {
  const selectedDate = roomBookingDate.value;

  if (!selectedDate) {
    alert("Please select a date first");
    return;
  }

  console.log("Selected date:", selectedDate);

  try {
    const response = await fetch(
      `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${selectedDate}&challenge=${clickedId}`,
    );

    const availableTimes = await response.json();
    console.log("Available times:", availableTimes);

    const oldSelect = document.querySelector(".time-select");

    if (oldSelect) {
      oldSelect.remove();
    }

    const selectTime = document.createElement("select");

    selectTime.classList.add("time-select");
    const defaultOption = document.createElement("option");

    defaultOption.textContent = "Choose a time";
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;

    selectTime.appendChild(defaultOption);
    availableTimes.slots.forEach((time) => {
      const option = document.createElement("option");
      option.value = time;
      option.textContent = time;
      selectTime.appendChild(option);
    });
    modalContent.appendChild(selectTime);
    const submitBookingBtn = document.createElement("button");
    submitBookingBtn.textContent = "Submit Booking";
    submitBookingBtn.classList.add("submit-booking-btn");
    modalContent.appendChild(submitBookingBtn);
    selectTime.addEventListener("change", function () {
      const selectedTime = selectTime.value;
      console.log("Selected time:", selectedTime);
    });
    submitBookingBtn.addEventListener("click", function () {
      console.log("Date:", selectedDate);
      console.log("Time:", selectTime.value);
    });
  } catch (error) {
    console.error("Something went wrong:", error);
  }
});
const roomBookingBtnLabel = document.querySelector(".room-booking-btn__label");
const infoBookingText = document.querySelector(".info__booking__text");
confirmBookingBtn.addEventListener("click", async function () {
  roomBookingBtnLabel.remove();
  roomBookingDate.remove();
  infoBookingText.remove();
  confirmBookingBtn.remove();
});

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const time = document.querySelector(".booking-form__times").value;
  const participants = document.querySelector(
    ".booking-form__participants",
  ).value;

  if (valtRum) {
    if (participants < valtRum.minParticipants) {
      console.warn("Minst ${valtRum.minParticipants} deltagre krävs");
      return;
    }
    if (participants > valtRum.maxParticipants) {
      console.warn("Max ${valtRum.maxParticipants} deltagare tillåtna");
      return;
    }
  }

  const bookingData = {
    challenge: clickedId,
    name: name,
    email: email,
    date: selectedDate,
    time: selectedTime,
    participants: participants,
  };

  try {
    const resultat = await bookingReservation(bookingData);
    console.log("Bokning inskickad", { resultat });

    bookingForm.classList.add("hidden");
    thankYou.classList.remove("hidden");
  } catch (error) {
    console.error("Kunde inte genomföra bokningen", { error });
  }
});
