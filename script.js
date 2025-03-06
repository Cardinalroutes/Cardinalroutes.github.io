// Referencia al elemento de audio
const audio = document.getElementById("background-audio");

// Referencia al logo que actúa como botón
const logoButton = document.getElementById("logo-button");

// Evento para iniciar la música al hacer clic en el logo
logoButton.addEventListener("click", () => {
  audio.play();
});
