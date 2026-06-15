let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');

let hr = 0;
let min = 0;
let sec = 0;
let timerId = null;

startBtn.addEventListener('click', function () {
    if (timerId !== null) return; // Already running
    timerId = setInterval(stopwatch, 1000);
});

stopBtn.addEventListener('click', function () {
    clearInterval(timerId);
    timerId = null;
});

// no - m
// 2 - fr
// mg/f-o/d3/wh/cr/ps-h/
// 10k
// 2 dsa
// 1-fr
// 1 vid/t
// w- 8
// 8-30-walk
// 30-9 r/bf oats/banana 2
// 9-1 office
// 1-2 -lunch(c-v/f/s)
// 2-5-off
// 5-6-snk
// 6-7-chill/relax
// 7-9 fr
// 9-19:30 dinnr
// 9:30-11-dsa
// 11-12-j-a
// 12-1-ex
// 1-2-trd


resetBtn.addEventListener('click', function () {
    clearInterval(timerId);
    timerId = null;
    hr = 0;
    min = 0;
    sec = 0;
    updateDisplay();
});

function stopwatch() {
    sec++;
    if (sec == 60) {
        min++;
        sec = 0;
    }
    if (min == 60) {
        hr++;
        min = 0;
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