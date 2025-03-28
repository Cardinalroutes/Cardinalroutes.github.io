// Filtrado de Tours
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    // Remover clase active de todos los botones
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    // Añadir clase active al botón clickeado
    button.classList.add('active');
    
    const filter = button.dataset.filter;
    filterAdventures(filter);
  });
});

function filterAdventures(filter) {
  const cards = document.querySelectorAll('.adventure-card');
  
  cards.forEach(card => {
    if (filter === 'all' || card.dataset.category === filter) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Contador de Cupos
const tourAvailability = {
  "cayo-sombrero": {
    total: 30,
    booked: 16,
    lastUpdated: new Date().toISOString().split('T')[0]
  },
  "la-grieta": {
    total: 30,
    booked: 0,
    lastUpdated: new Date().toISOString().split('T')[0]
  },
  "Tour patanemo": {
    total: 30,
    booked: 2,
    lastUpdated: new Date().toISOString().split('T')[0]
  },
"choroni": {
    total: 30,
    booked: 0,
    lastUpdated: new Date().toISOString().split('T')[0]
  }
};

function updateSeatsCounters() {
  document.querySelectorAll('.adventure-card').forEach(card => {
    const tourTitle = card.querySelector('h3').textContent.toLowerCase();
    let tourId;
    
    if (tourTitle.includes('cayo')) tourId = "cayo-sombrero";
    else if (tourTitle.includes('grieta')) tourId = "la-grieta";
    
    if (tourAvailability[tourId]) {
      const { total, booked } = tourAvailability[tourId];
      const available = total - booked;
      const percentage = (booked / total) * 100;
      
      const seatsElement = card.querySelector('.seats');
      seatsElement.textContent = available;
      
      // Cambiar color si quedan pocos cupos
      if (available <= 5) {
        seatsElement.setAttribute('data-low', 'true');
      } else {
        seatsElement.removeAttribute('data-low');
      }
      
      // Actualizar barra de progreso
      card.querySelector('.progress-fill').style.width = `${percentage}%`;
    }
  });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  updateSeatsCounters();
  // Actualizar cada 30 minutos (opcional)
  setInterval(updateSeatsCounters, 1800000);
});

// Efecto Pulse para CTA
const pulseButton = document.querySelector('.pulse');
if (pulseButton) {
  setInterval(() => {
    pulseButton.style.transform = 'scale(1.05)';
    setTimeout(() => {
      pulseButton.style.transform = 'scale(1)';
    }, 1000);
  }, 2000);
}

// Cargar widgets de Instagram
function loadInstagram() {
  const script = document.createElement('script');
  script.src = 'https://www.instagram.com/embed.js';
  script.async = true;
  document.body.appendChild(script);
}

// Cargar cuando la página esté lista
if (document.querySelector('.instagram-media')) {
  window.addEventListener('DOMContentLoaded', loadInstagram);
}

// En nueva-scripts.js
const hashtag = "CardinalRoutesTestimonio";

const videoSources = [
  "video/video-part-1.mp4",
  "video/video-part-2.mp4",
  "video/video-part-3.mp4",
  "video/video-part-4.mp4"
];

const videoElement = document.getElementById("bg-video");
let currentVideoIndex = 0;

// Función para cargar el siguiente video
function loadNextVideo() {
  currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
  
  // Efecto de transición
  videoElement.style.opacity = 0;
  
  setTimeout(() => {
    videoElement.src = videoSources[currentVideoIndex];
    videoElement.play();
    videoElement.style.opacity = 1;
  }, 500); // Duración del fade
}

// Cambiar video cuando termine el actual
videoElement.addEventListener("ended", loadNextVideo);

// Precargar el siguiente video
function preloadNextVideo() {
  const nextIndex = (currentVideoIndex + 1) % videoSources.length;
  const tempVideo = document.createElement("video");
  tempVideo.src = videoSources[nextIndex];
  tempVideo.load();
}

// Iniciar
document.addEventListener("DOMContentLoaded", () => {
  preloadNextVideo();
});
