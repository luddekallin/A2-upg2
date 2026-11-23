const roomButtons = document.querySelectorAll(".challenges__card__btn");
const modal = document.querySelector(".room__booking__modal");
const closeButton = document.querySelector(".room__booking__modal__close");
const roomTitle = document.querySelector("#header__chosen__room");
let selectedChallengeId = null;
const challengesMap = new Map();

// Hämtar alla challenges från API:t
async function loadChallenges() {

    try {

        const response = await fetch(
            "https://lernia-sjj-assignments.vercel.app/api/challenges"
        );

        const challengesFromApi = await response.json();

        console.log("Challenges:", challengesFromApi);

        // Sparar varje challenge i Mapen
        for (const challenge of challengesFromApi) {

            challengesMap.set(challenge.id, {
                title: challenge.title,
                minParticipants: challenge.minParticipants,
                maxParticipants: challenge.maxParticipants
            });

        }

    } catch (error) {

        console.error("error:", error);

    }
}

// Kör funktionen direkt när sidan laddas
loadChallenges();


// Lyssnar efter klick på varje rumsknapp
roomButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedChallengeId = Number(button.dataset.id);

        const chosenRoom = challengesMap.get(selectedChallengeId);

        if (chosenRoom) {

            roomTitle.textContent = chosenRoom.title;

            console.log("Valt rum:", chosenRoom);

        }

        modal.classList.add("room__booking__modal--active");

    });

});

// Stänger modalen via stängknappen
closeButton.addEventListener("click", () => {

    modal.classList.remove("room__booking__modal--active");

});

// Stänger modalen om man klickar utanför innehållet
modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.classList.remove("room__booking__modal--active");

    }

});


const bookingForm = document.querySelector('.booking-form');
const thankYou = document.querySelector('.thank-you');


bookingForm.addEventListener('submit', function (e){
e.preventDefault();

const name = document.querySelector('#name').value;
const email = document.querySelector('#email').value;
const time = document.querySelector('.booking-form__times').value;
const participants = document.querySelector('.booking-form__participants').value;

console.log("Bokning inskickad",{namn, email, time, participants});

bookingForm.classList.add('hidden');
thankYou.classList.remove('hidden');

});
