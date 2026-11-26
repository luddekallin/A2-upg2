// Hämtar alla challenges från API:t
export async function loadChallenges() {
  try {
    const response = await fetch(
      "https://lernia-sjj-assignments.vercel.app/api/challenges",
    );

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return Array.isArray(data)
      ? data
      : (data.challenges ?? []);

  } catch (error) {
    console.error("Kunde inte ladda challenges från API:t:", error);
  }
}

export async function getAvailableTime(selectedDate, selectedChallengeId, availableTimesContainer) {
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

    return availableTimes;

  } catch (error) {

    console.error(error);

    if (availableTimesContainer) {
      availableTimesContainer.textContent =
        "Could not load available times.";
    }
  }
  
}


// Api för booking (Ida)
export async function bookingReservation(bookingData) {
  const res = await fetch(
    "https://lernia-sjj-assignments.vercel.app/api/booking/reservations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    },
  );

  const data = await res.json();
  return data;
}


