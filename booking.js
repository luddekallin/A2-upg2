//javaSvript och api (ida)

import { bookingReservation } from "./api.js";
const bookingForm = document.querySelector(".booking-form");
const thankYou = document.querySelector(".thank-you");

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const time = document.querySelector(".booking-form__times").value;
  const participants = document.querySelector(
    ".booking-form__participants",
  ).value;

  const bookingData = {
    challenge: Number(1),
    name: name,
    email: email,
    date: "2026-11-20",
    time: time,
    participants: Number(participants),
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
