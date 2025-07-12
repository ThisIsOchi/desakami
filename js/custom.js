  // ===================================================================
  // AOS Configurtation
  // ===================================================================
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
});
  // ===================================================================
  // Fiks Point Link
  // ===================================================================
window.addEventListener('load', function () {
  if (window.location.hash) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 1);
});
  // ===================================================================
  // Image sistem
  // ===================================================================
document.addEventListener('DOMContentLoaded', function () {
  const imageOverlay = document.getElementById('image-overlay');
  if (imageOverlay) { 
    const zoomableImages = document.querySelectorAll('.zoomable-image');
    const zoomedImage = document.getElementById('zoomed-image');
    const closeButton = document.getElementById('close-button');

    zoomableImages.forEach(img => {
      img.addEventListener('click', function () {
        const imageUrl = this.src;
        zoomedImage.setAttribute('src', imageUrl);
        imageOverlay.classList.add('visible');
      });
    });

    const closeOverlay = () => {
      imageOverlay.classList.remove('visible');
      setTimeout(() => {
        zoomedImage.setAttribute('src', '');
      }, 300);
    };

    closeButton.addEventListener('click', closeOverlay);

    imageOverlay.addEventListener('click', function (event) {
      if (event.target === imageOverlay) {
        closeOverlay();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && imageOverlay.classList.contains('visible')) {
        closeOverlay();
      }
    });
  }

  // ===================================================================
  // Kode untuk animasi diagram batang (progress bar)
  // ===================================================================
  const chart = document.querySelector('.progress-chart');
  const progressBars = document.querySelectorAll('.progress-chart .progress-bar');

  const targetWidths = [];
  progressBars.forEach((bar, index) => {
    targetWidths[index] = bar.style.width;
    bar.style.width = '0%';
  });

  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.width = targetWidths[index];
            }, 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 }); 
  if (chart) {
    observer.observe(chart);
  }
});