// stopwatch
const stopwatchPart = document.querySelector(".stopwatch");
const startStopwatchBtn = document.querySelector(".stopwatch__button_start");
const pauseStopwatchBtn = document.querySelector(".stopwatch__button_pause");
const resetStopwatchBtn = document.querySelector(".stopwatch__button_reset");
const timeFieldStopwatch = document.querySelector(".stopwatch_time");

let time;

// timer
const timerPart = document.querySelector(".timer");
const startTimerBtn = document.querySelector(".timer__button_start");
const pauseTimerBtn = document.querySelector(".timer__button_pause");
const stopTimerBtn = document.querySelector(".timer__button_stop");
const inputs = document.querySelectorAll("input");
const hoursInput = document.querySelector(".timer__option_hours");
const minutesInput = document.querySelector(".timer__option_minutes");
const secondsInput = document.querySelector(".timer__option_seconds");
const timeFieldTimer = document.querySelector(".timer__clock_time");
const plusBtn = document.querySelectorAll(".top");
const minusBtn = document.querySelectorAll(".bottom");
const finishTime = document.querySelector(".timer__clock_finish");

let timer;
let chosenTime;
let isTimerPaused = false;
let isStopwatchPaused = false;

// display time
const showTime = (time, field) => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (time > 0 && time > 3599) {
        hours = Math.floor(time / 3600);
        minutes = Math.floor(time % 3600 / 60);
        seconds = Math.floor(time % 3600 % 60);
    } else if (time > 0 && time > 59) {
        minutes = Math.floor(time / 60);
        seconds = Math.floor(time % 60);
    } else if (time > 0) {
        seconds = time;
    }

    field.textContent = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

// time counter
const countTime = (btnType) => {
    if (btnType === "start") {
        chosenTime = +hoursInput.value * 3600 + +minutesInput.value * 60 + +secondsInput.value;
    } else if (btnType === "pause") {
        const pausedTime = timeFieldTimer.textContent.split(":");
        chosenTime = +pausedTime[0] * 3600 + +pausedTime[1] * 60 + +pausedTime[2];
    }
    showTime(chosenTime, timeFieldTimer);
    const now = Date.now();
    const then = now + chosenTime * 1000;
    const end = new Date(then);
    const finishHour = end.getHours() < 10 ? "0" + end.getHours() : end.getHours();
    const finishMinutes = end.getMinutes() < 10 ? "0" + end.getMinutes() : end.getMinutes();
    finishTime.innerHTML = `</img><span>${finishHour} : ${finishMinutes}</span>`;
    
    timer = setInterval(() => {
        const secondLeft = Math.round((then - Date.now()) / 1000);
        if (secondLeft < 0) {
            window.clearInterval(timer);
            stopTimer();
        }
        showTime(secondLeft, timeFieldTimer);
    }, 1000);
}

// stop the timer and clean displaying time
const stopTimer = (btn) => {
    if (btn === stopTimerBtn) {
        stopwatchPart.style.display = "block";
        showTime(0, timeFieldTimer);
        window.clearInterval(timer);
        stopTimerBtn.setAttribute("disabled", "true");
        isTimerPaused = false;
        plusBtn.forEach((btn) => btn.style.display = "block");
        minusBtn.forEach((btn) => btn.style.display = "block");
        finishTime.innerHTML = "";
    } else if (btn === pauseTimerBtn) {
        window.clearInterval(timer);
        isTimerPaused = true;
    }
    pauseTimerBtn.classList.add("hidden");
    startTimerBtn.classList.remove("hidden");
}
stopTimerBtn.addEventListener("click", (e) => stopTimer(e.target));
pauseTimerBtn.addEventListener("click", (e) => stopTimer(e.target));

// inputs validation
const showEmptyInput = () => {
    inputs.forEach((input) => {
        if (!input.value || +input.value === 0) {
            input.style.border = `0.0625rem solid rgb(190, 22, 22)`;
            setTimeout(() => input.style.border = "none", 1000);
        }
    })
}

// start the timer and check if the timer should continue or start again
const startTimer = () => {
    const isInputFull = [...inputs].filter((input) => +input.value > 0).length > 0
    && (hoursInput.value > 0 || minutesInput.value > 0 || secondsInput.value > 0);
    if (!isInputFull) {
        return showEmptyInput();
    } else if (isTimerPaused) {
        countTime("pause");
        isTimerPaused = false;
    } else {
        countTime("start");
        stopwatchPart.style.display = "none";
    }
    startTimerBtn.classList.add("hidden");
    pauseTimerBtn.classList.remove("hidden");
    stopTimerBtn.removeAttribute("disabled");
    plusBtn.forEach((btn) => btn.style.display = "none");
    minusBtn.forEach((btn) => btn.style.display = "none");
}
startTimerBtn.addEventListener("click", startTimer);

// controller for inputs
const changeTimeValue = (e) => {
    const changedElement = e.target.classList[0].split("_")[1];
    const input = document.querySelector(`input[name="${changedElement}"]`);

    if (e.target.classList.contains("top") && input.value < 59) {
        input.value++;
    } else if (e.target.classList.contains("bottom") && input.value > 0) {
        input.value--;
    }
}

plusBtn.forEach((btn) => btn.addEventListener("click", (e) => changeTimeValue(e)));
minusBtn.forEach((btn) => btn.addEventListener("click", (e) => changeTimeValue(e)));

// stopwatch

const switchStopwatch = (type) => {
    if (type === startStopwatchBtn) {
        if (!time) time = 0;
        timer = setInterval(() => {
            time++;
            showTime(time, timeFieldStopwatch);
        }, 1000);
        pauseStopwatchBtn.removeAttribute("disabled");
        resetStopwatchBtn.removeAttribute("disabled");
        startStopwatchBtn.setAttribute("disabled", "true");
        timerPart.style.display = "none";
    } else if (type === pauseStopwatchBtn) {
        window.clearInterval(timer);
        pauseStopwatchBtn.setAttribute("disabled", "true");
        startStopwatchBtn.removeAttribute("disabled");
    } else if (type === resetStopwatchBtn) {
        window.clearInterval(timer);
        pauseStopwatchBtn.setAttribute("disabled", "true");
        resetStopwatchBtn.setAttribute("disabled", "true");
        startStopwatchBtn.removeAttribute("disabled");
        time = 0;
        timerPart.style.display = "block";
        showTime(time, timeFieldStopwatch);
    }
}
[startStopwatchBtn, pauseStopwatchBtn, resetStopwatchBtn].forEach(btn => btn.addEventListener("click", (e) => switchStopwatch(e.target)));