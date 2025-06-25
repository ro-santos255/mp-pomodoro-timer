const pomodoroButton = document.querySelector('#pomodoro');
const intervaloCurtoButton = document.querySelector('#intervaloCurto');
const intervaloLongoButton = document.querySelector('#intervaloLongo');
const counter = document.querySelector('#counter');
const startButton = document.querySelector('#start');

// Variável para armazenar os estados, pomodoro, intervalo curto e intervalo longo
let tempoSelecionado = "pomodoro";

// Função para mudar as classes dos botões selecionados
function mudarClasseSelecionada(timer) {
  
  if (timer === "pomodoro") {
    pomodoroButton.classList.add('active-button');
    intervaloCurtoButton.classList.remove('active-button');
    intervaloLongoButton.classList.remove('active-button');
  } else if (timer === "intervaloCurto") {
    intervaloCurtoButton.classList.add('active-button');
    pomodoroButton.classList.remove('active-button');
    intervaloLongoButton.classList.remove('active-button');
  } else if (timer === "intervaloLongo") {
    intervaloLongoButton.classList.add('active-button');
    pomodoroButton.classList.remove('active-button');
    intervaloCurtoButton.classList.remove('active-button');
  }
}

function secondsToMinutesAndSeconds(TotalSeconds) {
  const minutes = Math.floor(TotalSeconds / 60);
  const seconds = TotalSeconds % 60;
  const padSeconds = seconds.toString().padStart(2, '0');
  return `${minutes}:${padSeconds}`;
}

function getTimerValue(timer) {
  return {
    pomodoro: 25 * 60, // 25 minutos em segundos
    intervaloCurto: 5 * 60, // 5 minutos em segundos
    intervaloLongo: 25 * 60 // 15 minutos em segundos
  }[timer];
}

function mudarValorTempo(timer) {
  counter.textContent = secondsToMinutesAndSeconds(getTimerValue(timer));
}
function AtualizarTempo(timer) {
  tempoSelecionado = timer;

  mudarClasseSelecionada(timer);
  mudarValorTempo(timer);
}
let interval = null
function startTimer(timer) {
  let seconds = getTimerValue(timer);

  interval = setInterval(() => {
    seconds--;
    counter.textContent = secondsToMinutesAndSeconds(seconds);

    if (seconds === 0) {
      clearInterval(interval);
    }
  }, 10);
}

function ResetTimer() {
  clearInterval(interval);
  mudarValorTempo(tempoSelecionado);
}