document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. AMBIENT PARTICLES (囍) GENERATOR ---
  const ambientLayer = document.getElementById('ambient-layer');
  const particleSymbols = ['囍', '囍', '囍']; // Multiple for weight
  
  function createParticle() {
    if (!ambientLayer) return;
    const particle = document.createElement('div');
    particle.className = 'ambient-particle';
    particle.innerText = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
    
    // Random styling
    const leftPos = Math.random() * 100;
    const size = 12 + Math.random() * 12; // 12px to 24px
    const duration = 6 + Math.random() * 8; // 6s to 14s
    const delay = Math.random() * 3;
    const sway = -30 + Math.random() * 60; // -30px to 30px horizontal sway
    
    particle.style.left = `${leftPos}%`;
    particle.style.fontSize = `${size}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.setProperty('--sway', `${sway}px`);
    
    // Color variants
    const colors = ['#f0d497', '#ffe8b5', '#ffc107', '#ff6b6b'];
    particle.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    ambientLayer.appendChild(particle);
    
    // Remove after animation completes
    setTimeout(() => {
      particle.remove();
    }, (duration + delay) * 1000);
  }
  
  // Seed particles
  for (let i = 0; i < 15; i++) {
    createParticle();
  }
  
  // Create continuous particles
  setInterval(createParticle, 800);

  
  // --- 2. ENVELOPE INTERACTION ---
  const envelopeCover = document.getElementById('envelope-cover');
  const mainInvitation = document.getElementById('main-invitation');
  const openBtn = document.getElementById('open-btn');
  const musicControl = document.getElementById('music-control');
  const musicDisc = document.querySelector('.music-disc');
  const bgMusic = document.getElementById('bg-music');
  
  function openInvitation() {
    envelopeCover.classList.add('opened');
    mainInvitation.classList.remove('hidden-card');
    
    // Try auto-playing music
    playMusic();
    
    // Show music control button
    musicControl.classList.remove('hidden');
    
    // Scroll window to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  
  openBtn.addEventListener('click', openInvitation);
  
  
  // --- 3. MUSIC PLAYER LOGIC ---
  let isPlaying = false;
  
  function playMusic() {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicDisc.classList.add('playing');
    }).catch(err => {
      console.log('Autoplay was blocked or failed:', err);
      isPlaying = false;
      musicDisc.classList.remove('playing');
    });
  }
  
  function toggleMusic() {
    if (isPlaying) {
      bgMusic.pause();
      musicDisc.classList.remove('playing');
      isPlaying = false;
    } else {
      bgMusic.play().then(() => {
        musicDisc.classList.add('playing');
        isPlaying = true;
      }).catch(err => {
        console.error(err);
      });
    }
  }
  
  musicControl.addEventListener('click', toggleMusic);
  
  
  // --- 4. COUNTDOWN TIMER ---
  const targetDateStr = '2026-07-19T10:30:00';
  const targetDate = new Date(targetDateStr).getTime();
  const countdownInlineText = document.getElementById('countdown-inline-text');
  
  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;
    
    if (diff <= 0) {
      if (countdownInlineText) {
        countdownInlineText.innerText = 'Đã diễn ra';
      }
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (countdownInlineText) {
      countdownInlineText.innerText = `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
    }
  }
  
  setInterval(updateCountdown, 1000);
  updateCountdown(); // Run immediately
  
  
  // --- 5. LIGHTBOX / IMAGE MODAL ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-quad-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Disable page scrolling
      }
    });
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable page scrolling
    });
  }
  
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
});
