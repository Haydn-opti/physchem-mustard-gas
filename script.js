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

  // ===== QUIZ LOGIC =====
  const quizQuestions = document.querySelectorAll('.quiz-question');
  let answered = 0;
  let correct = 0;
  const totalQuestions = quizQuestions.length;

  quizQuestions.forEach(question => {
    const options = question.querySelectorAll('.quiz-option');
    const feedback = question.querySelector('.quiz-feedback');
    const correctAnswer = question.dataset.answer;

    options.forEach(option => {
      option.addEventListener('click', () => {
        // Prevent re-answering
        if (question.classList.contains('answered')) return;
        question.classList.add('answered');
        answered++;

        const selected = option.dataset.value;
        const isCorrect = selected === correctAnswer;

        if (isCorrect) {
          option.classList.add('correct');
          correct++;
          if (feedback) {
            feedback.textContent = '✓ Correct!';
            feedback.className = 'quiz-feedback show correct-fb';
          }
        } else {
          option.classList.add('incorrect');
          // Highlight the correct one
          options.forEach(o => {
            if (o.dataset.value === correctAnswer) o.classList.add('correct');
          });
          if (feedback) {
            feedback.textContent = '✗ Not quite — see the correct answer highlighted above.';
            feedback.className = 'quiz-feedback show incorrect-fb';
          }
        }

        // Disable all options
        options.forEach(o => { o.disabled = true; });

        // Show score if all answered
        if (answered === totalQuestions) {
          const scoreEl = document.querySelector('.quiz-score');
          if (scoreEl) {
            scoreEl.classList.add('show');
            scoreEl.querySelector('.score-number').textContent = `${correct} / ${totalQuestions}`;
            const pct = Math.round((correct / totalQuestions) * 100);
            let msg = 'Great job!';
            if (pct < 50) msg = 'Review the content and try again!';
            else if (pct < 80) msg = 'Good effort — revisit the tricky ones!';
            scoreEl.querySelector('.score-msg').textContent = msg;
          }
        }
      });
    });
  });

  // ===== ACTIVE NAV LINK =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});
