export async function getChallenges() {
  const res = await fetch(
    "https://lernia-sjj-assignments.vercel.app/api/challenges",
  );
  const data = await res.json();
  return data.challenges;
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
