// Enhanced interactions: theme toggle, section reveal, and gallery lightbox
document.addEventListener('DOMContentLoaded', () => {
  console.log('Glow Beauty Salon — interactive enhancements loaded.');

  // Theme toggle
  const toggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (toggleBtn) {
      toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
      toggleBtn.title = theme === 'dark' ? 'Switch to light' : 'Switch to dark';
    }
  }
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
  }

  // Section reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('section').forEach(s => io.observe(s));

  // Gallery lightbox
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('.lightbox-img');
    const lbCaption = lightbox.querySelector('.lightbox-caption');
    const lbClose = lightbox.querySelector('.lightbox-close');

    function openLightbox(img) {
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      lbCaption.textContent = img.dataset.caption || img.alt || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => { lbImg.src = ''; }, 220);
    }

    document.querySelectorAll('.gallery .img-box').forEach(box => {
      const img = box.querySelector('img');
      box.addEventListener('click', () => openLightbox(img));
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(img); }
      });
    });

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }
});
