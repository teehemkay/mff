'use strict';

// Menu component
window.addEventListener('DOMContentLoaded', () => {
  updateHeaderHeight();
});
window.addEventListener('resize', () => {
  updateHeaderHeight();
});
const buttons = document.querySelectorAll('.nav-button');
const lists = document.querySelectorAll('.list');
const header = document.querySelector('header');
for (const button of buttons) {
  button.addEventListener('click', toggleMenu);
}
function toggleMenu() {
  const clickedButton = this;
  const clickedList = clickedButton.nextElementSibling;
  const isExpanded = !clickedList.hidden;
  if (isExpanded) {
    clickedList.style.display = 'none';
    clickedList.hidden = true;
    clickedButton.setAttribute('aria-expanded', 'false');
    header.classList.remove('menu-open');
  } else {
    for (const list of lists) {
      const button = list.previousElementSibling;
      const isOpen = !list.hidden;
      if (isOpen && button !== clickedButton) {
        list.style.display = 'none';
        list.hidden = true;
        button.setAttribute('aria-expanded', 'false');
      }
    }
    clickedList.style.display = 'block';
    clickedList.hidden = false;
    clickedButton.setAttribute('aria-expanded', 'true');
    header.classList.add('menu-open');
  }
  updateHeaderHeight();
}
function updateHeaderHeight() {
  let maxHeight = 0;
  let menuOpen = false;
  const defaultMenu = document.querySelector('nav.default-menu');
  const defaultMenuButton = defaultMenu.querySelector('button[aria-expanded="true"]');
  for (const list of lists) {
    const isOpen = !list.hidden;
    list.style.display = isOpen ? 'block' : 'none';
    if (isOpen) {
      maxHeight = Math.max(maxHeight, list.offsetHeight);
      menuOpen = true; // Indicate that at least one menu is open
    }
  }
  header.style.height = defaultMenuButton && window.innerWidth > 1080 ? 'auto' : `${maxHeight + (menuOpen ? 80 : 0)}px`;
  //document.querySelectorAll('#menu1-list li').length
}

// Inject the current menu state in JS (only for html prototyping as the main nav is included globally
// Trouver l'élément <ul> par sa classe
const navul = document.querySelector('ul.list');
const navli = navul.querySelector('li:nth-child(1)');
const navlilink = navli.querySelector('a');

// Ajouter la classe "current" à la balise <a>
navlilink.classList.add('current');

// Ajouter l'attribut "aria-current" avec la valeur "page" à la balise <a>
navlilink.setAttribute('aria-current', 'page');//# sourceMappingURL=old-menu.js.map
