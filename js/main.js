(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Scroll-reveal: fade-in elements as they enter the viewport
  // ---------------------------------------------------------------------------
  var revealTargets = 'section, .card, .paper-card, .project-card, .post-card';

  function initReveal() {
    var els = document.querySelectorAll(revealTargets);
    els.forEach(function (el) { el.setAttribute('data-reveal', ''); });

    // Also tag h2s for animated underlines
    document.querySelectorAll('section h2, .home-content h2, .about-content h2').forEach(function (el) {
      el.setAttribute('data-reveal', '');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---------------------------------------------------------------------------
  // Back-to-top button
  // ---------------------------------------------------------------------------
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------------------------------------------------------------------------
  // Reading time (post pages only)
  // ---------------------------------------------------------------------------
  function initReadingTime() {
    var content = document.querySelector('.post-content');
    var meta = document.querySelector('.post-header .reading-time');
    if (!content || !meta) return;

    var words = content.textContent.trim().split(/\s+/).length;
    var minutes = Math.max(1, Math.round(words / 200));
    meta.textContent = '\u00B7 ' + minutes + ' min read';
  }

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initBackToTop();
    initReadingTime();
  });
})();
