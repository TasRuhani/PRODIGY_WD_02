document.addEventListener("DOMContentLoaded", function() {
    const timer = document.querySelector('.timer');
    const minSpan = document.querySelector('.min');
    const secSpan = document.querySelector('.sec');
    const msecSpan = document.querySelector('.msecs');
    const startStopBtn = document.querySelector('.toggle');
    const resetBtn = document.querySelector('.reset');
    const lapBtn = document.querySelector('.lap');
    const lapBox = document.querySelector('.lap-box');
  
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isPaused = false;
  
    function pad(number) {
      return number < 10 ? '0' + number : number;
    }
  
    function updateTimer() {
      const now = new Date().getTime();
      elapsedTime = now - startTime;
  
      const minutes = Math.floor(elapsedTime / (1000 * 60));
      const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
      const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  
      minSpan.textContent = pad(minutes) + ' ';
      secSpan.textContent = pad(seconds) + ' ';
      msecSpan.textContent = pad(milliseconds);
    }
  
    function startStopTimer() {
      if (!startTime) {
        startTime = new Date().getTime() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);
        startStopBtn.textContent = 'Stop';
        isPaused = false;
        startStopBtn.classList.add('on');
      } else {
        clearInterval(timerInterval);
        startTime = null;
        startStopBtn.textContent = 'Start';
        isPaused = true;
        startStopBtn.classList.remove('on');
      }
    }
  
    function resetTimer() {
      clearInterval(timerInterval);
      startTime = null;
      elapsedTime = 0;
      minSpan.textContent = '00 ';
      secSpan.textContent = '00 ';
      msecSpan.textContent = '00';
      startStopBtn.textContent = 'Start';
      lapBox.innerHTML = '';
      isPaused = false;
      startStopBtn.classList.remove('on');
    }
  
    function addLap() {
      if (startTime) {
        const lapTime = document.createElement('li');
        lapTime.textContent = timer.textContent;
        lapBox.appendChild(lapTime);
      }
    }
  
    startStopBtn.addEventListener('click', startStopTimer);
    resetBtn.addEventListener('click', resetTimer);
    lapBtn.addEventListener('click', addLap);
  });
  