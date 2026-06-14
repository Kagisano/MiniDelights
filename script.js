/* ============================================
   MiniDelights — script.js
   - Mobile nav hamburger toggle
   - Smooth scroll for anchor links
   - Fade-in on scroll (IntersectionObserver)
   - Header scroll shadow
   ============================================ */

(function () {
  'use strict';

  /* ── DOM REFERENCES ─────────────────────── */
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('nav-list');
  const navLinks = document.querySelectorAll('.nav__link');
  const fadeEls = document.querySelectorAll('.fade-in');

  /* ── HAMBURGER MENU TOGGLE ──────────────── */
  function openMenu() {
    navList.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navList.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = navList.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  /* Close menu when a nav link is clicked */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  /* Close menu when clicking outside */
  document.addEventListener('click', function (e) {
    if (
      navList &&
      navList.classList.contains('open') &&
      !navList.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* Close menu on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navList.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  /* ── HEADER SCROLL SHADOW ───────────────── */
  function updateHeaderShadow() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeaderShadow, { passive: true });
  updateHeaderShadow();

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ─────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
        10
      ) || 72;
      var targetY = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    });
  });

  /* ── FADE-IN ON SCROLL ──────────────────── */
  if ('IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    fadeEls.forEach(function (el, index) {
      /* Stagger children within the same parent */
      var siblings = Array.from(el.parentElement.querySelectorAll('.fade-in'));
      var siblingIndex = siblings.indexOf(el);
      if (siblingIndex > 0) {
        el.style.transitionDelay = siblingIndex * 0.1 + 's';
      }
      fadeObserver.observe(el);
    });
  } else {
    /* Fallback: show all elements immediately */
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── ACTIVE NAV LINK ON SCROLL ──────────── */
  var sections = document.querySelectorAll('section[id]');

  function setActiveLink() {
    var scrollY = window.scrollY;
    var navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
      10
    ) || 72;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - navHeight - 60;
      var sectionBottom = sectionTop + section.offsetHeight;
      var sectionId = section.getAttribute('id');
      var correspondingLink = document.querySelector('.nav__link[href="#' + sectionId + '"]');

      if (correspondingLink) {
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          correspondingLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ── MENU CARD FADE-IN STAGGER ──────────── */
  var menuCards = document.querySelectorAll('.menu__card');
  if ('IntersectionObserver' in window) {
    var cardObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    menuCards.forEach(function (card, i) {
      card.style.transitionDelay = i * 0.12 + 's';
      cardObserver.observe(card);
    });
  }

  /* ── GALLERY ITEM STAGGER ───────────────── */
  var galleryItems = document.querySelectorAll('.gallery__item');
  if ('IntersectionObserver' in window) {
    var galleryObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            galleryObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );
    galleryItems.forEach(function (item, i) {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.6s ease ' + i * 0.1 + 's, transform 0.6s ease ' + i * 0.1 + 's';
      galleryObserver.observe(item);
    });
  }

})();
