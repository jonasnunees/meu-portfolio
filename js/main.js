// ==========================================================================
// main.js — comportamentos globais do site
// ==========================================================================

// Alternância de tema claro/escuro
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme')
  || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Menu mobile
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Fecha o menu mobile ao clicar em um link
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ==========================================================================
// Botão "Voltar ao topo"
// ==========================================================================

const backToTopButton = document.getElementById('back-to-top');

// Exibe o botão após 600px de rolagem
window.addEventListener('scroll', () => {
  backToTopButton.classList.toggle('is-visible', window.scrollY > 600);
});

// Retorna ao topo da página
backToTopButton.addEventListener('click', () => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? 'auto' : 'smooth'
  });
});

// ========================================================================
// Animações de reveal por scroll
// ========================================================================

if (window.AOS) {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  window.AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    disable: prefersReducedMotion
  });
}
