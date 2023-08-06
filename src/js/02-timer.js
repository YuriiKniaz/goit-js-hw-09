import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';


const daysSpan = document.querySelector('.value[data-days]');
const hoursSpan = document.querySelector('.value[data-hours]');
const minutesSpan = document.querySelector('.value[data-minutes]');
const secondsSpan = document.querySelector('.value[data-seconds]');
const startBtn = document.querySelector('button[data-start]');
const dataPicker = document.getElementById('datetime-picker');

let timerSet = false;
startBtn.setAttribute('disabled', true);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const calendar = flatpickr(dataPicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateDiff = selectedDates[0].getTime() - new Date().getTime();
    if (dateDiff > 0 && !timerSet) {
      startBtn.removeAttribute('disabled');

      startBtn.addEventListener('click', () => {
        startTimer(dateDiff);
        timerSet = true;
        startBtn.setAttribute('disabled', true);
        Notiflix.Notify.success('Your timer is started')
      });
    } else {
      startBtn.disabled = true;
      if (timerSet) {
        Notiflix.Notify.failure('Timer is already seted, refresh page to set new timer');
      } else {
        Notiflix.Notify.failure('Please choose the future time');
      }
    }
  },
});

function startTimer(ms) {
  let timerId = setInterval(() => {
    if (ms > 0) {
      timeSpan(convertMs(ms));
      ms -= 1000;
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function timeSpan(t) {
  daysSpan.textContent = addLeadingZero(t.days);
  hoursSpan.textContent = addLeadingZero(t.hours);
  minutesSpan.textContent = addLeadingZero(t.minutes);
  secondsSpan.textContent = addLeadingZero(t.seconds);
  
    
}