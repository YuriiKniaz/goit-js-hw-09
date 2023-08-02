function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const buttonsStyle = document.querySelector('button');
let timerId = null;


stopBtn.setAttribute('disabled', true);

function btnStart() {
    
    stopBtn.removeAttribute('disabled');
    startBtn.setAttribute('disabled', true);
    timerId = setInterval(() => { body.style.background = `${getRandomHexColor()}` }, 1000);
    
}

startBtn.addEventListener('click', btnStart);

function btnStop() {
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', true);

    clearInterval(timerId);
}

stopBtn.addEventListener('click', btnStop);


