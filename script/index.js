const minuses = document.querySelectorAll('.customization__button_type_minus');
const pluses = document.querySelectorAll('.customization__button_type_plus');
const mainClock = document.querySelector('.timer__clock');
const buttonStart = document.querySelector('.pomodoro__button_type_start');
const buttonReset = document.querySelector('.pomodoro__button_type_reset');
const timerTitle = document.querySelector('.timer__title');
const timerBreak = document.querySelector('#break');
const timerSession = document.querySelector('#session-time');
const audio = document.querySelector('audio');
let timerId;

minuses.forEach(function (minus) {
  minus.addEventListener('click', addMinus);
})
pluses.forEach(function (plus) {
  plus.addEventListener('click', addPlus);
})
buttonStart.addEventListener('click', startTimerSession);
buttonReset.addEventListener('click', clickReset);

// Обновляем таймер
function clickReset() {
  timerTitle.textContent = 'Session';
  mainClock.textContent = '25:00';
  clearInterval(timerId);
  buttonStart.textContent = 'Start';
  buttonStart.removeEventListener('click', stopTimerSession);
  buttonStart.addEventListener('click', startTimerSession);
  timerBreak.textContent = '5';
  timerSession.textContent = '25';
}

function stopTimerSession() {
  clearInterval(timerId);
  this.textContent = 'Start';
  this.removeEventListener('click', stopTimerSession);
  this.addEventListener('click', startTimerSession);
}

function startTimerSession() {
  this.textContent = 'Pause';
  const time = document.querySelector('.timer__clock');
  timerId = setInterval(function () {

    if (time.textContent === '00:00') {
      audio.play();
      timerTitle.textContent = toggleTimerTitle(document.querySelector('.timer__title').textContent);
      if (timerTitle.textContent === 'Session') {
        time.textContent = getTimeForSession();
      }
      else {
        time.textContent = getTimeForBreak()
      }
    }
    else {
      let minutes = time.textContent.split(':')[0];
      let seconds = time.textContent.split(':')[1];
      if (minutes.length === 1) {
        minutes = `0${minutes}`;
      }
      if (seconds <= 59 && seconds >= 1) {
        if (seconds <= 59 && seconds > 10) {
          time.textContent = `${minutes}:${Number(seconds) - 1}`;
        }
        else {
          time.textContent = `${minutes}:0${Number(seconds) - 1}`;
        }

      }
      else {
        if (minutes > 9) {
          time.textContent = `${Number(minutes) - 1}:59`;
        }
        else {
          let second = minutes.slice(1);
          time.textContent = `0${Number(second) - 1}:59`;
        }

      }
    }

  }, 1000)

  this.removeEventListener('click', startTimerSession);
  this.addEventListener('click', stopTimerSession);
}

// Меняем название таймера
function toggleTimerTitle(text) {
  if (text === 'Session') {
    return 'Break'
  }
  else {
    return 'Session'
  }
}

// Получаем время для таймера из Сессии
function getTimeForSession() {
  const timeSession = document.querySelector('#session-time');
  if (timeSession.textContent < 10) {
    return `0${timeSession.textContent}:00`;
  }
  else {
    return `${timeSession.textContent}:00`;
  }
}

// Получаем время для таймера из Перерыва
function getTimeForBreak() {
  const timeBreak = document.querySelector('#break');
  if (timeBreak.textContent < 10) {
    return `0${timeBreak.textContent}:00`;
  }
  else {
    return `${timeBreak.textContent}:00`;
  }
}

// Очищаем счетчик от нуля
function deleteFirstZero(num) {
  if (num[0] == '0') {
    let res = num.slice(1);
    return res
  }
  else {
    return num
  }
}

// Плюс
function addPlus(evt) {
  const timer = getTimer(evt.target);
  if (timer.textContent <= 8) {
    timer.textContent = `0${Number(timer.textContent) + 1}`;
  }
  else {
    timer.textContent = `${Number(timer.textContent) + 1}`;
  }
  if (evt.target.closest('#session')) {
    mainClock.textContent = `${timer.textContent}:00`;
  }
  timer.textContent = deleteFirstZero(timer.textContent);
}

// Минус
function addMinus(evt) {
  const timer = getTimer(evt.target);
  if (timer.textContent !== '1') {
    if (timer.textContent <= 10) {
      timer.textContent = `0${Number(timer.textContent) - 1}`;
    }
    else {
      timer.textContent = `${Number(timer.textContent) - 1}`;
    }
  }
  if (evt.target.closest('#session')) {
    if (timer.textContent == '1') {
      mainClock.textContent = `0${timer.textContent}:00`;
    }
    else {
      mainClock.textContent = `${timer.textContent}:00`;
    }

  }
  timer.textContent = deleteFirstZero(timer.textContent);
}

// Получаем счетчик времени
function getTimer(evt) {
  return evt.closest('.customization').querySelector('.customization__counter');
}

