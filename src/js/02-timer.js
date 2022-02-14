

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const selector = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');


let selectedDate = null;
let intervalId = null;
startBtn.disabled = true;

startBtn.addEventListener('click', start,stopButton);;




const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   
   
   
   onClose(selectedDates) {
      if (selectedDates[0].getTime() < Date.now()) {
         return Notify.failure('Please choose a date in the future');
         
      } else {
         Notify.success('The selected date is valid!');
         
         startBtn.disabled = false;
         selectedDate = selectedDates[0].getTime();
      }
   },
};

const calendar = flatpickr(selector, options);



function start() {
   const startTime = selectedDate;
   
   intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      
      if (deltaTime < 0) {
         clearInterval(intervalId);
      }
      
      startBtn.disabled = true;
      
      updateTimer({ days, hours, minutes, seconds });
   }, 1000);
};



function stopButton() {
     startBtn.disabled = true;

  calendar.setDate(Date.now());

  clearInterval(intervalId);

  const time = convertMs(0);
  updateTimer(time);

};



function updateTimer({ days, hours, minutes, seconds }) {
    dataDays.textContent = `${ days }`;
    dataHours.textContent = `${ hours }`;
    dataMinutes.textContent = `${ minutes }`;
    dataSeconds.textContent = `${ seconds }`;
};



function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};



function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

 
  const days = addLeadingZero(Math.floor(ms / day));
  
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};