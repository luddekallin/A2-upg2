const roomButtons = document.querySelectorAll(".popular-rooms__room__btn");
const modal = document.querySelector(".room-booking-modal");
const closeButton = document.querySelector(".room-booking-modal__close");


console.log ("roomButtons", roomButtons);
console.log ("modal", modal);
console.log ("closeButton", closeButton);

roomButtons.forEach(button => {
    button.addEventListener("click", () => {
        modal.classList.add("room-booking-modal--active");
    });
});

closeButton.addEventListener("click", () => {
    modal.classList.remove("room-booking-modal--active");
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("room-booking-modal--active");
    }});


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

