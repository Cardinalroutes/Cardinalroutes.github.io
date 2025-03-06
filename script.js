/ Referencia al elemento de audio
const audio = document.getElementById("background-audio");

// Referencia al botón de reproducción
const playButton = document.getElementById("play-button");

// Evento para iniciar la música al hacer clic
playButton.addEventListener("click", () => {
  audio.play();
  playButton.style.display = "none"; // Oculta el botón después de iniciar la música
});
