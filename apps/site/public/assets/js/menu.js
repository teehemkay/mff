// Menu component
export const buttons = document.querySelectorAll('.nav-button');
export const lists = document.querySelectorAll('.list');
const header = document.querySelector('header>div:first-of-type');

export const toggleMenu = (event) => {
  const clickedButton = event.currentTarget;
  const clickedList = clickedButton.parentNode.nextElementSibling;
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
};

export const updateHeaderHeight = () => {
  let maxHeight = 0;
  let menuOpen = false;
  // const defaultMenu = document.querySelector('nav.menu');
  // const defaultMenuButton = defaultMenu.querySelector(
  //   'button[aria-expanded="true"]',
  // );
  for (const list of lists) {
    const isOpen = !list.hidden;
    list.style.display = isOpen ? 'block' : 'none';
    if (isOpen) {
      maxHeight = Math.max(maxHeight, list.offsetHeight);
      menuOpen = true; // Indicate that at least one menu is open
    }
  }

  header.style.height = menuOpen ? `${maxHeight + 92}px` : 'auto';
  // if (maxHeight === 0) {
  //   header.removeAttribute('style');
  // } else {
  //   header.style.height =
  //     defaultMenuButton && window.innerWidth > 1080
  //       ? 'auto'
  //       : `${maxHeight + (menuOpen ? 76 : 0)}px`;
  // }
};

export const init = () => {
  for (const button of buttons) {
    button.addEventListener('click', toggleMenu);
  }

  window.addEventListener('DOMContentLoaded', () => {
    updateHeaderHeight();
  });

  window.addEventListener('resize', () => {
    updateHeaderHeight();
  });

  document
    .querySelector('#eplo-country-switcher')?.addEventListener('change', (event) => {
      const url = event.target.value;
      if (url !== 'none') {
        window.location.href = url;
      }
    });
};

init();
