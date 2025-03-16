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