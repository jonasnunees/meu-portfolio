// ========================================================================
// main.js - comportamentos globais do site
// ========================================================================

const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const backToTopButton = document.getElementById('back-to-top');
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', theme === 'dark');
    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark'
        ? 'Alternar para tema claro'
        : 'Alternar para tema escuro'
    );
  }
}

const savedTheme = localStorage.getItem('theme')
  || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

if (menuToggle && mainNav) {
  const mainNavLinks = mainNav.querySelectorAll('a');

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      mainNavLinks[0]?.focus();
    } else {
      menuToggle.focus();
    }
  });

  mainNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mainNav.classList.contains('is-open')) {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });
}

if (backToTopButton) {
  window.addEventListener('scroll', () => {
    backToTopButton.classList.toggle('is-visible', window.scrollY > 600);
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  });
}

// ========================================================================
// Reveal animations on scroll
// ========================================================================

if (window.AOS) {
  window.AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    disable: prefersReducedMotion
  });
}
