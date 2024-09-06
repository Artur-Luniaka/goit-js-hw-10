import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector('button[type="button"]');
const chooseInput = document.querySelector('input#datetime-picker');
const dateDays = document.querySelector('[data-days]').textContent;
const dateHours = document.querySelector('[data-hours]').textContent;
const dateMinutes = document.querySelector('[data-minutes').textContent;
const dateSeconds = document.querySelector('[data-seconds]').textContent;


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
    const currentDate = new Date();
    const difarence = userSelectedDate - currentDate;
    function convertMs(difarence) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(difarence / day);
  const hours = Math.floor((difarence % day) / hour);
  const minutes = Math.floor(((difarence % day) % hour) / minute);
  const seconds = Math.floor((((difarence % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
console.log(convertMs(difarence));
};
startBtn.addEventListener('click', afterCheckData);
