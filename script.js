'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navegacion');
const mobileView = window.matchMedia('(max-width: 959px)');

function setMenuOpen(isOpen) {
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('.menu-label').textContent = isOpen ? 'Cerrar' : 'Menú';
  menuToggle.querySelector('.menu-icon').textContent = isOpen ? '−' : '+';
  navigation.hidden = mobileView.matches && !isOpen;
}

function syncMenu() {
  menuToggle.hidden = !mobileView.matches;
  setMenuOpen(false);
}

menuToggle.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || !mobileView.matches) return;
  setMenuOpen(false);
  // Move focus out of the collapsed menu and into the selected section.
  const section = document.querySelector(link.getAttribute('href'));
  section.setAttribute('tabindex', '-1');
  section.focus({ preventScroll: true });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileView.matches && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

mobileView.addEventListener('change', syncMenu);
syncMenu();

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const textFields = [document.querySelector('#nombre'), document.querySelector('#mensaje')];

function validateTextFields() {
  textFields.forEach((field) => {
    field.setCustomValidity(field.value.length > 0 && field.value.trim().length === 0
      ? 'Escribe contenido; este campo no puede contener solo espacios.'
      : '');
  });
}

textFields.forEach((field) => field.addEventListener('input', validateTextFields));

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  validateTextFields();
  if (!contactForm.reportValidity()) return;
  formStatus.textContent = 'Validación completada. Esta es una demostración: no se ha enviado ni guardado ningún dato.';
});

contactForm.addEventListener('input', () => {
  formStatus.textContent = '';
});

document.querySelector('#contact-submit').disabled = false;
