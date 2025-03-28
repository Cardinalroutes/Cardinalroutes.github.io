// Datos de disponibilidad (actualiza estos valores)
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
  "tour-patanemo": {
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

// Actualizar contadores y barras de progreso
function updateSeatsCounters() {
  document.querySelectorAll('.adventure-card').forEach(card => {
    const tourId = card.dataset.tour;
    
    if (tourAvailability[tourId]) {
      const { total, booked } = tourAvailability[tourId];
      const available = total - booked;
      const percentage = Math.min(100, (booked / total) * 100); // No más de 100%
      
      // Actualizar contador numérico
      const seatsElement = card.querySelector('.seats');
      if (seatsElement) {
        seatsElement.textContent = available;
        seatsElement.classList.toggle('low-availability', available <= 5);
      }
      
      // Actualizar barra de progreso
      const progressFill = card.querySelector('.progress-fill');
      if (progressFill) {
        progressFill.style.width = `${percentage}%`;
      }
    }
  });
}

// Filtrado de tours
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filter = button.dataset.filter;
    document.querySelectorAll('.adventure-card').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
    });
  });
});

// Sistema de videos de fondo
const videoSources = [
  "video/video-part-1.mp4",
  "video/video-part-2.mp4",
  "video/video-part-3.mp4",
  "video/video-part-4.mp4"
];

function setupVideoRotation() {
  const videoElement = document.getElementById("bg-video");
  if (!videoElement || videoSources.length === 0) return;

  let currentVideoIndex = 0;

  function loadNextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    videoElement.style.opacity = 0;
    
    setTimeout(() => {
      videoElement.src = videoSources[currentVideoIndex];
      videoElement.play()
        .then(() => videoElement.style.opacity = 1)
        .catch(e => console.error("Error al reproducir video:", e));
    }, 500);
  }

  videoElement.addEventListener("ended", loadNextVideo);
  
  // Precargar siguiente video
  const nextVideo = document.createElement("video");
  nextVideo.src = videoSources[1];
  nextVideo.preload = "auto";
}

// Efecto de pulso para CTA
function setupPulseEffect() {
  const pulseButton = document.querySelector('.pulse');
  if (pulseButton) {
    setInterval(() => {
      pulseButton.style.transform = pulseButton.style.transform === 'scale(1.05)' ? 'scale(1)' : 'scale(1.05)';
    }, 1000);
  }
}

// Cargar widgets de Instagram
function loadInstagramWidgets() {
  if (document.querySelector('.instagram-media')) {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }
}

// Inicialización completa
document.addEventListener('DOMContentLoaded', () => {
  updateSeatsCounters();
  setInterval(updateSeatsCounters, 1800000); // Actualizar cada 30 minutos
  
  setupVideoRotation();
  setupPulseEffect();
  loadInstagramWidgets();
});
