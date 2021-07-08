let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;

const $botonEmpezar = document.querySelector("#botonEmpezar");
$botonEmpezar.onclick = comenzarJuego;

actualizarEstado('Toca "Empezar" para jugar!');
actualizarNumeroRonda("-");
bloquearInputUsuario();

function comenzarJuego() {
  reiniciarEstado();
  manejarRonda();
}

function reiniciarEstado() {
  secuenciaMaquina = [];
  secuenciaUsuario = [];
  ronda = 0;
}

function obtenerCuadroAleatorio() {
  const $cuadros = document.querySelectorAll(".cuadro");
  const indice = Math.floor(Math.random() * $cuadros.length);
  return $cuadros[indice];
}

function manejarRonda() {
  actualizarEstado("Turno de la máquina");
  bloquearInputUsuario();

  const $nuevoCuadro = obtenerCuadroAleatorio();
  secuenciaMaquina.push($nuevoCuadro);

  const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;

  secuenciaMaquina.forEach(function ($cuadro, index) {
    const RETRASO_MS = (index + 1) * 1000;
    setTimeout(function () {
      resaltar($cuadro);
    }, RETRASO_MS);
  });

  setTimeout(function () {
    actualizarEstado("Turno del Jugador");
    desbloquearInputUsuario();
  }, RETRASO_TURNO_JUGADOR);

  secuenciaUsuario = [];
  ronda++;
  actualizarNumeroRonda(ronda);
}

function actualizarEstado(estado, error = false) {
  const $estado = document.querySelector("#estado");
  $estado.textContent = estado;
  if (error) {
    $estado.classList.remove("alert-primary");
    $estado.classList.add("alert-danger");
  } else {
    $estado.classList.remove("alert-danger");
    $estado.classList.add("alert-primary");
  }
}

function actualizarNumeroRonda(ronda) {
  document.querySelector("#ronda").textContent = ronda;
}

function bloquearInputUsuario() {
  document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
    $cuadro.onclick = function () {};
  });
}
function desbloquearInputUsuario() {
  document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
    $cuadro.onclick = manejarInputUsuario;
  });
}

function manejarInputUsuario(e) {
  // e -> evento
  const $cuadro = e.target;
  resaltar($cuadro);
  secuenciaUsuario.push($cuadro);

  const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1]; // [secuenciaUsuario.length - 1] es el ultimo indice disponible
  if ($cuadro.id !== $cuadroMaquina.id) {
    perder();
    return;
  }

  if (secuenciaUsuario.length === secuenciaMaquina.length) {
    bloquearInputUsuario();
    setTimeout(manejarRonda, 1000);
  }
}

function resaltar($cuadro) {
  $cuadro.style.opacity = 2;
  setTimeout(() => {
    $cuadro.style.opacity = 0.5;
  }, 500);
}
function perder() {
  bloquearInputUsuario();
  reiniciarEstado();
  actualizarEstado('Perdiste! Toca "Empezar" para jugar de nuevo!', true);
}
