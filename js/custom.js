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
})
// ===================================================================
// Aparatur Desa - Fungsi untuk Optimalisasi Tampilan
// ===================================================================
function initAparaturCards() {
    const aparaturCards = document.querySelectorAll('.aparatur-card');
    
    // Fungsi untuk menyesuaikan margin antar card
    function adjustCardSpacing() {
        if (window.innerWidth < 768) {
            let previousBottom = 0;
            
            aparaturCards.forEach((card, index) => {
                const cardRect = card.getBoundingClientRect();
                
                if (index > 0) {
                    const currentTop = cardRect.top + window.scrollY;
                    const prevBottom = previousBottom;
                    
                    if (currentTop < prevBottom) {
                        const overlap = prevBottom - currentTop;
                        card.style.marginTop = `${overlap + 30}px`;
                    }
                }
                
                previousBottom = cardRect.bottom + window.scrollY;
            });
        } else {
            // Reset margin di desktop
            aparaturCards.forEach(card => {
                card.style.marginTop = '';
            });
        }
    }
    
    // Fungsi untuk animasi saat scroll
    function animateOnScroll() {
        aparaturCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.8) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial opacity dan transform untuk animasi
    aparaturCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Panggil fungsi pertama kali
    adjustCardSpacing();
    animateOnScroll();
    
    // Event listeners
    window.addEventListener('load', () => {
        adjustCardSpacing();
        setTimeout(animateOnScroll, 300);
    });
    
    window.addEventListener('resize', adjustCardSpacing);
    window.addEventListener('scroll', animateOnScroll);
}

// Panggil fungsi setelah DOM siap
document.addEventListener('DOMContentLoaded', initAparaturCards);

// ===================================================================
// Adjust Bottom Sheet Image Size Dynamically
// ===================================================================
function adjustBottomSheetImages() {
  const offcanvasImages = document.querySelectorAll('.offcanvas-body img');
  
  offcanvasImages.forEach(img => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Atur ukuran maksimal berdasarkan orientasi
    if (viewportWidth > 992 && viewportWidth > viewportHeight) {
      // Landscape desktop
      img.style.maxHeight = '300px';
      img.style.maxWidth = '60%';
    } else if (viewportWidth > 768) {
      // Desktop portrait/tablet
      img.style.maxHeight = '400px';
      img.style.maxWidth = '80%';
    } else {
      // Mobile
      img.style.maxHeight = '250px';
      img.style.maxWidth = '100%';
    }
  });
}

// Panggil saat load dan resize
window.addEventListener('load', adjustBottomSheetImages);
window.addEventListener('resize', adjustBottomSheetImages);

// Juga panggil saat offcanvas ditampilkan
document.querySelectorAll('[data-bs-toggle="offcanvas"]').forEach(button => {
  button.addEventListener('click', function() {
    setTimeout(adjustBottomSheetImages, 500);
  });
});

/**
 * CONTACT FORM FUNCTIONS
 */

// Show send method confirmation
function confirmSend() {
    const form = document.getElementById('contactForm');
    
    // Check form validity
    if (form.checkValidity()) {
        // Show modal if form is valid
        const modal = new bootstrap.Modal(document.getElementById('sendConfirmation'));
        modal.show();
    } else {
        // Trigger form validation UI
        form.reportValidity();
    }
}

// Contact Form Functions
function confirmSend() {
    const form = document.getElementById('contactForm');
    
    if (form.checkValidity()) {
        const modal = new bootstrap.Modal(document.getElementById('sendConfirmation'));
        modal.show();
    } else {
        form.reportValidity();
    }
}

function sendViaWhatsApp() {
    const form = document.getElementById('contactForm');
    const nama = form.nama.value;
    const email = form.email.value;
    const subjek = form.subjek.value;
    const pesan = form.pesan.value;
    
    const whatsappNumber = '6285868069366';
    const whatsappMessage = 
        `*PESAN DARI WEBSITE DESA*%0A%0A` +
        `*Nama Pengirim:*%0A${nama}%0A%0A` +
        `*Alamat Email:*%0A${email}%0A%0A` +
        `*Subjek Pesan:*%0A${subjek}%0A%0A` +
        `*Isi Pesan:*%0A${pesan}`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    bootstrap.Modal.getInstance(document.getElementById('sendConfirmation')).hide();
}

function sendViaEmail() {
    const form = document.getElementById('contactForm');
    const nama = form.nama.value;
    const email = form.email.value;
    const subjek = form.subjek.value;
    const pesan = form.pesan.value;
    
    const emailTo = 'mezuexcellent@gmail.com';
    const emailSubject = `[Website Desa] ${subjek}`;
    const emailBody = 
        `Dear Admin Desa,\n\n` +
        `Berikut pesan yang diterima melalui website:\n\n` +
        `Nama Pengirim: ${nama}\n` +
        `Email: ${email}\n\n` +
        `Subjek: ${subjek}\n\n` +
        `Isi Pesan:\n${pesan}\n\n` +
        `Hormat kami,\n` +
        `Sistem Website Desa`;
    
    window.open(`mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`);
    bootstrap.Modal.getInstance(document.getElementById('sendConfirmation')).hide();
}