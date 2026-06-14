const startBtn = document.getElementById('start');

let hr = 0;
let min = 0;
let sec = 0;
let timerId = null;

startBtn.addEventListener('click', () => {
  if (timerId !== null) return;
  timerId = setInterval(stopWatch, 1000);
})

function stopWatch() {
  sec++;
  if (sec == 60) {
    sec = 0;
    min++;
  }
  if (min == 60) {
    hr++;
    min = 0
  }
  updateDisplay();
}

function updateDisplay() {
  let hrString = hr < 10 ? "0" + hr : hr;
  let minString = min < 10 ? "0" + min : min;
  let secString = sec < 10 ? "0" + sec : sec;

  document.getElementById('hr').innerText = hrString;
  document.getElementById('min').innerText = minString;
  document.getElementById('sec').innerText = secString;
}