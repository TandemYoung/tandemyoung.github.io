(function () {
  'use strict';

  // Mark that JS is available; the scroll-reveal hiding in CSS is scoped to
  // `.js [data-reveal]`, so content is always visible if this never runs.
  document.documentElement.classList.add('js');

  // ---------------------------------------------------------------------------
  // Scroll-reveal: fade in below-the-fold cards as they enter the viewport.
  // (Heroes and headings are intentionally never hidden.)
  // ---------------------------------------------------------------------------
  function initReveal() {
    var els = document.querySelectorAll('.paper-card, .project-card, .post-card, .course-card');
    if (!els.length || !('IntersectionObserver' in window)) return;

    els.forEach(function (el) { el.setAttribute('data-reveal', ''); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  // ---------------------------------------------------------------------------
  // Back-to-top button
  // ---------------------------------------------------------------------------
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', function () {
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  // ---------------------------------------------------------------------------
  // Mobile nav toggle (open/close, close on link click, close on Escape)
  // ---------------------------------------------------------------------------
  function initNavToggle() {
    var nav = document.getElementById('site-nav');
    var btn = document.querySelector('.nav-toggle');
    if (!nav || !btn) return;

    function close() {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        close();
        btn.focus();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // Click-to-load PDF embeds: defer the heavy report iframes until requested.
  // (A <noscript> fallback in the markup embeds the PDF when JS is unavailable.)
  // ---------------------------------------------------------------------------
  function initPdfEmbeds() {
    var btns = document.querySelectorAll('.pdf-embed-load');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var wrap = btn.closest('.pdf-embed');
        if (!wrap) return;

        var iframe = document.createElement('iframe');
        iframe.src = btn.getAttribute('data-pdf-src');
        iframe.title = btn.getAttribute('data-pdf-title') || 'Embedded PDF';
        iframe.setAttribute('loading', 'lazy');

        wrap.innerHTML = '';
        wrap.classList.remove('pdf-embed');
        wrap.appendChild(iframe);
        iframe.focus();
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initBackToTop();
    initNavToggle();
    initPdfEmbeds();
  });
})();
