// Carrusel de la galería
let currentIndex = 0;

function moveCarousel(step) {
  const carousel = document.querySelector('.carousel');
  const items = carousel.querySelectorAll('.carousel-item');
  currentIndex = (currentIndex + step + items.length) % items.length;

  items.forEach((item, index) => {
    item.classList.remove('active');
    if (index === currentIndex) {
      item.classList.add('active');
    }
  });
}

// Carrusel automático
function startAutoCarousel(interval = 5000) {
  setInterval(() => {
    moveCarousel(1);
  }, interval);
}

startAutoCarousel();

// Lista de partes del video
const videoSources = [
  "video-part-1.mp4",
  "video-part-2.mp4",
  "video-part-3.mp4",
  "video-part-4.mp4",
  "video-part-5.mp4"
];

// Referencia al elemento de video y audio
const videoElement = document.getElementById("background-video");
const audioElement = document.getElementById("background-audio");

// Índice de la parte actual del video
let currentPart = 0;

// Tiempo de inicio y fin del bucle de la canción (en segundos)
const loopStart = 25; // Punto A (10 segundos)
const loopEnd = 79;   // Punto B (30 segundos)

// Función para cargar la siguiente parte del video
function loadNextVideoPart() {
  currentPart = (currentPart + 1) % videoSources.length;

  // Aplicar fundido antes de cambiar el video
  videoElement.style.opacity = 0;

  setTimeout(() => {
    videoElement.src = videoSources[currentPart];
    videoElement.play();
    videoElement.style.opacity = 1; // Restaurar opacidad
  }, 1000); // Duración del fundido (1 segundo)
}
// Función para manejar el bucle de la canción
function loopAudio() {
  if (audioElement.currentTime >= loopEnd) {
    audioElement.currentTime = loopStart; // Reinicia al punto A
  }
}

// Evento que se dispara cuando el video termina
videoElement.addEventListener("ended", loadNextVideoPart);

// Evento que se dispara mientras el audio se reproduce
audioElement.addEventListener("timeupdate", loopAudio);

// Cargar la primera parte del video al iniciar
videoElement.src = videoSources[currentPart];
videoElement.play();

// Reproducir la canción de fondo
audioElement.currentTime = loopStart; // Comienza desde el punto A
audioElement.play();
}
