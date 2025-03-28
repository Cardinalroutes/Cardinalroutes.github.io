// Filtrado de Tours (este está correcto)
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
    
    const filter = button.dataset.filter;
    filterAdventures(filter);
  });
});

function filterAdventures(filter) {
  const cards = document.querySelectorAll('.adventure-card');
  cards.forEach(card => {
    card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
  });
}

// Datos de disponibilidad actualizados
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
  "tour-patanemo": {  // Cambiado a minúsculas y sin espacio
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

// Función mejorada para actualizar contadores
function updateSeatsCounters() {
  document.querySelectorAll('.adventure-card').forEach(card => {
    const tourTitle = card.querySelector('h3').textContent.toLowerCase();
    let tourId;
    
    // Mapeo completo de todos los tours
    if (tourTitle.includes('cayo')) tourId = "cayo-sombrero";
    else if (tourTitle.includes('grieta')) tourId = "la-grieta";
    else if (tourTitle.includes('patanemo')) tourId = "tour-patanemo";
    else if (tourTitle.includes('choroni')) tourId = "choroni";
    
    if (tourAvailability[tourId]) {
      const { total, booked } = tourAvailability[tourId];
      const available = total - booked;
      const percentage = Math.min(100, (booked / total) * 100); // Asegura no pasar de 100%
      
      // Actualizar contador numérico
      const seatsElement = card.querySelector('.seats');
      if (seatsElement) {
        seatsElement.textContent = available;
        seatsElement.style.color = available <= 5 ? '#e74c3c' : ''; // Rojo si quedan pocos
      }
      
      // Actualizar barra de progreso con validación
      const progressFill = card.querySelector('.progress-fill');
      if (progressFill) {
        progressFill.style.width = `${percentage}%`;
      }
    }
  });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  updateSeatsCounters();
  setInterval(updateSeatsCounters, 1800000); // Actualizar cada 30 minutos
  
  // Efecto Pulse para CTA
  const pulseButton = document.querySelector('.pulse');
  if (pulseButton) {
    setInterval(() => {
      pulseButton.style.transform = pulseButton.style.transform === 'scale(1.05)' ? 'scale(1)' : 'scale(1.05)';
    }, 1000);
  }

  // Cargar Instagram si existe
  if (document.querySelector('.instagram-media')) {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }

  // Precargar siguiente video
  const videoSources = [
    "video/video-part-1.mp4",
    "video/video-part-2.mp4",
    "video/video-part-3.mp4",
    "video/video-part-4.mp4"
  ];
  
  const videoElement = document.getElementById("bg-video");
  if (videoElement) {
    let currentVideoIndex = 0;
    
    function loadNextVideo() {
      currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
      videoElement.style.opacity = 0;
      setTimeout(() => {
        videoElement.src = videoSources[currentVideoIndex];
        videoElement.play();
        videoElement.style.opacity = 1;
      }, 500);
    }
    
    videoElement.addEventListener("ended", loadNextVideo);
    
    // Precargar el siguiente video
    const nextIndex = (currentVideoIndex + 1) % videoSources.length;
    const tempVideo = document.createElement("video");
    tempVideo.src = videoSources[nextIndex];
    tempVideo.load();
  }
});
