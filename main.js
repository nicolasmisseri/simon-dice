let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;

const $botonEmpezar = document.querySelector("#botonEmpezar");
$botonEmpezar.onclick = function () {
  mostrarPatronMaquina(secuenciaMaquina);
  habilitarPatronUsuario(secuenciaUsuario);
  while (compararPatrones(secuenciaMaquina, secuenciaUsuario)) {
    mostrarPatron(secuenciaMaquina);
    habilitarPatronUsuario(secuenciaUsuario);
  }
  mostrarMensajeFinal();
  resetearJuego();
};

// TRAER LOS CUADROS
const cuadros = document.querySelectorAll(".cuadro");
console.log(cuadros);

// PRENDER Y APAGAR EL CUADRO

function prenderYApagar(cuadro) {
  setTimeout(() => {
    cuadro.className = "prendido";
  }, 1500);

  setTimeout(() => {
    cuadro.className = "cuadro";
  }, 2000);
}

// Obtener secuencia random (máquina)

function encenderCuadroRandom() {
  let numberRandom = Math.floor(Math.random() * (4 - 0) + 0);

  secuenciaMaquina.push(numberRandom + 1);

  setTimeout(() => {
    prenderYApagar(cuadros[Math.floor(numberRandom)]);
  }, 2000);
}

function turnoDelUsuario() {
  const cuadro1 = document.querySelector("#cuadro-1");
  const cuadro2 = document.querySelector("#cuadro-2");
  const cuadro3 = document.querySelector("#cuadro-3");
  const cuadro4 = document.querySelector("#cuadro-4");

  cuadro1.onclick = function () {
    prenderYApagar(cuadros[0]);
    secuenciaUsuario.push(1);
  };
  cuadro2.onclick = function () {
    prenderYApagar(cuadros[1]);
    secuenciaUsuario.push(2);
  };
  cuadro3.onclick = function () {
    prenderYApagar(cuadros[3]);
    secuenciaUsuario.push(3);
  };
  cuadro4.onclick = function () {
    prenderYApagar(cuadros[3]);
    secuenciaUsuario.push(4);
  };
}

encenderCuadroRandom();
turnoDelUsuario();
setTimeout(() => {
  compararArrays(secuenciaMaquina, secuenciaUsuario);
}, 10000);

function compararArrays(secuenciaMaquina, secuenciaUsuario) {
  var encuentra = false;
  for (var i = 0; i < secuenciaMaquina.length; i++) {
    encuentra = false;
    for (var j = 0; j < secuenciaUsuario.length; j++) {
      if (secuenciaMaquina[i] == secuenciaUsuario[j]) {
        encuentra = true;
        break;
      }
    }
    if (!encuentra) {
      alert("Perdiste!");
      break;
    }
  }
  if (encuentra) {
    alert("Ganaste!");
  }
}

// Seguir despues
