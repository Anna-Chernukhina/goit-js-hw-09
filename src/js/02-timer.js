// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

let time = null;
let intervalId = 0;

refs.startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {
    if (timeMs(time) > 0) {
      refs.startBtn.disabled = true;
      timeMs(time);
      fillMarkUp(convertMs(timeMs()));
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    time = new Date(selectedDates[0].getTime());
    if (timeMs(time) < 0) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

function timeMs() {
  return time - Date.now();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function fillMarkUp({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = String(days);
  refs.dataHours.textContent = String(hours);
  refs.dataMinutes.textContent = String(minutes);
  refs.dataSeconds.textContent = String(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
