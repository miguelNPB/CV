const hamburguerButton = document.getElementById('hamburguerButton');
const contentDiv = document.getElementById('contentDiv');

const containerNav = document.getElementById('navLinksContainer');
const navLinks = containerNav.getElementsByTagName('a');

// MENU LATERAL

const mobileQuery = window.matchMedia('(max-width: 767px)');

if (mobileQuery.matches) {
  contentDiv.classList.add('hidden');
}

mobileQuery.addEventListener('change', (e) => {
  if (e.matches) {
    contentDiv.classList.add('hidden');
  } else {
    contentDiv.classList.remove('hidden');
  }
});

hamburguerButton.addEventListener('click', () => {
  if (!mobileQuery.matches) return;
  contentDiv.classList.toggle('hidden');
});

Array.from(navLinks).forEach((link) => {
  link.addEventListener('click', () => {
    if (mobileQuery.matches) {
      contentDiv.classList.add('hidden');
    }
  });
});

// PARALLAX DE FONDOS

window.addEventListener('scroll', function () {
  const bg1 = document.querySelector('.background-gradient');
  const bg2 = document.querySelector('.navegacion-lateral-container');
  const scrolled = window.scrollY;

  const speed = -0.2;

  bg1.style.backgroundPosition = `0px ${scrolled * speed}px`;
  bg2.style.backgroundPosition = `0px ${scrolled * speed}px`;
});

// VIDEOS: PAUSAR/REANUDAR SEGUN VISIBILIDAD

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.play();
    } else {
      entry.target.pause();
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('video').forEach(video => observer.observe(video));

// CARRUSEL DE JUEGOS

document.addEventListener('DOMContentLoaded', () => {
  const track   = document.getElementById('juegosTrack');
  const prevBtn = document.getElementById('juegosPrev');
  const nextBtn = document.getElementById('juegosNext');
  const dots    = document.querySelectorAll('.juegos-dot');

  if (!track) return;

  const slides = track.querySelectorAll('.juegos-slide');
  const total  = slides.length;
  let currentIndex = 0;

  function update() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  }

  const goNext = () => { currentIndex = (currentIndex + 1) % total; update(); };
  const goPrev = () => { currentIndex = (currentIndex - 1 + total) % total; update(); };

  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.dataset.index, 10);
      update();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft')  goPrev();
  });

  update();
});

// LITE YOUTUBE EMBED

document.addEventListener('DOMContentLoaded', () => {
  const placeholders = document.querySelectorAll('.juegos-video[data-video-id]');

  placeholders.forEach(container => {
    const videoId = container.dataset.videoId;
    const button = container.querySelector('.juegos-video-play');
    if (!videoId || !button) return;

    button.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.title = button.getAttribute('aria-label') || 'YouTube video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;

      container.innerHTML = '';
      container.appendChild(iframe);
    });
  });
});