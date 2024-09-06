import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector('button[type="button"]');
const chooseInput = document.querySelector('input#datetime-picker');
const dateDays = document.querySelector('[data-days]');
const dateHours = document.querySelector('[data-hours]');
const dateMinutes = document.querySelector('[data-minutes');
const dateSeconds = document.querySelector('[data-seconds]');


startBtn.disabled = true;
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  onClose(selectedDates) {
      selectedDates = selectedDates[0];
      const currentData = new Date();
      if (selectedDates.getTime() >= currentData.getTime()) {
          userSelectedDate = selectedDates;
          startBtn.disabled = false;
      } else {
          iziToast.show({
              backgroundColor: 'red',
              messageColor: 'white',
              message: "Please choose a date in the future"
          });
          startBtn.disabled = true;
      }
  },
};
flatpickr(chooseInput, options);

const afterCheckData = (event) => {
    if (userSelectedDate) {
        startBtn.disabled = true;
        chooseInput.disabled = true;
  };
  const countDown = setInterval(function convertMs() {
     const currentDate = new Date();
     const difarence = userSelectedDate - currentDate;
     const second = 1000;
     const minute = second * 60;
     const hour = minute * 60;
     const day = hour * 24;

  const days = Math.floor(difarence / day);
  const hours = Math.floor((difarence % day) / hour);
  const minutes = Math.floor(((difarence % day) % hour) / minute);
  const seconds = Math.floor((((difarence % day) % hour) % minute) / second);
    
    dateDays.textContent = days.toString().padStart(2, '0');
    dateHours.textContent = hours.toString().padStart(2, '0');
    dateMinutes.textContent = minutes.toString().padStart(2, '0');
    dateSeconds.textContent = seconds.toString().padStart(2, '0');
    
    if (difarence <= 0) {
      clearInterval(countDown)
      chooseInput.disabled = false;
      dateDays.textContent = '00';
      dateHours.textContent = '00';
       dateMinutes.textContent = '00';
      dateSeconds.textContent = '00';
    }
  }, 1000)
}; 

startBtn.addEventListener('click', afterCheckData);
