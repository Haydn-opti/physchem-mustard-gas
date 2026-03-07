// ===== MOBILE NAV TOGGLE =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // ===== SCROLL REVEAL =====
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  // ===== ACTIVE NAV LINK =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ===== MATCH-CUT TEXT CYCLER =====
  const matchEl = document.querySelector('.matchcut');
  if (matchEl) {
    const phrases = [
      { text: 'modern cancer treatment.', style: 'style-italic' },
      { text: 'the Geneva Protocol.', style: 'style-mono' },
      { text: 'a revolution in oncology.', style: 'style-bold' },
      { text: 'international treaties.', style: 'style-spaced' },
      { text: 'the fight against cancer.', style: 'style-script' },
      { text: 'chemotherapy.', style: 'style-editorial' },
      { text: 'the laws of war.', style: 'style-mono' },
      { text: 'decades of medical research.', style: 'style-thin' },
      { text: 'a global arms ban.', style: 'style-spaced' },
      { text: 'modern pharmacology.', style: 'style-italic' },
    ];

    const allStyles = [...new Set(phrases.map(p => p.style))];
    let lastLanded = 0;

    function clearStyles() {
      allStyles.forEach(s => matchEl.classList.remove(s));
      matchEl.classList.remove('shuffling', 'landing');
    }

    function pickRandom(excludeIndex) {
      let idx;
      do { idx = Math.floor(Math.random() * phrases.length); }
      while (idx === excludeIndex);
      return idx;
    }

    function runShuffle() {
      // Rapid shuffle phase: ~12-18 flicks, speeding up then slowing down
      const totalFlicks = 12 + Math.floor(Math.random() * 7);
      let flick = 0;

      matchEl.classList.add('shuffling');

      function doFlick() {
        const idx = pickRandom(lastLanded);
        clearStyles();
        matchEl.classList.add('shuffling');
        matchEl.classList.add(phrases[idx].style);
        matchEl.textContent = phrases[idx].text;

        flick++;
        if (flick < totalFlicks) {
          // Start fast (~60ms), decelerate toward the end
          const progress = flick / totalFlicks;
          const delay = 50 + progress * progress * 140;
          setTimeout(doFlick, delay);
        } else {
          // Land on the final choice
          const landIdx = pickRandom(lastLanded);
          lastLanded = landIdx;

          clearStyles();
          matchEl.classList.add(phrases[landIdx].style);
          matchEl.textContent = phrases[landIdx].text;
          matchEl.classList.add('landing');

          // Hold for 3-5 seconds, then shuffle again
          const holdTime = 3000 + Math.random() * 2000;
          setTimeout(() => {
            clearStyles();
            runShuffle();
          }, holdTime);
        }
      }

      doFlick();
    }

    // Start after hero entrance animation
    setTimeout(runShuffle, 3000);
  }
});
