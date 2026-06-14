/* ============================================
   MiniDelights — script.js
   Vanilla JS: hamburger, smooth scroll,
   IntersectionObserver fade-in
   ============================================ */

(function () {
  'use strict';

  /* ── DOM REFERENCES ──────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navList   = document.getElementById('nav-list');
  const navLinks  = document.querySelectorAll('.nav__link');
  const navbar    = document.getElementById('header');

  /* ── HAMBURGER TOGGLE ────────────────────── */
  function openNav() {
    navList.classList.add('nav-open');
    hamburger.classList.add('nav-open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    navList.classList.remove('nav-open');
    hamburger.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function toggleNav() {
    if (navList.classList.contains('nav-open')) {
      closeNav();
    } else {
      openNav();
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleNav();
    });
  }

  /* ── CLOSE NAV ON LINK CLICK (MOBILE) ───── */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeNav();
    });
  });

  /* ── CLOSE NAV WHEN CLICKING OUTSIDE ────── */
  document.addEventListener('click', function (e) {
    if (
      navList &&
      navList.classList.contains('nav-open') &&
      !navList.contains(e.target) &&
      e.target !== hamburger &&
      !hamburger.contains(e.target)
    ) {
      closeNav();
    }
  });

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ─────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const top = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── INTERSECTION OBSERVER — FADE IN ────── */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback for browsers without IntersectionObserver */
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── NAVBAR SHADOW ON SCROLL ─────────────── */
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.classList.add('header--scrolled');
      } else {
        navbar.classList.remove('header--scrolled');
      }
    }, { passive: true });
  }

})();
