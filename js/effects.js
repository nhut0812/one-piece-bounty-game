// Copy từ effects.js gốc và thêm hiệu ứng One Piece
function createConfetti() {
  const colors = ['#f39c12', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f1c40f', '#e67e22', '#c0392b'];
  
  // Confetti
  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      
      // Random shapes - cho thêm hình ngôi sao
      const shape = Math.random();
      if (shape > 0.8) {
        confetti.innerHTML = '⭐';
        confetti.style.fontSize = '20px';
        confetti.style.background = 'transparent';
      } else if (shape > 0.6) {
        confetti.innerHTML = '🏴‍☠️';
        confetti.style.fontSize = '16px';
        confetti.style.background = 'transparent';
      } else if (shape > 0.4) {
        confetti.style.borderRadius = '50%';
      } else {
        confetti.style.borderRadius = '2px';
      }
      
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 5000);
    }, i * 15);
  }
  
  // Sparkles
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      createSparkle(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
    }, i * 40);
  }
  
  // Particles
  createParticleEffect();
}

// Tạo sparkle effect
function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  sparkle.style.background = `rgba(255, ${Math.random() * 100 + 155}, ${Math.random() * 100}, 1)`;
  document.body.appendChild(sparkle);
  
  setTimeout(() => sparkle.remove(), 1000);
}

// Tạo particle effect
function createParticleEffect() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      
      const angle = (Math.PI * 2 * i) / 30;
      const distance = 120;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      particle.style.setProperty('--tx', tx + 'px');
      particle.style.setProperty('--ty', ty + 'px');
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 2000);
    }, i * 25);
  }
}

// Thêm click sparkle effect
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn-plus') || 
      e.target.classList.contains('btn-minus') ||
      e.target.classList.contains('btn-plus-large')) {
    createSparkle(e.clientX, e.clientY);
  }
});
