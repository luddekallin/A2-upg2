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
