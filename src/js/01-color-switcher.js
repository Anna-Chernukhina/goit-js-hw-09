function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const buttonStart = document.querySelector("[data-start]");
const buttonStop = document.querySelector("[data-stop]");

buttonStart.addEventListener("click", startChangeBackground);
buttonStop.addEventListener("click", stopChangeBackground);

let intervalId;

function startChangeBackground() {
    document.body.style.backgroundColor = getRandomHexColor();
    buttonStart.disabled = true;
    buttonStop.disabled = false;
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopChangeBackground() {
    clearInterval(intervalId);
    buttonStart.disabled = false;
    buttonStop.disabled = true;
}