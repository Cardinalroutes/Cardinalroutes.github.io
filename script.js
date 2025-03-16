// Referencia al elemento de audio
const audio = document.getElementById("background-audio");

// Referencia al botón de reproducción
const playButton = document.getElementById("play-button");

// Referencia al logo (si también funciona como botón de reproducción)
const logoButton = document.getElementById("logo-button");

// Función para reproducir/pausar el audio
function toggleAudio() {
  if (audio.paused) {
    audio.play();
    playButton.style.display = "none";
    if (logoButton) {
      logoButton.style.filter = "drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))";
    }
  } else {
    audio.pause();
    if (logoButton) {
      logoButton.style.filter = "none";
    }
  }
}

// Evento para iniciar la música al hacer clic en el botón de reproducción
playButton.addEventListener("click", toggleAudio);

// Evento para iniciar la música al hacer clic en el logo (si está configurado)
if (logoButton) {
  logoButton.addEventListener("click", toggleAudio);
}

// Mostrar el botón de reproducción si el audio no se inicia automáticamente
window.addEventListener("load", () => {
  if (audio.paused) {
    playButton.style.display = "block";
  }
});

// Manejar errores de audio
audio.addEventListener("error", () => {
  console.error("Error al cargar el audio.");
  playButton.style.display = "none";
});
